using FakebookApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace FakebookApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly ILogger<PostsController> _logger;

    private static readonly List<Post> Posts =
    [
        new Post()
        {
            Id = "post_" + Guid.NewGuid().ToString().Replace("-", ""),
            Author = new Author("markzucker", "Mark", "Zucker"),
            Content = "Hello World from Mark Zucker!",
            Likes = 0,
            Dislikes = 1200,
            PostedAt = DateTime.Now
        },
        new Post()
        {
            Id = "post_" + Guid.NewGuid().ToString().Replace("-", ""),
            Author = new Author("muskelon", "Elon", "Musketeer"),
            Content = "Hello World from Elon Musketeer!",
            Likes = 899,
            Dislikes = 0,
            PostedAt = DateTime.Now
        },
        new Post()
        {
            Id = "post_" + Guid.NewGuid().ToString().Replace("-", ""),
            Author = new Author("mynameisjeff", "Jeff", "Bezoar"),
            Content = "Hello World from Jeff Bezoar!",
            Likes = 523,
            Dislikes = 43,
            PostedAt = DateTime.Now
        },
    ];

    public PostsController(ILogger<PostsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public PostsListResponse GetPosts()
    {
        var orderedPosts = Posts
            .OrderByDescending(post => post.PostedAt)
            .ToList();
        return new PostsListResponse(orderedPosts);
    }

    [HttpGet("{id}")]
    public ActionResult<Post> GetPostById(string id)
    {
        var foundPost = Posts.FirstOrDefault(p => p.Id == id);
        return foundPost is not null
            ? foundPost
            : NotFound($"Post with id '{id}' not found.");
    }

    [HttpPost]
    public ActionResult CreatePost(CreatePostRequest createPostRequest)
    {
        // TOOD: validate request
        var author = new Author(
            createPostRequest.User.Uid,
            createPostRequest.User.FirstName,
            createPostRequest.User.LastName);

        var newPost = new Post()
        {
            Id = "post_" + Guid.NewGuid().ToString().Replace("-", ""),
            Author = author,
            Content = createPostRequest.Content,
            Likes = 0,
            Dislikes = 0,
            PostedAt = DateTime.Now
        };

        Posts.Add(newPost);

        return CreatedAtAction(nameof(GetPostById), new { id = newPost.Id }, newPost);
    }

    [HttpPut("{id}")]
    public ActionResult<Post> UpdatePost(string id, UpdatePostRequest updatePostRequest)
    {
        var foundPost = Posts.FirstOrDefault(p => p.Id == id);
        if (foundPost is null)
        {
            return NotFound($"Post with id '{id}' not found.");
        }

        foundPost.Content = updatePostRequest.Content;

        return foundPost;
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePost(string id)
    {
        var foundPost = Posts.FirstOrDefault(p => p.Id == id);
        if (foundPost is not null)
        {
            Posts.Remove(foundPost);
        }

        return NoContent();
    }
}