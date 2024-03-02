type ProgressBarProps = {
  value: number;
  max: number;
  class?: string;
};
export function ProgressBar(
  { value, max, class: className }: ProgressBarProps,
) {
  return (
    <div class={`relative w-full h-1.5  bg-accent-300 rounded-full ${className}`}>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemax={max}
        class="absolute top-0 left-0 h-full bg-current rounded-full"
        style={{ width: `${(value / max) * 100}%` }}
      >
      </div>
    </div>
  );
}
