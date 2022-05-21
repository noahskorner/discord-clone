import { cloneElement } from 'react';
import IconSize from '../../utils/enums/icon-size';
export interface IconProps {
  className?: string;
  size?: IconSize;
  width?: number | string;
  height?: number | string;
  strokeWidth?: number | string;
}

interface IconWrapperProps extends IconProps {
  icon: JSX.Element;
}

const Icon = ({
  size = IconSize.md,
  strokeWidth = 2,
  icon,
  width,
  height,
  className,
}: IconWrapperProps) => {
  const iconStyle = {
    width: width ?? size,
    height: height ?? size,
    strokeWidth,
  };

  return <>{cloneElement(icon, { style: iconStyle, className: className })}</>;
};

export default Icon;
