/* eslint-disable prettier/prettier */
"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import { FaInfoCircle, FaCog, FaSignInAlt, FaHome } from "react-icons/fa"; 

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const menuItemsDesktop = [
    { name: "About", href: "/about" },
    { name: "Settings", href: "/settings" },
  ];

  const menuItemsMobile = [
    { name: "Home", href: "/", icon: <FaHome /> },
    { name: "About", href: "/about", icon: <FaInfoCircle /> },
    { name: "Settings", href: "/settings", icon: <FaCog /> },
    { name: "Login", href: "/login", icon: <FaSignInAlt />, color: "primary" },
  ];

  // Close menu, navigate, and reset state
  const handleMenuItemClick = (href: string) => {
    setIsMenuOpen(false); // Close the menu
    router.push(href); // Navigate to the clicked link
  };

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-white">WaTask</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItemsDesktop.map((item) => (
          <NavbarItem key={item.name}>
            <Link className="text-white" href={item.href}>
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Login Button (Desktop Only) */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="primary" href="/login" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu */}
      <NavbarMenu className="bg-transparent text-white">
        {menuItemsMobile.map((item) => (
          <NavbarMenuItem key={item.name}>
            <button
              className="w-full flex items-center gap-3 text-left p-2 rounded-lg hover:bg-gray-700 transition"
              onClick={() => handleMenuItemClick(item.href)}
            >
              {item.icon} {/* Display icon */}
              {item.name}
            </button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
