import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import CartItems from "../components/cart/CartItems";
import { CreditCard, Wallet, Check } from "lucide-react";

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

const CheckoutPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  // Load cart items from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("serviceCart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  // Calculate total
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // Generate random order number
      const orderNum = Math.floor(100000 + Math.random() * 900000).toString();
      setOrderNumber(orderNum);

      // Clear cart
      localStorage.removeItem("serviceCart");

      setIsSubmitting(false);
      setOrderComplete(true);
    }, 1500);
  };

  // Return to home after order completion
  const handleReturnHome = () => {
    navigate("/");
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header
          isAuthenticated={false}
          onLanguageChange={handleLanguageChange}
          currentLanguage={currentLanguage}
        />

        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h1 className="text-2xl font-bold mb-2">تم تأكيد طلبك!</h1>
                <p className="text-gray-600 mb-6">
                  شكراً لك على طلبك. سيتم التواصل معك قريباً لتأكيد التفاصيل.
                </p>

                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <p className="text-sm text-gray-500 mb-1">رقم الطلب</p>
                  <p className="text-xl font-bold">{orderNumber}</p>
                </div>

                <Button onClick={handleReturnHome} className="w-full md:w-auto">
                  العودة إلى الصفحة الرئيسية
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        isAuthenticated={false}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">إتمام الطلب</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Order summary */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">تفاصيل الطلب</h2>
                <CartItems />

                {cartItems.length > 0 && (
                  <div className="mt-6">
                    <Separator className="my-4" />
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">المجموع الفرعي</span>
                      <span>AED {calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">رسوم الخدمة</span>
                      <span>AED 10.00</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-bold">
                      <span>الإجمالي</span>
                      <span>AED {(calculateTotal() + 10).toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Checkout form */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">معلومات الدفع</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم الكامل</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">رقم الهاتف</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">العنوان</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">ملاحظات إضافية (اختياري)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>طريقة الدفع</Label>
                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label
                          htmlFor="cash"
                          className="flex items-center cursor-pointer"
                        >
                          <Wallet className="mr-2 h-4 w-4" />
                          الدفع عند الاستلام
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <RadioGroupItem value="card" id="card" />
                        <Label
                          htmlFor="card"
                          className="flex items-center cursor-pointer"
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          بطاقة ائتمان/خصم
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 border rounded-md p-4 bg-gray-50">
                      <h4 className="font-medium text-center">
                        بوابة الدفع الإلكتروني
                      </h4>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">اسم حامل البطاقة</Label>
                        <Input
                          id="cardName"
                          placeholder="الاسم كما يظهر على البطاقة"
                          required={paymentMethod === "card"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">رقم البطاقة</Label>
                        <Input
                          id="cardNumber"
                          placeholder="XXXX XXXX XXXX XXXX"
                          required={paymentMethod === "card"}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            required={paymentMethod === "card"}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">رمز الأمان (CVV)</Label>
                          <Input
                            id="cvv"
                            placeholder="XXX"
                            required={paymentMethod === "card"}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) =>
                        setAcceptTerms(checked as boolean)
                      }
                      required
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      أوافق على الشروط والأحكام وسياسة الخصوصية
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || cartItems.length === 0}
                  >
                    {isSubmitting ? "جاري معالجة الطلب..." : "تأكيد الطلب"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;
