import { PostToAPI } from '../types/post';
import { CommentToAPI } from '../types/comment';

const url = 'http://localhost:3001';

export const getCategories = async (token: string) => {
  const response = await fetch(`${url}/categories`, {
    headers: { Authorization: token },
  });
  if (response.ok) {
    const { categories } = await response.json();
    return categories;
  } else {
    throw new Error('Fetch error');
  }
};

export const postComment = async (
  commentId: string,
  vote: 'upVote' | 'downVote',
  token: string
) => {
  const response = await fetch(`${url}/comments/${commentId}`, {
    headers: { Authorization: token, 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ option: vote }),
  });
  if (response.ok) {
    const comment = await response.json();
    return comment;
  } else {
    throw new Error('Fetch error');
  }
};

export const putComment = async (
  commentId: string,
  body: string,
  timestamp: number,
  token: string
) => {
  const response = await fetch(`${url}/comments/${commentId}`, {
    headers: { Authorization: token, 'content-type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify({ body, timestamp }),
  });
  if (response.ok) {
    const comment = await response.json();
    return comment;
  } else {
    throw new Error('Fetch error');
  }
};

export const postNewComment = async (comment: CommentToAPI, token: string) => {
  const response = await fetch(`${url}/comments/`, {
    headers: { Authorization: token, 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(comment),
  });
  if (response.ok) {
    const comment = await response.json();
    return comment;
  } else {
    throw new Error('Fetch error');
  }
};

export const dropComment = async (commentId: string, token: string) => {
  const response = await fetch(`${url}/comments/${commentId}`, {
    headers: { Authorization: token, 'content-type': 'application/json' },
    method: 'DELETE',
  });
  if (response.ok) {
    const comment = await response.json();
    return comment;
  } else {
    throw new Error('Fetch error');
  }
};

export const getAllPosts = async (token: string) => {
  const response = await fetch(`${url}/posts`, {
    headers: { Authorization: token },
  });
  if (response.ok) {
    const posts = await response.json();
    return posts;
  } else {
    throw new Error('Fetch error');
  }
};

export const getPostsForCategory = async (
  categoryPath: string,
  token: string
) => {
  const response = await fetch(`${url}/${categoryPath}/posts`, {
    headers: { Authorization: token },
  });
  if (response.ok) {
    const posts = await response.json();
    return posts;
  } else {
    throw new Error('Fetch error');
  }
};

export const postPost = async (
  postId: string,
  vote: 'upVote' | 'downVote',
  token: string
) => {
  const response = await fetch(`${url}/posts/${postId}`, {
    headers: { Authorization: token, 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify({ option: vote }),
  });
  if (response.ok) {
    const post = await response.json();
    return post;
  } else {
    throw new Error('Fetch error');
  }
};

export const putPost = async (
  postId: string,
  title: string,
  body: string,
  token: string
) => {
  const response = await fetch(`${url}/posts/${postId}`, {
    headers: { Authorization: token, 'content-type': 'application/json' },
    method: 'PUT',
    body: JSON.stringify({ title, body, token }),
  });
  if (response.ok) {
    const post = await response.json();
    return post;
  } else {
    throw new Error('Fetch error');
  }
};

export const postNewPost = async (post: PostToAPI, token: string) => {
  const response = await fetch(`${url}/posts/`, {
    headers: { Authorization: token, 'content-type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(post),
  });
  if (response.ok) {
    const post = await response.json();
    return post;
  } else {
    throw new Error('Fetch error');
  }
};

export const dropPost = async (postId: string, token: string) => {
  const response = await fetch(`${url}/posts/${postId}`, {
    headers: { Authorization: token, 'content-type': 'application/json' },
    method: 'DELETE',
  });
  if (response.ok) {
    const post = await response.json();
    return post;
  } else {
    throw new Error('Fetch error');
  }
};

export const getCommentsForPost = async (postId: string, token: string) => {
  const response = await fetch(`${url}/posts/${postId}/comments`, {
    headers: { Authorization: token },
  });
  if (response.ok) {
    const comments = await response.json();
    return comments;
  } else {
    throw new Error('Fetch error');
  }
};
