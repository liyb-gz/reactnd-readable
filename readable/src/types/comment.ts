// How we store a comment
export interface CommentProps {
  id: string;
  parentId: string;
  timestamp: number;
  body: string;
  author: string;
  voteScore: number;
}

// How a comment is given from server
export interface CommentFromAPI {
  id: string;
  parentId: string;
  timestamp: number;
  body: string;
  author: string;
  voteScore: number;
  deleted: boolean;
  parentDeleted: boolean;
}

// How we send a comment to server
export interface CommentToAPI {
  id: string;
  parentId: string;
  timestamp: number;
  body: string;
  author: string;
}
