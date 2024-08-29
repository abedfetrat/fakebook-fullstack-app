using System.ComponentModel.DataAnnotations;

namespace FakebookApi.Models;

public class Author
{
    [Key] public int Id { get; set; }
    public required string Uid { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? AvatarUrl { get; set; }
}