using System.ComponentModel.DataAnnotations;
using MarketComparison.Api.Data;
using MarketComparison.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MarketComparison.Api.Controllers;

[ApiController]
[Route("api/v1/brands")]
public class BrandsController : ControllerBase
{
    private readonly AppDbContext _db;
    private readonly IWebHostEnvironment _environment;

    public BrandsController(AppDbContext db, IWebHostEnvironment environment)
    {
        _db = db;
        _environment = environment;
    }

    // 查全部
    [HttpGet]
    public async Task<ActionResult<List<BrandResponse>>> GetAll()
    {
        var brands = await _db.Brands
            .AsNoTracking()
            .OrderBy(brand => brand.DisplayName)
            .Select(brand => new BrandResponse(
                brand.Id,
                brand.DisplayName))
            .ToListAsync();

        return Ok(brands);
    }

    // 根据 ID 查询
    [HttpGet("{id}")]
    public async Task<ActionResult<BrandResponse>> GetById(ulong id)
    {
        var brand = await _db.Brands
            .AsNoTracking()
            .Where(brand => brand.Id == id)
            .Select(brand => new BrandResponse(
                brand.Id,
                brand.DisplayName))
            .FirstOrDefaultAsync();

        return brand is null ? NotFound() : Ok(brand);
    }

    // 新增
    [HttpPost]
    public async Task<ActionResult<BrandResponse>> Create(BrandRequest request)
    {
        if (!_environment.IsDevelopment())
            return StatusCode(403);

        var name = request.Name.Trim();

        if (name.Length == 0)
            return BadRequest("品牌名称不能为空。");

        var normalizedName = name.ToLowerInvariant();

        if (await _db.Brands.AnyAsync(
                brand => brand.NormalizedName == normalizedName))
        {
            return Conflict("这个品牌已经存在。");
        }

        var brand = new Brand
        {
            DisplayName = name,
            NormalizedName = normalizedName
        };

        _db.Brands.Add(brand);
        await _db.SaveChangesAsync();

        var response = new BrandResponse(brand.Id, brand.DisplayName);

        return CreatedAtAction(
            nameof(GetById),
            new { id = brand.Id },
            response);
    }

    // 修改
    [HttpPut("{id}")]
    public async Task<ActionResult<BrandResponse>> Update(
        ulong id,
        BrandRequest request)
    {
        if (!_environment.IsDevelopment())
            return StatusCode(403);

        var brand = await _db.Brands.FindAsync(id);

        if (brand is null)
            return NotFound();

        var name = request.Name.Trim();

        if (name.Length == 0)
            return BadRequest("品牌名称不能为空。");

        var normalizedName = name.ToLowerInvariant();

        var nameUsedByAnotherBrand = await _db.Brands.AnyAsync(
            other => other.Id != id &&
                     other.NormalizedName == normalizedName);

        if (nameUsedByAnotherBrand)
            return Conflict("这个品牌名称已经被使用。");

        brand.DisplayName = name;
        brand.NormalizedName = normalizedName;

        await _db.SaveChangesAsync();

        return Ok(new BrandResponse(brand.Id, brand.DisplayName));
    }

    // 删除
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(ulong id)
    {
        if (!_environment.IsDevelopment())
            return StatusCode(403);

        var brand = await _db.Brands.FindAsync(id);

        if (brand is null)
            return NotFound();

        _db.Brands.Remove(brand);

        try
        {
            await _db.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            return Conflict("已有商品使用这个品牌，暂时不能删除。");
        }

        return NoContent();
    }
}

public class BrandRequest
{
    [Required]
    [StringLength(160)]
    public string Name { get; set; } = string.Empty;
}

public record BrandResponse(ulong Id, string Name);