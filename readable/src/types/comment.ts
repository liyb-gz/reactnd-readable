export interface CommentProps {
  id: string;
  parentId: string;
  timestamp: number;
  body: string;
  author: string;
  voteScore: number;
  deleted: boolean;
  parentDeleted: boolean;
}
