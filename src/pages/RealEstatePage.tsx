import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import RealEstateCard, {
  RealEstateProperty,
} from "../components/services/RealEstate";
import FeaturedServicesCarousel from "../components/services/FeaturedServicesCarousel";
import { ServiceProvider } from "../components/services/ServiceCard";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Slider } from "../components/ui/slider";
import { Checkbox } from "../components/ui/checkbox";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Home, Building, Search, MapPin, Filter, X } from "lucide-react";

// Mock data for real estate properties
const mockProperties: RealEstateProperty[] = [
  {
    id: "1",
    title: "Modern Apartment with Sea View",
    description:
      "Beautiful modern apartment with stunning sea views, fully furnished and renovated.",
    price: 1200,
    location: "Dubai Marina, Dubai",
    type: "Rent",
    bedrooms: 2,
    bathrooms: 2,
    area: 120,
    availableDates: ["Immediate", "Flexible"],
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    agent: {
      name: "Ahmed Al-Mansour",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed",
      rating: 4.9,
    },
  },
  {
    id: "2",
    title: "Luxury Villa with Private Pool",
    description:
      "Exclusive villa in a gated community with private pool and garden.",
    price: 850000,
    location: "Palm Jumeirah, Dubai",
    type: "Sale",
    bedrooms: 5,
    bathrooms: 6,
    area: 450,
    availableDates: ["Immediate"],
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    agent: {
      name: "Sara Khalid",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
      rating: 4.7,
    },
  },
  {
    id: "3",
    title: "Cozy Studio in Downtown",
    description:
      "Modern studio apartment in the heart of downtown, close to all amenities.",
    price: 750,
    location: "Downtown, Dubai",
    type: "Rent",
    bedrooms: 0,
    bathrooms: 1,
    area: 55,
    availableDates: ["Next Month", "Flexible"],
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    agent: {
      name: "Mohammed Ali",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
      rating: 4.8,
    },
  },
  {
    id: "4",
    title: "Spacious Family Home",
    description:
      "Large family home with garden, perfect for families looking for space and comfort.",
    price: 320000,
    location: "Arabian Ranches, Dubai",
    type: "Sale",
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    availableDates: ["Immediate", "Negotiable"],
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    agent: {
      name: "Fatima Hassan",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
      rating: 4.9,
    },
  },
  {
    id: "5",
    title: "Penthouse with Panoramic Views",
    description:
      "Exclusive penthouse with panoramic city views and luxury finishes.",
    price: 5000,
    location: "Business Bay, Dubai",
    type: "Rent",
    bedrooms: 3,
    bathrooms: 4,
    area: 200,
    availableDates: ["Immediate"],
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    agent: {
      name: "Khalid Rahman",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Khalid",
      rating: 4.8,
    },
  },
  {
    id: "6",
    title: "Modern Townhouse",
    description:
      "Contemporary townhouse in a family-friendly community with shared pool.",
    price: 180000,
    location: "Jumeirah Village Circle, Dubai",
    type: "Sale",
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    availableDates: ["Immediate", "Flexible"],
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
    agent: {
      name: "Layla Ahmed",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Layla",
      rating: 4.7,
    },
  },
];

// Mock data for top-rated services
const topRatedServices: ServiceProvider[] = [
  {
    id: "s1",
    name: "Premium Home Cleaning",
    category: "Maintenance",
    subcategory: "Cleaning",
    description:
      "Professional home cleaning services with eco-friendly products.",
    rating: 4.9,
    reviewCount: 253,
    price: 25,
    priceUnit: "hour",
    location: "Dubai",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    availability: ["Mon-Sat", "8AM-6PM"],
    tags: ["Eco-friendly", "Professional", "Insured"],
    featured: true,
  },
  {
    id: "s2",
    name: "Expert Plumbing Services",
    category: "Maintenance",
    subcategory: "Plumbing",
    description: "24/7 emergency plumbing services for all your needs.",
    rating: 4.8,
    reviewCount: 187,
    price: 80,
    priceUnit: "visit",
    location: "Dubai",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&q=80",
    availability: ["24/7", "Emergency Service"],
    tags: ["Emergency", "Licensed", "Fast Response"],
    featured: true,
  },
  {
    id: "s3",
    name: "Interior Design Consultation",
    category: "Real Estate",
    subcategory: "Design",
    description:
      "Transform your space with our expert interior design consultation.",
    rating: 4.9,
    reviewCount: 142,
    price: 150,
    priceUnit: "session",
    location: "Dubai",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
    availability: ["By Appointment"],
    tags: ["Luxury", "Modern", "Customized"],
    featured: true,
  },
  {
    id: "s4",
    name: "Professional Moving Service",
    category: "Real Estate",
    subcategory: "Moving",
    description: "Stress-free moving services for homes and offices.",
    rating: 4.7,
    reviewCount: 215,
    price: "Starting at $200",
    location: "Dubai",
    image:
      "https://images.unsplash.com/photo-1600518464441-9306b00c4ea4?w=800&q=80",
    availability: ["7 days", "Flexible Hours"],
    tags: ["Insured", "Professional", "Careful Handling"],
    featured: true,
  },
  {
    id: "s5",
    name: "Property Photography",
    category: "Real Estate",
    subcategory: "Photography",
    description:
      "High-quality property photography to showcase your real estate.",
    rating: 4.8,
    reviewCount: 98,
    price: 120,
    priceUnit: "session",
    location: "Dubai",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    availability: ["By Appointment"],
    tags: ["Professional", "High Quality", "Fast Delivery"],
    featured: true,
  },
];

const propertyTypes = [
  { id: "all", label: "All Types" },
  { id: "apartment", label: "Apartments" },
  { id: "villa", label: "Villas" },
  { id: "townhouse", label: "Townhouses" },
  { id: "penthouse", label: "Penthouses" },
  { id: "studio", label: "Studios" },
];

const locations = [
  "All Locations",
  "Dubai Marina",
  "Downtown Dubai",
  "Palm Jumeirah",
  "Arabian Ranches",
  "Jumeirah Village Circle",
  "Business Bay",
];

const RealEstatePage: React.FC = () => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [bedroomsFilter, setBedroomsFilter] = useState<string[]>([]);
  const [propertyStatus, setPropertyStatus] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  // Handle property click
  const handlePropertyClick = (propertyId: string) => {
    console.log(`Property clicked: ${propertyId}`);
    navigate(`/services/real-estate/${propertyId}`);
  };

  // Handle service click in carousel
  const handleServiceClick = (serviceId: string) => {
    console.log(`Service clicked: ${serviceId}`);
    // Navigate to service details page
  };

  // Filter properties based on selected filters
  const filteredProperties = mockProperties.filter((property) => {
    // Filter by search query
    if (
      searchQuery &&
      !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !property.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by location
    if (
      selectedLocation !== "All Locations" &&
      !property.location.includes(selectedLocation)
    ) {
      return false;
    }

    // Filter by property status (Rent/Sale)
    if (
      propertyStatus !== "all" &&
      property.type.toLowerCase() !== propertyStatus.toLowerCase()
    ) {
      return false;
    }

    // Filter by price range
    if (property.price < priceRange[0] || property.price > priceRange[1]) {
      return false;
    }

    // Filter by bedrooms
    if (
      bedroomsFilter.length > 0 &&
      !bedroomsFilter.includes(property.bedrooms.toString())
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header
        isAuthenticated={isAuthenticated}
        username={isAuthenticated ? "Ahmed Mohammed" : undefined}
        cartItemCount={0}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Perfect Property
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl">
              Browse our selection of properties for rent and sale in top
              locations
            </p>

            {/* Search bar */}
            <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by property name or location"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-md"
                />
              </div>
              <Select
                value={selectedLocation}
                onValueChange={setSelectedLocation}
              >
                <SelectTrigger className="h-12 w-full md:w-[200px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={propertyStatus} onValueChange={setPropertyStatus}>
                <SelectTrigger className="h-12 w-full md:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
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
                  {/* Price Range */}
                  <div>
                    <Label className="mb-2 block">Price Range</Label>
                    <div className="mb-2">
                      <span className="text-sm text-gray-500">
                        ${priceRange[0].toLocaleString()} - $
                        {priceRange[1].toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      defaultValue={[0, 1000000]}
                      max={1000000}
                      step={10000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="my-4"
                    />
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <Label className="mb-2 block">Bedrooms</Label>
                    <div className="grid grid-cols-6 gap-2">
                      {["0", "1", "2", "3", "4", "5+"].map((bed) => (
                        <div key={bed} className="flex items-center space-x-2">
                          <Checkbox
                            id={`bed-${bed}`}
                            checked={bedroomsFilter.includes(bed)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setBedroomsFilter([...bedroomsFilter, bed]);
                              } else {
                                setBedroomsFilter(
                                  bedroomsFilter.filter((b) => b !== bed),
                                );
                              }
                            }}
                          />
                          <Label htmlFor={`bed-${bed}`} className="text-sm">
                            {bed}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Property Type */}
                  <div>
                    <Label className="mb-2 block">Property Type</Label>
                    <div className="space-y-2">
                      {propertyTypes.map((type) => (
                        <div
                          key={type.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`type-${type.id}`}
                            checked={selectedType === type.id}
                            onCheckedChange={(checked) => {
                              if (checked) setSelectedType(type.id);
                            }}
                          />
                          <Label
                            htmlFor={`type-${type.id}`}
                            className="text-sm"
                          >
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedType("all");
                      setSelectedLocation("All Locations");
                      setPriceRange([0, 1000000]);
                      setBedroomsFilter([]);
                      setPropertyStatus("all");
                    }}
                  >
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

        {/* Property listings section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white p-4 rounded-md shadow-sm sticky top-24">
                  <h3 className="font-bold text-lg mb-4">Categories</h3>

                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      All Properties
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Building className="mr-2 h-4 w-4" />
                      For Rent
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      <Home className="mr-2 h-4 w-4" />
                      For Sale
                    </Button>
                  </div>

                  <Separator className="my-4" />

                  <h3 className="font-bold text-lg mb-4">Popular Locations</h3>
                  <div className="space-y-2">
                    {locations.slice(1).map((location) => (
                      <Button
                        key={location}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => setSelectedLocation(location)}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        {location}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    {filteredProperties.length} Properties Found
                  </h2>
                  <Select defaultValue="newest">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="price-asc">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem value="price-desc">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <RealEstateCard
                      key={property.id}
                      property={property}
                      onClick={() => handlePropertyClick(property.id)}
                    />
                  ))}
                </div>

                {filteredProperties.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No properties found matching your criteria.
                    </p>
                    <Button
                      variant="link"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedType("all");
                        setSelectedLocation("All Locations");
                        setPriceRange([0, 1000000]);
                        setBedroomsFilter([]);
                        setPropertyStatus("all");
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Top rated services carousel */}
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Top Rated Services</h2>
            <FeaturedServicesCarousel
              services={topRatedServices}
              onServiceClick={handleServiceClick}
            />
          </div>
        </section>
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

export default RealEstatePage;
