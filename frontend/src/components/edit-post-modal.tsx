import {useState} from "react";
import {updatePost} from "../api.ts";

type EditPostModalProps = {
  postId: string,
  originalPostContent: string,
  onGetPosts: () => void
};

function EditPostModal({postId, originalPostContent, onGetPosts}: EditPostModalProps) {
  const [editedPostContent, setEditedPostContent] = useState(originalPostContent);

  const handleSave = async () => {
    const saved = await updatePost(postId, editedPostContent);
    if (saved) {
      onGetPosts();
    }
  };

  const handleDiscard = () => {
    setEditedPostContent(originalPostContent);
  }

  return (
    <dialog id="edit-post-modal" className="modal">
      <div className="modal-box">
            <textarea
              className="w-full"
              placeholder="Type something nice..."
              value={editedPostContent}
              onChange={(e) => setEditedPostContent(e.target.value)}/>
        <div className="modal-action">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary text-white" onClick={handleSave}>Save</button>
            <button className="btn ml-2" onClick={handleDiscard}>Discard</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default EditPostModal;