import { Issue } from "../models";
import { http } from "../utils/http";

class GithubService {
  fetchIssues = async (
    repo: string,
    pagination: { page: number; per_page: number },
    sortParams: { sort: string; direction: string }
  ) =>
    http<Issue[]>({
      url: `https://api.github.com/repos/${repo}/issues`,
      method: "get",
      queryParams: {
        ...pagination,
        ...sortParams,
      },
    });
}

export default new GithubService();
