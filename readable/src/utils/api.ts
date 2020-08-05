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
    const posts = await response.json();
    console.log('response json', posts);
    return posts;
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
