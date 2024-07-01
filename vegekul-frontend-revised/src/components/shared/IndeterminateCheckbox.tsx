import { HTMLProps, useEffect, useRef } from "react";

export default function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: {
  indeterminate: boolean;
} & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    ref.current.indeterminate = !rest.checked && indeterminate;
  }, [indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className="mr-4 h-4 w-4 cursor-pointer accent-primary"
      onClick={(e) => e.stopPropagation()}
      {...rest}
    />
  );
}
