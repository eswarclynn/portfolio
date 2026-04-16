"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoEPC from "./LogoEPC";

const links = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-16">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />
      <Link
        href="/"
        className="relative z-10 text-foreground hover:text-accent transition-colors duration-300"
      >
        <LogoEPC size={20} />
      </Link>

      <div className="relative z-10 flex items-center gap-8">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative font-mono text-sm tracking-wide transition-colors duration-300 ${
                isActive ? "text-accent" : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent" />
              )}
            </Link>
          );
        })}
        <a
          href="/Eswar_Prasad_Clinton-100ms_ai.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-sm tracking-wide text-muted hover:text-foreground transition-colors duration-300"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
