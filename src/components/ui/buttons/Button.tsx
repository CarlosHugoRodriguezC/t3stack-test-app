import React, { ButtonHTMLAttributes, FC } from "react";

enum ButtonColors {
  primary = "bg-blue-300",
  primaryTonal = "bg-blue-200",
  secondary = "bg-indigo-300",
  secondaryTonal = "bg-indigo-200",
  light = "bg-white",
  dark = "bg-dark text-white",
}

type ButtonColorsOptions = keyof typeof ButtonColors;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  color?: ButtonColorsOptions;
}

export const Button: FC<Props> = (props) => {
  const { text, children, className, color = "light", ...attributes } = props;
  return (
    <button
      className={
        className ??
        `hover: w-full rounded-lg py-3 px-5 transition-colors duration-500 ease-in-out hover:bg-opacity-70 ${ButtonColors[color]}`
      }
      {...attributes}
    >
      {children ?? text ?? "Content not provided"}
    </button>
  );
};
