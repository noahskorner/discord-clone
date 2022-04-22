import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

interface TooltipProps {
  text: string | JSX.Element;
  children: JSX.Element;
  direction: 'top' | 'left' | 'bottom' | 'right';
  size?: 'sm' | 'md';
}

const TOOLTIP_DIRECTION_CLASSES = {
  top: 'bottom-full flex-col-reverse',
  left: 'ml-4 left-full flex-row',
  bottom: 'top-full flex-col',
  right: 'right-full flex-row-reverse',
};

const TOOLTIP_SIZE_CLASSES = {
  sm: 'text-xs',
  md: 'text-sm',
};

const Tooltip = ({ text, children, direction, size = 'md' }: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleTooltipMouseOver = () => {
    setShowTooltip(true);
  };

  const handleTooltopMouseLeave = () => {
    setShowTooltip(false);
  };

  return (
    <div
      onMouseOver={handleTooltipMouseOver}
      onMouseLeave={handleTooltopMouseLeave}
      className="relative z-50 flex items-center justify-center"
    >
      {children}
      <CSSTransition
        in={showTooltip}
        timeout={200}
        classNames="fade-in"
        unmountOnExit
      >
        <div
          className={`${TOOLTIP_DIRECTION_CLASSES[direction]} absolute flex items-center`}
        >
          <div className={`arrow-${direction} border-black/70`}></div>
          <div
            className={`${TOOLTIP_SIZE_CLASSES[size]} relative whitespace-nowrap rounded-md bg-black/90 p-2 text-center  font-semibold text-white`}
          >
            {text}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Tooltip;
