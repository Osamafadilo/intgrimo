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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
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
  MessageCircle,
  Calendar,
  Check,
  Wrench,
  Hammer,
  Paintbrush,
  Plug,
  Droplet,
  Trash2,
  Thermometer,
  Smartphone,
  Car,
  Info,
  X,
  CalendarDays,
  Clock3,
  CreditCard,
  Wallet,
  Mail,
} from "lucide-react";

// Mock data for maintenance worker
const mockMaintenanceWorker = {
  id: "1",
  name: "Ahmed Al-Farsi",
  profession: "Plumber",
  description:
    "Experienced plumber specializing in residential and commercial plumbing services with over 10 years of experience. Providing high-quality workmanship and reliable service for all your plumbing needs.",
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
    "https://images.unsplash.com/photo-1603335608158-3db3c15eaaf1?w=800&q=80",
    "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?w=800&q=80",
  ],
  features: [
    "Emergency Services",
    "Free Inspection",
    "Warranty on Work",
    "Tools Provided",
    "Licensed & Insured",
    "Same-Day Service",
  ],
  tags: ["Plumbing", "Repairs", "Installation", "Maintenance"],
  featured: true,
  services: [
    {
      name: "Pipe Repairs",
      description:
        "Repair of leaking or damaged pipes, including replacement if necessary",
      price: 150,
      unit: "per hour",
      estimatedTime: "1-2 hours",
    },
    {
      name: "Drain Cleaning",
      description:
        "Professional cleaning of clogged drains using specialized equipment",
      price: 120,
      unit: "per service",
      estimatedTime: "1 hour",
    },
    {
      name: "Fixture Installation",
      description:
        "Installation of sinks, faucets, toilets, and other plumbing fixtures",
      price: 200,
      unit: "per fixture",
      estimatedTime: "1-3 hours",
    },
    {
      name: "Water Heater Services",
      description: "Installation, repair, and maintenance of water heaters",
      price: 300,
      unit: "per service",
      estimatedTime: "2-4 hours",
    },
    {
      name: "Emergency Call-Out",
      description: "Urgent plumbing services outside of regular hours",
      price: 250,
      unit: "per call-out",
      estimatedTime: "ASAP",
    },
  ],
  experience: "10+ years",
  phone: "+971 50 123 4567",
  whatsapp: "+971501234567",
  email: "ahmed.alfarsi@example.com",
  workingHours: "8:00 AM - 8:00 PM, 7 days a week",
  emergencyHours: "24/7 for emergencies",
  qualifications: [
    "Certified Master Plumber",
    "Licensed by Dubai Municipality",
    "Health and Safety Certified",
  ],
  languages: ["Arabic", "English", "Hindi"],
  paymentMethods: ["Cash", "Credit Card", "Bank Transfer"],
  coordinates: { lat: 25.1123, lng: 55.1892 },
};

// Mock reviews data
const mockReviews = [
  {
    id: "r1",
    workerId: "1",
    userName: "Mohammed K.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
    rating: 5,
    date: "2023-12-15",
    comment:
      "Ahmed did an excellent job fixing our leaking pipes. He was punctual, professional, and completed the work quickly. Highly recommended!",
    serviceType: "Pipe Repairs",
  },
  {
    id: "r2",
    workerId: "1",
    userName: "Aisha S.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    rating: 4,
    date: "2023-11-20",
    comment:
      "Very good service. Ahmed installed a new water heater for us and explained everything clearly. The only reason for 4 stars is that he arrived a bit late, but he did call to inform us.",
    serviceType: "Water Heater Services",
  },
  {
    id: "r3",
    workerId: "1",
    userName: "Omar J.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    rating: 5,
    date: "2023-10-05",
    comment:
      "I had an emergency with a burst pipe late at night. Ahmed responded quickly and fixed the issue efficiently, preventing further damage to our home. His emergency service is worth every dirham!",
    serviceType: "Emergency Call-Out",
  },
  {
    id: "r4",
    workerId: "1",
    userName: "Fatima H.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    rating: 5,
    date: "2023-09-12",
    comment:
      "Ahmed installed new fixtures in our bathroom renovation. His work is meticulous and the results are beautiful. He also gave us good advice on selecting quality fixtures.",
    serviceType: "Fixture Installation",
  },
];

const MaintenanceDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [worker, setWorker] = useState(mockMaintenanceWorker);
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [confirmationCode, setConfirmationCode] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showMapExpanded, setShowMapExpanded] = useState(false);

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  // Fetch worker data and reviews
  useEffect(() => {
    if (id) {
      // In a real app, this would fetch data from an API
      setWorker(mockMaintenanceWorker);

      // Get reviews for this worker
      const workerReviews = mockReviews.filter(
        (review) => review.workerId === id,
      );
      setReviews(workerReviews);
    }
  }, [id]);

  // Handle service selection
  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setShowServiceDialog(true);
  };

  // Handle booking request
  const handleBookingRequest = () => {
    setShowServiceDialog(false);
    setShowBookingDialog(true);
  };

  // Generate a random 4-digit confirmation code
  const generateConfirmationCode = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Handle booking submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a confirmation code
    const code = generateConfirmationCode();
    setConfirmationCode(code);

    // In a real app, this would submit the booking to a backend
    console.log("Booking submitted:", {
      workerId: id,
      workerName: worker.name,
      service: selectedService,
      bookingDate,
      bookingTime,
      bookingNotes,
      contactPhone,
      paymentMethod,
      confirmationCode: code,
    });

    // Show confirmation dialog
    setShowBookingDialog(false);
    setShowConfirmation(true);
  };

  // Handle contact via phone
  const handlePhoneContact = () => {
    // Add to cart before making the call
    addToCart();
    // Make the phone call
    window.location.href = `tel:${worker.phone}`;
  };

  // Handle contact via WhatsApp
  const handleWhatsAppContact = () => {
    // Add to cart before opening WhatsApp
    addToCart();
    // Open WhatsApp
    window.open(`https://wa.me/${worker.whatsapp}`, "_blank");
  };

  // Add service to cart and navigate to home
  const addToCart = () => {
    // Create cart item
    const cartItem = {
      id: Math.random().toString(36).substr(2, 9),
      workerId: id || "",
      workerName: worker.name,
      workerImage: worker.image,
      service: selectedService?.name || "Service",
      price: selectedService?.price || 0,
      date: bookingDate,
      time: bookingTime,
      status: "Pending Confirmation",
    };

    // Get existing cart or create new one
    const existingCart = localStorage.getItem("serviceCart");
    const cart = existingCart ? JSON.parse(existingCart) : [];

    // Add new item to cart
    cart.push(cartItem);

    // Save updated cart
    localStorage.setItem("serviceCart", JSON.stringify(cart));

    // Close confirmation dialog
    setShowConfirmation(false);

    // Navigate to home page
    setTimeout(() => {
      navigate("/");
    }, 500);
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
          {/* Worker header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
            <div className="relative h-[300px]">
              <img
                src={worker.image}
                alt={worker.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {worker.name}
                  </h1>
                  <div className="flex flex-wrap items-center text-white gap-3 mb-2">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-medium">
                        {worker.rating.toFixed(1)}
                      </span>
                      <span className="text-gray-300 text-sm ml-1">
                        ({worker.reviewCount} reviews)
                      </span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span>{worker.profession}</span>
                    <span className="text-gray-300">•</span>
                    <span>{worker.priceRange}</span>
                  </div>
                  <div className="flex flex-wrap items-center text-gray-300 gap-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{worker.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{worker.availability}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {worker.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-gray-700 mb-4">{worker.description}</p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-primary" />
                  <span>{worker.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Book Service Button */}
          <div className="flex flex-wrap gap-4 mb-8">
            <Button
              size="lg"
              variant="default"
              className="flex items-center gap-2 w-full md:w-auto"
              onClick={() => {
                setSelectedService(worker.services[0]);
                setShowBookingDialog(true);
              }}
            >
              <Calendar className="h-5 w-5" />
              Book Service
            </Button>
          </div>

          {/* Main content tabs */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main content */}
            <div className="flex-1">
              <Tabs defaultValue="services">
                <TabsList className="mb-4">
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* Services tab */}
                <TabsContent value="services">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-6">
                      Services Offered
                    </h2>
                    <div className="space-y-4">
                      {worker.services.map((service, index) => (
                        <Card
                          key={index}
                          className="overflow-hidden hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg">
                                {service.name}
                              </h3>
                              <div className="text-right">
                                <span className="font-bold text-primary text-xl">
                                  AED {service.price}
                                </span>
                                <div className="text-xs text-gray-500">
                                  {service.unit}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3">
                              {service.description}
                            </p>
                            <div className="flex items-center text-gray-500 text-sm mb-4">
                              <Clock3 className="h-4 w-4 mr-1" />
                              <span>
                                Estimated time: {service.estimatedTime}
                              </span>
                            </div>
                            <div className="flex justify-end">
                              <Button
                                onClick={() => handleServiceSelect(service)}
                              >
                                Request Service
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Portfolio tab */}
                <TabsContent value="portfolio">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-6">Work Portfolio</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {worker.workImages.map((image, index) => (
                        <div
                          key={index}
                          className="rounded-lg overflow-hidden h-64"
                        >
                          <img
                            src={image}
                            alt={`Work sample ${index + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* About tab */}
                <TabsContent value="about">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-2xl font-bold mb-4">
                      About {worker.name}
                    </h2>

                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Professional Background
                        </h3>
                        <p className="text-gray-700">{worker.description}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Qualifications & Certifications
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {worker.qualifications.map((qualification, index) => (
                            <li key={index}>{qualification}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Services & Features
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {worker.features.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Languages Spoken
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {worker.languages.map((language, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="bg-gray-100"
                            >
                              {language}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Payment Methods
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {worker.paymentMethods.map((method, index) => (
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
                          Working Hours
                        </h3>
                        <p className="flex items-center text-gray-700 mb-2">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          Regular Hours: {worker.workingHours}
                        </p>
                        {worker.emergencyHours && (
                          <p className="flex items-center text-gray-700">
                            <Clock className="h-4 w-4 mr-2 text-gray-500" />
                            Emergency Hours: {worker.emergencyHours}
                          </p>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold mb-2">
                          Location & Service Area
                        </h3>
                        <p className="flex items-center text-gray-700 mb-2">
                          <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                          Based in: {worker.location}
                        </p>
                        <div
                          className={`${showMapExpanded ? "h-[400px]" : "h-[200px]"} rounded-md overflow-hidden relative cursor-pointer transition-all duration-300`}
                          onClick={() => setShowMapExpanded(!showMapExpanded)}
                        >
                          <iframe
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(worker.location)}`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Worker Location"
                          ></iframe>
                          <div className="absolute bottom-2 right-2 bg-white p-1 rounded-md shadow-md text-xs">
                            Click to {showMapExpanded ? "minimize" : "expand"}
                          </div>
                        </div>
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
                          {worker.rating.toFixed(1)}
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
                        No reviews yet for this service provider.
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 flex-shrink-0">
              <div className="bg-white p-4 rounded-lg shadow-sm sticky top-24">
                <h3 className="font-bold text-lg mb-4">Quick Booking</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Select Service</Label>
                    <Select
                      onValueChange={(value) => {
                        const service = worker.services.find(
                          (s) => s.name === value,
                        );
                        if (service) setSelectedService(service);
                      }}
                      defaultValue={worker.services[0]?.name}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {worker.services.map((service, index) => (
                          <SelectItem key={index} value={service.name}>
                            {service.name} - AED {service.price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="mb-2 block">Preferred Date</Label>
                    <Input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setBookingDate(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Preferred Time</Label>
                    <Input
                      type="time"
                      onChange={(e) => setBookingTime(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block">Your Phone Number</Label>
                    <Input
                      type="tel"
                      placeholder="+971 XX XXX XXXX"
                      onChange={(e) => setContactPhone(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => setShowBookingDialog(true)}
                  >
                    Request Booking
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <h4 className="font-medium">Why choose {worker.name}?</h4>
                  <ul className="space-y-1">
                    {worker.features.slice(0, 4).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Service dialog */}
      <Dialog open={showServiceDialog} onOpenChange={setShowServiceDialog}>
        <DialogContent className="max-w-md">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedService.name}</DialogTitle>
                <DialogDescription>
                  {selectedService.description}
                </DialogDescription>
              </DialogHeader>

              <div className="py-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-500">
                    <Clock3 className="h-4 w-4 inline mr-1" />
                    Estimated time: {selectedService.estimatedTime}
                  </div>
                  <div>
                    <span className="font-bold text-primary text-xl">
                      AED {selectedService.price}
                    </span>
                    <div className="text-xs text-gray-500 text-right">
                      {selectedService.unit}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <h4 className="font-medium">Service Provider</h4>
                  <div className="flex items-center">
                    <img
                      src={worker.image}
                      alt={worker.name}
                      className="h-10 w-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="font-medium">{worker.name}</p>
                      <p className="text-sm text-gray-500">
                        {worker.profession}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowServiceDialog(false)}
                >
                  Cancel
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
            <DialogTitle>Book Service</DialogTitle>
            <DialogDescription>
              Please provide the details to book your service
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleBookingSubmit} className="space-y-4 py-4">
            {/* Service selection */}
            <div className="space-y-2">
              <Label>Selected Service</Label>
              <div className="p-3 border rounded-md bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{selectedService?.name}</p>
                    <p className="text-sm text-gray-500">
                      {selectedService?.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      AED {selectedService?.price}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedService?.unit}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Date and time selection */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bookingDate">Preferred Date</Label>
                <Input
                  id="bookingDate"
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bookingTime">Preferred Time</Label>
                <Input
                  id="bookingTime"
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
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

            {/* Special notes */}
            <div className="space-y-2">
              <Label htmlFor="bookingNotes">Special Notes (Optional)</Label>
              <Textarea
                id="bookingNotes"
                value={bookingNotes}
                onChange={(e) => setBookingNotes(e.target.value)}
                placeholder="Describe your issue or any special requirements"
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
                    Cash on Service
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
                  <span className="text-gray-500">Service:</span>
                </div>
                <div>
                  <span className="font-medium">{selectedService?.name}</span>
                </div>

                <div>
                  <span className="text-gray-500">Date & Time:</span>
                </div>
                <div>
                  <span className="font-medium">
                    {bookingDate
                      ? new Date(bookingDate).toLocaleDateString()
                      : "Not selected"}{" "}
                    {bookingTime || ""}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500">Service Provider:</span>
                </div>
                <div>
                  <span className="font-medium">{worker.name}</span>
                </div>

                <div>
                  <span className="text-gray-500">Price:</span>
                </div>
                <div>
                  <span className="font-medium">
                    AED {selectedService?.price} {selectedService?.unit}
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
              Your service booking has been successfully placed.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            <div className="flex flex-col items-center justify-center p-6 bg-primary/10 rounded-lg">
              <h3 className="text-lg font-bold mb-2">Your Confirmation Code</h3>
              <div className="text-3xl font-bold tracking-widest">
                {confirmationCode}
              </div>
              <p className="text-sm text-gray-500 mt-2 text-center">
                Please save this code for reference when the service provider
                contacts you
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">Booking Details</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-gray-500">Service:</span>
                </div>
                <div>
                  <span className="font-medium">{selectedService?.name}</span>
                </div>

                <div>
                  <span className="text-gray-500">Date & Time:</span>
                </div>
                <div>
                  <span className="font-medium">
                    {bookingDate
                      ? new Date(bookingDate).toLocaleDateString()
                      : ""}{" "}
                    {bookingTime}
                  </span>
                </div>

                <div>
                  <span className="text-gray-500">Service Provider:</span>
                </div>
                <div>
                  <span className="font-medium">{worker.name}</span>
                </div>

                <div>
                  <span className="text-gray-500">Payment Method:</span>
                </div>
                <div>
                  <span className="font-medium">
                    {paymentMethod === "cash"
                      ? "Cash on Service"
                      : "Credit/Debit Card"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm">
              <p className="flex items-start">
                <Info className="h-4 w-4 mr-2 text-yellow-500 mt-0.5" />
                <span>
                  The service provider will contact you shortly to confirm your
                  booking.
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-3 mt-4">
              <h4 className="font-medium text-center">
                Contact Service Provider
              </h4>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handlePhoneContact}
                >
                  <Phone className="h-4 w-4 mr-2" /> Call Now
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                  onClick={handleWhatsAppContact}
                >
                  <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Link to="/" className="w-full">
              <Button
                onClick={() => {
                  addToCart();
                  // Reset form fields
                  setBookingDate("");
                  setBookingTime("");
                  setBookingNotes("");
                  setContactPhone("");
                }}
                className="w-full"
              >
                العودة إلى الصفحة الرئيسية
              </Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MaintenanceDetailPage;
