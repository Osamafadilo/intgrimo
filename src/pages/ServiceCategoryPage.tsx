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
  MapPin,
  Search,
  Star,
  Clock,
  Wrench,
  Hammer,
  Paintbrush,
  Plug,
  Droplet,
  Trash2,
  Thermometer,
  Smartphone,
} from "lucide-react";

// Mock data for service providers
const mockServiceProviders = [
  {
    id: "1",
    name: "Ahmed Al-Farsi",
    profession: "Plumber",
    description:
      "Experienced plumber specializing in residential and commercial plumbing services",
    category: "Plumbing",
    priceRange: "$$",
    rating: 4.8,
    reviewCount: 156,
    location: "Al Barsha, Dubai",
    distance: 1.2,
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    experience: "10+ years",
  },
  {
    id: "2",
    name: "Mohammed Al-Zaabi",
    profession: "Electrician",
    description:
      "Certified electrician with expertise in residential and commercial electrical systems",
    category: "Electrical",
    priceRange: "$$",
    rating: 4.7,
    reviewCount: 132,
    location: "Deira, Dubai",
    distance: 3.5,
    availability: "Available Today",
    image:
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
    experience: "8 years",
  },
  {
    id: "3",
    name: "Fatima Al-Balushi",
    profession: "House Cleaner",
    description:
      "Professional house cleaner providing thorough and detailed cleaning services",
    category: "Cleaning",
    priceRange: "$",
    rating: 4.9,
    reviewCount: 205,
    location: "Jumeirah, Dubai",
    distance: 2.8,
    availability: "Available Tomorrow",
    image:
      "https://images.unsplash.com/photo-1596394723269-b2cbca4e6e33?w=800&q=80",
    experience: "5 years",
  },
];

const ServiceCategoryPage: React.FC = () => {
  const { t } = useTranslation();
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [providers, setProviders] = useState(mockServiceProviders);
  const [filteredProviders, setFilteredProviders] =
    useState(mockServiceProviders);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  // Filter providers by category and search query
  useEffect(() => {
    let filtered = [...providers];

    // Filter by category
    if (category) {
      filtered = filtered.filter(
        (provider) =>
          provider.category.toLowerCase() === category.toLowerCase(),
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (provider) =>
          provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          provider.profession
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          provider.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Sort by rating (highest first)
    filtered.sort((a, b) => b.rating - a.rating);

    setFilteredProviders(filtered);
  }, [category, providers, searchQuery]);

  // Get category icon
  const getCategoryIcon = () => {
    if (!category) return <Wrench className="h-6 w-6" />;

    switch (category.toLowerCase()) {
      case "plumbing":
        return <Droplet className="h-6 w-6" />;
      case "electrical":
        return <Plug className="h-6 w-6" />;
      case "cleaning":
        return <Trash2 className="h-6 w-6" />;
      case "painting":
        return <Paintbrush className="h-6 w-6" />;
      case "hvac":
        return <Thermometer className="h-6 w-6" />;
      case "general maintenance":
        return <Hammer className="h-6 w-6" />;
      case "electronics repair":
        return <Smartphone className="h-6 w-6" />;
      default:
        return <Wrench className="h-6 w-6" />;
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
              <div className="flex items-center gap-3 mb-4">
                {getCategoryIcon()}
                <h1 className="text-3xl md:text-4xl font-bold">
                  {category ? `${category} Services` : "Service Providers"}
                </h1>
              </div>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                Find the best {category?.toLowerCase() || "service"}{" "}
                professionals in your area
              </p>

              {/* Search bar */}
              <div className="flex max-w-xl">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by name or description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 rounded-md"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Service providers listing */}
          <section className="py-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold">
                {filteredProviders.length} Service Providers Found
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <Card
                  key={provider.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden cursor-pointer">
                    <Link to={`/services/maintenance/${provider.id}`}>
                      <img
                        src={provider.image}
                        alt={provider.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex items-center text-white">
                        <span className="text-lg font-bold">
                          {provider.priceRange}
                        </span>
                        <span className="mx-2">•</span>
                        <span>{provider.profession}</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 flex-grow flex flex-col">
                    <div className="mb-2">
                      <h3 className="font-bold text-lg">{provider.name}</h3>
                      <div className="flex items-center text-gray-500 mb-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        <span className="text-xs">
                          {provider.location} ({provider.distance} km)
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">
                          {provider.rating.toFixed(1)}
                        </span>
                        <span className="text-gray-500 text-xs ml-1">
                          ({provider.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {provider.description}
                    </p>
                    <div className="flex items-center text-gray-500 text-xs mb-3">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{provider.availability}</span>
                      <span className="mx-2">•</span>
                      <span>{provider.experience} experience</span>
                    </div>
                    <div className="flex justify-center mt-auto">
                      <Link
                        to={`/services/maintenance/${provider.id}`}
                        className="w-full"
                      >
                        <Button variant="default" size="sm" className="w-full">
                          عرض التفاصيل
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProviders.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <Wrench className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No service providers found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search criteria
                </p>
                <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
              </div>
            )}
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
                ].map((cat) => (
                  <li key={cat}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      {cat}
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

export default ServiceCategoryPage;
