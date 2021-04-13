export interface NewsHeadline {
  main: string;
}

export interface NewsMultimedia {
  subtype: string;
  url: string;
}

export interface News {
  _id: string;
  headline: NewsHeadline;
  web_url: string;
  abstract: string;
  multimedia: Array<NewsMultimedia>;
}

export interface NewsState {
  loading: boolean;
  error: boolean
  news: Array<News>;
  page: number;
  filter: string;
}