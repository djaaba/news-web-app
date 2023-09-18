import { TArticle } from '../../types';

export interface ArticleListProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  articles?: TArticle[];
}
