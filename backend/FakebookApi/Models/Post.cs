namespace FakebookApi.Models;

public class Post
{
    public required string Id { get; init; }
    public required Author Author { get; init; }
    public required string Content { get; set; } = "";
    public required int Likes { get; set; } = 0;
    public required int Dislikes { get; set; } = 0;
    public required DateTime PostedAt { get; init; }
}