"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NavLink = ({ 
  href, 
  children, 
  className = "", 
  noUnderline = false,
  disabled = false,
  tooltip = ""
}: { 
  href: string; 
  children: React.ReactNode; 
  className?: string;
  noUnderline?: boolean;
  disabled?: boolean;
  tooltip?: string;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  const content = (
    <span
      className={`font-medium relative group ${
        disabled ? 'text-gray-800 cursor-not-allowed' : 
        isActive ? 'text-brand-800' : 'hover:text-brand-600'
      } ${className}`}
    >
      {children}
      {!noUnderline && !disabled && (
        <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-brand-600 transform origin-left transition-transform duration-300 ease-out ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
      )}
    </span>
  );

  if (disabled && tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  if (disabled) {
    return content;
  }

  return (
    <Link
      href={href}
      className="outline-none"
      prefetch={false}
    >
      {content}
    </Link>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full max-w-7xl z-50 p-2 mx-auto my-4 self-center font-logo rounded-md backdrop-blur-lg">
        <div className="flex items-center justify-between px-4">
          {/* Logo on the left */}
          <Link
            href="/#"
            prefetch={false}
            className="flex items-center"
          >
            <div className="relative w-8 h-8">
              <Image 
                src="images/logo.svg" 
                alt="lagels" 
                width={32} 
                height={32} 
                priority
              />
            </div>
            <h1 className="font-logo font-medium text-3xl ml-1">Lagels</h1>
          </Link>

          {/* Hamburger icon - visible on small screens, hidden on md+ */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-hidden"
              aria-label="Toggle Menu"
            >
              <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </div>
            </button>
          </div>

          {/* Desktop Nav - right aligned, hidden on small screens */}
          <nav className="hidden md:flex items-center gap-6">
            {/* <NavLink href="/about">About Us</NavLink> */}
            {/* <NavLink href="/lawyers">For Lawyers</NavLink> */}
            <NavLink href="/blog" disabled tooltip="Coming soon">Journal</NavLink>
            <NavLink href="https://app.lagels.com" disabled tooltip="Coming soon">Login</NavLink>
            <Link href="/#waitlist" className="outline-none">
              <button 
                className="group relative px-8 py-2 rounded-full text-brand-50 font-medium
                    bg-gradient-to-r from-brand-600 to-brand-500 
                    hover:from-brand-500 hover:to-brand-400
                    active:from-brand-700 active:to-brand-600 
                    border border-brand-400/50
                    shadow-[0_4px_10px_rgba(0,0,0,0.15)] 
                    hover:shadow-[0_6px_15px_rgba(0,0,0,0.25)] 
                    active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]
                    transition-all duration-200
                    active:translate-y-0.5"
              >
                <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                  Join waitlist
                </span>
                <span
                  className="absolute inset-0 bg-gradient-to-b from-brand-50/20 via-transparent to-brand-900/5 opacity-50 
                          group-hover:opacity-80 group-active:opacity-30 rounded-full"
                ></span>
                <span
                  className="absolute inset-0 border-t border-brand-50/20 rounded-full group-active:opacity-0"
                ></span>
                <span
                  className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-brand-400/50 to-brand-500/50 opacity-0 
                          group-hover:opacity-100 -z-10 group-active:opacity-0 transition-opacity"
                ></span>
              </button>
            </Link>
          </nav>
        </div>

      {/* Mobile dropdown - shown if hamburger is open, hidden otherwise */}
      {isOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl">
          <nav className="flex flex-col items-center gap-4 p-4 mx-4 rounded-md">
            {/* <NavLink href="/about" className="text-sm">About Us</NavLink> */}
            {/* <NavLink href="/lawyers" className="text-sm">For Lawyers</NavLink> */}
            <NavLink href="/blog" disabled tooltip="Coming soon" className="text-sm">Journal</NavLink>
            <NavLink href="https://app.lagels.com" disabled tooltip="Coming soon" className="text-sm">Login</NavLink>
            <Link href="/#waitlist" className="w-full">
              <button 
                className="group relative w-full px-8 py-2 rounded-full text-brand-50 font-medium
                    bg-gradient-to-r from-brand-600 to-brand-500 
                    hover:from-brand-500 hover:to-brand-400
                    active:from-brand-700 active:to-brand-600 
                    border border-brand-400/50
                    shadow-[0_4px_10px_rgba(0,0,0,0.15)] 
                    hover:shadow-[0_6px_15px_rgba(0,0,0,0.25)] 
                    active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]
                    transition-all duration-200
                    active:translate-y-0.5"
              >
                <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                  Join the waitlist
                </span>
                <span
                  className="absolute inset-0 bg-gradient-to-b from-brand-50/20 via-transparent to-brand-900/5 opacity-50 
                          group-hover:opacity-80 group-active:opacity-30 rounded-full"
                ></span>
                <span
                  className="absolute inset-0 border-t border-brand-50/20 rounded-full group-active:opacity-0"
                ></span>
                <span
                  className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-brand-400/50 to-brand-500/50 opacity-0 
                          group-hover:opacity-100 -z-10 group-active:opacity-0 transition-opacity"
                ></span>
              </button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
