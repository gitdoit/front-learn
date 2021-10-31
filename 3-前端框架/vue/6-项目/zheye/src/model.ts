export interface UserProps{
  isLogin: boolean;
  userName?: string;
  id?: number;
  columnId?: number;
}

interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

/**
 * 文章
 */
export interface PostProps {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  image ?: ImageProps;
  createAt: string;
  topicId: number;
}

/**
 * 专栏
 */
export interface ColumnProps {
  _id: string;
  title: string;
  avatar ?: ImageProps;
  description: string;
}
