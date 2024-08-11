import {Post as PostType, User} from "../types.ts";
import {getDaysAgo, getInitials} from "../utils.ts";
import Avatar from "./avatar.tsx";
import {deletePost, updatePost} from "../api.ts";
import {useState} from "react";

type PostProps = {
  post: PostType,
  user: User,
  onGetPosts: () => void,
}

function Post({post, user, onGetPosts}: PostProps) {
  const [postContent, setPostContent] = useState(post.content);

  const handleShowEditModal = () => {
    if (document) {
      (document.getElementById("edit-post-modal") as HTMLFormElement).showModal();
    }
  }

  const handleDelete = async () => {
    const deleted = await deletePost(post.id);
    if (deleted) {
      onGetPosts();
    }
  };

  const handleSave = async () => {
    const saved = await updatePost(post.id, postContent);
    if (saved) {
      onGetPosts();
    }
  };

  const handleDiscard = () => {
    setPostContent(post.content);
  }

  return (
    <>
      <div className="card bg-base-100 w-100 shadow-lg">
        <div className="card-body">
          <div className="flex gap-4 mb-4 items-start">
            <Avatar initials={getInitials(post.author.firstName, post.author.lastName)}/>
            <div>
              <p className="font-medium">{post.author.firstName} {post.author.lastName}</p>
              <p className="text-sm text-neutral-500">{getDaysAgo(post.postedAt)}</p>
            </div>
            {(post.author.uid == user.uid) &&
              <div className="dropdown ml-auto">
                <div tabIndex={0} role="button" className="btn btn-ghost m-1"><Kebab/></div>
                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                  <li>
                    <button onClick={handleShowEditModal}>Edit</button>
                    <button className="text-error" onClick={handleDelete}>Delete
                    </button>
                  </li>
                </ul>
              </div>}
          </div>
          <p className="text-neutral-600">{post.content}</p>
          <div className="card-actions mt-4 gap-8 text-neutral-500">
            <div className="flex gap-2">
              <ThumbsUp/> <span className="text-neutral-700 font-medium">{post.likes}</span>
            </div>
            <div className="flex gap-2 font-medium">
              <ThumbsDown/> <span className="text-neutral-700 font-medium">{post.dislikes}</span>
            </div>
            <div className="flex gap-2 font-medium">
              <Comment/> <span className="text-neutral-700 font-medium">{0}</span>
            </div>
          </div>
        </div>
      </div>
      <dialog id="edit-post-modal" className="modal">
        <div className="modal-box">
            <textarea className="w-full" placeholder="Type something nice..."
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}/>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-primary text-white" onClick={handleSave}>Save</button>
              <button className="btn ml-2" onClick={handleDiscard}>Discard</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

function Kebab() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
         className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
      <path
        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
    </svg>
  );
}

function ThumbsUp() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width="20"
         height="20"
         fill="currentColor"
         viewBox="0 0 512 512">
      <path
        d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z"/>
    </svg>
  );
}

function ThumbsDown() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width="20"
         height="20"
         fill="currentColor"
         viewBox="0 0 512 512">
      <path
        d="M323.8 477.2c-38.2 10.9-78.1-11.2-89-49.4l-5.7-20c-3.7-13-10.4-25-19.5-35l-51.3-56.4c-8.9-9.8-8.2-25 1.6-33.9s25-8.2 33.9 1.6l51.3 56.4c14.1 15.5 24.4 34 30.1 54.1l5.7 20c3.6 12.7 16.9 20.1 29.7 16.5s20.1-16.9 16.5-29.7l-5.7-20c-5.7-19.9-14.7-38.7-26.6-55.5c-5.2-7.3-5.8-16.9-1.7-24.9s12.3-13 21.3-13L448 288c8.8 0 16-7.2 16-16c0-6.8-4.3-12.7-10.4-15c-7.4-2.8-13-9-14.9-16.7s.1-15.8 5.3-21.7c2.5-2.8 4-6.5 4-10.6c0-7.8-5.6-14.3-13-15.7c-8.2-1.6-15.1-7.3-18-15.2s-1.6-16.7 3.6-23.3c2.1-2.7 3.4-6.1 3.4-9.9c0-6.7-4.2-12.6-10.2-14.9c-11.5-4.5-17.7-16.9-14.4-28.8c.4-1.3 .6-2.8 .6-4.3c0-8.8-7.2-16-16-16l-97.5 0c-12.6 0-25 3.7-35.5 10.7l-61.7 41.1c-11 7.4-25.9 4.4-33.3-6.7s-4.4-25.9 6.7-33.3l61.7-41.1c18.4-12.3 40-18.8 62.1-18.8L384 32c34.7 0 62.9 27.6 64 62c14.6 11.7 24 29.7 24 50c0 4.5-.5 8.8-1.3 13c15.4 11.7 25.3 30.2 25.3 51c0 6.5-1 12.8-2.8 18.7C504.8 238.3 512 254.3 512 272c0 35.3-28.6 64-64 64l-92.3 0c4.7 10.4 8.7 21.2 11.8 32.2l5.7 20c10.9 38.2-11.2 78.1-49.4 89zM32 384c-17.7 0-32-14.3-32-32L0 128c0-17.7 14.3-32 32-32l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0z"/>
    </svg>
  );
}

function Comment() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width="20"
         height="20"
         fill="currentColor"
         viewBox="0 0 512 512">
      <path
        d="M123.6 391.3c12.9-9.4 29.6-11.8 44.6-6.4c26.5 9.6 56.2 15.1 87.8 15.1c124.7 0 208-80.5 208-160s-83.3-160-208-160S48 160.5 48 240c0 32 12.4 62.8 35.7 89.2c8.6 9.7 12.8 22.5 11.8 35.5c-1.4 18.1-5.7 34.7-11.3 49.4c17-7.9 31.1-16.7 39.4-22.7zM21.2 431.9c1.8-2.7 3.5-5.4 5.1-8.1c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208s-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6c-15.1 6.6-32.3 12.6-50.1 16.1c-.8 .2-1.6 .3-2.4 .5c-4.4 .8-8.7 1.5-13.2 1.9c-.2 0-.5 .1-.7 .1c-5.1 .5-10.2 .8-15.3 .8c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c4.1-4.2 7.8-8.7 11.3-13.5c1.7-2.3 3.3-4.6 4.8-6.9l.3-.5z"/>
    </svg>
  );
}

export default Post;