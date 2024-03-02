import { JSX } from "preact/jsx-runtime";

interface IconProps {
  size?: number;
  class?: string;
}
export function createIconComponent(Inner: JSX.Element, viewBox: string) {
  return function Icon(
    { size = 24, class: className }: IconProps,
  ) {
    return (
      <span
        class={`inline-block ${className}`}
      >
        <svg
          width={size}
          height={size}
          fill={"currentColor"}
          viewBox={viewBox}
        >
          {Inner}
        </svg>
      </span>
    );
  };
}
