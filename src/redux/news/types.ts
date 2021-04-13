export interface NewsHeadline {
  main: string;
}

export interface News {
  _id: string;
  headline: NewsHeadline;
  web_url: string;
  abstract: string;
}

export interface NewsState {
  loading: boolean;
  error: boolean
  news: Array<News>;
  page: number;
  filter: string;
}