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
  Phone,
  Globe,
  Check,
  Plus,
  Minus,
  ShoppingCart,
  Truck,
  CreditCard,
  Wallet,
  Info,
  X,
  ShoppingBag,
  Apple,
  Beef,
  Milk,
  Coffee,
} from "lucide-react";

// Mock data for grocery store
const mockGroceryStore = {
  id: "1",
  name: "Al Madina Supermarket",
  description: "Local supermarket with fresh produce and daily essentials",
  category: "Supermarket",
  priceRange: "$$",
  rating: 4.5,
  reviewCount: 312,
  location: "Al Barsha, Dubai",
  distance: 1.2, // in km
  openingHours: "7:00 AM - 12:00 AM",
  phone: "+971 4 123 4567",
  website: "www.almadinasupermarket.com",
  image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
  features: [
    "Fresh Produce",
    "Bakery",
    "Butcher",
    "Delivery Service",
    "Parking Available",
    "Pharmacy",
    "ATM Services",
    "Customer Service",
  ],
  tags: ["Groceries", "Fresh Food", "Household Items"],
  featured: true,
  services: {
    inStore: true,
    onlineShop: true,
    delivery: true,
    curbsidePickup: true,
  },
  paymentMethods: ["Cash", "Credit Card", "Online Payment", "Mobile Payment"],
  deliveryTime: "30-60 minutes",
  deliveryFee: 10,
  minimumOrder: 50,
  images: [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80",
    "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800&q=80",
    "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?w=800&q=80",
  ],
};

// Mock data for grocery departments
const groceryDepartments = [
  { id: "fruits-vegetables", name: "Fruits & Vegetables", iconName: "Apple" },
  { id: "meat-seafood", name: "Meat & Seafood", iconName: "Beef" },
  { id: "dairy-eggs", name: "Dairy & Eggs", iconName: "Milk" },
  { id: "bakery", name: "Bakery", iconName: "Bread" },
  { id: "pantry", name: "Pantry & Dry Goods", iconName: "ShoppingBag" },
  { id: "beverages", name: "Beverages", iconName: "Coffee" },
  { id: "household", name: "Household Items", iconName: "ShoppingBag" },
];

// Mock data for products
const groceryProducts = {
  "fruits-vegetables": [
    {
      id: "fv1",
      name: "Organic Bananas",
      description: "Fresh organic bananas, sold by weight",
      price: 7.99,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=800&q=80",
      popular: true,
      sale: false,
      organic: true,
      brand: "Organic Farms",
    },
    {
      id: "fv2",
      name: "Red Apples",
      description: "Sweet and crisp red apples, perfect for snacking",
      price: 9.5,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80",
      popular: true,
      sale: true,
      salePrice: 7.99,
      organic: false,
      brand: "Fresh Harvest",
    },
    {
      id: "fv3",
      name: "Mixed Vegetables Pack",
      description: "Assorted fresh vegetables for cooking",
      price: 15.99,
      unit: "pack",
      image:
        "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&q=80",
      popular: false,
      sale: false,
      organic: false,
      brand: "Local Farms",
    },
  ],
  "meat-seafood": [
    {
      id: "ms1",
      name: "Fresh Chicken Breast",
      description: "Boneless, skinless chicken breast fillets",
      price: 32.99,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&q=80",
      popular: true,
      sale: false,
      organic: false,
      brand: "Premium Poultry",
    },
    {
      id: "ms2",
      name: "Beef Mince",
      description: "Premium ground beef, ideal for burgers and meatballs",
      price: 45.99,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=800&q=80",
      popular: true,
      sale: true,
      salePrice: 39.99,
      organic: false,
      brand: "Quality Meats",
    },
    {
      id: "ms3",
      name: "Fresh Salmon Fillet",
      description: "Atlantic salmon fillets, rich in omega-3",
      price: 69.99,
      unit: "kg",
      image:
        "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?w=800&q=80",
      popular: false,
      sale: false,
      organic: false,
      brand: "Ocean Fresh",
    },
  ],
  "dairy-eggs": [
    {
      id: "de1",
      name: "Fresh Milk",
      description: "Full-fat fresh cow's milk",
      price: 7.5,
      unit: "liter",
      image:
        "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80",
      popular: true,
      sale: false,
      organic: false,
      brand: "Dairy Fresh",
    },
    {
      id: "de2",
      name: "Free-Range Eggs",
      description: "Farm fresh free-range eggs",
      price: 12.99,
      unit: "dozen",
      image:
        "https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=800&q=80",
      popular: true,
      sale: true,
      salePrice: 10.99,
      organic: true,
      brand: "Happy Hens",
    },
    {
      id: "de3",
      name: "Greek Yogurt",
      description: "Creamy Greek yogurt, plain flavor",
      price: 9.99,
      unit: "500g",
      image:
        "https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=800&q=80",
      popular: false,
      sale: false,
      organic: false,
      brand: "Creamy Delights",
    },
  ],
  bakery: [
    {
      id: "b1",
      name: "Artisan Bread",
      description: "Freshly baked artisan sourdough bread",
      price: 8.99,
      unit: "loaf",
      image:
        "https://images.unsplash.com/photo-1549931319-a545dcf3bc7c?w=800&q=80",
      popular: true,
      sale: false,
      organic: false,
      brand: "Artisan Bakery",
    },
    {
      id: "b2",
      name: "Croissants",
      description: "Buttery, flaky French croissants",
      price: 12.99,
      unit: "pack of 4",
      image:
        "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80",
      popular: true,
      sale: true,
      salePrice: 9.99,
      organic: false,
      brand: "French Delights",
    },
  ],
  pantry: [
    {
      id: "p1",
      name: "Basmati Rice",
      description: "Premium long-grain basmati rice",
      price: 19.99,
      unit: "5kg",
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=800&q=80",
      popular: true,
      sale: false,
      organic: false,
      brand: "Royal Harvest",
    },
    {
      id: "p2",
      name: "Extra Virgin Olive Oil",
      description: "Cold-pressed extra virgin olive oil",
      price: 39.99,
      unit: "750ml",
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80",
      popular: true,
      sale: true,
      salePrice: 34.99,
      organic: true,
      brand: "Mediterranean Gold",
    },
  ],
  beverages: [
    {
      id: "bv1",
      name: "Mineral Water",
      description: "Natural spring mineral water",
      price: 9.99,
      unit: "pack of 6",
      image:
        "https://images.unsplash.com/photo-1564419320461-6870880221ad?w=800&q=80",
      popular: true,
      sale: false,
      organic: false,
      brand: "Crystal Springs",
    },
    {
      id: "bv2",
      name: "Orange Juice",
      description: "100% pure squeezed orange juice, not from concentrate",
      price: 12.99,
      unit: "1 liter",
      image:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&q=80",
      popular: true,
      sale: true,
      salePrice: 10.99,
      organic: false,
      brand: "Fresh Squeeze",
    },
  ],
  household: [
    {
      id: "h1",
      name: "Laundry Detergent",
      description: "Concentrated liquid laundry detergent",
      price: 29.99,
      unit: "2 liter",
      image:
        "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&q=80",
      popular: true,
      sale: false,
      organic: false,
      brand: "Clean & Fresh",
    },
    {
      id: "h2",
      name: "Kitchen Paper Towels",
      description: "Absorbent kitchen paper towels",
      price: 14.99,
      unit: "pack of 6",
      image:
        "https://images.unsplash.com/photo-1583251633146-d0c6c036187d?w=800&q=80",
      popular: true,
      sale: true,
      salePrice: 12.99,
      organic: false,
      brand: "Home Essentials",
    },
  ],
};

// Mock reviews data
const mockReviews = [
  {
    id: "r1",
    storeId: "1",
    userName: "Mohammed K.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
    rating: 5,
    date: "2023-12-15",
    comment:
      "Great supermarket with excellent selection of fresh produce. The staff are very helpful and the prices are reasonable.",
  },
  {
    id: "r2",
    storeId: "1",
    userName: "Aisha S.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    rating: 4,
    date: "2023-11-20",
    comment:
      "I shop here regularly for my groceries. They have a good variety of products and the bakery section is amazing. Delivery service is also reliable.",
  },
  {
    id: "r3",
    storeId: "1",
    userName: "Omar J.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    rating: 5,
    date: "2023-10-05",
    comment:
      "This is my go-to supermarket for all my grocery needs. The meat section has high-quality products and the staff at the butcher counter are knowledgeable.",
  },
];

const GroceryDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [store, setStore] = useState(mockGroceryStore);
  const [selectedDepartment, setSelectedDepartment] =
    useState("fruits-vegetables");
  const [cart, setCart] = useState<
    Array<{ item: any; quantity: number; options?: any }>
  >([]);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [orderType, setOrderType] = useState("delivery");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  // Fetch store data and reviews
  useEffect(() => {
    if (id) {
      // In a real app, this would fetch data from an API
      setStore(mockGroceryStore);

      // Get reviews for this store
      const storeReviews = mockReviews.filter(
        (review) => review.storeId === id,
      );
      setReviews(storeReviews);
    }
  }, [id]);

  // Add item to cart
  const addToCart = (item: any, quantity: number = 1, options = {}) => {
    setCart((prevCart) => {
      // Create a unique identifier for the item with its options
      const itemKey = `${item.id}-${JSON.stringify(options)}`;

      const existingItemIndex = prevCart.findIndex(
        (cartItem) =>
          cartItem.item.id === item.id &&
          JSON.stringify(cartItem.options || {}) === JSON.stringify(options),
      );

      if (existingItemIndex >= 0) {
        // Item with same options already in cart, increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Add new item to cart with options
        return [...prevCart, { item, quantity, options }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Update item quantity in cart
  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = newQuantity;
      return updatedCart;
    });
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, cartItem) => {
      const itemPrice = cartItem.item.salePrice || cartItem.item.price;
      return total + itemPrice * cartItem.quantity;
    }, 0);
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

    // In a real app, this would submit the order to a backend
    console.log("Order submitted:", {
      storeId: id,
      items: cart,
      orderType,
      paymentMethod,
      deliveryAddress: orderType === "delivery" ? deliveryAddress : null,
      contactPhone,
      specialInstructions,
      totalAmount: calculateTotal(),
      confirmationCode: code,
    });

    // Show confirmation dialog
    setShowOrderDialog(false);
    setShowConfirmation(true);
  };

  // Handle product selection
  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setSelectedQuantity(1);
    setShowProductDialog(true);
  };

  // Add selected product to cart
  const addSelectedProductToCart = () => {
    addToCart(selectedProduct, selectedQuantity);
    setShowProductDialog(false);
  };

  // Get department icon
  const getDepartmentIcon = (iconName: string) => {
    switch (iconName) {
      case "Apple":
        return <Apple className="h-5 w-5" />;
      case "Beef":
        return <Beef className="h-5 w-5" />;
      case "Milk":
        return <Milk className="h-5 w-5" />;
      case "Bread":
        return <ShoppingBag className="h-5 w-5" />;
      case "Coffee":
        return <Coffee className="h-5 w-5" />;
      case "ShoppingBag":
        return <ShoppingBag className="h-5 w-5" />;
      default:
        return <ShoppingBag className="h-5 w-5" />;
    }
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
          {/* Store header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="relative h-[300px]">
              <img
                src={store.image}
                alt={store.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {store.name}
                  </h1>
                  <div className="flex flex-wrap items-center text-white gap-3 mb-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">
                        {store.rating.toFixed(1)}
                      </span>
                      <span className="text-gray-300 text-sm ml-1">
                        ({store.reviewCount} reviews)
                      </span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span>{store.category}</span>
                    <span className="text-gray-300">•</span>
                    <span>{store.priceRange}</span>
                  </div>
                  <div className="flex flex-wrap items-center text-gray-300 gap-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{store.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{store.openingHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {store.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-700 mb-4">{store.description}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-primary" />
                  <span>{store.website}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Store content */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar - Store Departments */}
            <div className="w-full md:w-64 flex-shrink-0">
              <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
                <h3 className="font-bold text-lg mb-4">Departments</h3>
                <div className="space-y-1">
                  {groceryDepartments.map((department) => (
                    <Button
                      key={department.id}
                      variant={
                        selectedDepartment === department.id
                          ? "default"
                          : "ghost"
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedDepartment(department.id)}
                    >
                      {getDepartmentIcon(department.iconName)}
                      <span className="ml-2">{department.name}</span>
                    </Button>
                  ))}
                </div>

                <Separator className="my-4" />

                <h3 className="font-bold text-lg mb-4">Services</h3>
                <div className="space-y-2">
                  {store.services.inStore && (
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>In-Store Shopping</span>
                    </div>
                  )}
                  {store.services.onlineShop && (
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Online Shopping</span>
                    </div>
                  )}
                  {store.services.delivery && (
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Delivery ({store.deliveryTime})</span>
                    </div>
                  )}
                  {store.services.curbsidePickup && (
                    <div className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Curbside Pickup</span>
                    </div>
                  )}
                </div>

                {/* Cart summary - Always visible */}
                <div className="mt-6 p-4 bg-primary/10 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Your Cart</h3>
                  {cart.length > 0 ? (
                    <>
                      <div className="space-y-2 mb-3 max-h-[300px] overflow-y-auto">
                        {cart.map((cartItem, index) => (
                          <div
                            key={index}
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
                                    updateQuantity(index, cartItem.quantity - 1)
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
                                    updateQuantity(index, cartItem.quantity + 1)
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                              <div className="text-sm truncate max-w-[120px]">
                                <div>{cartItem.item.name}</div>
                                <div className="text-xs text-gray-500">
                                  {cartItem.item.unit}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm">
                                AED
                                {(
                                  (cartItem.item.salePrice ||
                                    cartItem.item.price) * cartItem.quantity
                                ).toFixed(2)}
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 ml-1 text-gray-400 hover:text-red-500"
                                onClick={() => removeFromCart(index)}
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
                        <span>AED {calculateTotal().toFixed(2)}</span>
                      </div>
                      <Button
                        className="w-full mt-3"
                        onClick={() => setShowOrderDialog(true)}
                      >
                        Checkout
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <ShoppingCart className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      <p>Your cart is empty</p>
                      <p className="text-sm mt-1">
                        Add items from the store to start your order
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Main content - Products */}
            <div className="flex-1">
              <Tabs defaultValue="products">
                <TabsList className="mb-4">
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* Products tab */}
                <TabsContent value="products">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-6">
                      {groceryDepartments.find(
                        (dept) => dept.id === selectedDepartment,
                      )?.name || "Products"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {groceryProducts[selectedDepartment]?.map((product) => (
                        <Card
                          key={product.id}
                          className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => handleProductClick(product)}
                        >
                          <div className="relative h-[200px]">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                            {product.sale && (
                              <Badge className="absolute top-2 right-2 bg-red-500">
                                Sale
                              </Badge>
                            )}
                            {product.organic && (
                              <Badge className="absolute top-2 left-2 bg-green-500">
                                Organic
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-1">
                              <h3 className="font-bold">{product.name}</h3>
                              <div>
                                {product.sale ? (
                                  <div className="text-right">
                                    <span className="font-bold text-primary">
                                      AED {product.salePrice.toFixed(2)}
                                    </span>
                                    <span className="text-sm text-gray-500 line-through ml-2">
                                      AED {product.price.toFixed(2)}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="font-bold text-primary">
                                    AED {product.price.toFixed(2)}
                                  </span>
                                )}
                                <div className="text-xs text-gray-500 text-right">
                                  per {product.unit}
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {product.description}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-500">
                                {product.brand}
                              </span>
                              <Button
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(product, 1);
                                }}
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {(!groceryProducts[selectedDepartment] ||
                      groceryProducts[selectedDepartment].length === 0) && (
                      <div className="text-center py-12">
                        <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          No products found in this department
                        </h3>
                        <p className="text-gray-500">
                          Please check other departments or visit again later
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* About tab */}
                <TabsContent value="about">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">
                      About {store.name}
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Description
                        </h3>
                        <p className="text-gray-700">{store.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Location & Hours
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="flex items-center text-gray-700 mb-2">
                              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                              {store.location}
                            </p>
                            <p className="flex items-center text-gray-700">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              {store.openingHours}
                            </p>
                          </div>
                          <div className="h-[200px] rounded-md overflow-hidden">
                            <iframe
                              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(store.location)}`}
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              title="Store Location"
                            ></iframe>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Features & Amenities
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {store.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Payment Methods
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {store.paymentMethods.map((method, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-gray-100"
                            >
                              {method}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Contact Information
                        </h3>
                        <p className="flex items-center text-gray-700 mb-2">
                          <Phone className="h-4 w-4 mr-2 text-gray-500" />
                          {store.phone}
                        </p>
                        <p className="flex items-center text-gray-700">
                          <Globe className="h-4 w-4 mr-2 text-gray-500" />
                          {store.website}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Reviews tab */}
                <TabsContent value="reviews">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">Reviews</h2>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">
                          {store.rating.toFixed(1)}
                        </span>
                        <span className="text-gray-500 ml-1">
                          ({reviews.length} reviews)
                        </span>
                      </div>
                    </div>

                    {reviews.length > 0 ? (
                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <Card key={review.id} className="p-0">
                            <CardContent className="p-4">
                              <div className="flex items-start">
                                <Avatar className="h-10 w-10 mr-3">
                                  <AvatarImage
                                    src={review.userAvatar}
                                    alt={review.userName}
                                  />
                                  <AvatarFallback>
                                    {review.userName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <h4 className="font-medium">
                                        {review.userName}
                                      </h4>
                                      <p className="text-sm text-gray-500">
                                        {new Date(
                                          review.date,
                                        ).toLocaleDateString()}
                                      </p>
                                    </div>
                                    <div className="flex items-center">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                          key={i}
                                          className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                        />
                                      ))}
                                    </div>
                                  </div>
                                  <p className="mt-2 text-gray-700">
                                    {review.comment}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">
                        No reviews yet for this store.
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Product dialog */}
      <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
                <DialogDescription>
                  {selectedProduct.description}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="relative h-[200px] mb-4 rounded-md overflow-hidden">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  {selectedProduct.sale && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      Sale
                    </Badge>
                  )}
                  {selectedProduct.organic && (
                    <Badge className="absolute top-2 left-2 bg-green-500">
                      Organic
                    </Badge>
                  )}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    {selectedProduct.brand}
                  </span>
                  <div>
                    {selectedProduct.sale ? (
                      <div>
                        <span className="font-bold text-primary text-xl">
                          AED {selectedProduct.salePrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          AED {selectedProduct.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-primary text-xl">
                        AED {selectedProduct.price.toFixed(2)}
                      </span>
                    )}
                    <div className="text-xs text-gray-500 text-right">
                      per {selectedProduct.unit}
                    </div>
                  </div>
                </div>

                {/* Quantity selection */}
                <div className="mb-4">
                  <Label className="mb-2 block">Quantity</Label>
                  <div className="flex items-center">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        setSelectedQuantity(Math.max(1, selectedQuantity - 1))
                      }
                      disabled={selectedQuantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-4">{selectedQuantity}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Additional product details */}
                <div className="space-y-2 mt-4">
                  {selectedProduct.organic && (
                    <div className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Certified Organic Product</span>
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowProductDialog(false)}
                >
                  Cancel
                </Button>
                <Button onClick={addSelectedProductToCart}>Add to Cart</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

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
                {store.services.delivery && (
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
                {store.services.curbsidePickup && (
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label
                      htmlFor="pickup"
                      className="flex items-center cursor-pointer"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Curbside Pickup
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
                  Delivery fee: AED {store.deliveryFee}. Minimum order: AED
                  {store.minimumOrder}
                </p>
              </div>
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
                placeholder="Any special requests?"
                className="resize-none"
              />
            </div>

            {/* Order summary */}
            <div className="space-y-2 bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium">Order Summary</h4>
              <div className="max-h-[120px] overflow-y-auto space-y-2">
                {cart.map((cartItem, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <span className="text-sm">{cartItem.item.name}</span>
                      {cartItem.options &&
                        Object.keys(cartItem.options).length > 0 && (
                          <span className="text-xs text-gray-500 ml-1">
                            (
                            {Object.entries(cartItem.options)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(", ")}
                            )
                          </span>
                        )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm">
                        AED
                        {(
                          (cartItem.item.salePrice || cartItem.item.price) *
                          cartItem.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium">
                <span>Subtotal:</span>
                <span>AED {calculateTotal().toFixed(2)}</span>
              </div>
              {orderType === "delivery" && (
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee:</span>
                  <span>AED {store.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>
                  AED
                  {(
                    calculateTotal() +
                    (orderType === "delivery" ? store.deliveryFee : 0)
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
              <Button type="submit">
                {orderType === "pickup"
                  ? "Place Pickup Order"
                  : "Place Delivery Order"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
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
                {orderType === "pickup"
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
                    {orderType === "pickup" ? "Pickup" : "Delivery"}
                  </span>
                </div>

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
                      <span className="font-medium">{store.deliveryTime}</span>
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
                    AED
                    {(
                      calculateTotal() +
                      (orderType === "delivery" ? store.deliveryFee : 0)
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

export default GroceryDetailPage;
