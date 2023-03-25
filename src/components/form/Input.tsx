import React, { FC, InputHTMLAttributes, ReactHTMLElement } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: FC<Props> = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { label, className, ...attributes } = props;
    return (
      <div className="flex flex-col gap-2">
        <label>{label}</label>
        <input
          ref={ref}
          className={className ?? `rounded-lg border border-gray-300 px-4 py-2`}
          {...attributes}
        />
      </div>
    );
  }
);
