import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  Phone,
  MessageCircle,
} from "lucide-react";

interface CartItem {
  id: string;
  workerId: string;
  workerName: string;
  workerImage: string;
  service: string;
  price: number;
  date: string;
  time: string;
  status: string;
}

interface CartPreviewProps {
  items?: CartItem[];
  onCheckout?: () => void;
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onClose?: () => void;
}

const CartPreview = ({
  items = [],
  onCheckout = () => console.log("Proceeding to checkout"),
  onRemoveItem = (id) => console.log(`Removing item ${id}`),
  onUpdateQuantity = (id, quantity) =>
    console.log(`Updating quantity for ${id} to ${quantity}`),
  onClose,
}: CartPreviewProps) => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState<CartItem[]>(items);

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("serviceCart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Calculate total price
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  // Handle contact via phone
  const handlePhoneContact = (workerId: string) => {
    window.location.href = `tel:+971501234567`;
  };

  // Handle contact via WhatsApp
  const handleWhatsAppContact = (workerId: string) => {
    window.open(`https://wa.me/+971501234567`, "_blank");
  };

  // Remove item from cart
  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("serviceCart", JSON.stringify(updatedCart));
    onRemoveItem(id);
  };

  if (cartItems.length === 0) {
    return (
      <Card className="w-[350px] h-[400px] overflow-hidden flex flex-col bg-white">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
              <CardTitle className="text-lg">
                {t("cart.yourCart") || "Your Cart"}
              </CardTitle>
            </div>
            {onClose && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
              >
                <span>×</span>
              </Button>
            )}
          </div>
          <CardDescription className="text-sm text-gray-500">
            0 {t("cart.items") || "items"} in your cart
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col items-center justify-center">
          <ShoppingCart className="h-12 w-12 text-gray-300 mb-2" />
          <p className="text-gray-500">
            {t("cart.empty") || "Your cart is empty"}
          </p>
          <Button variant="link" className="mt-2">
            {t("cart.browse") || "Browse Services"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-[350px] h-[400px] overflow-hidden flex flex-col bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
            <CardTitle className="text-lg">
              {t("cart.yourCart") || "Your Cart"}
            </CardTitle>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <span>×</span>
            </Button>
          )}
        </div>
        <CardDescription className="text-sm text-gray-500">
          {cartItems.length}{" "}
          {cartItems.length === 1
            ? t("cart.item") || "item"
            : t("cart.items") || "items"}{" "}
          in your cart
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow overflow-y-auto">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border rounded-md p-3">
              <div className="flex items-start gap-3">
                <img
                  src={item.workerImage}
                  alt={item.workerName}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-medium">{item.service}</h4>
                    <Badge
                      className={`${item.status === "Pending Confirmation" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                    >
                      {item.status === "Pending Confirmation"
                        ? "في انتظار التأكيد"
                        : "تم التأكيد"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{item.workerName}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    {item.date && (
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    )}
                    {item.time && <span>{item.time}</span>}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-bold text-primary">
                      AED {item.price}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 text-xs"
                        onClick={() => handlePhoneContact(item.workerId)}
                      >
                        <Phone className="h-3 w-3 mr-1" /> اتصال
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 px-2 text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                        onClick={() => handleWhatsAppContact(item.workerId)}
                      >
                        <MessageCircle className="h-3 w-3 mr-1" /> واتساب
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 text-gray-400 hover:text-red-500"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex-shrink-0 border-t pt-4 flex flex-col">
        <div className="w-full space-y-1 text-sm">
          <div className="flex justify-between font-bold">
            <span>{t("cart.total") || "Total"}:</span>
            <span>AED {calculateTotal().toFixed(2)}</span>
          </div>
        </div>
        <Link to="/checkout" className="w-full">
          <Button
            onClick={onCheckout}
            className="w-full mt-4"
            disabled={cartItems.length === 0}
          >
            {t("cart.checkout") || "Checkout"}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CartPreview;
