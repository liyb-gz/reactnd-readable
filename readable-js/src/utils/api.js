const url = 'http://localhost:3001';
export const getCategories = async (token) => {
    const response = await fetch(`${url}/categories`, {
        headers: { Authorization: token },
    });
    if (response.ok) {
        const { categories } = await response.json();
        return categories;
    }
    else {
        throw new Error('Fetch error');
    }
};
export const postComment = async (commentId, vote, token) => {
    const response = await fetch(`${url}/comments/${commentId}`, {
        headers: { Authorization: token, 'content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ option: vote }),
    });
    if (response.ok) {
        const comment = await response.json();
        return comment;
    }
    else {
        throw new Error('Fetch error');
    }
};
export const putComment = async (commentId, body, timestamp, token) => {
    const response = await fetch(`${url}/comments/${commentId}`, {
        headers: { Authorization: token, 'content-type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify({ body, timestamp }),
    });
    if (response.ok) {
        const comment = await response.json();
        return comment;
    }
    else {
        throw new Error('Fetch error');
    }
};
export const postNewComment = async (comment, token) => {
    const response = await fetch(`${url}/comments/`, {
        headers: { Authorization: token, 'content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(comment),
    });
    if (response.ok) {
        const comment = await response.json();
        return comment;
    }
    else {
        throw new Error('Fetch error');
    }
};
export const dropComment = async (commentId, token) => {
    const response = await fetch(`${url}/comments/${commentId}`, {
        headers: { Authorization: token, 'content-type': 'application/json' },
        method: 'DELETE',
    });
    if (response.ok) {
        const comment = await response.json();
        return comment;
    }
    else {
        throw new Error('Fetch error');
    }
};
export const getAllPosts = async (token) => {
    const response = await fetch(`${url}/posts`, {
        headers: { Authorization: token },
    });
    if (response.ok) {
        const posts = await response.json();
        return posts;
    }
    else {
        throw new Error('Fetch error');
    }
};
export const getPostsForCategory = async (categoryPath, token) => {
    const response = await fetch(`${url}/${categoryPath}/posts`, {
        headers: { Authorization: token },
    });
    if (response.ok) {
        const posts = await response.json();
        return posts;
    }
    else {
        throw new Error('Fetch error');
    }
};
export const postPost = async (postId, vote, token) => {
    const response = await fetch(`${url}/posts/${postId}`, {
        headers: { Authorization: token, 'content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ option: vote }),
    });
    if (response.ok) {
        const post = await response.json();
        return post;
    }
    else {
        throw new Error('Fetch error');
    }
};
export const putPost = async (postId, title, body, token) => {
    const response = await fetch(`${url}/posts/${postId}`, {
        headers: { Authorization: token, 'content-type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify({ title, body, token }),
    });
    if (response.ok) {
        const post = await response.json();
        return post;
    }
    else {
        throw new Error('Fetch error');
    }
};
export const postNewPost = async (post, token) => {
    const response = await fetch(`${url}/posts/`, {
        headers: { Authorization: token, 'content-type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(post),
    });
    if (response.ok) {
        const post = await response.json();
        return post;
    }
    else {
        throw new Error('Fetch error');
    }
};
export const dropPost = async (postId, token) => {
    const response = await fetch(`${url}/posts/${postId}`, {
        headers: { Authorization: token, 'content-type': 'application/json' },
        method: 'DELETE',
    });
    if (response.ok) {
        const post = await response.json();
        return post;
    }
    else {
        throw new Error('Fetch error');
    }
};
export const getCommentsForPost = async (postId, token) => {
    const response = await fetch(`${url}/posts/${postId}/comments`, {
        headers: { Authorization: token },
    });
    if (response.ok) {
        const comments = await response.json();
        return comments;
    }
    else {
        throw new Error('Fetch error');
    }
};
