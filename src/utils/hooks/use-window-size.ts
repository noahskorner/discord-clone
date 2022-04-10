import { useState, useEffect } from 'react';

const useWindowSize = () => {
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
  const isMobileWidth = windowSize.width && windowSize.width <= 768;

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

  return {
    height: windowSize.height,
    width: windowSize.width,
    heightStyle: heightStyle,
    widthStyle: widthStyle,
    isMobileWidth,
  };
};

export default useWindowSize;
