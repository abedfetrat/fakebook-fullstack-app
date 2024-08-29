namespace FakebookApi.Models;

public class Post
{
    public int Id { get; set; }
    public required Author Author { get; init; }
    public required string Content { get; set; } = "";
    public int Likes { get; set; }
    public int Dislikes { get; set; }
    public DateTime PostedAt { get; init; } = DateTime.Now;
}