import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
  MapPin,
  Star,
  Clock,
  Phone,
  Globe,
  Check,
  Calendar,
  Package,
  Car,
  Bike,
  ShoppingBag,
  Truck,
  Navigation,
  MessageCircle,
  Mail,
  Info,
  AlertCircle,
  Download,
} from "lucide-react";

// Mock data for delivery service
const mockDeliveryService = {
  id: "2",
  name: "Careem",
  type: "taxi",
  description:
    "Careem is a leading ride-hailing service in the Middle East, offering multiple transportation options including economy cars, premium vehicles, and bikes. With a user-friendly app and reliable service, Careem connects passengers with drivers for convenient and comfortable rides across the city.",
  rating: 4.6,
  reviewCount: 3156,
  location: "Dubai, UAE",
  distance: 0.8,
  image: "https://images.unsplash.com/photo-1549925862-990918131e85?w=800&q=80",
  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Careem_logo.svg/2560px-Careem_logo.svg.png",
  featured: true,
  phone: "+971 4 456 7890",
  website: "www.careem.com",
  email: "support@careem.com",
  appLink: "https://www.careem.com/download",
  deliveryFee: "Starting from AED 12",
  deliveryTime: "5-10 min pickup",
  coordinates: { lat: 25.1972, lng: 55.2744 },
  workingHours: "24/7",
  serviceAreas: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
  features: [
    "Real-time tracking",
    "Multiple vehicle options",
    "Scheduled rides",
    "In-app payments",
    "24/7 customer support",
    "Driver ratings",
  ],
  paymentMethods: ["Cash", "Credit Card", "Careem Pay", "Apple Pay"],
  vehicleTypes: [
    {
      name: "Careem GO",
      description: "Affordable everyday rides",
      basePrice: 12,
      pricePerKm: 2.5,
      image:
        "https://images.unsplash.com/photo-1549925862-990918131e85?w=800&q=80",
    },
    {
      name: "Careem Business",
      description: "Comfortable rides for professionals",
      basePrice: 20,
      pricePerKm: 3.5,
      image:
        "https://images.unsplash.com/photo-1549194898-0b91236e7b69?w=800&q=80",
    },
    {
      name: "Careem MAX",
      description: "Spacious vehicles for groups",
      basePrice: 25,
      pricePerKm: 4,
      image:
        "https://images.unsplash.com/photo-1569017388730-020b5f80a004?w=800&q=80",
    },
    {
      name: "Careem Bike",
      description: "Quick rides for short distances",
      basePrice: 8,
      pricePerKm: 1.5,
      image:
        "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80",
    },
  ],
  images: [
    "https://images.unsplash.com/photo-1549925862-990918131e85?w=800&q=80",
    "https://images.unsplash.com/photo-1549194898-0b91236e7b69?w=800&q=80",
    "https://images.unsplash.com/photo-1569017388730-020b5f80a004?w=800&q=80",
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&q=80",
  ],
};

// Mock reviews data
const mockReviews = [
  {
    id: "r1",
    serviceId: "2",
    userName: "Mohammed K.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
    rating: 5,
    date: "2023-12-15",
    comment:
      "Excellent service! The driver arrived on time and was very professional. The car was clean and comfortable. Will definitely use Careem again.",
    serviceType: "Careem GO",
  },
  {
    id: "r2",
    serviceId: "2",
    userName: "Aisha S.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    rating: 4,
    date: "2023-11-20",
    comment:
      "Good experience overall. The app is easy to use and the driver was friendly. The only reason for 4 stars is that the driver took a slightly longer route.",
    serviceType: "Careem Business",
  },
  {
    id: "r3",
    serviceId: "2",
    userName: "Omar J.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    rating: 5,
    date: "2023-10-05",
    comment:
      "I use Careem regularly for my commute to work. The service is consistently reliable and the drivers are professional. The Careem Business option is worth the extra cost for the comfort.",
    serviceType: "Careem Business",
  },
  {
    id: "r4",
    serviceId: "2",
    userName: "Fatima H.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    rating: 3,
    date: "2023-09-12",
    comment:
      "The service is generally good, but I had to wait longer than the estimated time for my ride. The driver was apologetic and the ride itself was comfortable.",
    serviceType: "Careem GO",
  },
];

const DeliveryDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [service, setService] = useState(mockDeliveryService);
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState<any>(null);
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  // Fetch service data and reviews
  useEffect(() => {
    if (id) {
      // In a real app, this would fetch data from an API
      setService(mockDeliveryService);

      // Get reviews for this service
      const serviceReviews = mockReviews.filter(
        (review) => review.serviceId === id,
      );
      setReviews(serviceReviews);

      // Set default vehicle type
      if (
        mockDeliveryService.vehicleTypes &&
        mockDeliveryService.vehicleTypes.length > 0
      ) {
        setSelectedVehicleType(mockDeliveryService.vehicleTypes[0]);
      }
    }
  }, [id]);

  // Calculate estimated price
  const calculateEstimatedPrice = () => {
    if (!selectedVehicleType || !pickupLocation || !dropoffLocation) {
      setEstimatedPrice(null);
      return;
    }

    // In a real app, this would use a distance matrix API to calculate the distance
    // For demo purposes, we'll use a random distance between 5 and 15 km
    const estimatedDistance = Math.floor(Math.random() * 10) + 5;
    const price =
      selectedVehicleType.basePrice +
      selectedVehicleType.pricePerKm * estimatedDistance;
    setEstimatedPrice(price);
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
          {/* Service header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="relative h-[300px]">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center mb-2">
                    <div className="h-12 w-12 mr-3 bg-white rounded-md p-1">
                      <img
                        src={service.logo}
                        alt={service.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <h1 className="text-3xl font-bold text-white">
                      {service.name}
                    </h1>
                  </div>
                  <div className="flex flex-wrap items-center text-white gap-3 mb-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">
                        {service.rating.toFixed(1)}
                      </span>
                      <span className="text-gray-300 text-sm ml-1">
                        ({service.reviewCount} reviews)
                      </span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span>
                      {service.type === "taxi"
                        ? "خدمة توصيل وسيارات أجرة"
                        : service.type === "food"
                          ? "توصيل طعام"
                          : service.type === "package"
                            ? "توصيل طرود"
                            : service.type === "grocery"
                              ? "توصيل بقالة"
                              : "خدمة توصيل"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center text-gray-300 gap-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{service.workingHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">{service.description}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  <span>{service.phone}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-primary" />
                  <span>{service.website}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  <span>{service.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content tabs */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Booking */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
                <h3 className="font-bold text-lg mb-4">حجز خدمة</h3>
                <div className="space-y-4">
                  {service.type === "taxi" && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          نوع المركبة
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {service.vehicleTypes.map((vehicle, index) => (
                            <div
                              key={index}
                              className={`border rounded-md p-2 cursor-pointer transition-colors ${selectedVehicleType?.name === vehicle.name ? "border-primary bg-primary/5" : "border-gray-200 hover:border-gray-300"}`}
                              onClick={() => setSelectedVehicleType(vehicle)}
                            >
                              <div className="text-xs font-medium">
                                {vehicle.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                {vehicle.basePrice} AED
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          موقع الانطلاق
                        </label>
                        <Input
                          placeholder="أدخل موقع الانطلاق"
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-1">
                          موقع الوصول
                        </label>
                        <Input
                          placeholder="أدخل موقع الوصول"
                          value={dropoffLocation}
                          onChange={(e) => setDropoffLocation(e.target.value)}
                        />
                      </div>

                      <Button
                        className="w-full"
                        onClick={calculateEstimatedPrice}
                        disabled={
                          !selectedVehicleType ||
                          !pickupLocation ||
                          !dropoffLocation
                        }
                      >
                        حساب السعر التقريبي
                      </Button>

                      {estimatedPrice !== null && (
                        <div className="mt-4 p-3 bg-primary/10 rounded-md">
                          <div className="text-center">
                            <div className="text-sm font-medium">
                              السعر التقريبي
                            </div>
                            <div className="text-2xl font-bold text-primary">
                              AED {estimatedPrice.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <Button
                          className="w-full"
                          onClick={() => {
                            // Add to cart
                            const cartItem = {
                              id: Math.random().toString(36).substr(2, 9),
                              workerId: id || "",
                              workerName: service.name,
                              workerImage: service.image,
                              service: `${service.type === "taxi" ? "خدمة توصيل" : service.type === "food" ? "توصيل طعام" : "توصيل طرود"} - ${selectedVehicleType?.name || ""} `,
                              price:
                                estimatedPrice ||
                                selectedVehicleType?.basePrice ||
                                15,
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
                          تأكيد الحجز والانتقال إلى السلة
                        </Button>
                      </div>
                    </>
                  )}

                  {service.type === "food" && (
                    <div className="text-center py-4">
                      <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-600 mb-4">
                        اطلب خدمة توصيل الطعام من {service.name} مباشرة
                      </p>
                      <Button
                        className="w-full"
                        onClick={() => {
                          // Add to cart
                          const cartItem = {
                            id: Math.random().toString(36).substr(2, 9),
                            workerId: id || "",
                            workerName: service.name,
                            workerImage: service.image,
                            service: "توصيل طعام",
                            price: 15, // Default price
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
                        طلب الخدمة والانتقال إلى السلة
                      </Button>
                    </div>
                  )}

                  {service.type === "package" && (
                    <div className="text-center py-4">
                      <Package className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-600 mb-4">
                        اطلب خدمة توصيل الطرود من {service.name} مباشرة
                      </p>
                      <Button
                        className="w-full"
                        onClick={() => {
                          // Add to cart
                          const cartItem = {
                            id: Math.random().toString(36).substr(2, 9),
                            workerId: id || "",
                            workerName: service.name,
                            workerImage: service.image,
                            service: "توصيل طرود",
                            price: 25, // Default price for package delivery
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
                        طلب الخدمة والانتقال إلى السلة
                      </Button>
                    </div>
                  )}

                  {service.type === "grocery" && (
                    <div className="text-center py-4">
                      <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-600 mb-4">
                        اطلب خدمة توصيل البقالة من {service.name} مباشرة
                      </p>
                      <Button
                        className="w-full"
                        onClick={() => {
                          // Add to cart
                          const cartItem = {
                            id: Math.random().toString(36).substr(2, 9),
                            workerId: id || "",
                            workerName: service.name,
                            workerImage: service.image,
                            service: "توصيل بقالة",
                            price: 20, // Default price for grocery delivery
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
                        طلب الخدمة والانتقال إلى السلة
                      </Button>
                    </div>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h4 className="font-medium">مميزات الخدمة</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h4 className="font-medium">وسائل الدفع المقبولة</h4>
                  <div className="flex flex-wrap gap-2">
                    {service.paymentMethods.map((method, index) => (
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
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <Tabs defaultValue="about">
                <TabsList className="mb-4">
                  <TabsTrigger value="about">عن الخدمة</TabsTrigger>
                  {service.type === "taxi" && (
                    <TabsTrigger value="vehicles">أنواع المركبات</TabsTrigger>
                  )}
                  <TabsTrigger value="reviews">التقييمات</TabsTrigger>
                  <TabsTrigger value="map">الخريطة</TabsTrigger>
                </TabsList>

                {/* About tab */}
                <TabsContent value="about">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">
                      عن {service.name}
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          نبذة عن الخدمة
                        </h3>
                        <p className="text-gray-700">{service.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          مناطق الخدمة
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {service.serviceAreas.map((area, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-gray-100"
                            >
                              {area}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          معلومات الاتصال
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="flex items-center text-gray-700 mb-2">
                              <Phone className="h-4 w-4 mr-2 text-gray-500" />
                              {service.phone}
                            </p>
                            <p className="flex items-center text-gray-700 mb-2">
                              <Mail className="h-4 w-4 mr-2 text-gray-500" />
                              {service.email}
                            </p>
                            <p className="flex items-center text-gray-700">
                              <Globe className="h-4 w-4 mr-2 text-gray-500" />
                              {service.website}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              variant="outline"
                              className="flex items-center"
                              onClick={() =>
                                (window.location.href = `tel:${service.phone}`)
                              }
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              اتصال
                            </Button>
                            <Button
                              variant="outline"
                              className="flex items-center bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                              onClick={() => {
                                const cleanPhone = service.phone.replace(
                                  /\D/g,
                                  "",
                                );
                                window.open(
                                  `https://wa.me/${cleanPhone}`,
                                  "_blank",
                                );
                              }}
                            >
                              <MessageCircle className="h-4 w-4 mr-2" />
                              واتساب
                            </Button>
                            <Button
                              variant="outline"
                              className="flex items-center"
                              asChild
                            >
                              <a
                                href={`https://${service.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Globe className="h-4 w-4 mr-2" />
                                زيارة الموقع
                              </a>
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          صور الخدمة
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {service.images.map((image, index) => (
                            <div
                              key={index}
                              className="rounded-lg overflow-hidden h-48"
                            >
                              <img
                                src={image}
                                alt={`${service.name} ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Vehicles tab */}
                {service.type === "taxi" && (
                  <TabsContent value="vehicles">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-2xl font-bold mb-6">
                        أنواع المركبات
                      </h2>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {service.vehicleTypes.map((vehicle, index) => (
                          <Card key={index} className="overflow-hidden">
                            <div className="h-48">
                              <img
                                src={vehicle.image}
                                alt={vehicle.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg">
                                  {vehicle.name}
                                </h3>
                                <div className="text-right">
                                  <span className="font-bold text-primary text-xl">
                                    AED {vehicle.basePrice}
                                  </span>
                                  <div className="text-xs text-gray-500">
                                    سعر البداية
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-600 mb-3">
                                {vehicle.description}
                              </p>
                              <div className="flex justify-between text-sm text-gray-600">
                                <span>السعر لكل كيلومتر:</span>
                                <span className="font-medium">
                                  AED {vehicle.pricePerKm}
                                </span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 mr-2 text-primary mt-0.5" />
                          <div>
                            <h4 className="font-medium mb-1">
                              معلومات الأسعار
                            </h4>
                            <p className="text-sm text-gray-600">
                              الأسعار المعروضة تقريبية وقد تختلف حسب الوقت
                              والمسافة والطلب. قد تطبق رسوم إضافية في أوقات
                              الذروة أو في حالات الطلب المرتفع.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                )}

                {/* Reviews tab */}
                <TabsContent value="reviews">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">تقييمات العملاء</h2>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">
                          {service.rating.toFixed(1)}
                        </span>
                        <span className="text-gray-500 ml-1">
                          ({reviews.length} تقييم)
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
                                      <div className="flex items-center">
                                        <p className="text-sm text-gray-500 mr-2">
                                          {new Date(
                                            review.date,
                                          ).toLocaleDateString()}
                                        </p>
                                        <Badge
                                          variant="outline"
                                          className="text-xs bg-gray-100"
                                        >
                                          {review.serviceType}
                                        </Badge>
                                      </div>
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
                        لا توجد تقييمات بعد لهذه الخدمة.
                      </p>
                    )}
                  </div>
                </TabsContent>

                {/* Map tab */}
                <TabsContent value="map">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">موقع الخدمة</h2>

                    <div className="h-[400px] rounded-lg overflow-hidden mb-4">
                      <iframe
                        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d462560.3011806427!2d54.947287526927106!3d25.076280446631782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sus!4v1641802954936!5m2!1sen!2sus`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 mr-2 text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">ملاحظة</h4>
                          <p className="text-sm text-gray-600">
                            {service.type === "taxi"
                              ? "يمكنك طلب سيارة من أي موقع في المناطق المخدومة. قم بتحميل التطبيق لتحديد موقعك بدقة."
                              : "نطاق الخدمة يشمل المناطق المذكورة أعلاه. للتأكد من توفر الخدمة في منطقتك، يرجى الاتصال بخدمة العملاء."}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
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

export default DeliveryDetailPage;
