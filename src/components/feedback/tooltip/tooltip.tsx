import { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

interface TooltipProps {
  text: string | JSX.Element;
  children: JSX.Element;
  direction: 'top' | 'left' | 'bottom' | 'right';
}

const TOOLTIP_CLASSES = {
  top: 'top-full flex-col',
  left: 'left-full flex-row',
  bottom: 'bottom-full flex-col-reverse',
  right: 'right-full flex-row-reverse',
};

const Tooltip = ({ text, children, direction }: TooltipProps) => {
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
      className="relative flex h-12 w-12 items-center justify-center"
    >
      {children}
      <CSSTransition
        in={showTooltip}
        timeout={200}
        classNames="fade-in"
        unmountOnExit
      >
        <div
          className={`${TOOLTIP_CLASSES[direction]} absolute ml-4 flex items-center`}
        >
          <div className={`arrow-${direction} border-black/70`}></div>
          <div className="relative whitespace-nowrap rounded-md bg-black/70 p-2 text-center text-sm font-semibold text-white">
            {text}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Tooltip;
