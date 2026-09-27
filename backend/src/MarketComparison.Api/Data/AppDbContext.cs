using MarketComparison.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace MarketComparison.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Brand> Brands => Set<Brand>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Brand>(entity =>
        {
            entity.ToTable("brands");

            entity.HasKey(brand => brand.Id);

            entity.Property(brand => brand.Id)
                .HasColumnName("id")
                .HasColumnType("bigint unsigned")
                .ValueGeneratedOnAdd();

            entity.Property(brand => brand.DisplayName)
                .HasColumnName("display_name")
                .HasMaxLength(160)
                .IsRequired();

            entity.Property(brand => brand.NormalizedName)
                .HasColumnName("normalized_name")
                .HasMaxLength(160)
                .IsRequired();

            entity.HasIndex(brand => brand.NormalizedName)
                .IsUnique();
        });
    }
}