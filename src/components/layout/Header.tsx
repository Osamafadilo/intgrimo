import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  LogIn,
  Bell,
  ChevronDown,
  Globe,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import SearchBar from "../search/SearchBar";
import AuthModal from "../auth/AuthModal";
import CartPreview from "../cart/CartPreview";
import ProfileDropdown from "../profile/ProfileDropdown";
import { Link } from "react-router-dom";

interface HeaderProps {
  isAuthenticated?: boolean;
  username?: string;
  cartItemCount?: number;
  notificationCount?: number;
  onSearch?: (query: string) => void;
  onLogin?: () => void;
  onLogout?: () => void;
  onMenuToggle?: () => void;
  onLanguageChange?: (language: string) => void;
  currentLanguage?: string;
}

const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
];

const Header = ({
  isAuthenticated = false,
  username = "Guest User",
  cartItemCount = 0,
  notificationCount = 0,
  onSearch = () => {},
  onLogin = () => {},
  onLogout = () => {},
  onMenuToggle = () => {},
  onLanguageChange = () => {},
  currentLanguage = "en",
}: HeaderProps) => {
  const { t, i18n } = useTranslation();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartPreview, setShowCartPreview] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    onLanguageChange(langCode);
    setShowLanguageDropdown(false);

    // Set HTML dir attribute for RTL languages
    if (langCode === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = langCode;
    }
  };

  // Set initial direction based on current language
  useEffect(() => {
    if (currentLanguage === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = currentLanguage;
    }
    i18n.changeLanguage(currentLanguage);
  }, []);

  const getCurrentLanguageName = () => {
    const lang = languages.find((l) => l.code === currentLanguage);
    return lang ? lang.name : "English";
  };

  return (
    <header className="w-full h-20 bg-sky-100 border-b border-sky-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2 text-sky-700"
            onClick={onMenuToggle}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-12 w-12 mr-2" />
              <span className="text-lg font-medium text-sky-800">
                {t("header.marketplace")}
              </span>
            </Link>
          </div>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:block flex-1 max-w-xl mx-4">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Language Selector */}
          <DropdownMenu
            open={showLanguageDropdown}
            onOpenChange={setShowLanguageDropdown}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-sky-50 border-sky-200 text-sky-700 hover:bg-sky-100 hover:text-sky-800"
              >
                <Globe className="h-4 w-4" />
                <span className="hidden md:inline-block">
                  {getCurrentLanguageName()}
                </span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  className={`cursor-pointer ${currentLanguage === lang.code ? "bg-sky-50 font-medium" : ""}`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          {isAuthenticated && (
            <Button
              variant="ghost"
              size="icon"
              className="relative text-sky-700 hover:text-sky-800 hover:bg-sky-200"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
                  variant="destructive"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
          )}

          {/* Shopping Cart */}
          <DropdownMenu
            open={showCartPreview}
            onOpenChange={setShowCartPreview}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-sky-700 hover:text-sky-800 hover:bg-sky-200"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <Badge
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500"
                    variant="destructive"
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0">
              <CartPreview />
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Auth / Profile */}
          {isAuthenticated ? (
            <DropdownMenu
              open={showProfileDropdown}
              onOpenChange={setShowProfileDropdown}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 px-2 text-sky-700 hover:text-sky-800 hover:bg-sky-200"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                      alt={username}
                    />
                    <AvatarFallback>{username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:inline-block">{username}</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-0">
                <ProfileDropdown />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className="flex items-center space-x-2 bg-sky-600 hover:bg-sky-700"
                  onClick={onLogin}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  <span className="hidden md:inline-block">
                    {t("header.login")}
                  </span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md p-0">
                <AuthModal onOpenChange={setShowAuthModal} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {/* Mobile Search - Visible only on mobile */}
      <div className="md:hidden px-4 pb-3">
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;
