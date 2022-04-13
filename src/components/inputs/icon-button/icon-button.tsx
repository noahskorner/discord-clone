interface IconButtonProps {
  icon: JSX.Element;
}

const IconButton = ({ icon }: IconButtonProps) => {
  return (
    <button className="flex justify-center items-center p-1 hover:bg-slate-700 rounded-md">
      {icon}
    </button>
  );
};

export default IconButton;
