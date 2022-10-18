import moment from "moment";
import { Issue } from "../models";

const Issues: React.FC<{ issues?: Issue[] }> = ({ issues }) => {
  return (
    <div className="issues-list mt-10 b-4 w-[100%] min-h-[200px] grid grid-flow-row grid-flow-col-1 gap-4">
      {issues &&
        issues.map((issue: Issue, index: number) => (
          <div
            key={index}
            className="issue border border-grey p-4 rounded shadow"
          >
            <div className="">
              <div className="mb-8">
                <div className="text-gray-900 font-bold text-xl mb-2">
                  {issue.title}
                </div>
                <p className="text-gray-700 text-base">
                  <a
                    href={issue.html_url}
                    className="text-blue-400"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {issue.html_url}
                  </a>
                </p>
              </div>
              <div className="flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={issue.user.avatar_url}
                  alt="Avatar"
                />
                <div className="text-sm">
                  <p className="text-gray-900">{issue.user.login}</p>
                  <p className="text-gray-600">{`Created: ${moment(
                    issue.created_at
                  ).format("MM-DD-YYYY HH:mm")}`}</p>
                  <p className="text-gray-600">{`Last Updated: ${moment(
                    issue.updated_at
                  ).format("MM-DD-YYYY HH:mm")}`}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Issues;
