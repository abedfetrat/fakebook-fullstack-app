using FakebookApi.Data;
using FakebookApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FakebookApi.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly FakebookContext _context;

    public PostsController(FakebookContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<PostsListResponse> GetPosts()
    {
        var orderedPosts = await _context.Posts
            .OrderByDescending(post => post.PostedAt)
            .ToListAsync();
        return new PostsListResponse(orderedPosts);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Post>> GetPostById(int id)
    {
        var foundPost = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
        return foundPost is not null
            ? foundPost
            : NotFound($"Post with id '{id}' not found.");
    }

    [HttpPost]
    public async Task<ActionResult> CreatePost(CreatePostRequest createPostRequest)
    {
        var username = User.FindFirst(c => c.Type == "username")?.Value;
        var firstName = User.FindFirst(c => c.Type == "firstName")?.Value;
        var lastName = User.FindFirst(c => c.Type == "lastName")?.Value;
        var avatarUrl = User.FindFirst(c => c.Type == "avatarUrl")?.Value;

        var author = new Author()
        {
            Uid = username ?? "",
            FirstName = firstName ?? "",
            LastName = lastName ?? "",
            AvatarUrl = avatarUrl
        };

        var newPost = new Post()
        {
            Author = author,
            Content = createPostRequest.Content,
            PostedAt = DateTime.Now
        };

        _context.Posts.Add(newPost);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPostById), new { id = newPost.Id }, newPost);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Post>> UpdatePost(int id, UpdatePostRequest updatePostRequest)
    {
        var foundPost = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
        if (foundPost is null)
        {
            return NotFound($"Post with id '{id}' not found.");
        }

        foundPost.Content = updatePostRequest.Content;
        await _context.SaveChangesAsync();

        return foundPost;
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePost(int id)
    {
        var foundPost = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
        if (foundPost is not null)
        {
            _context.Posts.Remove(foundPost);
            await _context.SaveChangesAsync();
        }

        return NoContent();
    }
}