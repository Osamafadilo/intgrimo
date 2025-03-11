import React from "react";
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
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartPreviewProps {
  items?: CartItem[];
  onCheckout?: () => void;
  onRemoveItem?: (id: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
}

const CartPreview = ({
  items = [
    {
      id: "1",
      name: "Home Cleaning Service",
      price: 120,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&q=80",
    },
    {
      id: "2",
      name: "Plumbing Repair",
      price: 85,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=300&q=80",
    },
  ],
  onCheckout = () => console.log("Proceeding to checkout"),
  onRemoveItem = (id) => console.log(`Removing item ${id}`),
  onUpdateQuantity = (id, quantity) =>
    console.log(`Updating quantity for ${id} to ${quantity}`),
}: CartPreviewProps) => {
  const { t } = useTranslation();
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const tax = subtotal * 0.05; // 5% tax
  const total = subtotal + tax;

  return (
    <Card className="w-[350px] h-[400px] overflow-hidden flex flex-col bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <ShoppingCart className="h-5 w-5 mr-2 text-primary" />
          <CardTitle className="text-lg">{t("cart.yourCart")}</CardTitle>
        </div>
        <CardDescription className="text-sm text-gray-500">
          {items.length} {items.length === 1 ? t("cart.item") : t("cart.items")}{" "}
          in your cart
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <ShoppingCart className="h-12 w-12 text-gray-300 mb-2" />
            <p className="text-gray-500">{t("cart.empty")}</p>
            <Button variant="link" className="mt-2">
              {t("cart.browse")}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-start space-x-3">
                {item.image && (
                  <div className="h-14 w-14 rounded-md overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-grow">
                  <h4 className="text-sm font-medium">{item.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.id,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                        className="h-6 w-6 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-6 w-6 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium">
                        ${item.price.toFixed(2)}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="ml-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex-shrink-0 border-t pt-4 flex flex-col">
        <div className="w-full space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">{t("cart.subtotal")}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t("cart.tax")} (5%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-medium">
            <span>{t("cart.total")}</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <Button
          onClick={onCheckout}
          className="w-full mt-4"
          disabled={items.length === 0}
        >
          {t("cart.checkout")}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartPreview;
