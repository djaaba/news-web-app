import { TArticle } from '../../types';

export interface ArticleCardProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  article: TArticle;
}
