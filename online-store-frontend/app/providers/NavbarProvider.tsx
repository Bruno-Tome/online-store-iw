import { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";

interface NavbarContextType {
    navigation: { name: string; href: string; current: boolean }[];
    setNavigation: (path: string) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [navigation, setNavigationState] = useState([
        { name: "Home", href: "/", current: false },
        { name: "Product", href: "/product", current: false },
        { name: "Cart", href: "/cart", current: false },
        { name: "Checkout", href: "/checkout", current: false },
    ]);

    const pathname = usePathname();

    const setNavigation = (path: string) => {
        setNavigationState((prevNavigation) =>
            prevNavigation.map((item) =>
                item.href === path ? { ...item, current: true } : { ...item, current: false }
            )
        );
    };

    useEffect(() => {
        setNavigation(pathname);
    }, [pathname]);

    return (
        <NavbarContext.Provider value={{ navigation, setNavigation }}>
            {children}
        </NavbarContext.Provider>
    );
};

export const useNavbar = () => {
    const context = useContext(NavbarContext);
    if (!context) {
        throw new Error("useNavbar must be used within a NavbarProvider");
    }
    return context;
};