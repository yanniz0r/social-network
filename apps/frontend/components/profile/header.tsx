import classNames from "classnames";
import { FC, ReactNode, useEffect, useRef, useState } from "react";
import { FaUser, FaUserPlus } from "react-icons/fa";
import { User } from "../../graphql/generated";
import IconButton from "../icon-button";

interface ProfileHeaderProps {
  user: Pick<User, "avatarURL" | "name">;
  actions?: ReactNode;
}

const ProfileHeader: FC<ProfileHeaderProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      const clientRect = containerRef.current?.getBoundingClientRect();

      if (clientRect) {
        setOverflowing(clientRect.top <= 64); // TODO make independant of navigation height
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const avatarClassName = classNames(
    "absolute bg-teal-500 border-4 border-slate-50 dark:border-slate-800 rounded-full transition-all overflow-hidden flex items-center justify-center text-3xl",
    {
      "h-14 w-20 h-20 top-4": overflowing,
      "w-52 h-52 -top-full": !overflowing,
      "bg-center bg-cover": props.user.avatarURL,
    }
  );

  const containerClassName = classNames(
    "px-10 top-[64px] flex flex-col sm:flex-row gap-5 sm:h-28 bg-white shadow-sm dark:bg-slate-800 sticky z-10 top-0 transition-all",
    {
      "bg-opacity-75 shadow-xl backdrop-blur-sm": overflowing,
    }
  );

  return (
    <div className={containerClassName} ref={containerRef}>
      <div className="w-full h-28 sm:h-auto sm:w-5/12 md:w-4/12 lg:w-3/12 flex relative justify-center items-center">
        <div
          className={avatarClassName}
          style={{
            backgroundImage: props.user.avatarURL
              ? `url(${props.user.avatarURL})`
              : undefined,
          }}
        >
          {!props.user.avatarURL && <FaUser />}
        </div>
      </div>
      <div className="sm:w-7/12 md:w-8/12 lg:w-9/12 flex items-center">
        <div className="flex-grow">
          <h1 className="text-3xl dark:text-white text-center sm:text-left p-5 sm:p-0">{props.user.name}</h1>
        </div>
        <div>{props.actions}</div>
      </div>
    </div>
  );
};

export default ProfileHeader;
