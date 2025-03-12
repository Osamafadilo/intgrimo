import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import {
  Phone,
  MessageCircle,
  Trash2,
  Calendar,
  Clock,
  AlertCircle,
  Archive,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

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
  createdAt?: string; // Date when the order was created
  expiresAt?: string; // Date when the order will expire (1 year after creation)
  completed?: boolean; // Whether the order has been completed
}

const CartItems: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState("active");

  // Load cart items from localStorage and add expiration dates if not present
  useEffect(() => {
    const storedCart = localStorage.getItem("serviceCart");
    if (storedCart) {
      const parsedCart = JSON.parse(storedCart);

      // Add creation and expiration dates if not present
      const updatedCart = parsedCart.map((item: CartItem) => {
        if (!item.createdAt) {
          const now = new Date();
          const expirationDate = new Date(now);
          expirationDate.setFullYear(expirationDate.getFullYear() + 1); // Add 1 year

          return {
            ...item,
            createdAt: now.toISOString(),
            expiresAt: expirationDate.toISOString(),
          };
        }
        return item;
      });

      // Save the updated cart with expiration dates
      if (JSON.stringify(parsedCart) !== JSON.stringify(updatedCart)) {
        localStorage.setItem("serviceCart", JSON.stringify(updatedCart));
      }

      setCartItems(updatedCart);
    }
  }, []);

  // Remove item from cart
  const removeFromCart = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("serviceCart", JSON.stringify(updatedCart));
  };

  // Mark order as completed
  const markAsCompleted = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, completed: true, status: "Completed" } : item,
    );
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

  // Filter items based on active tab
  const activeItems = cartItems.filter((item) => !item.completed);
  const completedItems = cartItems.filter((item) => item.completed);
  const displayItems = activeTab === "active" ? activeItems : completedItems;

  // Check if any orders are about to expire (within 30 days)
  const hasExpiringOrders = activeItems.some((item) => {
    if (item.expiresAt) {
      const expiryDate = new Date(item.expiresAt);
      const now = new Date();
      const daysUntilExpiry = Math.floor(
        (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );
      return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
    }
    return false;
  });

  // Clean up expired orders (older than 1 year)
  useEffect(() => {
    const now = new Date();
    const updatedCart = cartItems.filter((item) => {
      if (item.expiresAt) {
        const expiryDate = new Date(item.expiresAt);
        return expiryDate > now;
      }
      return true; // Keep items without expiration date
    });

    if (updatedCart.length !== cartItems.length) {
      setCartItems(updatedCart);
      localStorage.setItem("serviceCart", JSON.stringify(updatedCart));
    }
  }, [cartItems]);

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
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">طلباتك ({cartItems.length})</h2>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
          <TabsList>
            <TabsTrigger value="active" className="flex items-center gap-1">
              الطلبات النشطة
              <Badge className="ml-1 bg-primary">{activeItems.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-1">
              الطلبات المكتملة
              <Badge className="ml-1 bg-green-600">
                {completedItems.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {hasExpiringOrders && activeTab === "active" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 mb-4 flex items-start">
          <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-800 font-medium">
              بعض الطلبات على وشك انتهاء الصلاحية
            </p>
            <p className="text-yellow-700 text-sm">
              يتم الاحتفاظ بالطلبات لمدة سنة واحدة من تاريخ الإنشاء
            </p>
          </div>
        </div>
      )}

      {displayItems.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <Archive className="h-12 w-12 mx-auto text-gray-300 mb-2" />
          <h3 className="text-lg font-medium mb-2">
            {activeTab === "active"
              ? "لا توجد طلبات نشطة"
              : "لا توجد طلبات مكتملة"}
          </h3>
          <p className="text-gray-500 mb-4">
            {activeTab === "active"
              ? "قم بإضافة خدمات للمتابعة"
              : "ستظهر الطلبات المكتملة هنا"}
          </p>
          {activeTab === "active" && (
            <Button asChild>
              <Link to="/services/maintenance">تصفح الخدمات</Link>
            </Button>
          )}
        </div>
      ) : (
        displayItems.map((item) => (
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
                      className={`${item.status === "Pending Confirmation" ? "bg-yellow-100 text-yellow-800" : item.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}`}
                    >
                      {item.status === "Pending Confirmation"
                        ? "في انتظار التأكيد"
                        : item.status === "Completed"
                          ? "مكتمل"
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

                  {item.expiresAt && (
                    <div className="mt-1 text-xs text-gray-500">
                      تاريخ انتهاء الصلاحية:{" "}
                      {new Date(item.expiresAt).toLocaleDateString()}
                    </div>
                  )}

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
                    <div className="flex gap-2">
                      {activeTab === "active" && !item.completed && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          onClick={() => markAsCompleted(item.id)}
                        >
                          تم الإكمال
                        </Button>
                      )}
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
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default CartItems;
