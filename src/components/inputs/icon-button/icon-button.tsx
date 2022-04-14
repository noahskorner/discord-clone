import { MouseEventHandler } from 'react';

interface IconButtonProps {
  children: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const IconButton = ({ children, onClick = () => {} }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-md p-1 text-slate-300 hover:bg-slate-700"
    >
      {children}
    </button>
  );
};

export default IconButton;
