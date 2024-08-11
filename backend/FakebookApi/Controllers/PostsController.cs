using FakebookApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace FakebookApi.Controllers;

[ApiController]
[Route("[controller]")]
public class PostsController : ControllerBase
{
    private readonly ILogger<PostsController> _logger;

    private static readonly List<Post> Posts =
    [
        new Post(
            Id: "post_" + Guid.NewGuid().ToString().Replace("-", ""),
            Author: new Author("abedfetrat", "Abed", "Fetrat"),
            Content: "Hello World from Abed Fetrat!",
            Likes: 10,
            Dislikes: 0,
            PostedAt: DateTime.Now
        ),
        new Post(
            Id: "post_" + Guid.NewGuid().ToString().Replace("-", ""),
            Author: new Author("johndoe", "John", "Doe"),
            Content: "Hello World from John Doe!",
            Likes: 38,
            Dislikes: 2,
            PostedAt: DateTime.Now
        ),
        new Post(
            Id: "post_" + Guid.NewGuid().ToString().Replace("-", ""),
            Author: new Author("markzucker", "Mark", "Zuckerberg"),
            Content: "Hello World from Mark Zuckerberg!",
            Likes: 1020,
            Dislikes: 53,
            PostedAt: DateTime.Now
        )
    ];

    public PostsController(ILogger<PostsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public PostsListResponse GetPosts() => new(Posts);
}