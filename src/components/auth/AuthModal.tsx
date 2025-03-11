import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Facebook, Mail, MessageCircle, Phone } from "lucide-react";

interface AuthModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onLogin?: (email: string, password: string) => void;
  onRegister?: (email: string, password: string, name: string) => void;
  onSocialLogin?: (provider: string) => void;
}

const AuthModal = ({
  isOpen = true,
  onOpenChange = () => {},
  onLogin = () => {},
  onRegister = () => {},
  onSocialLogin = () => {},
}: AuthModalProps) => {
  const { t } = useTranslation();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      onLogin(email, password);
    } else {
      onRegister(email, password, name);
    }
  };

  const socialLoginButtons = [
    {
      provider: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      provider: "Google",
      icon: <Mail className="h-5 w-5" />,
      color: "bg-red-600 hover:bg-red-700",
    },
    {
      provider: "Telegram",
      icon: <MessageCircle className="h-5 w-5" />,
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      provider: "WhatsApp Business",
      icon: <Phone className="h-5 w-5" />,
      color: "bg-green-600 hover:bg-green-700",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {mode === "login" ? t("auth.login") : t("auth.register")}
          </DialogTitle>
          <DialogDescription className="text-center">
            {mode === "login" ? t("auth.welcomeBack") : t("auth.joinUs")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          {mode === "register" && (
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t("auth.fullName")}
              </label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("auth.email")}
            </label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {t("auth.password")}
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            {mode === "login" ? t("auth.signIn") : t("auth.signUp")}
          </Button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">
              {t("auth.continueWith")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {socialLoginButtons.map((button) => (
            <Button
              key={button.provider}
              type="button"
              className={`${button.color} text-white w-full`}
              onClick={() => onSocialLogin(button.provider)}
            >
              <span className="mr-2">{button.icon}</span>
              {button.provider}
            </Button>
          ))}
        </div>

        <DialogFooter className="flex flex-col items-center justify-center sm:justify-start">
          <p className="text-sm text-center mt-4">
            {mode === "login" ? t("auth.noAccount") : t("auth.haveAccount")}
            <Button
              variant="link"
              className="pl-1.5"
              onClick={() => setMode(mode === "login" ? "register" : "login")}
            >
              {mode === "login" ? t("auth.signUp") : t("auth.signIn")}
            </Button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
