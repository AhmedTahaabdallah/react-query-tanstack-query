import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation, updateMutation }) {

  const postId = post?.id;

  const {
  data: commentsData,
  isLoading: isLoadingComments,
  isError: isErrorComments,
  error: errorComments,
} = useQuery({
  queryKey: ['post-comments', postId],
  queryFn: fetchComments,
  enabled: !!postId,
});

  

  const commentsArea = isLoadingComments ? <h3>Loading Comments......</h3>
    : isErrorComments ? <h3>Error : {errorComments.toString()}</h3>
    : commentsData.map((comment) => (
      <li key={comment.id}>
        {comment.email}: {comment.body}
      </li>
    ));

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => {
          updateMutation.reset();
          deleteMutation.mutate(postId);
        }}>Delete</button> 
        <button onClick={() => {
          deleteMutation.reset();
          updateMutation.mutate(postId);
        }}>Update title</button>
        {
          deleteMutation.isPending &&
          <p className="loading">Deleting the post....</p>
        }
        {
          deleteMutation.isError &&
          <p className="error">Error deleting the post: {deleteMutation.error.toString()}</p>
        }
        {
          deleteMutation.isSuccess &&
          <p className="success">Post as (not) deleted</p>
        }
        {
          updateMutation.isPending &&
          <p className="loading">updateing the post....</p>
        }
        {
          updateMutation.isError &&
          <p className="error">Error updateing the post: {updateMutation.error.toString()}</p>
        }
        {
          updateMutation.isSuccess &&
          <p className="success">Post as (not) update</p>
        }
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {
        commentsArea
      }
    </>
  );
}
