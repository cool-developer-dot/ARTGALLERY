import { type ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/** Centered content shell — prevents horizontal overflow on laptop viewports */
export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div className={`site-container ${className}`.trim()}>{children}</div>
  );
}
