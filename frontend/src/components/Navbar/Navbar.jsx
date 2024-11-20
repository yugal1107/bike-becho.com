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
  Bell,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  MessagesIcon, // Import the MessagesIcon
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
    bell: <Bell className="text-default-500" fill="currentColor" size={24} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
    messages: <MessagesIcon className="text-default-500" fill="currentColor" size={24} />, // Add the messages icon
  };

  return (
    <Navbar>
      <a href="/">
        <NavbarBrand>
          <p className="font-bold text-inherit">MOTOMART</p>
        </NavbarBrand>
      </a>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={icons.chevron}
              >
                Available Cities
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            className="w-[340px]"
            itemClasses={{
              base: "gap-4",
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
          <Link href="/sell">SELL</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" className="gap-4">
        <NavbarItem>
          <Link href="/notifications">{icons.bell}</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/messages">{icons.messages}</Link> {/* Add the messages icon link */}
        </NavbarItem>

        {currentUser ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                size="sm"
                name={currentUser.displayName || "User"}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions">
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
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button color="primary" variant="flat" as={Link} href="/register">
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}