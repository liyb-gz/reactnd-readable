export interface PostProps {
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
