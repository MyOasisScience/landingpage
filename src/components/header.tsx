"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

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
                src="/images/logo.png" 
                alt="Oasis" 
                width={32} 
                height={32} 
                priority
              />
            </div>
            <h1 className="font-logo font-medium text-2xl ml-1">MyOasis.science</h1>
          </Link>

          {/* Version text in the middle */}
          <div className="hidden md:block text-[11px] text-[#1B4D3E]/80">
            v0.1.2 beta • Last update: June 2025
          </div>

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
            <Link href="/#payment" className="outline-none">
              <button 
                className="group relative px-8 py-2 rounded-full text-[#2B3D3B] font-medium
                    bg-[#C6FF00] hover:bg-[#B2E600]
                    active:bg-[#9ECC00]
                    border border-[#C6FF00]/50
                    shadow-[0_4px_10px_rgba(0,0,0,0.15)] 
                    hover:shadow-[0_6px_15px_rgba(0,0,0,0.25)] 
                    active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]
                    transition-all duration-200
                    active:translate-y-0.5"
              >
                <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                  Become a Founding Member
                </span>
                <span
                  className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/5 opacity-50 
                          group-hover:opacity-80 group-active:opacity-30 rounded-full"
                ></span>
                <span
                  className="absolute inset-0 border-t border-white/20 rounded-full group-active:opacity-0"
                ></span>
                <span
                  className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-[#C6FF00]/50 to-[#B2E600]/50 opacity-0 
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
            <Link href="/#payment" className="w-full">
              <button 
                className="group relative w-full px-8 py-2 rounded-full text-[#2B3D3B] font-medium
                    bg-[#C6FF00] hover:bg-[#B2E600]
                    active:bg-[#9ECC00]
                    border border-[#C6FF00]/50
                    shadow-[0_4px_10px_rgba(0,0,0,0.15)] 
                    hover:shadow-[0_6px_15px_rgba(0,0,0,0.25)] 
                    active:shadow-[inset_0_2px_6px_rgba(0,0,0,0.3)]
                    transition-all duration-200
                    active:translate-y-0.5"
              >
                <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(0,0,0,0.3)]">
                  Pre-order now
                </span>
                <span
                  className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/5 opacity-50 
                          group-hover:opacity-80 group-active:opacity-30 rounded-full"
                ></span>
                <span
                  className="absolute inset-0 border-t border-white/20 rounded-full group-active:opacity-0"
                ></span>
                <span
                  className="absolute -inset-[1px] blur-sm bg-gradient-to-r from-[#C6FF00]/50 to-[#B2E600]/50 opacity-0 
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
