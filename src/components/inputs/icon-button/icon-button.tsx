import { MouseEventHandler } from 'react';

interface IconButtonProps {
  children: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const IconButton = ({ children, onClick = () => {} }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center p-1 hover:bg-slate-700 rounded-md text-slate-300"
    >
      {children}
    </button>
  );
};

export default IconButton;
