import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
  Store,
  ShoppingBag,
  Shirt,
  Smartphone,
  Home,
  Gem,
  Glasses,
  Baby,
  BookOpen,
  ShoppingCart,
} from "lucide-react";

// Mock data for stores
const mockStores = [
  {
    id: "1",
    name: "Al Futtaim Mall",
    description: "Premium shopping mall with international brands",
    category: "Shopping Mall",
    priceRange: "$$$",
    rating: 4.7,
    reviewCount: 412,
    location: "Dubai Festival City, Dubai",
    distance: 2.5, // in km
    openingHours: "10:00 AM - 10:00 PM",
    image:
      "https://images.unsplash.com/photo-1581417478175-a9ef18f210c2?w=800&q=80",
    features: [
      "Parking Available",
      "Food Court",
      "Wheelchair Accessible",
      "Free WiFi",
    ],
    tags: ["Fashion", "Electronics", "Home Goods"],
    featured: true,
  },
  {
    id: "2",
    name: "Souk Al Bahar",
    description: "Traditional Arabian marketplace with modern stores",
    category: "Traditional Market",
    priceRange: "$$",
    rating: 4.5,
    reviewCount: 328,
    location: "Downtown Dubai",
    distance: 1.2,
    openingHours: "10:00 AM - 11:00 PM",
    image:
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
    features: [
      "Parking Available",
      "Restaurants",
      "Wheelchair Accessible",
      "Tourist Friendly",
    ],
    tags: ["Traditional", "Souvenirs", "Handicrafts"],
    featured: false,
  },
  {
    id: "3",
    name: "Dubai Electronics Market",
    description: "Largest electronics market with competitive prices",
    category: "Electronics",
    priceRange: "$$",
    rating: 4.3,
    reviewCount: 256,
    location: "Bur Dubai",
    distance: 3.8,
    openingHours: "9:00 AM - 10:00 PM",
    image:
      "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80",
    features: [
      "Technical Support",
      "Warranty Services",
      "Price Negotiable",
      "Repair Services",
    ],
    tags: ["Electronics", "Gadgets", "Computers"],
    featured: true,
  },
  {
    id: "4",
    name: "Gold & Diamond Park",
    description: "Luxury jewelry shopping destination",
    category: "Jewelry",
    priceRange: "$$$$",
    rating: 4.8,
    reviewCount: 189,
    location: "Sheikh Zayed Road, Dubai",
    distance: 5.1,
    openingHours: "10:00 AM - 9:00 PM",
    image:
      "https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800&q=80",
    features: [
      "Certified Products",
      "Custom Designs",
      "Security Services",
      "Valet Parking",
    ],
    tags: ["Jewelry", "Luxury", "Gold", "Diamonds"],
    featured: true,
  },
  {
    id: "5",
    name: "Al Qasba Bookstore",
    description: "Extensive collection of books in multiple languages",
    category: "Bookstore",
    priceRange: "$",
    rating: 4.4,
    reviewCount: 142,
    location: "Sharjah",
    distance: 8.7,
    openingHours: "9:00 AM - 8:00 PM",
    image:
      "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=800&q=80",
    features: [
      "Reading Area",
      "Coffee Shop",
      "Special Orders",
      "Children's Section",
    ],
    tags: ["Books", "Educational", "Stationery"],
    featured: false,
  },
  {
    id: "6",
    name: "Fashion Avenue",
    description: "High-end fashion boutiques and designer stores",
    category: "Fashion",
    priceRange: "$$$$",
    rating: 4.6,
    reviewCount: 278,
    location: "Dubai Mall, Downtown Dubai",
    distance: 1.5,
    openingHours: "10:00 AM - 11:00 PM",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    features: [
      "Personal Shoppers",
      "VIP Lounges",
      "Alterations",
      "Valet Parking",
    ],
    tags: ["Luxury", "Fashion", "Designer"],
    featured: true,
  },
  {
    id: "7",
    name: "Tech Hub",
    description: "Latest gadgets and tech accessories",
    category: "Electronics",
    priceRange: "$$$",
    rating: 4.2,
    reviewCount: 203,
    location: "Mall of the Emirates, Dubai",
    distance: 4.3,
    openingHours: "10:00 AM - 10:00 PM",
    image:
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
    features: [
      "Demo Products",
      "Expert Staff",
      "Warranty Services",
      "Trade-in Options",
    ],
    tags: ["Electronics", "Gadgets", "Smart Home"],
    featured: false,
  },
  {
    id: "8",
    name: "Home Essentials",
    description: "Quality furniture and home decor items",
    category: "Home Goods",
    priceRange: "$$",
    rating: 4.3,
    reviewCount: 176,
    location: "Sheikh Zayed Road, Dubai",
    distance: 3.2,
    openingHours: "9:00 AM - 9:00 PM",
    image:
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80",
    features: [
      "Interior Design Service",
      "Delivery Service",
      "Assembly Service",
      "Return Policy",
    ],
    tags: ["Furniture", "Home Decor", "Kitchenware"],
    featured: false,
  },
];

// Store categories for filtering
const storeCategories = [
  { id: "all", label: "All Categories" },
  { id: "shopping-mall", label: "Shopping Malls" },
  { id: "traditional-market", label: "Traditional Markets" },
  { id: "electronics", label: "Electronics" },
  { id: "jewelry", label: "Jewelry" },
  { id: "bookstore", label: "Bookstores" },
  { id: "fashion", label: "Fashion" },
  { id: "home-goods", label: "Home Goods" },
];

// Price ranges for filtering
const priceRanges = [
  { id: "all", label: "All Prices" },
  { id: "$", label: "$" },
  { id: "$$", label: "$$" },
  { id: "$$$", label: "$$$" },
  { id: "$$$$", label: "$$$$" },
];

// Features for filtering
const features = [
  { id: "parking", label: "Parking Available" },
  { id: "wifi", label: "Free WiFi" },
  { id: "wheelchair", label: "Wheelchair Accessible" },
  { id: "delivery", label: "Delivery Service" },
  { id: "warranty", label: "Warranty Services" },
  { id: "return", label: "Return Policy" },
  { id: "valet", label: "Valet Parking" },
  { id: "food", label: "Food Court/Restaurants" },
];

const StoresPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState(10); // in km
  const [showFilters, setShowFilters] = useState(false);
  const [stores, setStores] = useState(mockStores);
  const [filteredStores, setFilteredStores] = useState(mockStores);
  const [sortOption, setSortOption] = useState("rating");

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...stores];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (store) =>
          store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          store.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (store) =>
          store.category.toLowerCase().replace(/\s+/g, "-") ===
            selectedCategory.toLowerCase() ||
          store.tags.some(
            (tag) =>
              tag.toLowerCase().replace(/\s+/g, "-") ===
              selectedCategory.toLowerCase(),
          ),
      );
    }

    // Filter by price range
    if (selectedPriceRange !== "all") {
      filtered = filtered.filter(
        (store) => store.priceRange === selectedPriceRange,
      );
    }

    // Filter by features
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter((store) =>
        selectedFeatures.every((feature) =>
          store.features.some((f) =>
            f.toLowerCase().includes(feature.toLowerCase()),
          ),
        ),
      );
    }

    // Filter by distance
    filtered = filtered.filter((store) => store.distance <= maxDistance);

    // Sort stores
    switch (sortOption) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "distance":
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case "price-low":
        filtered.sort((a, b) => {
          const priceToNumber = (price: string) => price.length;
          return priceToNumber(a.priceRange) - priceToNumber(b.priceRange);
        });
        break;
      case "price-high":
        filtered.sort((a, b) => {
          const priceToNumber = (price: string) => price.length;
          return priceToNumber(b.priceRange) - priceToNumber(a.priceRange);
        });
        break;
      default:
        break;
    }

    setFilteredStores(filtered);
  }, [
    stores,
    searchQuery,
    selectedCategory,
    selectedPriceRange,
    selectedFeatures,
    maxDistance,
    sortOption,
  ]);

  // Toggle feature selection
  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId],
    );
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedPriceRange("all");
    setSelectedFeatures([]);
    setMaxDistance(10);
    setSortOption("rating");
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase().replace(/\s+/g, "-")) {
      case "shopping-mall":
        return <Store className="h-5 w-5" />;
      case "traditional-market":
        return <ShoppingBag className="h-5 w-5" />;
      case "electronics":
        return <Smartphone className="h-5 w-5" />;
      case "jewelry":
        return <Gem className="h-5 w-5" />;
      case "bookstore":
        return <BookOpen className="h-5 w-5" />;
      case "fashion":
        return <Shirt className="h-5 w-5" />;
      case "home-goods":
        return <Home className="h-5 w-5" />;
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
          {/* Hero section */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 rounded-lg mb-8">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Discover Stores
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                Find the perfect shopping experience from our curated selection
                of stores and markets
              </p>

              {/* Search bar */}
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by store name, category, or description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 rounded-md"
                  />
                </div>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="h-12 w-full md:w-[200px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="distance">Nearest First</SelectItem>
                    <SelectItem value="price-low">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  className="h-12 flex items-center gap-2"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
              </div>

              {/* Advanced filters */}
              {showFilters && (
                <div className="mt-4 p-4 bg-white rounded-md shadow-sm max-w-4xl">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">Advanced Filters</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Store Category */}
                    <div>
                      <Label className="mb-2 block">Store Category</Label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {storeCategories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price Range */}
                    <div>
                      <Label className="mb-2 block">Price Range</Label>
                      <Select
                        value={selectedPriceRange}
                        onValueChange={setSelectedPriceRange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent>
                          {priceRanges.map((price) => (
                            <SelectItem key={price.id} value={price.id}>
                              {price.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Distance */}
                    <div>
                      <Label className="mb-2 block">Maximum Distance</Label>
                      <div className="mb-2">
                        <span className="text-sm text-gray-500">
                          {maxDistance} km
                        </span>
                      </div>
                      <Slider
                        defaultValue={[maxDistance]}
                        max={20}
                        step={0.5}
                        value={[maxDistance]}
                        onValueChange={(value) => setMaxDistance(value[0])}
                        className="my-4"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <Label className="mb-2 block">Features</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {features.map((feature) => (
                        <div
                          key={feature.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`feature-${feature.id}`}
                            checked={selectedFeatures.includes(feature.id)}
                            onCheckedChange={() => toggleFeature(feature.id)}
                          />
                          <Label
                            htmlFor={`feature-${feature.id}`}
                            className="text-sm"
                          >
                            {feature.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline" onClick={resetFilters}>
                      Reset
                    </Button>
                    <Button onClick={() => setShowFilters(false)}>
                      Apply Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Store listings section */}
          <section className="py-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white p-4 rounded-md shadow-sm sticky top-24">
                  <h3 className="font-bold text-lg mb-4">Categories</h3>

                  <div className="space-y-2">
                    <Button
                      variant={selectedCategory === "all" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory("all")}
                    >
                      <Store className="mr-2 h-4 w-4" />
                      All Stores
                    </Button>
                    {storeCategories
                      .filter((category) => category.id !== "all")
                      .map((category) => (
                        <Button
                          key={category.id}
                          variant={
                            selectedCategory === category.id
                              ? "default"
                              : "ghost"
                          }
                          className="w-full justify-start"
                          onClick={() => setSelectedCategory(category.id)}
                        >
                          {getCategoryIcon(category.id)}
                          <span className="ml-2">{category.label}</span>
                        </Button>
                      ))}
                  </div>

                  <Separator className="my-4" />

                  <h3 className="font-bold text-lg mb-4">Price Range</h3>
                  <div className="space-y-2">
                    {priceRanges.map((price) => (
                      <Button
                        key={price.id}
                        variant={
                          selectedPriceRange === price.id ? "default" : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() => setSelectedPriceRange(price.id)}
                      >
                        <span>{price.label}</span>
                      </Button>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <h3 className="font-bold text-lg mb-4">Distance</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[maxDistance]}
                      max={20}
                      step={0.5}
                      value={[maxDistance]}
                      onValueChange={(value) => setMaxDistance(value[0])}
                      className="my-4"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>0 km</span>
                      <span>{maxDistance} km</span>
                      <span>20 km</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h3 className="font-bold text-lg mb-4">Features</h3>
                  <div className="space-y-2">
                    {features.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`sidebar-feature-${feature.id}`}
                          checked={selectedFeatures.includes(feature.id)}
                          onCheckedChange={() => toggleFeature(feature.id)}
                        />
                        <Label
                          htmlFor={`sidebar-feature-${feature.id}`}
                          className="text-sm cursor-pointer"
                        >
                          {feature.label}
                        </Label>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={resetFilters}
                  >
                    Reset Filters
                  </Button>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {filteredStores.length} Stores Found
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredStores.map((store) => (
                    <Card
                      key={store.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer"
                      onClick={() => navigate(`/services/stores/${store.id}`)}
                    >
                      <div
                        className="relative h-48 overflow-hidden cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          navigate(`/services/stores/${store.id}`);
                        }}
                      >
                        <img
                          src={store.image}
                          alt={store.name}
                          className="w-full h-full object-cover"
                        />
                        {store.featured && (
                          <Badge className="absolute top-2 right-2 bg-primary">
                            Featured
                          </Badge>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <div className="flex items-center text-white">
                            <span className="text-lg font-bold">
                              {store.priceRange}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{store.category}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4 flex-grow flex flex-col">
                        <div className="mb-2">
                          <h3 className="font-bold text-lg">{store.name}</h3>
                          <div className="flex items-center text-gray-500 mb-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="text-xs">
                              {store.location} ({store.distance} km)
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-medium">
                              {store.rating.toFixed(1)}
                            </span>
                            <span className="text-gray-500 text-xs ml-1">
                              ({store.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {store.description}
                        </p>
                        <div className="flex items-center text-gray-500 text-xs mb-3">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{store.openingHours}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-auto">
                          {store.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-gray-100"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredStores.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <Store className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No stores found
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Try adjusting your filters or search criteria
                    </p>
                    <Button onClick={resetFilters}>Reset Filters</Button>
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

export default StoresPage;
