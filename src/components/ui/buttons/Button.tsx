import React, { ButtonHTMLAttributes, FC } from "react";

enum ButtonColor {
  primary = "bg-blue-200",
  primaryTonal = "bg-blue-100",
  secondary = "bg-indigo-200",
  secondaryTonal = "bg-indigo-100",
  white = "bg-white",
  black = "bg-black text-white",
}

type ButtonColorOptions = keyof typeof ButtonColor;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  color?: ButtonColorOptions;
}

export const Button: FC<Props> = (props) => {
  const { text, children, color = "white", className, ...attributes } = props;
  return (
    <button
      className={
        className ??
        `flex h-10 w-full items-center justify-center rounded-lg transition-colors duration-500 ease-in-out hover:bg-opacity-70 ${ButtonColor[color]}`
      }
      {...attributes}
    >
      {text ?? children ?? "No content provided"}
    </button>
  );
};
