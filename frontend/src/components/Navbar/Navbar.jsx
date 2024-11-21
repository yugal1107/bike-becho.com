import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import {
  ChevronDown,
  Scale,
  Activity,
  Flash,
  Server,
  TagUser,
  MessagesIcon,
} from "./Icons.jsx";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useAuth } from "../../context/authContext";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase";

export default function NavbarUI() {
  const { currentUser } = useAuth();
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
    messages: <MessagesIcon className="text-default-500" fill="currentColor" size={24} />,
  };

  return (
    <Navbar className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <a href="/">
        <NavbarBrand>
          <p className="font-bold text-xl text-white">MOTOMART</p>
        </NavbarBrand>
      </a>

      <NavbarContent className="hidden sm:flex gap-6" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-white hover:text-blue-200"
                endContent={icons.chevron}
              >
                Available Cities
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px] bg-white/90 backdrop-blur-md"
            itemClasses={{
              base: "gap-4 rounded-lg hover:bg-blue-50",
            }}
          >
            <DropdownItem
              key="autoscaling"
              description="Bengali Square, MR-10, Bholaram"
              startContent={icons.scale}
            >
              Indore
            </DropdownItem>
            <DropdownItem
              key="usage_metrics"
              description="Freeganj, xyz choraha"
              startContent={icons.activity}
            >
              Ujjain
            </DropdownItem>
            <DropdownItem
              key="production_ready"
              description="Bengali Square, MR-10, Bholaram"
              startContent={icons.flash}
            >
              Dewas
            </DropdownItem>
            <DropdownItem
              key="99_uptime"
              description="Bengali Square, MR-10, Bholaram"
              startContent={icons.server}
            >
              Ratlam
            </DropdownItem>
            <DropdownItem
              key="supreme_support"
              description="Bengali Square, MR-10, Bholaram"
              startContent={icons.user}
            >
              Nagda
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <Link href="/sell" className="text-white hover:text-blue-200 font-medium">
            SELL
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/rent-form" className="text-white hover:text-blue-200 font-medium">
            RENT
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <NavbarItem>
          <Link href="/messages" className="text-white hover:text-blue-200">
            {icons.messages}
          </Link>
        </NavbarItem>

        {currentUser ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                size="sm"
                name={currentUser.displayName || "User"}
                className="transition-transform hover:scale-105"
              />
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Profile Actions"
              className="bg-white/90 backdrop-blur-md"
            >
              <DropdownItem key="profile" as={Link} href="/profile">
                My Profile
              </DropdownItem>
              <DropdownItem key="settings">Settings</DropdownItem>
              <DropdownItem
                key="logout"
                className="text-danger"
                color="danger"
                onClick={handleLogout}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login" className="text-white hover:text-blue-200 font-medium">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button 
                color="primary" 
                variant="flat" 
                as={Link} 
                href="/register"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}