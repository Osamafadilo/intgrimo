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
  Utensils,
  Coffee,
  Pizza,
  Beef,
  Fish,
  Salad,
  Sandwich,
  Dessert,
} from "lucide-react";

// Mock data for restaurants
const mockRestaurants = [
  {
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
  },
  {
    id: "2",
    name: "Ravi Restaurant",
    description: "Authentic Pakistani cuisine at affordable prices",
    cuisine: "Pakistani",
    priceRange: "$",
    rating: 4.5,
    reviewCount: 1205,
    location: "Satwa, Dubai",
    distance: 3.5,
    openingHours: "5:00 AM - 2:00 AM",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    features: ["Takeaway", "Delivery", "Group Friendly"],
    tags: ["Casual Dining", "Budget Friendly", "Local Favorite"],
    featured: false,
  },
  {
    id: "3",
    name: "Arabian Delights",
    description: "Traditional Arabic cuisine with modern twists",
    cuisine: "Arabic",
    priceRange: "$$",
    rating: 4.6,
    reviewCount: 867,
    location: "Downtown Dubai",
    distance: 0.8,
    openingHours: "10:00 AM - 12:00 AM",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    features: [
      "Outdoor Seating",
      "Shisha",
      "Live Entertainment",
      "Family Friendly",
    ],
    tags: ["Middle Eastern", "Traditional", "Group Dining"],
    featured: true,
  },
  {
    id: "4",
    name: "Sushi Sensation",
    description: "Premium Japanese sushi and sashimi",
    cuisine: "Japanese",
    priceRange: "$$$",
    rating: 4.7,
    reviewCount: 542,
    location: "Palm Jumeirah, Dubai",
    distance: 5.2,
    openingHours: "12:00 PM - 11:30 PM",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80",
    features: ["Reservations", "Private Dining", "Alcohol Served"],
    tags: ["Sushi", "Fine Dining", "Japanese"],
    featured: false,
  },
  {
    id: "5",
    name: "Spice Route",
    description:
      "Authentic Indian cuisine with a wide variety of regional dishes",
    cuisine: "Indian",
    priceRange: "$$",
    rating: 4.4,
    reviewCount: 763,
    location: "Bur Dubai",
    distance: 2.7,
    openingHours: "11:00 AM - 11:00 PM",
    image:
      "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=800&q=80",
    features: ["Vegetarian Options", "Delivery", "Takeaway", "Group Friendly"],
    tags: ["Indian", "Spicy", "Vegetarian Friendly"],
    featured: true,
  },
  {
    id: "6",
    name: "Levantine Bistro",
    description: "Modern Lebanese and Mediterranean cuisine",
    cuisine: "Lebanese",
    priceRange: "$$",
    rating: 4.5,
    reviewCount: 489,
    location: "Jumeirah Lakes Towers, Dubai",
    distance: 4.1,
    openingHours: "9:00 AM - 11:00 PM",
    image:
      "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&q=80",
    features: ["Outdoor Seating", "Breakfast", "Shisha", "Family Friendly"],
    tags: ["Lebanese", "Mediterranean", "Breakfast"],
    featured: false,
  },
  {
    id: "7",
    name: "Burger Gourmet",
    description: "Gourmet burgers with premium ingredients",
    cuisine: "American",
    priceRange: "$$",
    rating: 4.3,
    reviewCount: 621,
    location: "Dubai Marina",
    distance: 1.5,
    openingHours: "11:00 AM - 12:00 AM",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800&q=80",
    features: ["Takeaway", "Delivery", "Outdoor Seating"],
    tags: ["Burgers", "American", "Casual"],
    featured: false,
  },
  {
    id: "8",
    name: "La Trattoria",
    description: "Authentic Italian cuisine with homemade pasta",
    cuisine: "Italian",
    priceRange: "$$$",
    rating: 4.6,
    reviewCount: 412,
    location: "Downtown Dubai",
    distance: 0.9,
    openingHours: "12:00 PM - 11:00 PM",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    features: ["Reservations", "Outdoor Seating", "Alcohol Served", "Romantic"],
    tags: ["Italian", "Pasta", "Pizza", "Fine Dining"],
    featured: true,
  },
];

// Cuisine types for filtering
const cuisineTypes = [
  { id: "all", label: "All Cuisines" },
  { id: "arabic", label: "Arabic" },
  { id: "indian", label: "Indian" },
  { id: "italian", label: "Italian" },
  { id: "japanese", label: "Japanese" },
  { id: "lebanese", label: "Lebanese" },
  { id: "pakistani", label: "Pakistani" },
  { id: "seafood", label: "Seafood" },
  { id: "american", label: "American" },
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
  { id: "outdoor", label: "Outdoor Seating" },
  { id: "delivery", label: "Delivery" },
  { id: "takeaway", label: "Takeaway" },
  { id: "reservations", label: "Reservations" },
  { id: "family", label: "Family Friendly" },
  { id: "alcohol", label: "Alcohol Served" },
  { id: "vegetarian", label: "Vegetarian Options" },
  { id: "shisha", label: "Shisha" },
];

const RestaurantsPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [maxDistance, setMaxDistance] = useState(10); // in km
  const [showFilters, setShowFilters] = useState(false);
  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(mockRestaurants);
  const [sortOption, setSortOption] = useState("rating");

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...restaurants];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          restaurant.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filter by cuisine
    if (selectedCuisine !== "all") {
      filtered = filtered.filter(
        (restaurant) =>
          restaurant.cuisine.toLowerCase() === selectedCuisine.toLowerCase(),
      );
    }

    // Filter by price range
    if (selectedPriceRange !== "all") {
      filtered = filtered.filter(
        (restaurant) => restaurant.priceRange === selectedPriceRange,
      );
    }

    // Filter by features
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter((restaurant) =>
        selectedFeatures.every((feature) =>
          restaurant.features.some((f) =>
            f.toLowerCase().includes(feature.toLowerCase()),
          ),
        ),
      );
    }

    // Filter by distance
    filtered = filtered.filter(
      (restaurant) => restaurant.distance <= maxDistance,
    );

    // Sort restaurants
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

    setFilteredRestaurants(filtered);
  }, [
    restaurants,
    searchQuery,
    selectedCuisine,
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
    setSelectedCuisine("all");
    setSelectedPriceRange("all");
    setSelectedFeatures([]);
    setMaxDistance(10);
    setSortOption("rating");
  };

  // Get cuisine icon
  const getCuisineIcon = (cuisine: string) => {
    switch (cuisine.toLowerCase()) {
      case "seafood":
        return <Fish className="h-5 w-5" />;
      case "italian":
        return <Pizza className="h-5 w-5" />;
      case "american":
        return <Sandwich className="h-5 w-5" />;
      case "japanese":
        return <Utensils className="h-5 w-5" />;
      case "indian":
      case "pakistani":
        return <Utensils className="h-5 w-5" />;
      case "arabic":
      case "lebanese":
        return <Coffee className="h-5 w-5" />;
      default:
        return <Utensils className="h-5 w-5" />;
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
                Discover Restaurants
              </h1>
              <p className="text-lg text-gray-600 mb-6 max-w-2xl">
                Find the perfect dining experience from our curated selection of
                restaurants
              </p>

              {/* Search bar */}
              <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by restaurant name, cuisine, or description"
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
                    {/* Cuisine Type */}
                    <div>
                      <Label className="mb-2 block">Cuisine Type</Label>
                      <Select
                        value={selectedCuisine}
                        onValueChange={setSelectedCuisine}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select cuisine" />
                        </SelectTrigger>
                        <SelectContent>
                          {cuisineTypes.map((cuisine) => (
                            <SelectItem key={cuisine.id} value={cuisine.id}>
                              {cuisine.label}
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

          {/* Restaurant listings section */}
          <section className="py-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white p-4 rounded-md shadow-sm sticky top-24">
                  <h3 className="font-bold text-lg mb-4">Categories</h3>

                  <div className="space-y-2">
                    <Button
                      variant={selectedCuisine === "all" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCuisine("all")}
                    >
                      <Utensils className="mr-2 h-4 w-4" />
                      All Cuisines
                    </Button>
                    {cuisineTypes
                      .filter((cuisine) => cuisine.id !== "all")
                      .map((cuisine) => (
                        <Button
                          key={cuisine.id}
                          variant={
                            selectedCuisine === cuisine.id ? "default" : "ghost"
                          }
                          className="w-full justify-start"
                          onClick={() => setSelectedCuisine(cuisine.id)}
                        >
                          {getCuisineIcon(cuisine.label)}
                          <span className="ml-2">{cuisine.label}</span>
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
                    {filteredRestaurants.length} Restaurants Found
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRestaurants.map((restaurant) => (
                    <Card
                      key={restaurant.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col cursor-pointer"
                      onClick={() =>
                        navigate(`/services/restaurants/${restaurant.id}`)
                      }
                    >
                      <div
                        className="relative h-48 overflow-hidden cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent event bubbling
                          navigate(`/services/restaurants/${restaurant.id}`);
                        }}
                      >
                        <img
                          src={restaurant.image}
                          alt={restaurant.name}
                          className="w-full h-full object-cover"
                        />
                        {restaurant.featured && (
                          <Badge className="absolute top-2 right-2 bg-primary">
                            Featured
                          </Badge>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <div className="flex items-center text-white">
                            <span className="text-lg font-bold">
                              {restaurant.priceRange}
                            </span>
                            <span className="mx-2">•</span>
                            <span>{restaurant.cuisine}</span>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4 flex-grow flex flex-col">
                        <div className="mb-2">
                          <h3 className="font-bold text-lg">
                            {restaurant.name}
                          </h3>
                          <div className="flex items-center text-gray-500 mb-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="text-xs">
                              {restaurant.location} ({restaurant.distance} km)
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-medium">
                              {restaurant.rating.toFixed(1)}
                            </span>
                            <span className="text-gray-500 text-xs ml-1">
                              ({restaurant.reviewCount} reviews)
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {restaurant.description}
                        </p>
                        <div className="flex items-center text-gray-500 text-xs mb-3">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{restaurant.openingHours}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-auto">
                          {restaurant.tags.slice(0, 3).map((tag, index) => (
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

                {filteredRestaurants.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <Utensils className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No restaurants found
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

export default RestaurantsPage;
