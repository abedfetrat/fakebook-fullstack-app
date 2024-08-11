import {PostsListResponse, User, UsersListResponse} from "./types.ts";

export async function getUsers() {
  const response = await fetch("data/users.json");
  if (!response.ok) {
    console.error("Could not fetch users");
    return;
  }
  const usersListResponse = (await response.json()) as UsersListResponse;
  return usersListResponse.users;
}

export async function getPosts() {
  const response = await fetch("/api/posts");
  if (!response.ok) {
    console.error("Could not fetch posts");
    return;
  }
  const postsListResponse = (await response.json()) as PostsListResponse;
  return postsListResponse.posts;
}

export async function createPost(content: string, user: User) {
  const createPostRequest = {
    content,
    user
  };
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(createPostRequest)
  });
  if (!response.ok) {
    console.error(response.status + " " + response.statusText);
    return false;
  }
  return true;
}