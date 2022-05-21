import { useRef, useState } from 'react';
import InputProps from '../../../utils/types/props/input';
import Errors from '../errors';
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeOffIcon,
  IconSize,
} from '../../icons';

interface TextFieldProps extends InputProps {
  value?: string | number;
  onInput?: Function;
  type?: 'text' | 'password' | 'textarea';
  icon?: JSX.Element;
  color?: 'primary' | 'secondary';
  trailingIcon?: JSX.Element;
}

const TEXT_FIELD_CLASSES = {
  primary: 'bg-white dark:bg-slate-900',
  secondary: 'bg-slate-50 dark:bg-slate-700',
};

const TextField = ({
  value,
  onInput = () => {},
  type = 'text',
  label,
  placeholder,
  errors = [],
  icon,
  color = 'primary',
  trailingIcon,
}: TextFieldProps) => {
  const textFieldRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full space-y-1 text-sm">
      {label && (
        <label
          htmlFor=""
          className="text-xs font-semibold uppercase text-slate-300"
        >
          {label}
        </label>
      )}
      {/* Text Field */}
      <div
        className={`${
          errors.length
            ? 'ring-1 ring-red-500'
            : isFocused
            ? 'ring-1 ring-indigo-600'
            : ''
        } ${
          TEXT_FIELD_CLASSES[color]
        } flex w-full items-center  justify-center rounded-md border border-slate-900 shadow-sm`}
      >
        {/* Leading Icon */}
        <div className="pl-2 text-slate-400">{icon}</div>
        {/* Input */}
        {type !== 'textarea' ? (
          <div className="flex w-full items-center justify-between">
            <input
              ref={textFieldRef}
              type={type !== 'password' ? type : showPassword ? 'text' : type}
              onInput={(e) => onInput((e.target as HTMLTextAreaElement).value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              value={value}
              className={`${TEXT_FIELD_CLASSES[color]} w-full rounded-md p-2`}
              placeholder={placeholder && placeholder}
            />
            {type === 'password' && (
              <button
                tabIndex={-1}
                onClick={() => setShowPassword(!showPassword)}
                className="item-center flex h-full justify-center p-2 text-slate-400"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            )}
          </div>
        ) : (
          // Text Area
          <textarea
            ref={textFieldRef}
            onInput={(e) => onInput((e.target as HTMLTextAreaElement).value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder && placeholder}
            value={value}
            className="w-full rounded-md bg-white p-2 dark:bg-slate-800"
          ></textarea>
        )}
        {/* Trailing Icon */}
        {errors.length ? (
          <div className="pr-2 text-red-500">
            <ExclamationCircleIcon size={IconSize.sm} />
          </div>
        ) : trailingIcon != null ? (
          <div className="pr-2 text-slate-300">{trailingIcon}</div>
        ) : null}
      </div>
      <Errors errors={errors} />
    </div>
  );
};

export default TextField;
