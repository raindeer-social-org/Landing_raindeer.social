import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-canvas border-t border-hairline py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-mark.png"
            alt="raindeer.social Logo"
            width={24}
            height={24}
            className="object-contain mix-blend-multiply"
          />
          <span className="font-display font-bold text-ink text-sm tracking-tight">
            raindeer.social
          </span>
        </Link>

        {/* Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-sans font-medium text-body-text">
          <li>
            <Link href="#how-it-works" className="hover:text-brand-start transition-colors">
              How It Works
            </Link>
          </li>
          <li>
            <Link href="#agents" className="hover:text-brand-start transition-colors">
              AI Agent Mesh
            </Link>
          </li>
          <li>
            <Link href="#calm" className="hover:text-brand-start transition-colors">
              Under the Hood
            </Link>
          </li>
          <li>
            <Link href="#pricing" className="hover:text-brand-start transition-colors">
              Pricing
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-brand-start transition-colors">
              About Us
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:text-brand-start transition-colors">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="#waitlist" className="hover:text-brand-start transition-colors">
              Waitlist
            </Link>
          </li>
        </ul>
      </div>

      {/* Copy */}
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-hairline/50 text-center text-xs font-sans text-body-text/80">
        &copy; {new Date().getFullYear()} raindeer.social. Created with calm intelligence.
      </div>
    </footer>
  );
}
