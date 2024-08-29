using FakebookApi.Models;
namespace FakebookApi.Data;

public static class DbSeeder
{
    public static void Seed(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<FakebookContext>();

        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();

        List<Post> posts = new List<Post>
        {
            new Post
            {
                Author = new Author
                {
                    Uid = "zuckthefuture",
                    FirstName = "Mark",
                    LastName = "Zucker",
                    AvatarUrl = "https://i.imgur.com/wiWcTi1.jpeg"
                },
                Content =
                    "Just had a virtual meeting in the Metaverse. My avatar has better dance moves than I do. #Upgrade",
                Likes = 0,
                Dislikes = 999999999,
                PostedAt = DateTime.Now.AddDays(-10)
            },
            new Post
            {
                Author = new Author
                {
                    Uid = "timcookedit",
                    FirstName = "Tim",
                    LastName = "Cookie",
                    AvatarUrl = "https://i.imgur.com/4V8qEYb.jpeg"
                },
                Content =
                    "Thinking about releasing the iToaster next. It’ll sync with your iPhone and burn the Apple logo onto your bread. Because why not? 🍞🍎",
                Likes = 1756,
                Dislikes = 256,
                PostedAt = DateTime.Now.AddDays(-5)
            },
            new Post
            {
                Author = new Author
                {
                    Uid = "elontweetsalot",
                    FirstName = "Elon",
                    LastName = "Musketeer",
                    AvatarUrl = "https://i.imgur.com/IGpL7eT.jpeg"
                },
                Content = "Accidentally sent a Tesla into space. Guess that’s one way to avoid traffic. 🚀 #MarsOrBust",
                Likes = 3200,
                Dislikes = 0,
                PostedAt = DateTime.Now.AddDays(-2)
            },
            new Post
            {
                Author = new Author
                {
                    Uid = "mynameisjeff",
                    FirstName = "Jeff",
                    LastName = "Bezoar",
                    AvatarUrl = "https://i.imgur.com/s1Y8CZa.jpeg"
                },
                Content =
                    "Just ordered something on Amazon with next-day delivery. The catch? It’s an island. Can’t wait to see how they pull this off! 🌴📦",
                Likes = 1278,
                Dislikes = 457,
                PostedAt = DateTime.Now
            }
        };

        context.AddRange(posts);
        context.SaveChanges();
    }
}