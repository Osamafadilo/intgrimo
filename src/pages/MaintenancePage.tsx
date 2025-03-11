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
  Wrench,
  Hammer,
  Paintbrush,
  Plug,
  Droplet,
  Trash2,
  Thermometer,
  Smartphone,
  Car,
} from "lucide-react";

// Mock data for maintenance workers
const mockMaintenanceWorkers = [
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
    distance: 1.2, // in km
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80",
    workImages: [
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80",
      "https://images.unsplash.com/photo-1580341289255-5b47c98a59dd?w=800&q=80",
      "https://images.unsplash.com/photo-1585704032915-c3400305e516?w=800&q=80",
    ],
    features: [
      "Emergency Services",
      "Free Inspection",
      "Warranty on Work",
      "Tools Provided",
    ],
    tags: ["Plumbing", "Repairs", "Installation"],
    featured: true,
    services: [
      "Pipe Repairs",
      "Drain Cleaning",
      "Fixture Installation",
      "Water Heater Services",
    ],
    experience: "10+ years",
    phone: "+971 50 123 4567",
    whatsapp: "+971501234567",
    coordinates: { lat: 25.1123, lng: 55.1892 },
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
    workImages: [
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-c891f5ef8d72?w=800&q=80",
      "https://images.unsplash.com/photo-1544724569-5f546fd6f2b6?w=800&q=80",
    ],
    features: [
      "24/7 Emergency Services",
      "Licensed & Insured",
      "Warranty on Work",
      "Free Estimates",
    ],
    tags: ["Electrical", "Repairs", "Installation"],
    featured: true,
    services: [
      "Wiring & Rewiring",
      "Electrical Panel Upgrades",
      "Lighting Installation",
      "Troubleshooting",
    ],
    experience: "8 years",
    phone: "+971 50 987 6543",
    whatsapp: "+971509876543",
    coordinates: { lat: 25.2743, lng: 55.3097 },
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
    workImages: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80",
    ],
    features: [
      "Eco-friendly Products",
      "Regular or One-time Service",
      "Customized Cleaning Plans",
      "Satisfaction Guaranteed",
    ],
    tags: ["Cleaning", "Housekeeping", "Sanitizing"],
    featured: false,
    services: [
      "Deep Cleaning",
      "Regular Maintenance",
      "Move-in/Move-out Cleaning",
      "Office Cleaning",
    ],
    experience: "5 years",
    phone: "+971 50 456 7890",
    whatsapp: "+971504567890",
    coordinates: { lat: 25.2048, lng: 55.2708 },
  },
  {
    id: "4",
    name: "Khalid Al-Mansouri",
    profession: "Painter",
    description:
      "Professional painter specializing in interior and exterior painting services",
    category: "Painting",
    priceRange: "$$",
    rating: 4.6,
    reviewCount: 98,
    location: "Al Quoz, Dubai",
    distance: 4.2,
    availability: "Available in 2 Days",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
    workImages: [
      "https://images.unsplash.com/photo-1562259929-b4e1fd3aef09?w=800&q=80",
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&q=80",
      "https://images.unsplash.com/photo-1558618666-c891f5ef8d72?w=800&q=80",
    ],
    features: [
      "Premium Quality Paints",
      "Free Color Consultation",
      "Detailed Preparation",
      "Clean Work Environment",
    ],
    tags: ["Painting", "Interior", "Exterior"],
    featured: false,
    services: [
      "Interior Painting",
      "Exterior Painting",
      "Wallpaper Installation",
      "Texture Painting",
    ],
    experience: "7 years",
    phone: "+971 50 234 5678",
    whatsapp: "+971502345678",
    coordinates: { lat: 25.1392, lng: 55.226 },
  },
  {
    id: "5",
    name: "Omar Al-Hashimi",
    profession: "HVAC Technician",
    description:
      "Certified HVAC technician specializing in air conditioning and heating systems",
    category: "HVAC",
    priceRange: "$$$",
    rating: 4.7,
    reviewCount: 112,
    location: "Dubai Silicon Oasis",
    distance: 7.5,
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80",
    workImages: [
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80",
      "https://images.unsplash.com/photo-1604754742629-3e0474ce2332?w=800&q=80",
      "https://images.unsplash.com/photo-1599045118108-bf9954418b76?w=800&q=80",
    ],
    features: [
      "24/7 Emergency Services",
      "Preventative Maintenance",
      "Energy Efficient Solutions",
      "All Brands Serviced",
    ],
    tags: ["HVAC", "Air Conditioning", "Heating"],
    featured: true,
    services: [
      "AC Installation & Repair",
      "Heating System Services",
      "Duct Cleaning",
      "Preventative Maintenance",
    ],
    experience: "12 years",
    phone: "+971 50 345 6789",
    whatsapp: "+971503456789",
    coordinates: { lat: 25.1279, lng: 55.3806 },
  },
  {
    id: "6",
    name: "Saeed Al-Dhaheri",
    profession: "Handyman",
    description:
      "Versatile handyman providing a wide range of home repair and maintenance services",
    category: "General Maintenance",
    priceRange: "$$",
    rating: 4.5,
    reviewCount: 87,
    location: "Dubai Marina",
    distance: 5.1,
    availability: "Available Today",
    image:
      "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800&q=80",
    workImages: [
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80",
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
    ],
    features: [
      "Multiple Services Offered",
      "Reliable & Punctual",
      "Quality Workmanship",
      "Affordable Rates",
    ],
    tags: ["Handyman", "Repairs", "Installation"],
    featured: false,
    services: [
      "Furniture Assembly",
      "Minor Repairs",
      "TV Mounting",
      "Door & Lock Installation",
    ],
    experience: "6 years",
    phone: "+971 50 567 8901",
    whatsapp: "+971505678901",
    coordinates: { lat: 25.0772, lng: 55.1385 },
  },
  {
    id: "7",
    name: "Aisha Al-Shamsi",
    profession: "Carpet Cleaner",
    description:
      "Professional carpet and upholstery cleaning services for homes and businesses",
    category: "Cleaning",
    priceRange: "$$",
    rating: 4.8,
    reviewCount: 76,
    location: "Al Nahda, Dubai",
    distance: 6.3,
    availability: "Available Tomorrow",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
    workImages: [
      "https://images.unsplash.com/photo-1558618666-c891f5ef8d72?w=800&q=80",
      "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80",
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=800&q=80",
    ],
    features: [
      "Deep Cleaning Technology",
      "Stain Removal Specialists",
      "Eco-friendly Products",
      "Fast Drying Process",
    ],
    tags: ["Carpet Cleaning", "Upholstery", "Stain Removal"],
    featured: false,
    services: [
      "Carpet Deep Cleaning",
      "Upholstery Cleaning",
      "Stain Removal",
      "Odor Elimination",
    ],
    experience: "8 years",
    phone: "+971 50 678 9012",
    whatsapp: "+971506789012",
    coordinates: { lat: 25.2866, lng: 55.3641 },
  },
  {
    id: "8",
    name: "Yousuf Al-Mazrouei",
    profession: "Mobile Phone Technician",
    description:
      "Expert mobile phone repair technician specializing in all major brands",
    category: "Electronics Repair",
    priceRange: "$$",
    rating: 4.9,
    reviewCount: 143,
    location: "Bur Dubai",
    distance: 3.7,
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1589756033371-a2c5ebae895d?w=800&q=80",
    workImages: [
      "https://images.unsplash.com/photo-1589756033371-a2c5ebae895d?w=800&q=80",
      "https://images.unsplash.com/photo-1580795479225-c50ab8c3348d?w=800&q=80",
      "https://images.unsplash.com/photo-1621330396173-e41b1cafd17f?w=800&q=80",
    ],
    features: [
      "Fast Repair Service",
      "Genuine Parts",
      "Warranty on Repairs",
      "All Brands Serviced",
    ],
    tags: ["Phone Repair", "Screen Replacement", "Battery Replacement"],
    featured: true,
    services: [
      "Screen Replacement",
      "Battery Replacement",
      "Water Damage Repair",
      "Software Issues",
    ],
    experience: "9 years",
    phone: "+971 50 789 0123",
    whatsapp: "+971507890123",
    coordinates: { lat: 25.2582, lng: 55.2994 },
  },
];

// Maintenance categories for filtering
const maintenanceCategories = [
  { id: "all", label: "All Services", icon: "Wrench" },
  { id: "plumbing", label: "Plumbing", icon: "Droplet" },
  { id: "electrical", label: "Electrical", icon: "Plug" },
  { id: "cleaning", label: "Cleaning", icon: "Trash2" },
  { id: "painting", label: "Painting", icon: "Paintbrush" },
  { id: "hvac", label: "HVAC", icon: "Thermometer" },
  { id: "general-maintenance", label: "General Maintenance", icon: "Hammer" },
  { id: "electronics-repair", label: "Electronics Repair", icon: "Smartphone" },
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
  { id: "emergency", label: "Emergency Services" },
  { id: "warranty", label: "Warranty on Work" },
  { id: "free-inspection", label: "Free Inspection" },
  { id: "licensed", label: "Licensed & Insured" },
  { id: "tools", label: "Tools Provided" },
  { id: "eco-friendly", label: "Eco-friendly" },
];

const MaintenancePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState(10); // in km
  const [showFilters, setShowFilters] = useState(false);
  const [workers, setWorkers] = useState(mockMaintenanceWorkers);
  const [filteredWorkers, setFilteredWorkers] = useState(
    mockMaintenanceWorkers,
  );
  const [sortOption, setSortOption] = useState("rating");
  const [showMap, setShowMap] = useState(false);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };

  // Check URL parameters for category filter
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...workers];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (worker) =>
          worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          worker.profession.toLowerCase().includes(searchQuery.toLowerCase()) ||
          worker.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          worker.category.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (worker) =>
          worker.category.toLowerCase().replace(/\s+/g, "-") ===
            selectedCategory.toLowerCase() ||
          worker.tags.some(
            (tag) =>
              tag.toLowerCase().replace(/\s+/g, "-") ===
              selectedCategory.toLowerCase(),
          ),
      );
    }

    // Filter by price range
    if (selectedPriceRange !== "all") {
      filtered = filtered.filter(
        (worker) => worker.priceRange === selectedPriceRange,
      );
    }

    // Filter by features
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter((worker) =>
        selectedFeatures.every((feature) =>
          worker.features.some((f) =>
            f.toLowerCase().includes(feature.toLowerCase()),
          ),
        ),
      );
    }

    // Filter by distance
    filtered = filtered.filter((worker) => worker.distance <= maxDistance);

    // Sort workers
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

    setFilteredWorkers(filtered);
  }, [
    workers,
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
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Wrench":
        return <Wrench className="h-5 w-5" />;
      case "Droplet":
        return <Droplet className="h-5 w-5" />;
      case "Plug":
        return <Plug className="h-5 w-5" />;
      case "Trash2":
        return <Trash2 className="h-5 w-5" />;
      case "Paintbrush":
        return <Paintbrush className="h-5 w-5" />;
      case "Thermometer":
        return <Thermometer className="h-5 w-5" />;
      case "Hammer":
        return <Hammer className="h-5 w-5" />;
      case "Smartphone":
        return <Smartphone className="h-5 w-5" />;
      default:
        return <Wrench className="h-5 w-5" />;
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
                Find Maintenance Services
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                Connect with skilled professionals for all your maintenance and
                repair needs
              </p>

              {/* Search bar */}
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by service type, professional name, or description"
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
                    {/* Service Category */}
                    <div>
                      <Label className="mb-2 block">Service Category</Label>
                      <Select
                        value={selectedCategory}
                        onValueChange={setSelectedCategory}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {maintenanceCategories.map((category) => (
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
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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

          {/* Mini Map */}
          <section className="mb-8">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-xl font-bold mb-4">
                Service Providers Near You
              </h2>
              <div
                className={`${showMap ? "h-[500px]" : "h-[200px]"} w-full rounded-md overflow-hidden relative cursor-pointer transition-all duration-300`}
                onClick={() => setShowMap(!showMap)}
              >
                {/* This would be replaced with an actual map component like Google Maps */}
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">
                    {showMap ? "Click to minimize map" : "Click to expand map"}
                  </p>
                </div>

                {/* Sample map markers for demonstration */}
                <div className="absolute top-1/4 left-1/3 bg-primary text-white p-2 rounded-full">
                  <Wrench className="h-4 w-4" />
                </div>
                <div className="absolute top-1/2 left-1/2 bg-primary text-white p-2 rounded-full">
                  <Droplet className="h-4 w-4" />
                </div>
                <div className="absolute bottom-1/3 right-1/4 bg-primary text-white p-2 rounded-full">
                  <Plug className="h-4 w-4" />
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Click on the map to {showMap ? "minimize" : "expand"} view
              </p>
            </div>
          </section>

          {/* Service listings section */}
          <section className="py-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white p-4 rounded-md shadow-sm sticky top-24">
                  <h3 className="font-bold text-lg mb-4">Service Categories</h3>

                  <div className="space-y-2">
                    <Button
                      variant={selectedCategory === "all" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory("all")}
                    >
                      <Wrench className="mr-2 h-4 w-4" />
                      All Services
                    </Button>
                    {maintenanceCategories
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
                          {getCategoryIcon(category.icon)}
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
                    {filteredWorkers.length} Service Providers Found
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredWorkers.map((worker) => (
                    <Card
                      key={worker.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col"
                    >
                      <div className="relative h-48 overflow-hidden cursor-pointer">
                        <Link to={`/services/maintenance/${worker.id}`}>
                          <img
                            src={worker.image}
                            alt={worker.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        {worker.featured && (
                          <Badge className="absolute top-2 right-2 bg-primary">
                            Featured
                          </Badge>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <div className="flex items-center text-white">
                            <span className="text-lg font-bold">
                              {worker.priceRange}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{worker.profession}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4 flex-grow flex flex-col">
                        <div className="mb-2">
                          <h3 className="font-bold text-lg">{worker.name}</h3>
                          <div className="flex items-center text-gray-500 mb-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="text-xs">
                              {worker.location} ({worker.distance} km)
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-medium">
                              {worker.rating.toFixed(1)}
                            </span>
                            <span className="text-gray-500 text-xs ml-1">
                              ({worker.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {worker.description}
                        </p>
                        <div className="flex items-center text-gray-500 text-xs mb-3">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{worker.availability}</span>
                          <span className="mx-2">•</span>
                          <span>{worker.experience} experience</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {worker.tags.slice(0, 3).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs bg-gray-100"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-center mt-auto">
                          <Link
                            to={`/services/maintenance/${worker.id}`}
                            className="w-full"
                          >
                            <Button
                              variant="default"
                              size="sm"
                              className="w-full"
                            >
                              عرض التفاصيل
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredWorkers.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <Wrench className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No service providers found
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

export default MaintenancePage;
