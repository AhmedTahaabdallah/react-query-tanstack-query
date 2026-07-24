import { useEffect, useState } from "react";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const maxPostPaga = 10;
  const queryClient = useQueryClient();

  useEffect(() => {
    if(currentPage < maxPostPaga) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['posts', nextPage],
        queryFn: fetchPosts,
      });
    }
  }, [currentPage, queryClient]);

  const deleteMutation = useMutation({
    mutationFn: postId => deletePost(postId)
  });

  const updateMutation = useMutation({
    mutationFn: postId => updatePost(postId)
  });

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: fetchPosts,
    staleTime: 2000,
    enabled: !!currentPage
  });

  if (isLoading) return <h3>Loading......</h3>;
  //if (isFetching) return <h3>Fetching......</h3>;
  
  if (isError) return <h3>Error : {error.toString()}</h3>;
console.log('de : ', deleteMutation.status)
  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => {
              updateMutation.reset();
              deleteMutation.reset();
              setSelectedPost(post);
            }}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button disabled={currentPage >= maxPostPaga} onClick={() => setCurrentPage(currentPage + 1)}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} deleteMutation={deleteMutation} updateMutation={updateMutation}/>}
    </>
  );
}
