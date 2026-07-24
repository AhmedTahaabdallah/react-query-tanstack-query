export async function fetchPosts({ queryKey }) {
  const [, pageNum] = queryKey;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum ?? 1}`
  );
  //throw new Error("You can't get this data")
  return response.json();
}

export async function fetchComments({ queryKey }) {
  const [, postId] = queryKey;
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

export async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

export async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}
