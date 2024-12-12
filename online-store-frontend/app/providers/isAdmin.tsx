// isAuth.tsx

"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useUserContext } from "./UserProvider";

const isAdmin = (Component: any) => {
  return function IsAuth(props: any) {
    const { state: userState } = useUserContext();
    const isAdmin = userState.user.roles.includes("admin");
    console.log("isAdmin", userState.user);
    useEffect(() => {
      if (!isAdmin) {
        return redirect("/");
      }
    }, [isAdmin]);

    if (!isAdmin) {
      return null;
    }

    return <Component {...props} />;
  };
};
export default isAdmin;
