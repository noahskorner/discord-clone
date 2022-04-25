import Icon, { IconProps } from './icon';

const PlusIcon = (props: IconProps) => {
  return (
    <Icon
      {...props}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      }
    />
  );
};

export default PlusIcon;
