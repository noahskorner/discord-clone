/* eslint-disable no-unused-vars */
import { cloneElement } from 'react';

export enum IconSize {
  xs = 12,
  sm = 16,
  md = 20,
  lg = 24,
  xl = 28,
  '2xl' = 32,
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
