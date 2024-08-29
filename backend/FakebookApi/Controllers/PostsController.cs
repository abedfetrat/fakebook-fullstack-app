using FakebookApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FakebookApi.Controllers;

[Authorize]
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
            Author = new Author("zuckthefuture", "Mark", "Zucker", AvatarUrl: "zuckthefuture.jpg"),
            Content =
                "Just had a virtual meeting in the Metaverse. My avatar has better dance moves than I do. #Upgrade",
            Likes = 0,
            Dislikes = 999999999,
            PostedAt = DateTime.Now.AddDays(-10)
        },
        new Post()
        {
            Id = "post_" + Guid.NewGuid().ToString().Replace("-", ""),
            Author = new Author("timcookedit", "Tim", "Cookie", AvatarUrl: "timcookedit.jpg"),
            Content =
                "Thinking about releasing the iToaster next. It’ll sync with your iPhone and burn the Apple logo onto your bread. Because why not? \ud83c\udf5e\ud83c\udf4e",
            Likes = 1756,
            Dislikes = 256,
            PostedAt = DateTime.Now.AddDays(-5)
        },
        new Post()
        {
            Id = "post_" + Guid.NewGuid().ToString().Replace("-", ""),
            Author = new Author("elontweetsalot", "Elon", "Musketeer", AvatarUrl: "elontweetsalot.jpg"),
            Content =
                "Accidentally sent a Tesla into space. Guess that’s one way to avoid traffic. \ud83d\ude80 #MarsOrBust",
            Likes = 3200,
            Dislikes = 0,
            PostedAt = DateTime.Now.AddDays(-2)
        },
        new Post()
        {
            Id = "post_" + Guid.NewGuid().ToString().Replace("-", ""),
            Author = new Author("mynameisjeff", "Jeff", "Bezoar", AvatarUrl: "mynameisjeff.jpg"),
            Content =
                "Just ordered something on Amazon with next-day delivery. The catch? It’s an island. Can’t wait to see how they pull this off! \ud83c\udf34\ud83d\udce6",
            Likes = 1278,
            Dislikes = 457,
            PostedAt = DateTime.Now
        }
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
            createPostRequest.User.LastName,
            createPostRequest.User.AvatarUrl);

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