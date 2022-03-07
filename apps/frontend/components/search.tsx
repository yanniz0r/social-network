import classNames from "classnames";
import Link from "next/link";
import { FC, useState } from "react";
import { FaSearch, FaSpinner, FaTimes, FaUserSlash } from "react-icons/fa";
import { useSearchQuery } from "../graphql/generated";
import Avatar from "./avatar";
import Modal, { ModalContent } from "./modal";

interface SearchProps {
  open: boolean
  onClose(): void
}

const Search: FC<SearchProps> = (props) => {
  const [query, setQuery] = useState("");
  const searchQuery = useSearchQuery({
    variables: {
      query,
    },
  });

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <ModalContent>
        <div className="flex items-center border-b border-slate-200 dark:border-slate-600">
          <div className="pl-5 text-slate-600 dark:text-slate-400">
            <FaSearch />
          </div>
          <input onChange={e => setQuery(e.target.value)} type="text" className="w-full px-5 py-3 focus:outline-none bg-transparent dark:text-slate-100" placeholder="Suchbegriff eingeben" />
        </div>
        {searchQuery.loading &&
          <div className="p-5 flex items-center justify-center gap-2 flex-col">
            <FaSpinner className="text-2xl animate-spin text-slate-600 dark:text-slate-400" />
            <p className="dark:text-slate-200">
              Suche...
            </p>
          </div>
        }
        {!(searchQuery.data?.searchUsers.length) && !searchQuery.loading &&
          <div className="p-5 flex items-center justify-center gap-2 flex-col">
            <FaUserSlash className="text-2xl text-slate-600 dark:text-slate-400" />
            <p className="dark:text-slate-200">
              Leider haben wir nichts gefunden 😮‍💨
            </p>
          </div>
        }
        {searchQuery.data?.searchUsers && searchQuery.data.searchUsers.length !== 0 &&
          <>
            <div className="px-5 pb-2.5 pt-5 font-semibold border-b border-slate-100 dark:border-slate-700 dark:text-slate-100">
              Personen
            </div>
            <ul className="divide-y divide-slate-100 dark:divide-slate-700 dark:text-slate-200">
              {searchQuery.data.searchUsers.map(foundUser => (
                <li key={foundUser.id}>
                  <Link href={`/profile/${foundUser.id}`}>
                    <a className="px-5 py-2.5 flex items-center gap-2.5">
                      <Avatar name={foundUser.name} size="md" />
                      <span>
                        {foundUser.name}
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        }
      </ModalContent>
    </Modal>
  );
};

export default Search;
