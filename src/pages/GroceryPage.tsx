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
  ShoppingBag,
  Apple,
  Beef,
  Milk,
  Bread,
  Egg,
  Carrot,
  Coffee,
} from "lucide-react";

// Mock data for grocery stores
const mockGroceryStores = [
  {
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
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    features: [
      "Fresh Produce",
      "Bakery",
      "Butcher",
      "Delivery Service",
      "Parking Available",
    ],
    tags: ["Groceries", "Fresh Food", "Household Items"],
    featured: true,
  },
  {
    id: "2",
    name: "Organic Corner",
    description: "Specialty store with organic and locally sourced products",
    category: "Organic Store",
    priceRange: "$$$",
    rating: 4.7,
    reviewCount: 186,
    location: "Jumeirah, Dubai",
    distance: 3.5,
    openingHours: "8:00 AM - 10:00 PM",
    image:
      "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=800&q=80",
    features: [
      "Organic Products",
      "Local Produce",
      "Vegan Options",
      "Eco-friendly Packaging",
    ],
    tags: ["Organic", "Healthy", "Sustainable"],
    featured: true,
  },
  {
    id: "3",
    name: "Al Noor Mini Mart",
    description: "Convenient neighborhood store for quick shopping needs",
    category: "Convenience Store",
    priceRange: "$",
    rating: 4.2,
    reviewCount: 95,
    location: "Deira, Dubai",
    distance: 0.5,
    openingHours: "24 Hours",
    image:
      "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=800&q=80",
    features: [
      "24/7 Service",
      "Quick Shopping",
      "ATM Available",
      "Mobile Recharge",
    ],
    tags: ["Convenience", "Essentials", "Snacks"],
    featured: false,
  },
  {
    id: "4",
    name: "Fresh Basket Hypermarket",
    description:
      "Large hypermarket with extensive product range and departments",
    category: "Hypermarket",
    priceRange: "$$",
    rating: 4.4,
    reviewCount: 428,
    location: "Al Qusais, Dubai",
    distance: 5.8,
    openingHours: "8:00 AM - 11:00 PM",
    image:
      "https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&q=80",
    features: [
      "Extensive Selection",
      "Electronics Department",
      "Home Goods",
      "Food Court",
      "Pharmacy",
    ],
    tags: ["One-stop Shop", "Bulk Shopping", "Discounts"],
    featured: true,
  },
  {
    id: "5",
    name: "Spice Souk Market",
    description:
      "Traditional market specializing in spices, herbs, and dry goods",
    category: "Specialty Store",
    priceRange: "$$",
    rating: 4.6,
    reviewCount: 215,
    location: "Old Dubai, Deira",
    distance: 7.2,
    openingHours: "9:00 AM - 9:00 PM",
    image:
      "https://images.unsplash.com/photo-1518983546237-2b7d4898695e?w=800&q=80",
    features: [
      "Specialty Spices",
      "Bulk Herbs",
      "Dry Fruits",
      "Traditional Products",
    ],
    tags: ["Spices", "Traditional", "Specialty"],
    featured: false,
  },
  {
    id: "6",
    name: "Al Safeer Bakala",
    description:
      "Small neighborhood grocery with essential items and friendly service",
    category: "Grocery Store",
    priceRange: "$",
    rating: 4.3,
    reviewCount: 78,
    location: "Al Nahda, Sharjah",
    distance: 2.1,
    openingHours: "6:00 AM - 1:00 AM",
    image:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80",
    features: ["Quick Service", "Fresh Bread", "Delivery", "Mobile Recharge"],
    tags: ["Local", "Convenient", "Essentials"],
    featured: false,
  },
  {
    id: "7",
    name: "Dates & Nuts Emporium",
    description:
      "Specialty store with premium dates, nuts, and Middle Eastern delicacies",
    category: "Specialty Store",
    priceRange: "$$$",
    rating: 4.8,
    reviewCount: 156,
    location: "Jumeirah Beach Road, Dubai",
    distance: 4.3,
    openingHours: "10:00 AM - 10:00 PM",
    image:
      "https://images.unsplash.com/photo-1593001872095-7d5b3868fb1d?w=800&q=80",
    features: [
      "Premium Dates",
      "Gourmet Nuts",
      "Gift Packaging",
      "Tasting Counter",
    ],
    tags: ["Gourmet", "Gifts", "Traditional"],
    featured: true,
  },
  {
    id: "8",
    name: "Al Adil Trading",
    description:
      "Indian grocery store with extensive range of spices and imported goods",
    category: "International Grocery",
    priceRange: "$$",
    rating: 4.5,
    reviewCount: 203,
    location: "Karama, Dubai",
    distance: 3.7,
    openingHours: "8:30 AM - 10:30 PM",
    image:
      "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=800&q=80",
    features: ["Indian Products", "Spices", "Lentils", "Imported Goods"],
    tags: ["International", "Specialty", "Imported"],
    featured: false,
  },
];

// Grocery categories for filtering
const groceryCategories = [
  { id: "all", label: "All Types" },
  { id: "supermarket", label: "Supermarkets" },
  { id: "convenience-store", label: "Convenience Stores" },
  { id: "hypermarket", label: "Hypermarkets" },
  { id: "organic-store", label: "Organic Stores" },
  { id: "specialty-store", label: "Specialty Stores" },
  { id: "international-grocery", label: "International Groceries" },
];

// Price ranges for filtering
const priceRanges = [
  { id: "all", label: "All Prices" },
  { id: "$", label: "$" },
  { id: "$$", label: "$$" },
  { id: "$$$", label: "$$$" },
];

// Features for filtering
const features = [
  { id: "fresh-produce", label: "Fresh Produce" },
  { id: "bakery", label: "Bakery" },
  { id: "butcher", label: "Butcher" },
  { id: "delivery", label: "Delivery Service" },
  { id: "parking", label: "Parking Available" },
  { id: "organic", label: "Organic Products" },
  { id: "24-7", label: "24/7 Service" },
  { id: "pharmacy", label: "Pharmacy" },
];

const GroceryPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState(10); // in km
  const [showFilters, setShowFilters] = useState(false);
  const [groceryStores, setGroceryStores] = useState(mockGroceryStores);
  const [filteredStores, setFilteredStores] = useState(mockGroceryStores);
  const [sortOption, setSortOption] = useState("rating");

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...groceryStores];

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
    groceryStores,
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
      case "supermarket":
        return <ShoppingBag className="h-5 w-5" />;
      case "convenience-store":
        return <ShoppingBag className="h-5 w-5" />;
      case "hypermarket":
        return <ShoppingBag className="h-5 w-5" />;
      case "organic-store":
        return <Apple className="h-5 w-5" />;
      case "specialty-store":
        return <Coffee className="h-5 w-5" />;
      case "international-grocery":
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
          {/* Hero section */}
          <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 rounded-lg mb-8">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Discover Grocery Stores
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                Find the perfect grocery store for your daily needs, from local
                convenience stores to large supermarkets
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
                          {groceryCategories.map((category) => (
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
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      All Grocery Stores
                    </Button>
                    {groceryCategories
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
                      onClick={() => navigate(`/services/grocery/${store.id}`)}
                    >
                      <div
                        className="relative h-48 overflow-hidden cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          navigate(`/services/grocery/${store.id}`);
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
                    <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No grocery stores found
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

export default GroceryPage;
