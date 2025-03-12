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
  Calendar,
  Users,
  CreditCard,
  Wallet,
  Info,
  Plane,
  Train,
  Car,
  Fuel,
  Gauge,
  Users2,
  Briefcase,
  ShieldCheck,
  Mail,
} from "lucide-react";

// Mock data for car rental company
const mockCarRentalCompany = {
  id: "3",
  name: "Luxury Car Rentals",
  type: "car",
  description:
    "Premium car rental service offering a wide range of luxury vehicles for both short-term and long-term rentals. Our fleet includes the latest models from top brands like Mercedes-Benz, BMW, Audi, and more. We provide exceptional customer service and competitive rates.",
  rating: 4.7,
  reviewCount: 932,
  location: "Dubai Marina, Dubai, UAE",
  phone: "+971 4 123 4567",
  website: "www.luxurycarrentals.ae",
  email: "info@luxurycarrentals.ae",
  openingHours: "8:00 AM - 10:00 PM, 7 days a week",
  image: "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80",
  logo: "https://api.dicebear.com/7.x/initials/svg?seed=LCR",
  featured: true,
  images: [
    "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80",
    "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&q=80",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
    "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
  ],
  features: [
    "Free Delivery & Pickup",
    "24/7 Roadside Assistance",
    "Comprehensive Insurance",
    "No Hidden Fees",
    "Flexible Rental Periods",
    "Latest Model Vehicles",
  ],
  paymentMethods: ["Cash", "Credit Card", "Bank Transfer", "Mobile Payment"],
};

// Mock data for car brands
const carBrands = [
  {
    id: "mercedes",
    name: "Mercedes-Benz",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Logo.svg/2048px-Mercedes-Logo.svg.png",
  },
  {
    id: "bmw",
    name: "BMW",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/2048px-BMW.svg.png",
  },
  {
    id: "audi",
    name: "Audi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/2048px-Audi-Logo_2016.svg.png",
  },
  {
    id: "porsche",
    name: "Porsche",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Porsche_logo.svg/2560px-Porsche_logo.svg.png",
  },
  {
    id: "lamborghini",
    name: "Lamborghini",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/df/Lamborghini_Logo.svg/1200px-Lamborghini_Logo.svg.png",
  },
  {
    id: "ferrari",
    name: "Ferrari",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/d/d1/Ferrari-Logo.svg/1200px-Ferrari-Logo.svg.png",
  },
  {
    id: "bentley",
    name: "Bentley",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Bentley_logo.svg/2560px-Bentley_logo.svg.png",
  },
  {
    id: "rolls-royce",
    name: "Rolls-Royce",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Rolls-Royce_Motor_Cars_logo.svg/2560px-Rolls-Royce_Motor_Cars_logo.svg.png",
  },
];

// Mock data for cars
const mockCars = {
  mercedes: [
    {
      id: "m1",
      brand: "Mercedes-Benz",
      model: "S-Class",
      year: 2023,
      type: "Sedan",
      price: 1200,
      priceUnit: "day",
      deposit: 5000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 5,
      luggage: 3,
      features: [
        "Leather Seats",
        "Panoramic Roof",
        "Navigation System",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera",
      ],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
        "https://images.unsplash.com/photo-1617814076668-11b2aa80a0c3?w=800&q=80",
        "https://images.unsplash.com/photo-1618843479255-1c2a18bc1f5c?w=800&q=80",
      ],
    },
    {
      id: "m2",
      brand: "Mercedes-Benz",
      model: "G-Class",
      year: 2023,
      type: "SUV",
      price: 1800,
      priceUnit: "day",
      deposit: 7000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 5,
      luggage: 4,
      features: [
        "Leather Seats",
        "Off-Road Package",
        "Navigation System",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera",
      ],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1520031441872-265e4ff70366?w=800&q=80",
        "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&q=80",
        "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=800&q=80",
      ],
    },
  ],
  bmw: [
    {
      id: "b1",
      brand: "BMW",
      model: "7 Series",
      year: 2023,
      type: "Sedan",
      price: 1100,
      priceUnit: "day",
      deposit: 5000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 5,
      luggage: 3,
      features: [
        "Leather Seats",
        "Panoramic Roof",
        "Navigation System",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera",
      ],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
        "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&q=80",
        "https://images.unsplash.com/photo-1556800572-1b8aedf82ad8?w=800&q=80",
      ],
    },
    {
      id: "b2",
      brand: "BMW",
      model: "X7",
      year: 2023,
      type: "SUV",
      price: 1500,
      priceUnit: "day",
      deposit: 6000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 7,
      luggage: 5,
      features: [
        "Leather Seats",
        "Panoramic Roof",
        "Navigation System",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera",
      ],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
        "https://images.unsplash.com/photo-1556800572-1b8aedf82ad8?w=800&q=80",
      ],
    },
  ],
  audi: [
    {
      id: "a1",
      brand: "Audi",
      model: "A8",
      year: 2023,
      type: "Sedan",
      price: 1000,
      priceUnit: "day",
      deposit: 4500,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 5,
      luggage: 3,
      features: [
        "Leather Seats",
        "Panoramic Roof",
        "Navigation System",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera",
      ],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800&q=80",
        "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&q=80",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
      ],
    },
    {
      id: "a2",
      brand: "Audi",
      model: "Q8",
      year: 2023,
      type: "SUV",
      price: 1400,
      priceUnit: "day",
      deposit: 5500,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 5,
      luggage: 4,
      features: [
        "Leather Seats",
        "Panoramic Roof",
        "Navigation System",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera",
      ],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=800&q=80",
        "https://images.unsplash.com/photo-1606220589611-53d8d3b44d61?w=800&q=80",
        "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=800&q=80",
      ],
    },
  ],
  porsche: [
    {
      id: "p1",
      brand: "Porsche",
      model: "911",
      year: 2023,
      type: "Sports Car",
      price: 2500,
      priceUnit: "day",
      deposit: 10000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 2,
      luggage: 1,
      features: [
        "Leather Seats",
        "Sport Package",
        "Navigation System",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera",
      ],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
        "https://images.unsplash.com/photo-1611821064430-0d40291d0f0b?w=800&q=80",
        "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80",
      ],
    },
    {
      id: "p2",
      brand: "Porsche",
      model: "Cayenne",
      year: 2023,
      type: "SUV",
      price: 1700,
      priceUnit: "day",
      deposit: 7000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 5,
      luggage: 4,
      features: [
        "Leather Seats",
        "Panoramic Roof",
        "Navigation System",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera",
      ],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1569171739775-52b4da0e98d7?w=800&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
        "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80",
      ],
    },
  ],
  lamborghini: [
    {
      id: "l1",
      brand: "Lamborghini",
      model: "Huracán",
      year: 2023,
      type: "Sports Car",
      price: 3500,
      priceUnit: "day",
      deposit: 15000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 2,
      luggage: 1,
      features: [
        "Leather Seats",
        "Sport Package",
        "Navigation System",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera",
      ],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=800&q=80",
        "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=800&q=80",
        "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&q=80",
      ],
    },
  ],
  ferrari: [
    {
      id: "f1",
      brand: "Ferrari",
      model: "F8 Tributo",
      year: 2023,
      type: "Sports Car",
      price: 3800,
      priceUnit: "day",
      deposit: 18000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 2,
      luggage: 1,
      features: [
        "Leather Seats",
        "Sport Package",
        "Navigation System",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera",
      ],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80",
        "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      ],
    },
  ],
  bentley: [
    {
      id: "be1",
      brand: "Bentley",
      model: "Continental GT",
      year: 2023,
      type: "Luxury Coupe",
      price: 3000,
      priceUnit: "day",
      deposit: 12000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 4,
      luggage: 2,
      features: [
        "Leather Seats",
        "Panoramic Roof",
        "Navigation System",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera",
      ],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=80",
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
      ],
    },
  ],
  "rolls-royce": [
    {
      id: "rr1",
      brand: "Rolls-Royce",
      model: "Ghost",
      year: 2023,
      type: "Luxury Sedan",
      price: 4000,
      priceUnit: "day",
      deposit: 20000,
      fuelType: "Petrol",
      transmission: "Automatic",
      seats: 5,
      luggage: 3,
      features: [
        "Leather Seats",
        "Panoramic Roof",
        "Navigation System",
        "Bluetooth",
        "Parking Sensors",
        "360° Camera",
      ],
      available: true,
      images: [
        "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80",
        "https://images.unsplash.com/photo-1631295845258-019c422a6a67?w=800&q=80",
        "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80",
      ],
    },
  ],
};

// Mock reviews data
const mockReviews = [
  {
    id: "r1",
    companyId: "3",
    userName: "Mohammed K.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
    rating: 5,
    date: "2023-12-15",
    comment:
      "Excellent service! I rented a Mercedes S-Class for a business trip and the car was in perfect condition. The staff was very professional and helpful.",
    carRented: "Mercedes-Benz S-Class",
  },
  {
    id: "r2",
    companyId: "3",
    userName: "Aisha S.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    rating: 4,
    date: "2023-11-20",
    comment:
      "Great experience overall. The BMW 7 Series I rented was luxurious and comfortable. The only reason for 4 stars is that the pickup process took a bit longer than expected.",
    carRented: "BMW 7 Series",
  },
  {
    id: "r3",
    companyId: "3",
    userName: "Omar J.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    rating: 5,
    date: "2023-10-05",
    comment:
      "I rented a Porsche 911 for a weekend trip and it was an amazing experience! The car was spotless and performed perfectly. The staff was very knowledgeable and provided excellent service.",
    carRented: "Porsche 911",
  },
];

const TravelDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [company, setCompany] = useState(mockCarRentalCompany);
  const [selectedBrand, setSelectedBrand] = useState("mercedes");
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [showCarDialog, setShowCarDialog] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [rentalDays, setRentalDays] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  // Fetch company data and reviews
  useEffect(() => {
    if (id) {
      // In a real app, this would fetch data from an API
      setCompany(mockCarRentalCompany);

      // Get reviews for this company
      const companyReviews = mockReviews.filter(
        (review) => review.companyId === id,
      );
      setReviews(companyReviews);
    }
  }, [id]);

  // Calculate rental days when dates change
  useEffect(() => {
    if (pickupDate && returnDate) {
      const pickup = new Date(pickupDate);
      const returnD = new Date(returnDate);
      const diffTime = Math.abs(returnD.getTime() - pickup.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setRentalDays(diffDays > 0 ? diffDays : 1);
    }
  }, [pickupDate, returnDate]);

  // Handle car selection
  const handleCarSelect = (car: any) => {
    setSelectedCar(car);
    setShowCarDialog(true);
  };

  // Handle booking request
  const handleBookingRequest = () => {
    setShowCarDialog(false);
    setShowBookingDialog(true);
  };

  // Generate a random 6-digit confirmation code
  const generateConfirmationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Handle booking submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a confirmation code
    const code = generateConfirmationCode();
    setConfirmationCode(code);

    // In a real app, this would submit the booking to a backend
    console.log("Booking submitted:", {
      companyId: id,
      companyName: company.name,
      car: selectedCar,
      pickupDate,
      returnDate,
      rentalDays,
      specialRequests,
      contactPhone,
      paymentMethod,
      totalAmount: selectedCar.price * rentalDays,
      confirmationCode: code,
    });

    // Show confirmation dialog
    setShowBookingDialog(false);
    setShowConfirmation(true);

    // Add to cart
    const cartItem = {
      id: Math.random().toString(36).substr(2, 9),
      workerId: id || "",
      workerName: company.name,
      workerImage: company.image,
      service: `Car Rental: ${selectedCar.brand} ${selectedCar.model}`,
      price: selectedCar.price * rentalDays,
      date: pickupDate,
      time: "N/A",
      status: "Pending Confirmation",
    };

    // Get existing cart or create new one
    const existingCart = localStorage.getItem("serviceCart");
    const cart = existingCart ? JSON.parse(existingCart) : [];

    // Add new item to cart
    cart.push(cartItem);

    // Save updated cart
    localStorage.setItem("serviceCart", JSON.stringify(cart));
  };

  // Calculate total price
  const calculateTotal = () => {
    if (!selectedCar) return 0;
    return selectedCar.price * rentalDays;
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
          {/* Company header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="relative h-[300px]">
              <img
                src={company.image}
                alt={company.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center mb-2">
                    <div className="h-12 w-12 mr-3 bg-white rounded-md p-1">
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                    <h1 className="text-3xl font-bold text-white">
                      {company.name}
                    </h1>
                  </div>
                  <div className="flex flex-wrap items-center text-white gap-3 mb-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">
                        {company.rating.toFixed(1)}
                      </span>
                      <span className="text-gray-300 text-sm ml-1">
                        ({company.reviewCount} reviews)
                      </span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span>
                      {company.type === "car" ? "Car Rental" : company.type}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center text-gray-300 gap-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{company.openingHours}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">{company.description}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-primary" />
                  <span>{company.phone}</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-2 text-primary" />
                  <span>{company.website}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main content tabs */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Car Brands */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
                <h3 className="font-bold text-lg mb-4">Car Brands</h3>
                <div className="space-y-3">
                  {carBrands.map((brand) => (
                    <Button
                      key={brand.id}
                      variant={
                        selectedBrand === brand.id ? "default" : "outline"
                      }
                      className="w-full justify-start h-12"
                      onClick={() => setSelectedBrand(brand.id)}
                    >
                      <div className="h-6 w-6 mr-2">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <span>{brand.name}</span>
                    </Button>
                  ))}
                </div>

                <Separator className="my-4" />

                <h3 className="font-bold text-lg mb-4">Quick Booking</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Pickup Date</Label>
                    <div className="relative">
                      <Input
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        onChange={(e) => setPickupDate(e.target.value)}
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-2 block">Return Date</Label>
                    <div className="relative">
                      <Input
                        type="date"
                        min={
                          pickupDate
                            ? new Date(pickupDate).toISOString().split("T")[0]
                            : new Date().toISOString().split("T")[0]
                        }
                        onChange={(e) => setReturnDate(e.target.value)}
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    disabled={!pickupDate || !returnDate}
                  >
                    Check Availability
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h4 className="font-medium">Our Services</h4>
                  <ul className="space-y-1">
                    {company.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              <Tabs defaultValue="cars">
                <TabsList className="mb-4">
                  <TabsTrigger value="cars">Available Cars</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* Cars tab */}
                <TabsContent value="cars">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-6">
                      {carBrands.find((brand) => brand.id === selectedBrand)
                        ?.name || ""}{" "}
                      Models
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mockCars[selectedBrand]?.map((car) => (
                        <Card
                          key={car.id}
                          className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => handleCarSelect(car)}
                        >
                          <div className="relative h-[200px]">
                            <img
                              src={car.images[0]}
                              alt={`${car.brand} ${car.model}`}
                              className="w-full h-full object-cover"
                            />
                            {!car.available && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <Badge className="bg-red-500 text-white px-3 py-1 text-sm">
                                  Not Available
                                </Badge>
                              </div>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-bold text-lg">
                                  {car.brand} {car.model}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {car.year} • {car.type}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="font-bold text-primary text-xl">
                                  AED {car.price}
                                </span>
                                <div className="text-xs text-gray-500">
                                  per {car.priceUnit}
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mb-3">
                              <div className="flex items-center text-sm text-gray-600">
                                <Fuel className="h-4 w-4 mr-1 text-gray-400" />
                                {car.fuelType}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Gauge className="h-4 w-4 mr-1 text-gray-400" />
                                {car.transmission}
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Users2 className="h-4 w-4 mr-1 text-gray-400" />
                                {car.seats} Seats
                              </div>
                              <div className="flex items-center text-sm text-gray-600">
                                <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                                {car.luggage} Luggage
                              </div>
                            </div>
                            <Button
                              className="w-full"
                              disabled={!car.available}
                            >
                              View Details
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {(!mockCars[selectedBrand] ||
                      mockCars[selectedBrand].length === 0) && (
                      <div className="text-center py-12">
                        <Car className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium mb-2">
                          No cars available for this brand
                        </h3>
                        <p className="text-gray-500">
                          Please check other brands or contact us for custom
                          requests
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* About tab */}
                <TabsContent value="about">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">
                      About {company.name}
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Company Overview
                        </h3>
                        <p className="text-gray-700">{company.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Location & Hours
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="flex items-center text-gray-700 mb-2">
                              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                              {company.location}
                            </p>
                            <p className="flex items-center text-gray-700">
                              <Clock className="h-4 w-4 mr-2 text-gray-500" />
                              {company.openingHours}
                            </p>
                          </div>
                          <div className="h-[200px] rounded-md overflow-hidden">
                            <iframe
                              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(company.location)}`}
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                              title="Company Location"
                            ></iframe>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Services & Features
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {company.features.map((feature, index) => (
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
                          {company.paymentMethods.map((method, index) => (
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
                          {company.phone}
                        </p>
                        <p className="flex items-center text-gray-700 mb-2">
                          <Globe className="h-4 w-4 mr-2 text-gray-500" />
                          {company.website}
                        </p>
                        <p className="flex items-center text-gray-700">
                          <Mail className="h-4 w-4 mr-2 text-gray-500" />
                          {company.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Reviews tab */}
                <TabsContent value="reviews">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold">Customer Reviews</h2>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">
                          {company.rating.toFixed(1)}
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
                                          {review.carRented}
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
                        No reviews yet for this company.
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      {/* Car dialog */}
      <Dialog open={showCarDialog} onOpenChange={setShowCarDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedCar && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedCar.brand} {selectedCar.model}
                </DialogTitle>
                <DialogDescription>
                  {selectedCar.year} • {selectedCar.type}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                {/* Car images carousel */}
                <Carousel className="w-full max-w-3xl mx-auto">
                  <CarouselContent>
                    {selectedCar.images.map((image: string, index: number) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <div className="overflow-hidden rounded-lg h-[300px]">
                            <img
                              src={image}
                              alt={`${selectedCar.brand} ${selectedCar.model} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                {/* Car details */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Car Details</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Brand:</span>
                        <span className="font-medium">{selectedCar.brand}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Model:</span>
                        <span className="font-medium">{selectedCar.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Year:</span>
                        <span className="font-medium">{selectedCar.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedCar.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fuel Type:</span>
                        <span className="font-medium">
                          {selectedCar.fuelType}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transmission:</span>
                        <span className="font-medium">
                          {selectedCar.transmission}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Seats:</span>
                        <span className="font-medium">
                          {selectedCar.seats} Persons
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Luggage:</span>
                        <span className="font-medium">
                          {selectedCar.luggage} Pieces
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Features</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedCar.features.map(
                        (feature: string, index: number) => (
                          <div
                            key={index}
                            className="flex items-center text-gray-700"
                          >
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="mt-6">
                      <h3 className="text-lg font-semibold mb-3">Pricing</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Daily Rate:</span>
                          <span className="font-medium text-primary">
                            AED {selectedCar.price} / day
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Security Deposit:
                          </span>
                          <span className="font-medium">
                            AED {selectedCar.deposit}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Minimum Rental:</span>
                          <span className="font-medium">1 day</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    <ShieldCheck className="h-5 w-5 mr-2 text-green-500" />
                    <h3 className="font-semibold">Rental Includes</h3>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Comprehensive Insurance</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>24/7 Roadside Assistance</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Free Delivery & Collection</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-green-500" />
                      <span>Maintenance & Servicing</span>
                    </li>
                  </ul>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCarDialog(false)}
                >
                  Close
                </Button>
                <Button onClick={handleBookingRequest}>Book Now</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Booking dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Book Your Car</DialogTitle>
            <DialogDescription>
              Please provide the details to complete your booking
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookingSubmit} className="space-y-4 py-4">
            {/* Car selection */}
            <div className="space-y-2">
              <Label>Selected Car</Label>
              <div className="p-3 border rounded-md bg-gray-50">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-md overflow-hidden mr-3">
                    <img
                      src={selectedCar?.images[0]}
                      alt={`${selectedCar?.brand} ${selectedCar?.model}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">
                      {selectedCar?.brand} {selectedCar?.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedCar?.year} • {selectedCar?.type}
                    </p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="font-bold text-primary">
                      AED {selectedCar?.price}
                    </p>
                    <p className="text-xs text-gray-500">
                      per {selectedCar?.priceUnit}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Date selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickupDate">Pickup Date</Label>
                <Input
                  id="pickupDate"
                  type="date"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="returnDate">Return Date</Label>
                <Input
                  id="returnDate"
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={
                    pickupDate
                      ? new Date(pickupDate).toISOString().split("T")[0]
                      : new Date().toISOString().split("T")[0]
                  }
                  required
                />
              </div>
            </div>

            {/* Contact information */}
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="+971 XX XXX XXXX"
                required
              />
            </div>

            {/* Special requests */}
            <div className="space-y-2">
              <Label htmlFor="specialRequests">
                Special Requests (Optional)
              </Label>
              <Textarea
                id="specialRequests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="Any special requirements or requests"
                className="resize-none"
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
                    Cash on Delivery
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

            {/* Booking summary */}
            <div className="space-y-2 bg-gray-50 p-4 rounded-md">
              <h4 className="font-medium">Booking Summary</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Car:</span>
                </div>
                <div>
                  <span className="font-medium">
                    {selectedCar?.brand} {selectedCar?.model}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500">Rental Period:</span>
                </div>
                <div>
                  <span className="font-medium">
                    {rentalDays} {rentalDays === 1 ? "day" : "days"}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500">Daily Rate:</span>
                </div>
                <div>
                  <span className="font-medium">AED {selectedCar?.price}</span>
                </div>

                <div>
                  <span className="text-gray-500">Total:</span>
                </div>
                <div>
                  <span className="font-bold text-primary">
                    AED {calculateTotal()}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500">Security Deposit:</span>
                </div>
                <div>
                  <span className="font-medium">
                    AED {selectedCar?.deposit} (refundable)
                  </span>
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowBookingDialog(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Confirm Booking</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Booking Confirmed!</DialogTitle>
            <DialogDescription>
              Your car rental booking has been successfully placed.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            <div className="flex flex-col items-center justify-center p-6 bg-primary/10 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Your Confirmation Code</h3>
              <div className="text-3xl font-bold tracking-widest">
                {confirmationCode}
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Please save this code for reference when picking up your car
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Booking Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Car:</span>
                </div>
                <div>
                  <span className="font-medium">
                    {selectedCar?.brand} {selectedCar?.model}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500">Pickup Date:</span>
                </div>
                <div>
                  <span className="font-medium">
                    {new Date(pickupDate).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500">Return Date:</span>
                </div>
                <div>
                  <span className="font-medium">
                    {new Date(returnDate).toLocaleDateString()}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500">Rental Period:</span>
                </div>
                <div>
                  <span className="font-medium">
                    {rentalDays} {rentalDays === 1 ? "day" : "days"}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500">Total Amount:</span>
                </div>
                <div>
                  <span className="font-medium">AED {calculateTotal()}</span>
                </div>

                <div>
                  <span className="text-gray-500">Payment Method:</span>
                </div>
                <div>
                  <span className="font-medium">
                    {paymentMethod === "cash"
                      ? "Cash on Delivery"
                      : "Credit/Debit Card"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm">
              <p className="flex items-start">
                <Info className="h-4 w-4 mr-2 text-yellow-500 mt-0.5" />
                <span>
                  The rental company will contact you shortly to confirm your
                  booking and arrange delivery or pickup.
                </span>
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={() => {
                setShowConfirmation(false);
                navigate("/");
              }}
              className="w-full"
            >
              Return to Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TravelDetailPage;
