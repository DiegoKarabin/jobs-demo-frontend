import { MouseEventHandler } from "react";

export default function PaginationButton({
  children,
  active = false,
  disabled,
  onClick,
}: {
  children: React.ReactNode,
  active?: boolean,
  disabled?: boolean,
  onClick?: MouseEventHandler<HTMLButtonElement>
}) {
  function dynamicClasses() {
    if (active) {
      return 'bg-violet-500 text-white hover:bg-violet-800 active:bg-violet-900';
    }

    if (disabled) {
      return 'bg-gray-200 text-gray-400 border-gray-100 cursor-not-allowed';
    }

    return 'bg-white text-black hover:bg-gray-200 active:bg-gray-300';
  }

  return (
    <button
      disabled={disabled}
      className={
        `w-12 h-12 text-center border border-gray-400/50 rounded-full cursor-pointer
        ${dynamicClasses()}`
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
