'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'AI Agent Mesh', href: '#agents' },
    { name: 'Under the Hood', href: '#calm' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Early Access', href: '#waitlist' }
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
        scrolled 
          ? 'py-3 bg-canvas/80 backdrop-blur-md border-b border-hairline shadow-sm' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo-mark.png"
            alt="raindeer.social Logo"
            width={32}
            height={32}
            className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200"
          />
          <span className="font-display font-bold text-ink text-lg tracking-tight">
            raindeer<span className="text-brand-start font-normal">.social</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                href={link.href}
                className="font-sans font-medium text-sm text-body-text hover:text-brand-start transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="#waitlist">
            <button className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none cursor-pointer">
              <span className="absolute inset-0 bg-[linear-gradient(135deg,var(--brand-start)_0%,var(--brand-end)_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-canvas px-6 text-sm font-semibold text-brand-start hover:bg-canvas/90 transition-colors duration-200">
                Join Waitlist
              </span>
            </button>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-ink hover:text-brand-start transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-canvas border-b border-hairline shadow-lg p-6 flex flex-col gap-6 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-sans font-medium text-base text-body-text hover:text-brand-start block py-1"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="#waitlist" onClick={() => setMobileOpen(false)}>
            <button className="w-full relative inline-flex h-11 overflow-hidden rounded-full p-[1px] focus:outline-none cursor-pointer">
              <span className="absolute inset-0 bg-[linear-gradient(135deg,var(--brand-start)_0%,var(--brand-end)_100%)]" />
              <span className="inline-flex h-full w-full items-center justify-center rounded-full bg-canvas px-6 text-base font-semibold text-brand-start">
                Join Waitlist
              </span>
            </button>
          </Link>
        </div>
      )}
    </nav>
  );
}
