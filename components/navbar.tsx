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
import { Button } from "@nextui-org/button";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    
  const menuItems = [
    { name: "About Us", href: "/about" },
    { name: "Settings", href: "/settings" },
    { name: "Login", href: "/login", color: "primary" },
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link color="foreground" href="/">
            <p className="font-bold text-inherit">WaTask</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Menu (hidden on small screens) */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/about">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/settings">
            Settings
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* Right Side Content: Login Button (hidden on small screens) */}
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="primary" href="/login" variant="flat">
            Login
          </Button>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu (Accordion-style) */}
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={item.name}>
            <Link
              className="w-full"
              color={item.color || (index === 2 ? "primary" : "foreground")}
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
