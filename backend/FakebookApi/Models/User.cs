namespace FakebookApi.Models;

public record User(
    string Uid,
    string FirstName,
    string LastName,
    string Email
);