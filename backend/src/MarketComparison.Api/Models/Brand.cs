namespace MarketComparison.Api.Models;

public class Brand
{
    public ulong Id { get; set; }

    public string NormalizedName { get; set; } = string.Empty;

    public string DisplayName { get; set; } = string.Empty;
}