export interface Issue {
  title: string;
  html_url: string;
  updated_at: string;
  user: IssueUser;
  created_at: string;
}

export interface IssueUser {
  login: string;
  id: number;
  avatar_url: string;
}
