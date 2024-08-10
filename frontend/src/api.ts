export interface User {
  uid: string,
  firstName: string,
  lastName: string,
  email: string
}

export interface UsersListResponse {
  users: User[]
}

export interface Author {
  uid: string,
  firstName: string,
  lastName: string
}

export interface Post {
  id: string,
  author: Author,
  content: string,
  likes: number,
  dislikes: number,
  postedAt: Date,
}

export interface PostsListResponse {
  posts: Post[]
}

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
  const response = await fetch("data/posts.json");
  if (!response.ok) {
    console.error("Could not fetch posts");
    return;
  }
  const postsListResponse = (await response.json()) as PostsListResponse;
  return postsListResponse.posts;
}