import { FC, ReactNode } from "react";

interface TooltipProps {
  text: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ children, text }) => {
  return (
    <div className="relative group inline-flex items-center justify-center">
      <div className="transition-all opacity-0 left-auto group-hover:opacity-100 absolute bottom-0 group-hover:bottom-full">
        <div className="whitespace-nowrap bg-slate-100 text-xs py-1.5 px-3 rounded-lg shadow">
          {text}
        </div>
        <div className="flex items-center justify-center fill-current text-slate-100">
          <svg width="10" height="10" viewBox="0 0 10 10">
            <polygon points="0,0 5,5 10,0" />
          </svg>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
