import clsx from "clsx";
import type { PropsWithChildren, HTMLAttributes } from "react";

interface GlassCardProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {}

export const GlassCard = ({ children, className, ...props }: GlassCardProps) => {
  return <div className={clsx("glass-card rounded-2xl border border-white/10 p-5", className)} {...props}>{children}</div>;
};
