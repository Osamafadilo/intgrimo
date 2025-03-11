import React from "react";
import { useTranslation } from "react-i18next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  User,
  Settings,
  ShieldCheck,
  ShoppingCart,
  LogOut,
  Bell,
  CreditCard,
  Heart,
} from "lucide-react";

interface ProfileDropdownProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  isVerified?: boolean;
  cartItemsCount?: number;
  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onVerificationClick?: () => void;
  onCartClick?: () => void;
  onLogoutClick?: () => void;
}

const ProfileDropdown = ({
  userName = "Ahmed Mohammed",
  userEmail = "ahmed.mohammed@example.com",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed",
  isVerified = false,
  cartItemsCount = 3,
  onProfileClick = () => console.log("Profile clicked"),
  onSettingsClick = () => console.log("Settings clicked"),
  onVerificationClick = () => console.log("Verification clicked"),
  onCartClick = () => console.log("Cart clicked"),
  onLogoutClick = () => console.log("Logout clicked"),
}: ProfileDropdownProps) => {
  const { t } = useTranslation();
  return (
    <div className="relative bg-white">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar>
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>
                {userName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {cartItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                {cartItemsCount}
              </span>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[250px]" align="end">
          <div className="flex items-center justify-start gap-2 p-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>
                {userName.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-0.5">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">{userEmail}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={onProfileClick}>
              <User className="mr-2 h-4 w-4" />
              <span>{t("profile.myProfile")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSettingsClick}>
              <Settings className="mr-2 h-4 w-4" />
              <span>{t("profile.settings")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onVerificationClick}>
              <ShieldCheck className="mr-2 h-4 w-4" />
              <span>
                {t("profile.verification")}
                {isVerified && (
                  <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                    {t("profile.verified")}
                  </span>
                )}
              </span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
              {t("profile.myAccount")}
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              <span>{t("profile.notifications")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Heart className="mr-2 h-4 w-4" />
              <span>{t("profile.favorites")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>{t("profile.paymentMethods")}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onCartClick} className="relative">
              <ShoppingCart className="mr-2 h-4 w-4" />
              <span>{t("profile.shoppingCart")}</span>
              {cartItemsCount > 0 && (
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartItemsCount}
                </span>
              )}
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={onLogoutClick}
            className="text-red-500 focus:text-red-500"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("profile.logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropdown;
