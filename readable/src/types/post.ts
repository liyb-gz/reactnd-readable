// How we store a post
export interface PostProps {
  id: string;
  title: string;
  timestamp: number;
  body: string;
  author: string;
  category: string;
  voteScore: number;
  comments: string[];
}

// How a post is given from server
export interface PostFromAPI {
  id: string;
  title: string;
  timestamp: number;
  body: string;
  author: string;
  category: string;
  voteScore: number;
  deleted: boolean;
  commentCount: number;
}
