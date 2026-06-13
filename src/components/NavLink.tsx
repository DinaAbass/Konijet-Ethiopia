import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = ({ href, className, activeClassName, pendingClassName, ...props }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
  
  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClassName)}
      {...props}
    />
  );
};

export { NavLink };
export type { NavLinkProps };