import type { PropsWithChildren } from "react";

interface EpochBarProps {
  canMove?: boolean;
}

// EpochBar is no longer needed - return children directly
export default function EpochBar({
  children,
}: PropsWithChildren<EpochBarProps>) {
  return <>{children}</>;
}
