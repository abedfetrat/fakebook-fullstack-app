import {Post, PostsListResponse, User} from "./types.ts";

export async function getPosts() {
  const response = await fetch("/api/posts");
  if (!response.ok) {
    console.error("Could not fetch posts:");
    console.error(response.status, response.statusText);
    return;
  }
  const postsListResponse = (await response.json()) as PostsListResponse;
  // Delaying return inorder to mimic actual network call
  return new Promise<Post[]>(resolve => {
    setTimeout(() => resolve(postsListResponse.posts), 1000);
  });
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
    console.error("Could not create post:");
    console.error(response.status, response.statusText);
    return false;
  }
  // Delaying return inorder to mimic real network call
  return new Promise<boolean>(resolve => {
    setTimeout(() => resolve(true), 1000);
  });
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
    console.error(`Could not update post '${id}'`)
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
    console.error(`Could not delete post '${id}'`)
    console.error(response.status, response.statusText);
    return false;
  }
  return true;
}