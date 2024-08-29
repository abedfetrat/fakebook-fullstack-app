using FakebookApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FakebookApi.Data;

public class FakebookContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Post> Posts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>().Navigation(p => p.Author).AutoInclude();
    }
}