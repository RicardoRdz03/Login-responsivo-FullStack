import React from "react";
import "../estilos.css";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
} from "@nextui-org/react";

function Principal({ loggedUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">LOGIN</p>
        </NavbarBrand>

        <NavbarContent as="div" justify="end">
          {loggedUser}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name="Jason Hughes"
                size="md"
                src="/usuario.png"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold text-center">Bienvenido</p>
                <p className="font-semibold text-center">{loggedUser}</p>
              </DropdownItem>

              <DropdownItem
                onClick={handleLogout}
                key="logout"
                color="danger"
                className="text-center"
              >
                Cerrar Sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
      <div style={{ height: "80vh" }} className="grid grid-cols-2">
        <div className="mt-9 flex flex-col justify-center items-center col-span-2 md:col-span-2">
          <h1 className="text-center text-5xl md:text-7xl" id="titulo">
            Bienvenido {loggedUser}
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center col-span-2 md:col-span-2">
          <Image src="/astro1.png" width={450} />
        </div>
      </div>
    </>
  );
}

export default Principal;
