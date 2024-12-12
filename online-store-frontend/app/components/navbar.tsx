"use client";
import {
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavbar } from "../providers/NavbarProvider";
import { useUserContext } from "../providers/UserProvider";
import Link from "next/link";
import { useEffect, useState } from "react";

const user = {
  name: "Tom Cook",
  email: "tom@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const userRoutes = [
  { name: "Your Profile", href: "/profile" },
  { name: "Orders", href: "/user/orders" },
];

const adminNavigation = [
  { name: "Admin Orders", href: "/admin/orders" },
  { name: "Admin Products", href: "/admin/products" },
  { name: "Admin Users", href: "/admin/users" },
];
const signOut = {
  name: "Sign out",
  href: "#",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const imageUrl =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
export default function Navbar() {
  const { navigation, setNavigation } = useNavbar();
  const {
    state: { user },
    logout,
  } = useUserContext();

  const [userNavigation, setUserNavigation] = useState(userRoutes);
  const isAdmin = user.roles.includes("admin");
  const isLoggedIn = user !== null && user.id !== "";

  useEffect(() => {
    const nav = isAdmin ? [...userRoutes, ...adminNavigation] : userRoutes; // if user is admin, add admin routes
    setUserNavigation(nav);
  }, [user]);
  return (
    <div className="bg-indigo-600 pb-32">
      <Disclosure
        as="nav"
        className="border-b border-indigo-300 border-opacity-25 bg-indigo-600 lg:border-none"
      >
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-indigo-400 lg:border-opacity-25">
            <div className="flex items-center px-2 lg:px-0">
              <div className="flex-shrink-0">
                <img
                  alt="Your Company"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=300"
                  className="block h-8 w-8"
                />
              </div>
              <div className="hidden lg:ml-10 lg:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      shallow
                      key={item.name}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      onClick={() => setNavigation(item.href)}
                      className={classNames(
                        item.current
                          ? "bg-indigo-700 text-white"
                          : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                        "rounded-md px-3 py-2 text-sm font-medium",
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end"></div>
            {isLoggedIn ? (
              <>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  {isLoggedIn ? (
                    <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon
                        aria-hidden="true"
                        className="block h-6 w-6 group-data-[open]:hidden"
                      />
                      <XMarkIcon
                        aria-hidden="true"
                        className="hidden h-6 w-6 group-data-[open]:block"
                      />
                    </DisclosureButton>
                  ) : (
                    <Link
                      href="/login"
                      className="group relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                    ></Link>
                  )}
                </div>
                <div className="hidden lg:ml-4 lg:block">
                  <div className="flex items-center">
                    {/* Profile dropdown */}
                    <Menu as="div" className="relative ml-3 flex-shrink-0">
                      <div>
                        <MenuButton className="relative flex rounded-full bg-indigo-600 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            alt=""
                            src={imageUrl}
                            className="h-8 w-8 rounded-full"
                          />
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        {userNavigation.map((item) => (
                          <MenuItem key={item.name}>
                            <Link
                              shallow
                              href={item.href}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                            >
                              {item.name}
                            </Link>
                          </MenuItem>
                        ))}
                        <MenuItem key={signOut.name}>
                          <Link
                            onClick={logout}
                            href={signOut.href}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                          >
                            {signOut.name}
                          </Link>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="group relative inline-flex items-center justify-center rounded-md bg-indigo-600 p-2 text-indigo-200 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <DisclosurePanel className="lg:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-indigo-700 text-white"
                    : "text-white hover:bg-indigo-500 hover:bg-opacity-75",
                  "block rounded-md px-3 py-2 text-base font-medium",
                )}
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
          <div className="border-t border-indigo-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img alt="" src={imageUrl} className="h-10 w-10 rounded-full" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">
                  {user.username}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                >
                  {item.name}
                </DisclosureButton>
              ))}
              <DisclosureButton
                key={signOut.name}
                shallow
                onClick={logout}
                as={Link}
                className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-indigo-500 hover:bg-opacity-75"
                href={signOut.href}
                // aria-current={item.current ? "page" : undefined}
              >
                {signOut.name}
              </DisclosureButton>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
      <header className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"></div>
      </header>
    </div>
  );
}
