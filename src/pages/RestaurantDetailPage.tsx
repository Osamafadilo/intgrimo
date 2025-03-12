import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import {
  MapPin,
  Star,
  Clock,
  Utensils,
  Coffee,
  Pizza,
  Beef,
  Fish,
  Salad,
  Sandwich,
  Dessert,
  Phone,
  Globe,
  Check,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  Home,
  CreditCard,
  Wallet,
  Calendar,
  Clock3,
  Users,
  Info,
  X,
} from "lucide-react";

// Mock data for restaurant
const mockRestaurant = {
  id: "1",
  name: "Al Mahara Seafood",
  description: "Luxury seafood restaurant with stunning aquarium views",
  cuisine: "Seafood",
  priceRange: "$$$",
  rating: 4.8,
  reviewCount: 324,
  location: "Jumeirah Beach Road, Dubai",
  distance: 1.2, // in km
  openingHours: "12:00 PM - 11:00 PM",
  phone: "+971 4 123 4567",
  website: "www.almaharaseafood.com",
  image:
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
  features: [
    "Outdoor Seating",
    "Reservations",
    "Valet Parking",
    "Alcohol Served",
  ],
  tags: ["Fine Dining", "Seafood", "Romantic"],
  featured: true,
  services: {
    dineIn: true,
    takeaway: true,
    delivery: true,
    reservations: true,
  },
  paymentMethods: ["Cash", "Credit Card", "Online Payment"],
  deliveryTime: "30-45 min",
  deliveryFee: 15,
  minimumOrder: 50,
  images: [
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
  ],
};

// Mock data for menu categories
const menuCategories = [
  { id: "appetizers", name: "Appetizers", iconName: "Salad" },
  {
    id: "main-courses",
    name: "Main Courses",
    iconName: "Utensils",
  },
  {
    id: "seafood",
    name: "Seafood Specialties",
    iconName: "Fish",
  },
  { id: "grills", name: "Grills", iconName: "Beef" },
  { id: "sides", name: "Side Dishes", iconName: "Pizza" },
  { id: "desserts", name: "Desserts", iconName: "Dessert" },
  { id: "beverages", name: "Beverages", iconName: "Coffee" },
];

// Mock data for menu items
const menuItems = {
  appetizers: [
    {
      id: "a1",
      name: "Seafood Soup",
      description: "Rich seafood soup with shrimp, mussels, and fresh herbs",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=800&q=80",
      popular: true,
      spicy: false,
      vegetarian: false,
      preparationTime: "15 min",
    },
    {
      id: "a2",
      name: "Calamari Rings",
      description: "Crispy fried calamari rings served with tartar sauce",
      price: 55,
      image:
        "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=800&q=80",
      popular: true,
      spicy: false,
      vegetarian: false,
      preparationTime: "20 min",
    },
    {
      id: "a3",
      name: "Shrimp Cocktail",
      description: "Chilled shrimp served with cocktail sauce and lemon",
      price: 65,
      image:
        "https://images.unsplash.com/photo-1565802527863-1353e4e273e9?w=800&q=80",
      popular: false,
      spicy: false,
      vegetarian: false,
      preparationTime: "10 min",
    },
  ],
  "main-courses": [
    {
      id: "m1",
      name: "Grilled Salmon",
      description:
        "Fresh salmon fillet grilled to perfection, served with seasonal vegetables",
      price: 110,
      image:
        "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
      popular: true,
      spicy: false,
      vegetarian: false,
      preparationTime: "25 min",
    },
    {
      id: "m2",
      name: "Seafood Pasta",
      description: "Linguine pasta with mixed seafood in a rich tomato sauce",
      price: 95,
      image:
        "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80",
      popular: true,
      spicy: true,
      vegetarian: false,
      preparationTime: "30 min",
    },
    {
      id: "m3",
      name: "Beef Tenderloin",
      description:
        "Prime beef tenderloin steak cooked to your preference, served with mashed potatoes",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
      popular: false,
      spicy: false,
      vegetarian: false,
      preparationTime: "35 min",
    },
  ],
  seafood: [
    {
      id: "s1",
      name: "Lobster Thermidor",
      description:
        "Lobster cooked with a creamy mixture of egg yolks and brandy, served in its shell",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1553247407-23251ce81f59?w=800&q=80",
      popular: true,
      spicy: false,
      vegetarian: false,
      preparationTime: "40 min",
    },
    {
      id: "s2",
      name: "Seafood Platter",
      description:
        "Selection of fresh seafood including oysters, mussels, shrimp, and crab",
      price: 280,
      image:
        "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&q=80",
      popular: true,
      spicy: false,
      vegetarian: false,
      preparationTime: "45 min",
    },
    {
      id: "s3",
      name: "Grilled Octopus",
      description: "Tender octopus grilled with olive oil, lemon, and herbs",
      price: 130,
      image:
        "https://images.unsplash.com/photo-1518732751612-2c0787ff5684?w=800&q=80",
      popular: false,
      spicy: false,
      vegetarian: false,
      preparationTime: "35 min",
    },
  ],
  grills: [
    {
      id: "g1",
      name: "Mixed Grill Platter",
      description:
        "Selection of grilled meats including lamb chops, beef kebabs, and chicken",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
      popular: true,
      spicy: false,
      vegetarian: false,
      preparationTime: "40 min",
    },
    {
      id: "g2",
      name: "Grilled Jumbo Prawns",
      description:
        "Jumbo prawns marinated and grilled, served with garlic butter",
      price: 160,
      image:
        "https://images.unsplash.com/photo-1559742811-822873691df8?w=800&q=80",
      popular: true,
      spicy: false,
      vegetarian: false,
      preparationTime: "30 min",
    },
  ],
  sides: [
    {
      id: "sd1",
      name: "Truffle Fries",
      description: "Crispy fries tossed with truffle oil and parmesan cheese",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=800&q=80",
      popular: true,
      spicy: false,
      vegetarian: true,
      preparationTime: "15 min",
    },
    {
      id: "sd2",
      name: "Grilled Vegetables",
      description: "Seasonal vegetables grilled with olive oil and herbs",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&q=80",
      popular: false,
      spicy: false,
      vegetarian: true,
      preparationTime: "20 min",
    },
  ],
  desserts: [
    {
      id: "d1",
      name: "Chocolate Fondant",
      description:
        "Warm chocolate cake with a molten center, served with vanilla ice cream",
      price: 55,
      image:
        "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=800&q=80",
      popular: true,
      spicy: false,
      vegetarian: true,
      preparationTime: "25 min",
    },
    {
      id: "d2",
      name: "Crème Brûlée",
      description:
        "Classic French dessert with rich custard base and caramelized sugar top",
      price: 50,
      image:
        "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80",
      popular: true,
      spicy: false,
      vegetarian: true,
      preparationTime: "20 min",
    },
  ],
  beverages: [
    {
      id: "b1",
      name: "Fresh Fruit Juice",
      description: "Selection of freshly squeezed juices",
      price: 30,
      image:
        "https://images.unsplash.com/photo-1546171753-e89320f9b720?w=800&q=80",
      popular: true,
      spicy: false,
      vegetarian: true,
      preparationTime: "10 min",
    },
    {
      id: "b2",
      name: "Signature Mocktail",
      description:
        "House special non-alcoholic cocktail with fresh fruits and herbs",
      price: 40,
      image:
        "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800&q=80",
      popular: true,
      spicy: false,
      vegetarian: true,
      preparationTime: "15 min",
    },
    {
      id: "b3",
      name: "Premium Coffee",
      description:
        "Selection of premium coffee including espresso, cappuccino, and latte",
      price: 35,
      image:
        "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
      popular: false,
      spicy: false,
      vegetarian: true,
      preparationTime: "10 min",
    },
  ],
};

const RestaurantDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [restaurant, setRestaurant] = useState(mockRestaurant);
  const [selectedCategory, setSelectedCategory] = useState("appetizers");
  const [cart, setCart] = useState<Array<{ item: any; quantity: number }>>([]);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [orderType, setOrderType] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [guestCount, setGuestCount] = useState(2);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  // Add item to cart
  const addToCart = (item: any) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.item.id === item.id,
      );

      if (existingItemIndex >= 0) {
        // Item already in cart, increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Add new item to cart
        return [...prevCart, { item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (itemId: string) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.item.id !== itemId),
    );
  };

  // Update item quantity in cart
  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCart((prevCart) => {
      return prevCart.map((cartItem) =>
        cartItem.item.id === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem,
      );
    });
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.item.price * cartItem.quantity,
      0,
    );
  };

  // Generate a random 4-digit confirmation code
  const generateConfirmationCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Handle order submission
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a confirmation code
    const code = generateConfirmationCode();
    setConfirmationCode(code);

    // Create cart item for the header cart
    const cartItems = cart.map((cartItem) => ({
      id: Math.random().toString(36).substr(2, 9),
      workerId: id || "",
      workerName: restaurant.name,
      workerImage: restaurant.image,
      service: cartItem.item.name,
      price: cartItem.item.price * cartItem.quantity,
      date:
        orderType === "dine-in"
          ? reservationDate
          : new Date().toISOString().split("T")[0],
      time:
        orderType === "dine-in"
          ? reservationTime
          : new Date().toLocaleTimeString(),
      status: "Pending Confirmation",
      quantity: cartItem.quantity,
      orderType: orderType,
      specialInstructions: specialInstructions,
      deliveryAddress: orderType === "delivery" ? deliveryAddress : "",
      contactPhone: contactPhone,
      paymentMethod: paymentMethod,
    }));

    // Get existing cart or create new one
    const existingCart = localStorage.getItem("serviceCart");
    const headerCart = existingCart ? JSON.parse(existingCart) : [];

    // Add new items to cart
    cartItems.forEach((item) => headerCart.push(item));

    // Save updated cart
    localStorage.setItem("serviceCart", JSON.stringify(headerCart));

    // Close dialog and clear local cart
    setShowOrderDialog(false);
    setCart([]);

    // Navigate to checkout
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header
        isAuthenticated={false}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />

      {/* Main content */}
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Restaurant header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="relative h-[300px]">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {restaurant.name}
                  </h1>
                  <div className="flex flex-wrap items-center text-white gap-3 mb-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">
                        {restaurant.rating.toFixed(1)}
                      </span>
                      <span className="text-gray-300 text-sm ml-1">
                        ({restaurant.reviewCount} reviews)
                      </span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span>{restaurant.cuisine}</span>
                    <span className="text-gray-300">•</span>
                    <span>{restaurant.priceRange}</span>
                  </div>
                  <div className="flex flex-wrap items-center text-gray-300 gap-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{restaurant.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{restaurant.openingHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {restaurant.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-700 mb-4">{restaurant.description}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  <span>{restaurant.phone}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-primary" />
                  <span>{restaurant.website}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Menu section */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar - Menu Categories */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
                <h3 className="font-bold text-lg mb-4">Menu Categories</h3>
                <div className="space-y-1">
                  {menuCategories.map((category) => (
                    <Button
                      key={category.id}
                      variant={
                        selectedCategory === category.id ? "default" : "ghost"
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.iconName === "Salad" && (
                        <Salad className="h-5 w-5" />
                      )}
                      {category.iconName === "Utensils" && (
                        <Utensils className="h-5 w-5" />
                      )}
                      {category.iconName === "Fish" && (
                        <Fish className="h-5 w-5" />
                      )}
                      {category.iconName === "Beef" && (
                        <Beef className="h-5 w-5" />
                      )}
                      {category.iconName === "Pizza" && (
                        <Pizza className="h-5 w-5" />
                      )}
                      {category.iconName === "Dessert" && (
                        <Dessert className="h-5 w-5" />
                      )}
                      {category.iconName === "Coffee" && (
                        <Coffee className="h-5 w-5" />
                      )}
                      <span className="ml-2">{category.name}</span>
                    </Button>
                  ))}
                </div>

                <Separator className="my-4" />

                <h3 className="font-bold text-lg mb-4">Services</h3>
                <div className="space-y-2">
                  {restaurant.services.dineIn && (
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Dine-in</span>
                    </div>
                  )}
                  {restaurant.services.takeaway && (
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Takeaway</span>
                    </div>
                  )}
                  {restaurant.services.delivery && (
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Delivery ({restaurant.deliveryTime})</span>
                    </div>
                  )}
                  {restaurant.services.reservations && (
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Reservations</span>
                    </div>
                  )}
                </div>

                {/* Cart summary - Always visible */}
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Your Order</h3>
                  {cart.length > 0 ? (
                    <>
                      <div className="space-y-2 mb-3 max-h-[300px] overflow-y-auto">
                        {cart.map((cartItem) => (
                          <div
                            key={cartItem.item.id}
                            className="flex justify-between items-center py-1"
                          >
                            <div className="flex items-center">
                              <div className="flex items-center mr-2">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    updateQuantity(
                                      cartItem.item.id,
                                      cartItem.quantity - 1,
                                    )
                                  }
                                  disabled={cartItem.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="mx-1 text-sm">
                                  {cartItem.quantity}
                                </span>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() =>
                                    updateQuantity(
                                      cartItem.item.id,
                                      cartItem.quantity + 1,
                                    )
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <span className="text-sm truncate max-w-[120px]">
                                {cartItem.item.name}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm">
                                $
                                {(
                                  cartItem.item.price * cartItem.quantity
                                ).toFixed(2)}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-1 text-gray-400 hover:text-red-500"
                                onClick={() => removeFromCart(cartItem.item.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                      <Button
                        className="w-full mt-3"
                        onClick={() => {
                          // Create cart items and add directly to header cart
                          const cartItems = cart.map((cartItem) => ({
                            id: Math.random().toString(36).substr(2, 9),
                            workerId: id || "",
                            workerName: restaurant.name,
                            workerImage: restaurant.image,
                            service: cartItem.item.name,
                            price: cartItem.item.price * cartItem.quantity,
                            date: new Date().toISOString().split("T")[0],
                            time: new Date().toLocaleTimeString(),
                            status: "Pending Confirmation",
                            quantity: cartItem.quantity,
                          }));

                          // Get existing cart or create new one
                          const existingCart =
                            localStorage.getItem("serviceCart");
                          const headerCart = existingCart
                            ? JSON.parse(existingCart)
                            : [];

                          // Add new items to cart
                          cartItems.forEach((item) => headerCart.push(item));

                          // Save updated cart
                          localStorage.setItem(
                            "serviceCart",
                            JSON.stringify(headerCart),
                          );

                          // Clear local cart
                          setCart([]);

                          // Navigate to checkout
                          navigate("/checkout");
                        }}
                      >
                        إضافة إلى السلة
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <ShoppingCart className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>Your cart is empty</p>
                      <p className="text-sm mt-1">
                        Add items from the menu to start your order
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main content - Menu Items */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6">
                  {menuCategories.find((cat) => cat.id === selectedCategory)
                    ?.name || "Menu"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {menuItems[selectedCategory]?.map((item) => (
                    <Card
                      key={item.id}
                      className="overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row h-full">
                        <div className="md:w-1/3 h-[120px] md:h-auto">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4 flex flex-col flex-grow">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold">{item.name}</h3>
                            <span className="font-bold text-primary">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {item.description}
                          </p>
                          <div className="flex items-center mt-auto justify-between">
                            <div className="flex flex-wrap gap-2">
                              {item.popular && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200"
                                >
                                  Popular
                                </Badge>
                              )}
                              {item.spicy && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-red-100 text-red-800 border-red-200"
                                >
                                  Spicy
                                </Badge>
                              )}
                              {item.vegetarian && (
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-green-100 text-green-800 border-green-200"
                                >
                                  Vegetarian
                                </Badge>
                              )}
                            </div>
                            <Button
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart(item);
                              }}
                              className="ml-2"
                              type="button"
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Order dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Order</DialogTitle>
            <DialogDescription>
              Please provide the details to complete your order
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleOrderSubmit} className="space-y-4 py-4">
            {/* Order type selection */}
            <div className="space-y-2">
              <Label>Order Type</Label>
              <RadioGroup
                value={orderType}
                onValueChange={setOrderType}
                className="flex flex-col space-y-1"
              >
                {restaurant.services.delivery && (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label
                      htmlFor="delivery"
                      className="flex items-center cursor-pointer"
                    >
                      <Truck className="mr-2 h-4 w-4" />
                      Delivery
                    </Label>
                  </div>
                )}
                {restaurant.services.takeaway && (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="takeaway" id="takeaway" />
                    <Label
                      htmlFor="takeaway"
                      className="flex items-center cursor-pointer"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Takeaway
                    </Label>
                  </div>
                )}
                {restaurant.services.dineIn && (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="dine-in" id="dine-in" />
                    <Label
                      htmlFor="dine-in"
                      className="flex items-center cursor-pointer"
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Dine-in (Reservation)
                    </Label>
                  </div>
                )}
              </RadioGroup>
            </div>

            {/* Delivery address (for delivery) */}
            {orderType === "delivery" && (
              <div className="space-y-2">
                <Label htmlFor="deliveryAddress">Delivery Address</Label>
                <Input
                  id="deliveryAddress"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  required
                />
                <p className="text-xs text-gray-500">
                  <Info className="h-3 w-3 inline mr-1" />
                  Delivery fee: ${restaurant.deliveryFee}. Minimum order: $
                  {restaurant.minimumOrder}
                </p>
              </div>
            )}

            {/* Reservation details (for dine-in) */}
            {orderType === "dine-in" && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reservationDate">Date</Label>
                    <Input
                      id="reservationDate"
                      type="date"
                      value={reservationDate}
                      onChange={(e) => setReservationDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reservationTime">Time</Label>
                    <Input
                      id="reservationTime"
                      type="time"
                      value={reservationTime}
                      onChange={(e) => setReservationTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guestCount">Number of Guests</Label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      disabled={guestCount <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-4">{guestCount}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setGuestCount(guestCount + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Contact information */}
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
              />
            </div>

            {/* Payment method */}
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label
                    htmlFor="cash"
                    className="flex items-center cursor-pointer"
                  >
                    <Wallet className="mr-2 h-4 w-4" />
                    Cash on {orderType === "delivery" ? "Delivery" : "Pickup"}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label
                    htmlFor="card"
                    className="flex items-center cursor-pointer"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit/Debit Card
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Credit Card Payment Form */}
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
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">رقم البطاقة</Label>
                  <Input
                    id="cardNumber"
                    placeholder="XXXX XXXX XXXX XXXX"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                    <Input id="expiryDate" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">رمز الأمان (CVV)</Label>
                    <Input id="cvv" placeholder="XXX" required />
                  </div>
                </div>
                <div className="flex justify-center space-x-4 rtl:space-x-reverse">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/800px-Visa_Inc._logo.svg.png"
                    alt="Visa"
                    className="h-8"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/800px-Mastercard-logo.svg.png"
                    alt="Mastercard"
                    className="h-8"
                  />
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/800px-American_Express_logo_%282018%29.svg.png"
                    alt="American Express"
                    className="h-8"
                  />
                </div>
                <p className="text-xs text-center text-gray-500">
                  <Info className="h-3 w-3 inline mr-1" />
                  جميع المعاملات آمنة ومشفرة
                </p>
              </div>
            )}

            {/* Special instructions */}
            <div className="space-y-2">
              <Label htmlFor="specialInstructions">
                Special Instructions (Optional)
              </Label>
              <Textarea
                id="specialInstructions"
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Any special requests or dietary requirements?"
                className="resize-none"
              />
            </div>

            {/* Order summary */}
            <div className="space-y-2 bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium">Order Summary</h4>
              <div className="max-h-[120px] overflow-y-auto space-y-2">
                {cart.map((cartItem) => (
                  <div
                    key={cartItem.item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="flex items-center mr-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            updateQuantity(
                              cartItem.item.id,
                              cartItem.quantity - 1,
                            )
                          }
                          disabled={cartItem.quantity <= 1}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-1 text-sm">
                          {cartItem.quantity}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() =>
                            updateQuantity(
                              cartItem.item.id,
                              cartItem.quantity + 1,
                            )
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-sm">{cartItem.item.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">
                        ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 ml-1 text-gray-400 hover:text-red-500"
                        onClick={() => removeFromCart(cartItem.item.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Subtotal:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              {orderType === "delivery" && (
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee:</span>
                  <span>${restaurant.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>
                  $
                  {(
                    calculateTotal() +
                    (orderType === "delivery" ? restaurant.deliveryFee : 0)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowOrderDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit">إضافة إلى السلة</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Confirmed!</DialogTitle>
            <DialogDescription>
              Your order has been successfully placed.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            <div className="flex flex-col items-center justify-center p-6 bg-primary/10 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Your Confirmation Code</h3>
              <div className="text-3xl font-bold tracking-widest">
                {confirmationCode}
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {orderType === "dine-in"
                  ? "Show this code to the staff when you arrive"
                  : orderType === "takeaway"
                    ? "Show this code when picking up your order"
                    : "Provide this code to the delivery person"}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Order Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Order Type:</span>
                </div>
                <div>
                  <span className="font-medium">
                    {orderType === "dine-in"
                      ? "Dine-in"
                      : orderType === "takeaway"
                        ? "Takeaway"
                        : "Delivery"}
                  </span>
                </div>

                {orderType === "dine-in" && (
                  <>
                    <div>
                      <span className="text-gray-500">Reservation:</span>
                    </div>
                    <div>
                      <span className="font-medium">
                        {reservationDate} at {reservationTime}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Guests:</span>
                    </div>
                    <div>
                      <span className="font-medium">{guestCount}</span>
                    </div>
                  </>
                )}

                {orderType === "delivery" && (
                  <>
                    <div>
                      <span className="text-gray-500">Delivery Address:</span>
                    </div>
                    <div>
                      <span className="font-medium">{deliveryAddress}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Estimated Delivery:</span>
                    </div>
                    <div>
                      <span className="font-medium">
                        {restaurant.deliveryTime}
                      </span>
                    </div>
                  </>
                )}

                {orderType === "takeaway" && (
                  <>
                    <div>
                      <span className="text-gray-500">Pickup Time:</span>
                    </div>
                    <div>
                      <span className="font-medium">~30 minutes</span>
                    </div>
                  </>
                )}

                <div>
                  <span className="text-gray-500">Payment Method:</span>
                </div>
                <div>
                  <span className="font-medium">
                    {paymentMethod === "cash"
                      ? `Cash on ${orderType === "delivery" ? "Delivery" : "Pickup"}`
                      : "Credit/Debit Card"}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500">Total Amount:</span>
                </div>
                <div>
                  <span className="font-medium">
                    $
                    {(
                      calculateTotal() +
                      (orderType === "delivery" ? restaurant.deliveryFee : 0)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                setShowConfirmation(false);
                setCart([]);
              }}
              className="w-full"
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantDetailPage;
