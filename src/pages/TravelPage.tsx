import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/layout/Header";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Slider } from "../components/ui/slider";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  MapPin,
  Search,
  Filter,
  X,
  Star,
  Clock,
  Plane,
  Train,
  Car,
  Calendar,
  Users,
  CreditCard,
} from "lucide-react";

// Mock data for travel services
const mockTravelServices = [
  {
    id: "1",
    name: "Emirates Airlines",
    type: "flight",
    description: "Premium airline with global destinations",
    rating: 4.8,
    reviewCount: 1245,
    location: "Dubai International Airport",
    image:
      "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d0/Emirates_logo.svg",
    featured: true,
  },
  {
    id: "2",
    name: "Etihad Railways",
    type: "train",
    description: "Modern railway network connecting major cities",
    rating: 4.5,
    reviewCount: 856,
    location: "Abu Dhabi Central Station",
    image:
      "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/en/8/8c/Etihad_Rail_logo.svg",
    featured: true,
  },
  {
    id: "3",
    name: "Luxury Car Rentals",
    type: "car",
    description: "Premium car rental service with luxury vehicles",
    rating: 4.7,
    reviewCount: 932,
    location: "Dubai Marina",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=LCR",
    featured: true,
  },
  {
    id: "4",
    name: "Budget Rentals",
    type: "car",
    description: "Affordable car rental options for every budget",
    rating: 4.3,
    reviewCount: 712,
    location: "Dubai International Airport",
    image:
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=BR",
    featured: false,
  },
  {
    id: "5",
    name: "Qatar Airways",
    type: "flight",
    description: "Award-winning airline with exceptional service",
    rating: 4.9,
    reviewCount: 1567,
    location: "Doha International Airport",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/79/Qatar_Airways_logo.svg/512px-Qatar_Airways_logo.svg.png",
    featured: true,
  },
  {
    id: "6",
    name: "Dubai Metro",
    type: "train",
    description: "Modern urban rail network in Dubai",
    rating: 4.6,
    reviewCount: 2134,
    location: "Dubai",
    image:
      "https://images.unsplash.com/photo-1565012050747-79d8a68b7b63?w=800&q=80",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=DM",
    featured: false,
  },
  {
    id: "7",
    name: "Hertz Car Rental",
    type: "car",
    description: "Global car rental service with wide selection",
    rating: 4.4,
    reviewCount: 876,
    location: "Multiple locations in UAE",
    image:
      "https://images.unsplash.com/photo-1551952237-798f36c535b4?w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Hertz_logo.svg/1200px-Hertz_logo.svg.png",
    featured: false,
  },
  {
    id: "8",
    name: "Etihad Airways",
    type: "flight",
    description: "UAE's national carrier with luxury service",
    rating: 4.7,
    reviewCount: 1342,
    location: "Abu Dhabi International Airport",
    image:
      "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&q=80",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Etihad_Airways_logo_2022.svg/2560px-Etihad_Airways_logo_2022.svg.png",
    featured: true,
  },
];

// Travel service categories
const travelCategories = [
  { id: "all", label: "All Services", icon: "Plane" },
  { id: "flight", label: "Airlines", icon: "Plane" },
  { id: "train", label: "Railways", icon: "Train" },
  { id: "car", label: "Car Rentals", icon: "Car" },
];

const TravelPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [travelServices, setTravelServices] = useState(mockTravelServices);
  const [filteredServices, setFilteredServices] = useState(mockTravelServices);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...travelServices];

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

    // Sort by rating (highest first)
    filtered.sort((a, b) => b.rating - a.rating);

    setFilteredServices(filtered);
  }, [travelServices, searchQuery, selectedCategory]);

  // Get category icon
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Plane":
        return <Plane className="h-5 w-5" />;
      case "Train":
        return <Train className="h-5 w-5" />;
      case "Car":
        return <Car className="h-5 w-5" />;
      default:
        return <Plane className="h-5 w-5" />;
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
          {/* Hero section */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 rounded-lg mb-8">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                وسائل النقل والسفر
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                اكتشف خيارات السفر المتنوعة من رحلات طيران وقطارات وتأجير سيارات
              </p>

              {/* Search bar */}
              <div className="flex max-w-xl">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="ابحث عن خدمات السفر، الشركات، أو الوجهات"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 rounded-md"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Travel services section */}
          <section className="py-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white p-4 rounded-md shadow-sm sticky top-24">
                  <h3 className="font-bold text-lg mb-4">فئات وسائل النقل</h3>

                  <div className="space-y-2">
                    {travelCategories.map((category) => (
                      <Button
                        key={category.id}
                        variant={
                          selectedCategory === category.id ? "default" : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {getCategoryIcon(category.icon)}
                        <span className="ml-2">{category.label}</span>
                      </Button>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <h3 className="font-bold text-lg mb-4">حجز رحلة</h3>
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-2 block">نوع الرحلة</Label>
                      <Select defaultValue="flight">
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الرحلة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flight">طيران</SelectItem>
                          <SelectItem value="train">قطار</SelectItem>
                          <SelectItem value="car">تأجير سيارة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-2 block">من</Label>
                      <Input placeholder="مدينة المغادرة" />
                    </div>

                    <div>
                      <Label className="mb-2 block">إلى</Label>
                      <Input placeholder="مدينة الوصول" />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label className="mb-2 block">تاريخ المغادرة</Label>
                        <div className="relative">
                          <Input type="date" />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <Label className="mb-2 block">تاريخ العودة</Label>
                        <div className="relative">
                          <Input type="date" />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 block">عدد المسافرين</Label>
                      <div className="relative">
                        <Input type="number" min="1" defaultValue="1" />
                        <Users className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <Button className="w-full">بحث</Button>
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
                      className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
                    >
                      <div className="relative h-48 overflow-hidden cursor-pointer">
                        <Link to={`/services/travel/${service.id}`}>
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
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
                          <span className="text-xs">{service.location}</span>
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
                        <div className="mt-auto">
                          <Link to={`/services/travel/${service.id}`}>
                            <Button className="w-full">عرض التفاصيل</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredServices.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <Plane className="h-12 w-12 mx-auto text-gray-300 mb-4" />
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

export default TravelPage;
