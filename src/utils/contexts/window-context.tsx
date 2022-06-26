import { createContext, useEffect, useState } from 'react';

interface WindowContextInterface {
  height?: number;
  width?: number;
  heightStyle: string;
  widthStyle: string;
  isMobileWidth: boolean;
}

const defaultValues = {
  height: undefined,
  width: undefined,
  heightStyle: '',
  widthStyle: '',
  isMobileWidth: false,
};

export const WindowContext =
  createContext<WindowContextInterface>(defaultValues);

interface WindowProviderInterface {
  children: JSX.Element;
}

export const WindowProvider = ({ children }: WindowProviderInterface) => {
  const [windowSize, setWindowSize] = useState<{
    width: number | undefined;
    height: number | undefined;
  }>({
    width: undefined,
    height: undefined,
  });
  const heightStyle =
    windowSize.height != null ? `${windowSize.height}px` : '100%';
  const widthStyle =
    windowSize.width != null ? `${windowSize.width}px` : '100%';
  const isMobileWidth = windowSize.width != null && windowSize.width <= 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <WindowContext.Provider
      value={{
        height: windowSize.height,
        width: windowSize.width,
        heightStyle: heightStyle,
        widthStyle: widthStyle,
        isMobileWidth,
      }}
    >
      {children}
    </WindowContext.Provider>
  );
};
