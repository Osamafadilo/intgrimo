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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
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
  Store,
  ShoppingBag,
  Shirt,
  Smartphone,
  Home,
  Gem,
  Glasses,
  Baby,
  BookOpen,
} from "lucide-react";

// Mock data for store
const mockStore = {
  id: "1",
  name: "Al Futtaim Mall",
  description:
    "Premium shopping mall with international brands and entertainment options",
  category: "Shopping Mall",
  priceRange: "$$$",
  rating: 4.7,
  reviewCount: 412,
  location: "Dubai Festival City, Dubai",
  distance: 2.5, // in km
  openingHours: "10:00 AM - 10:00 PM",
  phone: "+971 4 123 4567",
  website: "www.alfuttaimmall.com",
  image:
    "https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?w=800&q=80",
  features: [
    "Parking Available",
    "Food Court",
    "Wheelchair Accessible",
    "Free WiFi",
    "Cinema",
    "Children's Play Area",
    "Prayer Rooms",
    "ATM Services",
  ],
  tags: ["Fashion", "Electronics", "Home Goods", "Entertainment"],
  featured: true,
  services: {
    inStore: true,
    onlineShop: true,
    delivery: true,
    curbsidePickup: true,
  },
  paymentMethods: ["Cash", "Credit Card", "Online Payment", "Mobile Payment"],
  deliveryTime: "2-3 business days",
  deliveryFee: 20,
  minimumOrder: 100,
  images: [
    "https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?w=800&q=80",
    "https://images.unsplash.com/photo-1567449303078-57ad995bd17a?w=800&q=80",
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
    "https://images.unsplash.com/photo-1481437156560-3205f6a55735?w=800&q=80",
  ],
};

// Mock data for store departments
const storeDepartments = [
  { id: "fashion", name: "Fashion", iconName: "Shirt" },
  { id: "electronics", name: "Electronics", iconName: "Smartphone" },
  { id: "home", name: "Home & Living", iconName: "Home" },
  { id: "jewelry", name: "Jewelry", iconName: "Gem" },
  { id: "eyewear", name: "Eyewear", iconName: "Glasses" },
  { id: "kids", name: "Kids & Baby", iconName: "Baby" },
  { id: "books", name: "Books & Stationery", iconName: "BookOpen" },
];

// Mock data for products
const storeProducts = {
  fashion: [
    {
      id: "f1",
      name: "Premium Cotton T-Shirt",
      description: "High-quality cotton t-shirt with modern fit",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      popular: true,
      sale: false,
      newArrival: false,
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "White", "Navy"],
      brand: "Premium Basics",
    },
    {
      id: "f2",
      name: "Slim Fit Jeans",
      description: "Comfortable slim fit jeans with stretch fabric",
      price: 250,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      popular: true,
      sale: true,
      salePrice: 199,
      newArrival: false,
      sizes: ["30", "32", "34", "36"],
      colors: ["Blue", "Black", "Grey"],
      brand: "Denim Co.",
    },
    {
      id: "f3",
      name: "Summer Dress",
      description: "Light and flowy summer dress with floral pattern",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1612336307429-8a898d10e223?w=800&q=80",
      popular: false,
      sale: false,
      newArrival: true,
      sizes: ["XS", "S", "M", "L"],
      colors: ["Floral", "Blue", "Pink"],
      brand: "Summer Vibes",
    },
  ],
  electronics: [
    {
      id: "e1",
      name: "Wireless Earbuds",
      description: "Premium wireless earbuds with noise cancellation",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
      popular: true,
      sale: false,
      newArrival: true,
      brand: "SoundPro",
      warranty: "1 Year",
    },
    {
      id: "e2",
      name: "Smart Watch",
      description: "Feature-rich smartwatch with health monitoring",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80",
      popular: true,
      sale: true,
      salePrice: 699,
      newArrival: false,
      brand: "TechWear",
      warranty: "2 Years",
    },
    {
      id: "e3",
      name: "Bluetooth Speaker",
      description: "Portable bluetooth speaker with rich sound quality",
      price: 350,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
      popular: false,
      sale: false,
      newArrival: false,
      brand: "AudioMax",
      warranty: "1 Year",
    },
  ],
  home: [
    {
      id: "h1",
      name: "Decorative Cushion Set",
      description: "Set of 4 decorative cushions with modern patterns",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
      popular: true,
      sale: false,
      newArrival: true,
      brand: "HomeStyle",
    },
    {
      id: "h2",
      name: "Ceramic Dinner Set",
      description: "12-piece ceramic dinner set with elegant design",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=800&q=80",
      popular: false,
      sale: true,
      salePrice: 350,
      newArrival: false,
      brand: "DineElegant",
    },
    {
      id: "h3",
      name: "Bedside Lamp",
      description: "Modern bedside lamp with adjustable brightness",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
      popular: true,
      sale: false,
      newArrival: false,
      brand: "LightLux",
    },
  ],
  jewelry: [
    {
      id: "j1",
      name: "Gold Necklace",
      description: "18K gold necklace with pendant design",
      price: 2500,
      image:
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
      popular: true,
      sale: false,
      newArrival: false,
      brand: "GoldLux",
    },
    {
      id: "j2",
      name: "Diamond Earrings",
      description: "Elegant diamond stud earrings",
      price: 3200,
      image:
        "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=800&q=80",
      popular: true,
      sale: true,
      salePrice: 2800,
      newArrival: false,
      brand: "DiamondElite",
    },
  ],
  eyewear: [
    {
      id: "ey1",
      name: "Designer Sunglasses",
      description: "Premium designer sunglasses with UV protection",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
      popular: true,
      sale: false,
      newArrival: true,
      brand: "VisionLux",
    },
    {
      id: "ey2",
      name: "Reading Glasses",
      description: "Stylish reading glasses with blue light protection",
      price: 320,
      image:
        "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800&q=80",
      popular: false,
      sale: true,
      salePrice: 280,
      newArrival: false,
      brand: "ReadClear",
    },
  ],
  kids: [
    {
      id: "k1",
      name: "Children's Clothing Set",
      description: "Comfortable cotton clothing set for children",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1522771930-78848d9293e8?w=800&q=80",
      popular: true,
      sale: false,
      newArrival: true,
      sizes: ["2-3Y", "4-5Y", "6-7Y"],
      brand: "KidComfort",
    },
    {
      id: "k2",
      name: "Baby Toys Set",
      description: "Educational toys set for early development",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&q=80",
      popular: true,
      sale: true,
      salePrice: 180,
      newArrival: false,
      brand: "EduPlay",
    },
  ],
  books: [
    {
      id: "b1",
      name: "Bestselling Novel",
      description: "Award-winning fiction novel by renowned author",
      price: 85,
      image:
        "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&q=80",
      popular: true,
      sale: false,
      newArrival: true,
      brand: "LiteraryPress",
    },
    {
      id: "b2",
      name: "Premium Notebook Set",
      description: "Set of 3 premium notebooks with high-quality paper",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1531346680769-a1d79b57de5c?w=800&q=80",
      popular: false,
      sale: true,
      salePrice: 99,
      newArrival: false,
      brand: "WriteWell",
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
      "Great shopping experience! The mall has a wide variety of stores and the staff are very helpful. The food court offers excellent options too.",
  },
  {
    id: "r2",
    storeId: "1",
    userName: "Aisha S.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    rating: 4,
    date: "2023-11-20",
    comment:
      "I love shopping here. Good selection of brands and the mall is always clean. Parking can be a bit challenging during weekends though.",
  },
  {
    id: "r3",
    storeId: "1",
    userName: "Omar J.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    rating: 5,
    date: "2023-10-05",
    comment:
      "This is my go-to mall for all shopping needs. The cinema is great and there are plenty of entertainment options for the whole family.",
  },
];

const StoreDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [store, setStore] = useState(mockStore);
  const [selectedDepartment, setSelectedDepartment] = useState("fashion");
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
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
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
      setStore(mockStore);

      // Get reviews for this store
      const storeReviews = mockReviews.filter(
        (review) => review.storeId === id,
      );
      setReviews(storeReviews);
    }
  }, [id]);

  // Add item to cart
  const addToCart = (item: any, options = {}) => {
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
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Add new item to cart with options
        return [...prevCart, { item, quantity: 1, options }];
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
    setSelectedSize(product.sizes ? product.sizes[0] : "");
    setSelectedColor(product.colors ? product.colors[0] : "");
    setShowProductDialog(true);
  };

  // Add selected product to cart
  const addSelectedProductToCart = () => {
    const options: any = {};

    if (selectedSize) {
      options.size = selectedSize;
    }

    if (selectedColor) {
      options.color = selectedColor;
    }

    addToCart(selectedProduct, options);
    setShowProductDialog(false);
  };

  // Get department icon
  const getDepartmentIcon = (iconName: string) => {
    switch (iconName) {
      case "Shirt":
        return <Shirt className="h-5 w-5" />;
      case "Smartphone":
        return <Smartphone className="h-5 w-5" />;
      case "Home":
        return <Home className="h-5 w-5" />;
      case "Gem":
        return <Gem className="h-5 w-5" />;
      case "Glasses":
        return <Glasses className="h-5 w-5" />;
      case "Baby":
        return <Baby className="h-5 w-5" />;
      case "BookOpen":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <Store className="h-5 w-5" />;
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
                  {storeDepartments.map((department) => (
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
                                {cartItem.options &&
                                  Object.keys(cartItem.options).length > 0 && (
                                    <div className="text-xs text-gray-500">
                                      {Object.entries(cartItem.options).map(
                                        ([key, value]) => (
                                          <span key={key}>
                                            {key}: {value}{" "}
                                          </span>
                                        ),
                                      )}
                                    </div>
                                  )}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm">
                                $
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
                        <span>${calculateTotal().toFixed(2)}</span>
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
                      {storeDepartments.find(
                        (dept) => dept.id === selectedDepartment,
                      )?.name || "Products"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {storeProducts[selectedDepartment]?.map((product) => (
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
                            {product.newArrival && !product.sale && (
                              <Badge className="absolute top-2 right-2 bg-blue-500">
                                New
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
                                      ${product.salePrice.toFixed(2)}
                                    </span>
                                    <span className="text-sm text-gray-500 line-through ml-2">
                                      ${product.price.toFixed(2)}
                                    </span>
                                  </div>
                                ) : (
                                  <span className="font-bold text-primary">
                                    ${product.price.toFixed(2)}
                                  </span>
                                )}
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
                                  handleProductClick(product);
                                }}
                              >
                                View
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {(!storeProducts[selectedDepartment] ||
                      storeProducts[selectedDepartment].length === 0) && (
                      <div className="text-center py-12">
                        <Store className="h-12 w-12 mx-auto text-gray-300 mb-4" />
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
                  {selectedProduct.newArrival && !selectedProduct.sale && (
                    <Badge className="absolute top-2 right-2 bg-blue-500">
                      New
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
                          ${selectedProduct.salePrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${selectedProduct.price.toFixed(2)}
                        </span>
                      </div>
                    ) : (
                      <span className="font-bold text-primary text-xl">
                        ${selectedProduct.price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Size selection */}
                {selectedProduct.sizes && selectedProduct.sizes.length > 0 && (
                  <div className="mb-4">
                    <Label className="mb-2 block">Size</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map((size: string) => (
                        <Button
                          key={size}
                          type="button"
                          variant={
                            selectedSize === size ? "default" : "outline"
                          }
                          className="h-10 px-3"
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color selection */}
                {selectedProduct.colors &&
                  selectedProduct.colors.length > 0 && (
                    <div className="mb-4">
                      <Label className="mb-2 block">Color</Label>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map((color: string) => (
                          <Button
                            key={color}
                            type="button"
                            variant={
                              selectedColor === color ? "default" : "outline"
                            }
                            className="h-10 px-3"
                            onClick={() => setSelectedColor(color)}
                          >
                            {color}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Additional product details */}
                <div className="space-y-2 mt-4">
                  {selectedProduct.warranty && (
                    <div className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Warranty: {selectedProduct.warranty}</span>
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
                  Delivery fee: ${store.deliveryFee}. Minimum order: $
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
                        $
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
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              {orderType === "delivery" && (
                <div className="flex justify-between text-sm">
                  <span>Delivery Fee:</span>
                  <span>${store.deliveryFee.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>
                  $
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
                    $
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

export default StoreDetailPage;
