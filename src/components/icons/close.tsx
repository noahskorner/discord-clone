import Icon, { IconProps } from './icon';

const CloseIcon = (props: IconProps) => {
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      }
    />
  );
};

export default CloseIcon;
