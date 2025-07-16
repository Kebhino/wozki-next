"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import LogoAS from "@/public/wozkiLogoWebP.webp";

const navItems = [
  { href: "/uczestnicy", label: "Uczestnicy" },
  { href: "/lokalizacje", label: "Lokalizacje" },
  { href: "/sloty", label: "Sloty" },
  { href: "/dostepnosc", label: "Dostępność" },
  { href: "/planowanie", label: "Planowanie" },
];

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <div className="bg-base-100 border-b border-base-300 shadow-sm">
      <div className="navbar max-w-screen-lg mx-auto px-4">
        {/* Logo i przycisk mobilny */}
        <div className="flex-1">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={LogoAS}
              alt="Logo"
              width={120}
              height={40}
              className="h-8 w-auto md:h-10"
              priority
            />
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-4">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-primary border-b-2 border-primary"
                    : "text-base-content hover:text-primary"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-square">
            <Menu className="w-6 h-6" />
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[99] p-2 shadow bg-base-100 rounded-box w-52 border border-base-200"
          >
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={isActive ? "text-primary font-semibold" : ""}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
