namespace FakebookApi.Models;

public record Post(
    string Id,
    Author Author,
    string Content,
    int Likes,
    int Dislikes,
    DateTime PostedAt
);