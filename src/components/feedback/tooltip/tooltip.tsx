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
      className="relative w-12 h-12 flex items-center justify-center"
    >
      {children}
      <CSSTransition
        in={showTooltip}
        timeout={200}
        classNames="fade-in"
        unmountOnExit
      >
        <div
          className={`${TOOLTIP_CLASSES[direction]} absolute flex items-center ml-4`}
        >
          <div className={`arrow-${direction} border-black/80`}></div>
          <div className="relative bg-black/80 text-white font-bold text-center py-1 px-2 rounded-md whitespace-nowrap">
            {text}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Tooltip;
