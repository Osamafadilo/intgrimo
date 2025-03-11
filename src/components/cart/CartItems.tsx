import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Phone, MessageCircle, Trash2, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

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

const CartItems: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("serviceCart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Remove item from cart
  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("serviceCart", JSON.stringify(updatedCart));
  };

  // Handle contact via phone
  const handlePhoneContact = (workerId: string) => {
    // In a real app, you would fetch the worker's phone number
    alert("سيتم الاتصال بمقدم الخدمة");
  };

  // Handle contact via WhatsApp
  const handleWhatsAppContact = (workerId: string) => {
    // In a real app, you would open WhatsApp with the worker's number
    alert("سيتم فتح واتساب للتواصل مع مقدم الخدمة");
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">لا توجد طلبات في السلة</h3>
        <p className="text-gray-500 mb-4">قم بإضافة خدمات للمتابعة</p>
        <Button asChild>
          <Link to="/services/maintenance">تصفح الخدمات</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">طلباتك ({cartItems.length})</h2>

      {cartItems.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/4 h-32 md:h-auto">
                <img
                  src={item.workerImage}
                  alt={item.workerName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{item.service}</h3>
                    <p className="text-gray-600">{item.workerName}</p>
                  </div>
                  <Badge
                    className={`${item.status === "Pending Confirmation" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                  >
                    {item.status === "Pending Confirmation"
                      ? "في انتظار التأكيد"
                      : "تم التأكيد"}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {item.time}
                  </div>
                </div>

                <div className="mt-2">
                  <p className="font-bold text-primary">AED {item.price}</p>
                </div>

                <Separator className="my-3" />

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center"
                      onClick={() => handlePhoneContact(item.workerId)}
                    >
                      <Phone className="h-4 w-4 mr-1" /> اتصال
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                      onClick={() => handleWhatsAppContact(item.workerId)}
                    >
                      <MessageCircle className="h-4 w-4 mr-1" /> واتساب
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CartItems;
