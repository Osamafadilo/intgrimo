import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Label } from "../components/ui/label";
import {
  MapPin,
  Search,
  Star,
  Clock,
  Package,
  Car,
  Bike,
  ShoppingBag,
  Truck,
  Navigation,
  Phone,
  MessageCircle,
} from "lucide-react";

// Mock data for delivery services
const mockDeliveryServices = [
  {
    id: "1",
    name: "Talabat",
    type: "food",
    description: "Food delivery service with wide restaurant selection",
    rating: 4.7,
    reviewCount: 2345,
    location: "Dubai, UAE",
    distance: 1.2, // in km
    image:
      "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Talabat_Logo_2019.svg/2560px-Talabat_Logo_2019.svg.png",
    featured: true,
    phone: "+971 4 123 4567",
    website: "www.talabat.com",
    deliveryFee: "AED 7-15",
    deliveryTime: "30-45 min",
    coordinates: { lat: 25.2048, lng: 55.2708 },
  },
  {
    id: "2",
    name: "Careem",
    type: "taxi",
    description: "Ride-hailing service with multiple transportation options",
    rating: 4.6,
    reviewCount: 3156,
    location: "Dubai, UAE",
    distance: 0.8,
    image:
      "https://images.unsplash.com/photo-1549925862-990918131e85?w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Careem_logo.svg/2560px-Careem_logo.svg.png",
    featured: true,
    phone: "+971 4 456 7890",
    website: "www.careem.com",
    deliveryFee: "Starting from AED 12",
    deliveryTime: "5-10 min pickup",
    coordinates: { lat: 25.1972, lng: 55.2744 },
  },
  {
    id: "3",
    name: "Deliveroo",
    type: "food",
    description: "Premium food delivery service with exclusive restaurants",
    rating: 4.5,
    reviewCount: 1876,
    location: "Dubai, UAE",
    distance: 1.5,
    image:
      "https://images.unsplash.com/photo-1559941727-6fb446e7e8ae?w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Deliveroo_Logo_Full.svg/2560px-Deliveroo_Logo_Full.svg.png",
    featured: false,
    phone: "+971 4 789 0123",
    website: "www.deliveroo.ae",
    deliveryFee: "AED 10-20",
    deliveryTime: "25-40 min",
    coordinates: { lat: 25.2116, lng: 55.2659 },
  },
  {
    id: "4",
    name: "Uber",
    type: "taxi",
    description: "Global ride-hailing service with multiple vehicle options",
    rating: 4.4,
    reviewCount: 2987,
    location: "Dubai, UAE",
    distance: 1.0,
    image:
      "https://images.unsplash.com/photo-1550966286-62ba9cee6db7?w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png",
    featured: false,
    phone: "+971 4 321 6547",
    website: "www.uber.com",
    deliveryFee: "Starting from AED 10",
    deliveryTime: "3-8 min pickup",
    coordinates: { lat: 25.2052, lng: 55.268 },
  },
  {
    id: "5",
    name: "Noon Food",
    type: "food",
    description: "Fast and reliable food delivery service",
    rating: 4.3,
    reviewCount: 1245,
    location: "Dubai, UAE",
    distance: 2.2,
    image:
      "https://images.unsplash.com/photo-1576867757603-05b134ebc379?w=800&q=80",
    logo: "https://play-lh.googleusercontent.com/Wen3tIBMaLXGVHhtO8e-Y8Jf7-1mHYgKOAm9GJRHaFRp-4-KPPJYIcHZbkLYdxIVxw",
    featured: false,
    phone: "+971 4 987 6543",
    website: "food.noon.com",
    deliveryFee: "AED 5-12",
    deliveryTime: "35-50 min",
    coordinates: { lat: 25.1924, lng: 55.2792 },
  },
  {
    id: "6",
    name: "Aramex",
    type: "package",
    description: "International shipping and local delivery services",
    rating: 4.2,
    reviewCount: 1678,
    location: "Dubai, UAE",
    distance: 3.5,
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Aramex_logo.svg/2560px-Aramex_logo.svg.png",
    featured: true,
    phone: "+971 4 654 9870",
    website: "www.aramex.com",
    deliveryFee: "Varies by distance",
    deliveryTime: "1-3 business days",
    coordinates: { lat: 25.2106, lng: 55.2623 },
  },
  {
    id: "7",
    name: "DHL Express",
    type: "package",
    description: "Global express shipping and package delivery",
    rating: 4.5,
    reviewCount: 1987,
    location: "Dubai, UAE",
    distance: 4.2,
    image:
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/DHL_Logo.svg/2560px-DHL_Logo.svg.png",
    featured: false,
    phone: "+971 4 345 6789",
    website: "www.dhl.com",
    deliveryFee: "Varies by weight and destination",
    deliveryTime: "1-5 business days",
    coordinates: { lat: 25.1986, lng: 55.273 },
  },
  {
    id: "8",
    name: "InstaShop",
    type: "grocery",
    description: "Grocery delivery service with multiple store options",
    rating: 4.6,
    reviewCount: 1432,
    location: "Dubai, UAE",
    distance: 1.8,
    image:
      "https://images.unsplash.com/photo-1584263347416-85a696b4eda7?w=800&q=80",
    logo: "https://play-lh.googleusercontent.com/lC0JUB8Oc9LXrh8-al9Oc-HVKdR9-aFQEWDnl5_xnKiQfwYUJ5XBnYNVXQo9Y5GYBw",
    featured: true,
    phone: "+971 4 234 5678",
    website: "www.instashop.com",
    deliveryFee: "AED 5-15",
    deliveryTime: "45-60 min",
    coordinates: { lat: 25.2032, lng: 55.2714 },
  },
];

// Delivery service categories
const deliveryCategories = [
  { id: "all", label: "All Services", icon: "Package" },
  { id: "food", label: "Food Delivery", icon: "ShoppingBag" },
  { id: "taxi", label: "Taxi & Rides", icon: "Car" },
  { id: "package", label: "Package Delivery", icon: "Package" },
  { id: "grocery", label: "Grocery Delivery", icon: "ShoppingBag" },
];

const DeliveryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [deliveryServices, setDeliveryServices] =
    useState(mockDeliveryServices);
  const [filteredServices, setFilteredServices] =
    useState(mockDeliveryServices);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showMap, setShowMap] = useState(true);
  const [maxDistance, setMaxDistance] = useState(5);
  const [userLocation, setUserLocation] = useState({
    lat: 25.2048,
    lng: 55.2708,
  });
  const [requestingService, setRequestingService] = useState(false);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };

  // Simulate getting user location on component mount
  useEffect(() => {
    // In a real app, we would use the browser's geolocation API
    // For demo purposes, we'll use a fixed location in Dubai
    const getUserLocation = () => {
      // Simulate a slight delay to mimic geolocation API
      setTimeout(() => {
        // Random location near Dubai
        const lat = 25.2048 + (Math.random() * 0.02 - 0.01);
        const lng = 55.2708 + (Math.random() * 0.02 - 0.01);
        setUserLocation({ lat, lng });
      }, 1000);
    };

    getUserLocation();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...deliveryServices];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          service.type.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.type === selectedCategory,
      );
    }

    // Calculate actual distance from user location
    filtered = filtered.map((service) => {
      // Simple distance calculation (not accurate for real-world use)
      const distance =
        Math.sqrt(
          Math.pow(service.coordinates.lat - userLocation.lat, 2) +
            Math.pow(service.coordinates.lng - userLocation.lng, 2),
        ) * 111; // Rough conversion to kilometers

      return {
        ...service,
        distance: parseFloat(distance.toFixed(1)),
      };
    });

    // Filter by maximum distance
    filtered = filtered.filter((service) => service.distance <= maxDistance);

    // Sort by distance (nearest first)
    filtered.sort((a, b) => a.distance - b.distance);

    setFilteredServices(filtered);
  }, [
    deliveryServices,
    searchQuery,
    selectedCategory,
    userLocation,
    maxDistance,
  ]);

  // Get category icon
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Package":
        return <Package className="h-5 w-5" />;
      case "Car":
        return <Car className="h-5 w-5" />;
      case "ShoppingBag":
        return <ShoppingBag className="h-5 w-5" />;
      case "Bike":
        return <Bike className="h-5 w-5" />;
      case "Truck":
        return <Truck className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  // Get service type icon
  const getServiceTypeIcon = (type: string) => {
    switch (type) {
      case "food":
        return <ShoppingBag className="h-5 w-5" />;
      case "taxi":
        return <Car className="h-5 w-5" />;
      case "package":
        return <Package className="h-5 w-5" />;
      case "grocery":
        return <ShoppingBag className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  // Handle service selection
  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
  };

  // Handle contact via phone
  const handlePhoneContact = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  // Handle contact via WhatsApp
  const handleWhatsAppContact = (phone: string) => {
    // Remove any non-numeric characters
    const cleanPhone = phone.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanPhone}`, "_blank");
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
          {/* Hero section */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 rounded-lg mb-8">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                خدمات التوصيل
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                اكتشف خدمات التوصيل المتنوعة من توصيل الطعام والطرود وخدمات
                النقل
              </p>

              {/* Search bar */}
              <div className="flex max-w-xl">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="ابحث عن خدمات التوصيل، الشركات، أو الأنواع"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 rounded-md"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Map section */}
          <section className="mb-8">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">خدمات التوصيل القريبة منك</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowMap(!showMap)}
                >
                  {showMap ? "إخفاء الخريطة" : "إظهار الخريطة"}
                </Button>
              </div>

              {showMap && (
                <div className="h-[400px] w-full rounded-md overflow-hidden relative">
                  {/* Map container */}
                  <div className="absolute inset-0 bg-gray-200">
                    {/* Map iframe */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.3011806427!2d54.947287526927106!3d25.076280446631782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1641802954936!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                    {/* User location marker */}
                    <div
                      className="absolute p-2 rounded-full bg-blue-500 text-white border-2 border-white shadow-lg"
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        zIndex: 20,
                      }}
                    >
                      <div className="h-4 w-4 relative">
                        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
                        <div className="absolute inset-0 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>

                    {/* Service providers markers */}
                    {filteredServices.map((service) => (
                      <div
                        key={service.id}
                        className={`absolute p-2 rounded-full ${selectedService?.id === service.id ? "bg-primary text-white" : "bg-white border border-primary text-primary"}`}
                        style={{
                          top: `${(service.coordinates.lat - 25.18) * 2000}px`,
                          left: `${(service.coordinates.lng - 55.26) * 2000}px`,
                          transform: "translate(-50%, -50%)",
                          zIndex: selectedService?.id === service.id ? 10 : 5,
                          cursor: "pointer",
                        }}
                        onClick={() => handleServiceSelect(service)}
                      >
                        {service.type === "taxi" ? (
                          <Car className="h-5 w-5" />
                        ) : service.type === "food" ? (
                          <Bike className="h-5 w-5" />
                        ) : (
                          <Package className="h-5 w-5" />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Map controls */}
                  <div className="absolute top-4 right-4 bg-white rounded-md shadow-md p-2 z-30">
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        variant={
                          selectedCategory === "taxi" ? "default" : "outline"
                        }
                        className="flex items-center gap-2"
                        onClick={() => setSelectedCategory("taxi")}
                      >
                        <Car className="h-4 w-4" /> سيارات
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          selectedCategory === "food" ? "default" : "outline"
                        }
                        className="flex items-center gap-2"
                        onClick={() => setSelectedCategory("food")}
                      >
                        <Bike className="h-4 w-4" /> دراجات
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          selectedCategory === "package" ? "default" : "outline"
                        }
                        className="flex items-center gap-2"
                        onClick={() => setSelectedCategory("package")}
                      >
                        <Package className="h-4 w-4" /> طرود
                      </Button>
                    </div>
                  </div>

                  {/* Distance indicator */}
                  <div className="absolute bottom-4 left-4 bg-white rounded-md shadow-md p-2 z-30">
                    <div className="text-xs text-gray-600">
                      يتم عرض مقدمي الخدمة في نطاق {maxDistance || 10} كم
                    </div>
                  </div>
                </div>
              )}

              {/* Selected service details */}
              {selectedService && (
                <div className="mt-4 p-4 border rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden">
                      <img
                        src={selectedService.logo}
                        alt={selectedService.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-lg">
                          {selectedService.name}
                        </h3>
                        <Badge
                          className={`${selectedService.featured ? "bg-primary" : "bg-gray-500"}`}
                        >
                          {selectedService.featured ? "مميز" : "عادي"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {selectedService.description}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>
                            {selectedService.location} (
                            {selectedService.distance} km)
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span>
                            {selectedService.rating.toFixed(1)} (
                            {selectedService.reviewCount} تقييم)
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 mt-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            وقت التوصيل: {selectedService.deliveryTime}
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Package className="h-4 w-4 mr-1" />
                          <span>
                            رسوم التوصيل: {selectedService.deliveryFee}
                          </span>
                        </div>
                      </div>

                      {requestingService ? (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-3 w-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                              <p className="text-green-700 font-medium">
                                جاري طلب الخدمة...
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-gray-500"
                              onClick={() => setRequestingService(false)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            سيتم التواصل معك قريباً من قبل مقدم الخدمة
                          </p>

                          <div className="flex justify-between mt-4">
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex items-center"
                              onClick={() => {
                                // Add to cart
                                const cartItem = {
                                  id: Math.random().toString(36).substr(2, 9),
                                  workerId: selectedService.id,
                                  workerName: selectedService.name,
                                  workerImage: selectedService.image,
                                  service:
                                    selectedService.type === "taxi"
                                      ? "خدمة توصيل"
                                      : selectedService.type === "food"
                                        ? "توصيل طعام"
                                        : "توصيل طرود",
                                  price:
                                    parseInt(
                                      selectedService.deliveryFee.replace(
                                        /[^0-9]/g,
                                        "",
                                      ),
                                    ) || 15,
                                  date: new Date().toISOString().split("T")[0],
                                  time: new Date().toLocaleTimeString(),
                                  status: "Pending Confirmation",
                                };

                                // Get existing cart or create new one
                                const existingCart =
                                  localStorage.getItem("serviceCart");
                                const cart = existingCart
                                  ? JSON.parse(existingCart)
                                  : [];

                                // Add new item to cart
                                cart.push(cartItem);

                                // Save updated cart
                                localStorage.setItem(
                                  "serviceCart",
                                  JSON.stringify(cart),
                                );

                                // Navigate to checkout
                                navigate("/checkout");
                              }}
                            >
                              الانتقال إلى السلة
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="flex items-center"
                              onClick={() => setRequestingService(false)}
                            >
                              إلغاء الطلب
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex gap-2 mt-4">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center"
                            onClick={() =>
                              handlePhoneContact(selectedService.phone)
                            }
                          >
                            <Phone className="h-4 w-4 mr-1" /> اتصال
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex items-center bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                            onClick={() =>
                              handleWhatsAppContact(selectedService.phone)
                            }
                          >
                            <MessageCircle className="h-4 w-4 mr-1" /> واتساب
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => setRequestingService(true)}
                          >
                            طلب الخدمة الآن
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Delivery services section */}
          <section className="py-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white p-4 rounded-md shadow-sm sticky top-24">
                  <h3 className="font-bold text-lg mb-4">
                    أنواع خدمات التوصيل
                  </h3>

                  <div className="space-y-2">
                    {deliveryCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={
                          selectedCategory === category.id ? "default" : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {getCategoryIcon(category.icon)}
                        <span className="mr-2">{category.label}</span>
                      </Button>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <h4 className="font-medium">مميزات الخدمات</h4>
                    <ul className="space-y-1">
                      <li className="flex items-center text-sm">
                        <Navigation className="h-4 w-4 mr-2 text-green-500" />
                        <span>تتبع مباشر للطلبات</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <Clock className="h-4 w-4 mr-2 text-green-500" />
                        <span>توصيل سريع</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-green-500" />
                        <span>دعم على مدار الساعة</span>
                      </li>
                      <li className="flex items-center text-sm">
                        <MessageCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>تواصل مباشر مع السائق</span>
                      </li>
                    </ul>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <h4 className="font-medium">نطاق البحث</h4>
                    <div className="px-2">
                      <div className="mb-1 flex justify-between text-sm">
                        <span>المسافة القصوى</span>
                        <span>{maxDistance} كم</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="20"
                        step="1"
                        value={maxDistance}
                        onChange={(e) =>
                          setMaxDistance(parseInt(e.target.value))
                        }
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>1 كم</span>
                        <span>10 كم</span>
                        <span>20 كم</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {filteredServices.length} خدمة متاحة
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <Card
                      key={service.id}
                      className={`overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col ${selectedService?.id === service.id ? "ring-2 ring-primary" : ""}`}
                      onClick={() => handleServiceSelect(service)}
                    >
                      <div className="relative h-48 overflow-hidden cursor-pointer">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                        {service.featured && (
                          <Badge className="absolute top-2 right-2 bg-primary">
                            مميز
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4 flex-grow flex flex-col">
                        <div className="flex items-center mb-2">
                          <div className="h-8 w-8 mr-2 overflow-hidden">
                            <img
                              src={service.logo}
                              alt={`${service.name} logo`}
                              className="h-full w-full object-contain"
                            />
                          </div>
                          <h3 className="font-bold text-lg">{service.name}</h3>
                        </div>
                        <div className="flex items-center text-gray-500 mb-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span className="text-xs">
                            {service.location} ({service.distance} km)
                          </span>
                        </div>
                        <div className="flex items-center mb-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="font-medium">
                            {service.rating.toFixed(1)}
                          </span>
                          <span className="text-gray-500 text-xs ml-1">
                            ({service.reviewCount} تقييم)
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex items-center text-gray-500 text-xs mb-3">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{service.deliveryTime}</span>
                          <span className="mx-2">•</span>
                          <span>{service.deliveryFee}</span>
                        </div>
                        <div className="mt-auto">
                          <Link to={`/services/delivery/${service.id}`}>
                            <Button className="w-full">عرض التفاصيل</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredServices.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <Package className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      لم يتم العثور على خدمات
                    </h3>
                    <p className="text-gray-500 mb-4">
                      حاول تعديل معايير البحث الخاصة بك
                    </p>
                    <Button onClick={() => setSelectedCategory("all")}>
                      عرض جميع الخدمات
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">سوق Marketplace</h3>
              <p className="text-gray-300">
                Connecting customers with top service providers across multiple
                categories.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Categories</h4>
              <ul className="space-y-2">
                {[
                  "Restaurants",
                  "Stores",
                  "Grocery",
                  "Maintenance",
                  "Travel",
                  "Delivery",
                  "Real Estate",
                ].map((category) => (
                  <li key={category}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2">
                {["About Us", "Careers", "Blog", "Press", "Contact"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2">
                {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
                  (item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>
              &copy; {new Date().getFullYear()} سوق Marketplace. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeliveryPage;
