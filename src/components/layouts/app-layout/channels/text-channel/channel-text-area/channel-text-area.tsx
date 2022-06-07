import { KeyboardEventHandler } from 'react';

interface ChannelTextAreaProps {
  placeholder: string;
  value: string;
  // eslint-disable-next-line no-unused-vars
  onInput: (newValue: string) => void;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const ChannelTextArea = ({
  placeholder,
  value,
  onInput,
  onKeyDown,
}: ChannelTextAreaProps) => {
  return (
    <div className="mb-4 flex w-full shrink-0 items-center justify-center px-4">
      <div className="h-11 w-full rounded-md bg-slate-channel-text-area px-4">
        <input
          onKeyDown={onKeyDown}
          value={value}
          onInput={(e) => onInput((e.target as HTMLInputElement).value)}
          type="text"
          className="h-full w-full bg-slate-channel-text-area text-sm"
          placeholder={placeholder}
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default ChannelTextArea;
