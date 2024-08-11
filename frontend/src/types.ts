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
  postedAt: string,
}

export interface PostsListResponse {
  posts: Post[]
}