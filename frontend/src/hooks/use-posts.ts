import {Post, PostsListResponse, User} from "../types.ts";
import useAuthenticatedFetch from "./use-auth-fetch.ts";

function usePosts() {
  const authenticatedFetch = useAuthenticatedFetch();
  const getPosts = async (isFirstLoad: boolean = false) => {
    const response = await authenticatedFetch("/api/posts");
    if (!response.ok) {
      console.error("Could not fetch posts:");
      console.error(response.status, response.statusText);
      return;
    }
    const postsListResponse = (await response.json()) as PostsListResponse;
    // Delaying return inorder to mimic actual network call
    if (isFirstLoad) {
      return new Promise<Post[]>(resolve => {
        setTimeout(() => resolve(postsListResponse.posts), 1000);
      });
    }
    return postsListResponse.posts;
  }

  const createPost = async (content: string, user: User) => {
    const createPostRequest = {
      content,
      user
    };
    const response = await authenticatedFetch("/api/posts", {
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

  const updatePost = async (id: string, newContent: string) => {
    const response = await authenticatedFetch(`/api/posts/${id}`, {
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

  const deletePost = async (id: string) => {
    const response = await authenticatedFetch(`/api/posts/${id}`, {
      method: "DELETE"
    });
    if (!response.ok) {
      console.error(`Could not delete post '${id}'`)
      console.error(response.status, response.statusText);
      return false;
    }
    return true;
  }

  return {getPosts, createPost, updatePost, deletePost} as const;
}

export default usePosts;