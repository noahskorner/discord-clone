/* eslint-disable no-unused-vars */
import { cloneElement } from 'react';

export enum IconSize {
  xs = 16,
  sm = 20,
  md = 24,
  lg = 28,
  xl = 32,
}

export interface IconProps {
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
}: IconWrapperProps) => {
  const iconStyle = {
    width: width ?? size,
    height: height ?? size,
    strokeWidth,
  };

  return <>{cloneElement(icon, { style: iconStyle })}</>;
};

export default Icon;
