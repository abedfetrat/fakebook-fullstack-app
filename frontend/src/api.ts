import {PostsListResponse, User} from "./types.ts";

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

export async function updatePost(id: string, newContent: string) {
  const response = await fetch(`/api/posts/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify({content: newContent})
  });
  if (!response.ok) {
    console.error(response.status, response.statusText);
    return false;
  }
  return true;
}

export async function deletePost(id: string) {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) {
    console.error(response.status, response.statusText);
    return false;
  }
  return true;
}