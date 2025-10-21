"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Menu,
  X,
  ShoppingBag,
  User,
  Heart,
  Search,
  LogOut,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userApi, getAuthToken } from "@/lib/api"; // your userApi wrapper

export { Navbar };
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  type CurrentUser = { name?: string; [key: string]: any } | null;
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const totalItems = cart.reduce(
        (sum: number, item: any) => sum + item.quantity,
        0
      );
      setCartCount(totalItems);
    };

    const updateWishlistCount = () => {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      setWishlistCount(wishlist.length);
    };

    const updateUserAuth = () => {
      const userAuth = localStorage.getItem("userAuth");
      const userData = localStorage.getItem("currentUser");

      if (userAuth === "true" && userData) {
        setIsLoggedIn(true);
        setCurrentUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    };

    updateCartCount();
    updateWishlistCount();
    updateUserAuth();

    window.addEventListener("storage", updateCartCount);
    window.addEventListener("storage", updateWishlistCount);
    window.addEventListener("storage", updateUserAuth);

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("wishlistUpdated", updateWishlistCount);
    window.addEventListener("userAuthUpdated", updateUserAuth);

    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("storage", updateWishlistCount);
      window.removeEventListener("storage", updateUserAuth);
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("wishlistUpdated", updateWishlistCount);
      window.removeEventListener("userAuthUpdated", updateUserAuth);
    };
  }, []);

  // --- Fetch current user after login ---
  useEffect(() => {
    const fetchUser = async () => {
      const storedAuth = localStorage.getItem("userAuth");
      if (!storedAuth) return;

      const parsedAuth = JSON.parse(storedAuth);
      const token = parsedAuth.token;
      if (!token) return;

      try {
        // Set token in local storage so userApi automatically uses it
        localStorage.setItem("userToken", token);

        // Call backend to get the current user's data
        const res = await userApi.get(`/users/get/${parsedAuth.user.id}`, {
          role: "user",
        });
        const userData = res.data.data || res.data; // depends on your backend response
        setCurrentUser(userData);

        // Store user data locally (optional)
        localStorage.setItem("currentUser", JSON.stringify(userData));
      } catch (err) {
        console.error("Failed to fetch current user:", err);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    localStorage.removeItem("currentUser");
    setIsLoggedIn(false);
    setCurrentUser(null);
    window.dispatchEvent(new Event("userAuthUpdated"));
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) setCurrentUser(JSON.parse(storedUser));
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <div className="flex items-center space-x-4 flex-1 lg:flex-none lg:w-80">

            <div className="hidden md:block flex-1 lg:flex-none lg:w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search luxury items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full text-sm border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              >
                Our Collection
              </Link>
              <Link
                href="/new-arrivals"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              >
                New Arrivals
              </Link>
              <Link
                href="/how-it-works"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              >
                How It Works
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-2 lg:space-x-3 flex-1 lg:flex-none lg:w-80 justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-600 hover:bg-black hover:text-white transition-all duration-200"
            >
              <Search className="h-5 w-5" />
            </Button>

            <div className="hidden sm:flex items-center space-x-2">
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 text-gray-800 font-medium"
                    >
                      <User className="h-5 w-5" />
                      <span>Hello, {currentUser.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:bg-black hover:text-white relative transition-all duration-200"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {wishlistCount > 99 ? "99+" : wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-600 hover:bg-black hover:text-white relative transition-all duration-200"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-600 hover:bg-black hover:text-white transition-all duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-4">
              <div className="md:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search luxury items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full text-sm border-gray-200 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Link
                  href="/"
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/collection"
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Collection
                </Link>
                <Link
                  href="/new-arrivals"
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  New Arrivals
                </Link>
                <Link
                  href="/how-it-works"
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  How It Works
                </Link>
                <Link
                  href="/about"
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/contact"
                  className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-black hover:bg-gray-50 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>
              </div>

              <div className="sm:hidden pt-4 border-t border-gray-100">
                <div className="flex items-center justify-around">
                  {isLoggedIn ? (
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="flex flex-col items-center space-y-1 text-gray-600 hover:bg-black hover:text-white p-3 transition-all duration-200"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="text-xs font-medium">Sign Out</span>
                    </Button>
                  ) : (
                    <Link href="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className="flex flex-col items-center space-y-1 text-gray-600 hover:bg-black hover:text-white p-3 transition-all duration-200"
                      >
                        <User className="h-5 w-5" />
                        <span className="text-xs font-medium">Sign In</span>
                      </Button>
                    </Link>
                  )}
                  <Link href="/wishlist" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center space-y-1 text-gray-600 hover:bg-black hover:text-white relative p-3 transition-all duration-200"
                    >
                      <Heart className="h-5 w-5" />
                      <span className="text-xs font-medium">Wishlist</span>
                      {wishlistCount > 0 && (
                        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                          {wishlistCount > 9 ? "9+" : wishlistCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                  <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className="flex flex-col items-center space-y-1 text-gray-600 hover:bg-black hover:text-white relative p-3 transition-all duration-200"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span className="text-xs font-medium">Cart</span>
                      {cartCount > 0 && (
                        <span className="absolute top-1 right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                          {cartCount > 9 ? "9+" : cartCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
