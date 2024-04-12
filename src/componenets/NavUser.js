import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  Spacer,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import Logo from "./Logo";
import Maka from "../images/frerein.jpg";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function NavUser() {
  const navigate = useNavigate();

  const { logout } = useAuth();
  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Navbar maxWidth="full">
      <NavbarBrand>
        <Logo />
        <Spacer />
        <p className="font-bold text-inherit text-3xl font-mono">not-a-mimic</p>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src={Maka}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" isDisabled className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">maka@example.com</p>
            </DropdownItem>
            <DropdownItem key="treasure" href="/treasure">
              Treasure
            </DropdownItem>
            <DropdownItem key="userprofile" href="/profile">
              Profile
            </DropdownItem>
            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={handleLogout}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}

export default NavUser;
