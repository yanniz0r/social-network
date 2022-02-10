import classNames from "classnames";
import Link from "next/link";
import { FC, useState } from "react";
import { FaSpinner, FaTimes, FaUserSlash } from "react-icons/fa";
import { useSearchQuery } from "../graphql/generated";
import Avatar from "./avatar";

interface SearchProps {}

const Search: FC<SearchProps> = (props) => {
  const [query, setQuery] = useState("");
  const searchQuery = useSearchQuery({
    variables: {
      query,
    },
  });

  const showResults = Boolean(query);

  function clear() {
    setQuery("");
  }

  const containerClassName = classNames("rounded-t-lg p-1 bg-opacity-70", {
    "bg-white": showResults,
  });

  const clearButtonClassName = classNames(
    "absolute h-full px-3 right-0 top-0 transition-all transform scale-0 opacity-0 text-slate-400",
    {
      "scale-100 opacity-100": showResults,
    }
  );

  return (
    <div className="rounded-lg relative">
      <div className={containerClassName}>
        <div className="relative">
          <input
            placeholder="Suchen"
            className="bg-slate-600 px-3 py-2 text-md rounded-lg w-full block text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={clearButtonClassName} onClick={clear}>
            <FaTimes />
          </button>
        </div>
      </div>
      {showResults && (
        <div className="absolute bg-white bg-opacity-70 w-full rounded-b-lg p-1">
          <div>
            {searchQuery.loading && (
              <div className="flex flex-col items-center justify-center p-5 text-slate-500">
                <FaSpinner className="animate-spin" />
                <p className="mt-2 uppercase font-semibold text-xs">
                  Suche Personen...
                </p>
              </div>
            )}
            {searchQuery.data?.searchUsers && (
              <>
                {searchQuery.data.searchUsers.length > 0 ? (
                  <ul>
                    {searchQuery.data?.searchUsers.map((user) => (
                      <li key={user.id}>
                        <Link passHref href={`/profile/${user.id}`}>
                          <a
                            className="flex items-center px-2 py-2"
                            onClick={clear}
                          >
                            <Avatar
                              name={user.name}
                              imageURL={user.avatarURL ?? undefined}
                              size="md"
                            />
                            <div className="ml-2">
                              <span className="font-bold block text-slate-800">
                                {user.name}
                              </span>
                              <span className="text-slate-600 text-sm block">
                                {user.birthday}
                              </span>
                            </div>
                          </a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center p-5 text-slate-500">
                    <FaUserSlash />
                    <p className="mt-2 uppercase font-semibold text-xs">
                      Keine passenden Personen gefunden
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
