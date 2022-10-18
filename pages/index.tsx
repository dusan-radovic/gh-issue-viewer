import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Issues from "../components/Issues";
import { Issue } from "../models";
import githubService from "../services/github.service";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [userInput, setUserInput] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    per_page: 30,
  });

  const [sortParams, setSelectedSortParams] = useState({
    sort: "created",
    direction: "asc",
  });
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (userInput) {
      !loading && fetchIssues();
    }
  }, [pagination, sortParams]);

  const handleScroll = () => {
    const issuesList: any = document.querySelector(".issues-list");
    const lastChildLoaded: any = Array.from(
      issuesList.querySelectorAll(".issue")
    ).pop();
    if (lastChildLoaded) {
      const lastUserLoadedOffset =
        issuesList.offsetParent.offsetTop +
        lastChildLoaded.offsetTop +
        lastChildLoaded.clientHeight;
      const pageOffset = window.pageYOffset + window.innerHeight;
      if (lastUserLoadedOffset - pageOffset < 100 && !loading) {
        setPagination({
          ...pagination,
          page: pagination.page + 1,
        });
      }
    }
  };

  const handleInputChange = (event: any) => {
    setUserInput(event);
  };

  const fetchIssues = async () => {
    setLoading(true);
    try {
      const response: Issue[] = await githubService.fetchIssues(
        userInput,
        pagination,
        sortParams
      );
      console.log(response);
      pagination.page === 1
        ? setIssues(response)
        : setIssues([...issues, ...response]);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    resetPagination();
    setIssues([]);
    fetchIssues();
  };

  const resetPagination = () => {
    setPagination({
      page: 1,
      per_page: 30,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
        GitHub Issue Viewer
      </h2>
      <main className={styles.main}>
        <div className="search-box text-center">
          <Input
            onChange={handleInputChange}
            classes="w-[100%] min-w-[350px]"
            placeholder="example: vercel/next.js"
          />
          <Button
            text="Search"
            loading={loading}
            classes="mt-4"
            onClick={handleSearch}
          />
        </div>
        <div className="issues-list">
          <div className="sort-container flex gap-2 flex-end mt-2 justify-end">
            <div>
              <span> Sort by: </span>
              <select
                className="shadow p-2"
                name="sort"
                value={sortParams.sort}
                onChange={(event: any) =>
                  setSelectedSortParams({
                    ...sortParams,
                    sort: event.target.value,
                  })
                }
              >
                <option value="created">Created</option>
                <option value="updated">Updated</option>
              </select>
            </div>
            <div>
              <span>Direction: </span>
              <select
                className="shadow p-2"
                name="direction"
                value={sortParams.direction}
                onChange={(event: any) =>
                  setSelectedSortParams({
                    ...sortParams,
                    direction: event.target.value,
                  })
                }
              >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
            </div>
          </div>
          <Issues issues={issues} />
        </div>
      </main>
    </div>
  );
};

export default Home;
