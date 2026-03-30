import { type ReactNode } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  description?: ReactNode;
  label?: ReactNode;
  error?: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  description?: ReactNode;
  label?: ReactNode;
  items?: { value: string; label: string }[];
  error?: string;
}

export function Input({
  label,
  description,
  error,
  className,
  ...rest
}: InputProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={rest.id || undefined}
          className="font-semibold cursor-pointer"
        >
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-cameroun-green disabled:opacity-70`}
        {...rest}
      />
      {error && <i className="text-red-500 text-sm">{error}</i>}
      {description && <p className="text-sm italic">{description}</p>}
    </div>
  );
}

export function Select({
  label,
  description,
  error,
  className,
  items,
  ...rest
}: SelectProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={rest.id || undefined}
          className="font-semibold cursor-pointer"
        >
          {label}
        </label>
      )}
      <select
        className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-cameroun-green disabled:opacity-70`}
        {...rest}
      >
        {items?.map((item, idx) => (
          <option key={idx} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {error && <i className="text-red-500 text-sm">{error}</i>}
      {description && <p className="text-sm italic">{description}</p>}
    </div>
  );
}
