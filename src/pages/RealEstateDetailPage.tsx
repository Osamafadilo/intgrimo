import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../components/layout/Header";
import { RealEstateProperty } from "../components/services/RealEstate";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { Calendar } from "../components/ui/calendar";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Card, CardContent } from "../components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  Calendar as CalendarIcon,
  Star,
  Home,
  Bath,
  BedDouble,
  SquareIcon,
  Phone,
  Mail,
  Send,
  Info,
  AlertTriangle,
  Check,
  Wifi,
  Tv,
  Snowflake,
  Utensils,
  Car,
  ShieldCheck,
  Waves,
  Dumbbell,
  Coffee,
  Train,
  Bus,
  Plane,
  Clock,
  Cigarette,
  PawPrint,
  Users,
  X,
  Wrench,
  ChevronDown,
  Plus,
  Minus,
} from "lucide-react";
import { format, addDays, isBefore, isAfter, isSameDay } from "date-fns";

// Mock data for real estate properties (same as in RealEstatePage)
const mockProperties: RealEstateProperty[] = [
  {
    id: "1",
    title: "Modern Apartment with Sea View",
    description:
      "Beautiful modern apartment with stunning sea views, fully furnished and renovated. This spacious apartment features an open-plan living area, a fully equipped kitchen with modern appliances, and a private balcony overlooking the sea. The apartment is located in a secure building with 24/7 security, a swimming pool, and a gym. It's within walking distance to the beach, restaurants, and shops.",
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
      "Exclusive villa in a gated community with private pool and garden. This stunning villa offers luxurious living with high-end finishes throughout. The ground floor features a spacious living room, dining area, and a gourmet kitchen. The upper floor has 5 bedrooms, including a master suite with a walk-in closet and a private balcony. The outdoor area includes a private swimming pool, a landscaped garden, and a BBQ area. The villa is located in a prestigious community with 24/7 security, a clubhouse, and various recreational facilities.",
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
      "Modern studio apartment in the heart of downtown, close to all amenities. This well-designed studio apartment maximizes space with a smart layout. It features a comfortable sleeping area, a living space, a kitchenette with modern appliances, and a stylish bathroom. The apartment is fully furnished with contemporary furniture and offers stunning city views. It's ideally located in the heart of downtown, with easy access to public transportation, restaurants, cafes, and shopping centers.",
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
      "Large family home with garden, perfect for families looking for space and comfort. This spacious family home offers a comfortable living environment with plenty of room for everyone. The ground floor features a large living room, a dining area, a family room, and a modern kitchen. Upstairs, you'll find 4 bedrooms, including a master suite with an en-suite bathroom. The property also includes a landscaped garden, a covered patio, and a two-car garage. It's located in a family-friendly neighborhood with schools, parks, and shopping centers nearby.",
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
      "Exclusive penthouse with panoramic city views and luxury finishes. This spectacular penthouse offers the ultimate in luxury living with breathtaking panoramic views of the city skyline. The open-plan living area features floor-to-ceiling windows, a gourmet kitchen with high-end appliances, and a dining area. The penthouse has 3 spacious bedrooms, including a master suite with a walk-in closet and a luxurious bathroom. Additional features include a private terrace, a home office, and smart home technology. The building offers premium amenities such as a rooftop pool, a fitness center, and concierge services.",
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
      "Contemporary townhouse in a family-friendly community with shared pool. This modern townhouse offers comfortable living in a desirable community. The ground floor features an open-plan living and dining area, a modern kitchen, and a guest bathroom. The upper floor has 3 bedrooms, including a master bedroom with an en-suite bathroom. The property also includes a small private garden and a covered parking space. Residents have access to community amenities such as a swimming pool, a playground, and landscaped gardens. The townhouse is located in a family-friendly area with easy access to schools, shopping centers, and parks.",
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

// Additional property images for carousel
const propertyImages = {
  "1": [
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&q=80",
    "https://images.unsplash.com/photo-1560185007-c5ca9d2c0862?w=800&q=80",
    "https://images.unsplash.com/photo-1560185008-a33f5c7b1844?w=800&q=80",
  ],
  "2": [
    "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687644-a7e0722b0d5e?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80",
  ],
  "3": [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
    "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0c2?w=800&q=80",
  ],
  "4": [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753376-12c8ab8e17a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
  ],
  "5": [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80",
    "https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800&q=80",
  ],
  "6": [
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
  ],
};

// Mock reviews data
const mockReviews = [
  {
    id: "r1",
    propertyId: "1",
    userName: "Mohammed K.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
    rating: 5,
    date: "2023-12-15",
    comment:
      "Amazing apartment with stunning views! The location is perfect, close to everything you need. The host was very responsive and helpful.",
  },
  {
    id: "r2",
    propertyId: "1",
    userName: "Aisha S.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    rating: 4,
    date: "2023-11-20",
    comment:
      "Great place to stay. Clean, comfortable and well-equipped. The only minor issue was the noise from the street, but it wasn't too bad.",
  },
  {
    id: "r3",
    propertyId: "1",
    userName: "Omar J.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Omar",
    rating: 5,
    date: "2023-10-05",
    comment:
      "Excellent property! The sea view is breathtaking, especially at sunset. The apartment is spacious and has everything you need for a comfortable stay.",
  },
  {
    id: "r4",
    propertyId: "2",
    userName: "Fatima H.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
    rating: 5,
    date: "2023-12-10",
    comment:
      "This villa is absolutely stunning! The private pool and garden are perfect for relaxing. The interior is luxurious and spacious. Highly recommended!",
  },
  {
    id: "r5",
    propertyId: "3",
    userName: "Ali M.",
    userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
    rating: 4,
    date: "2023-11-15",
    comment:
      "Cozy studio in a great location. Perfect for a single person or a couple. All the amenities you need are provided. Would stay again!",
  },
];

// Mock unavailable dates (for booking calendar)
const unavailableDates = {
  "1": [
    new Date(2024, 5, 10),
    new Date(2024, 5, 11),
    new Date(2024, 5, 12),
    new Date(2024, 5, 20),
    new Date(2024, 5, 21),
  ],
  "2": [],
  "3": [
    new Date(2024, 5, 5),
    new Date(2024, 5, 6),
    new Date(2024, 5, 15),
    new Date(2024, 5, 16),
    new Date(2024, 5, 17),
  ],
  "4": [],
  "5": [
    new Date(2024, 5, 1),
    new Date(2024, 5, 2),
    new Date(2024, 5, 3),
    new Date(2024, 5, 25),
    new Date(2024, 5, 26),
  ],
  "6": [],
};

// AI message moderation function
const moderateMessage = (
  message: string,
): { isValid: boolean; reason?: string } => {
  // Check for phone numbers
  const phoneRegex =
    /\b\d{10}\b|\b\d{3}[-.]\d{3}[-.]\d{4}\b|\b\(\d{3}\)\s*\d{3}[-.]\d{4}\b|\b\+\d{1,3}\s*\d{10}\b/;
  if (phoneRegex.test(message)) {
    return {
      isValid: false,
      reason: "Phone numbers are not allowed in messages.",
    };
  }

  // Check for email addresses
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  if (emailRegex.test(message)) {
    return {
      isValid: false,
      reason: "Email addresses are not allowed in messages.",
    };
  }

  // Check for URLs
  const urlRegex =
    /https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}(\/[^\s]*)?/;
  if (urlRegex.test(message)) {
    return { isValid: false, reason: "URLs are not allowed in messages." };
  }

  // Check for potentially suspicious content
  const suspiciousTerms = [
    "whatsapp",
    "telegram",
    "signal",
    "contact me",
    "call me",
    "text me",
    "meet outside",
  ];
  for (const term of suspiciousTerms) {
    if (message.toLowerCase().includes(term)) {
      return {
        isValid: false,
        reason: `Suspicious content detected: '${term}'`,
      };
    }
  }

  return { isValid: true };
};

const RealEstateDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [property, setProperty] = useState<RealEstateProperty | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>(
    undefined,
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showManualDateInput, setShowManualDateInput] = useState(false);
  const [manualCheckIn, setManualCheckIn] = useState("");
  const [manualCheckOut, setManualCheckOut] = useState("");
  const [chatMessages, setChatMessages] = useState<
    Array<{ sender: string; message: string; timestamp: Date }>
  >([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageError, setMessageError] = useState<string | null>(null);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "credit-card",
  });
  const [guestCount, setGuestCount] = useState(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [pricePerNight, setPricePerNight] = useState(1480); // MAD

  // Handle language change
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  // Fetch property data
  useEffect(() => {
    if (id) {
      const foundProperty = mockProperties.find((p) => p.id === id);
      if (foundProperty) {
        setProperty(foundProperty);

        // Generate available dates for the next 3 months
        const today = new Date();
        const availableDatesArray: Date[] = [];

        // Add dates for the next 90 days
        for (let i = 1; i <= 90; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);

          // Skip unavailable dates
          if (
            id in unavailableDates &&
            unavailableDates[id].some((unavailableDate) =>
              isSameDay(date, unavailableDate),
            )
          ) {
            continue;
          }

          availableDatesArray.push(date);
        }

        setAvailableDates(availableDatesArray);
      } else {
        // Property not found, redirect to listings
        navigate("/services/real-estate");
      }

      // Get reviews for this property
      const propertyReviews = mockReviews.filter(
        (review) => review.propertyId === id,
      );
      setReviews(propertyReviews);
    }
  }, [id, navigate]);

  // Calculate total price when dates change or guest count changes
  useEffect(() => {
    if (selectedDates && selectedDates.length === 2) {
      const startDate = selectedDates[0];
      const endDate = selectedDates[1];

      // Calculate number of days
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Number of nights
      setNumberOfDays(days);

      // Calculate total price (price per night * number of nights)
      const total = pricePerNight * days;
      setTotalPrice(total);

      // Log for debugging
      console.log(`Selected dates: ${startDate} to ${endDate}`);
      console.log(`Number of nights: ${days}`);
      console.log(`Total price: MAD${total}`);
    } else {
      setTotalPrice(0);
      setNumberOfDays(0);
    }
  }, [selectedDates, pricePerNight]);

  // Function to update dates from manual input
  const updateManualDates = (checkIn: string, checkOut: string) => {
    if (checkIn && checkOut) {
      const startDate = new Date(checkIn);
      const endDate = new Date(checkOut);

      if (startDate <= endDate) {
        setSelectedDates([startDate, endDate]);
      }
    }
  };

  // Handle date selection
  const handleDateSelect = (dates: Date[] | undefined) => {
    setSelectedDates(dates);
    console.log("Dates selected:", dates);

    // Close calendar after selecting both dates
    if (dates && dates.length === 2) {
      setTimeout(() => setShowCalendar(false), 500);
    }
  };

  // Check if a date is unavailable
  const isDateUnavailable = (date: Date) => {
    if (!id || !unavailableDates[id]) return false;

    // Check if the date is in the unavailable dates array
    return unavailableDates[id].some((unavailableDate) =>
      isSameDay(date, unavailableDate),
    );
  };

  // Handle booking submission
  const handleBookingSubmit = () => {
    // In a real app, this would submit the booking to a backend
    console.log("Booking submitted:", {
      propertyId: id,
      startDate: selectedDates?.[0],
      endDate: selectedDates?.[1],
      totalPrice,
      numberOfDays,
      guestCount,
    });

    // Show payment page instead of closing dialog
    setShowPaymentPage(true);
  };

  // Handle final payment submission
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, this would process the payment
    console.log("Payment processed:", {
      ...bookingFormData,
      propertyId: id,
      startDate: selectedDates?.[0],
      endDate: selectedDates?.[1],
      totalPrice,
      numberOfDays,
    });

    // Close the dialog and show a success message
    setShowBookingDialog(false);
    setShowPaymentPage(false);
    // Reset selected dates
    setSelectedDates(undefined);
    setManualCheckIn("");
    setManualCheckOut("");

    // Reset form data
    setBookingFormData({
      fullName: "",
      email: "",
      phone: "",
      specialRequests: "",
      paymentMethod: "credit-card",
    });
  };

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setBookingFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle sending a chat message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Moderate the message
    const moderationResult = moderateMessage(newMessage);

    if (!moderationResult.isValid) {
      setMessageError(
        moderationResult.reason || "Your message contains prohibited content.",
      );
      return;
    }

    // Add message to chat
    setChatMessages([
      ...chatMessages,
      {
        sender: "user",
        message: newMessage,
        timestamp: new Date(),
      },
    ]);

    // Clear input and error
    setNewMessage("");
    setMessageError(null);

    // Simulate agent response after a short delay
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "agent",
          message:
            "Thank you for your message. I'll get back to you as soon as possible. Please note that all communication should be kept within this platform for your security.",
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header
          isAuthenticated={false}
          onLanguageChange={handleLanguageChange}
          currentLanguage={currentLanguage}
        />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading property details...</p>
        </div>
      </div>
    );
  }

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
          {/* Property title and basic info */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{property.location}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                <span>
                  {property.rating.toFixed(1)} ({reviews.length} reviews)
                </span>
              </div>
            </div>

            {/* Property type badge */}
            <Badge
              className={`${property.type === "Rent" ? "bg-blue-500" : "bg-green-500"} text-white`}
            >
              {property.type === "Rent" ? "For Rent" : "For Sale"}
            </Badge>
          </div>

          {/* Property images gallery */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Main large image */}
              <div className="md:col-span-3 relative rounded-lg overflow-hidden h-[400px]">
                <Carousel
                  className="w-full h-full"
                  autoPlay={true}
                  loop={true}
                  opts={{ loop: true }}
                >
                  <CarouselContent>
                    {propertyImages[property.id]?.map((image, index) => (
                      <CarouselItem key={index} className="h-[400px]">
                        <div className="h-full">
                          <img
                            src={image}
                            alt={`${property.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>

              {/* Thumbnail images */}
              <div className="md:col-span-1 grid grid-cols-2 md:grid-cols-1 gap-2 h-[400px] overflow-y-auto">
                {propertyImages[property.id]?.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-lg overflow-hidden h-[95px] cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => {
                      // Open a dialog with all images
                      document.getElementById(`image-dialog-${index}`)?.click();
                    }}
                  >
                    <img
                      src={image}
                      alt={`${property.title} - Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Dialog>
                      <DialogTrigger
                        id={`image-dialog-${index}`}
                        className="hidden"
                      >
                        Open
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl p-0">
                        <div className="relative">
                          <img
                            src={image}
                            alt={`${property.title} - Full size ${index + 1}`}
                            className="w-full max-h-[80vh] object-contain"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 bg-black/50 text-white hover:bg-black/70"
                            onClick={() =>
                              document
                                .getElementById(`dialog-close-${index}`)
                                ?.click()
                            }
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <button id={`dialog-close-${index}`} className="hidden">
                          close
                        </button>
                      </DialogContent>
                    </Dialog>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Property details and booking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Property details */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>

                {/* Details tab */}
                <TabsContent value="details" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">
                      About this property
                    </h2>
                    <p className="text-gray-700">{property.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      Property Features
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center">
                        <BedDouble className="h-5 w-5 mr-2 text-primary" />
                        <span>
                          {property.bedrooms}{" "}
                          {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-5 w-5 mr-2 text-primary" />
                        <span>
                          {property.bathrooms}{" "}
                          {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <SquareIcon className="h-5 w-5 mr-2 text-primary" />
                        <span>{property.area} m² Area</span>
                      </div>
                      <div className="flex items-center">
                        <Home className="h-5 w-5 mr-2 text-primary" />
                        <span>{property.type}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4">
                      {[
                        {
                          icon: <Wifi className="h-4 w-4 mr-2" />,
                          name: "Free WiFi",
                        },
                        {
                          icon: <Tv className="h-4 w-4 mr-2" />,
                          name: "Smart TV",
                        },
                        {
                          icon: <Snowflake className="h-4 w-4 mr-2" />,
                          name: "Air Conditioning",
                        },
                        {
                          icon: <Utensils className="h-4 w-4 mr-2" />,
                          name: "Fully Equipped Kitchen",
                        },
                        {
                          icon: <Car className="h-4 w-4 mr-2" />,
                          name: "Free Parking",
                        },
                        {
                          icon: <ShieldCheck className="h-4 w-4 mr-2" />,
                          name: "24/7 Security",
                        },
                        {
                          icon: <Waves className="h-4 w-4 mr-2" />,
                          name: "Swimming Pool",
                        },
                        {
                          icon: <Dumbbell className="h-4 w-4 mr-2" />,
                          name: "Fitness Center",
                        },
                        {
                          icon: <Coffee className="h-4 w-4 mr-2" />,
                          name: "Coffee Machine",
                        },
                      ].map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          {amenity.icon}
                          <span className="text-sm">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Surroundings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Nearby Attractions</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center">
                            <MapPin className="h-3 w-3 mr-2 text-gray-500" />
                            <span>Dubai Mall - 10 min drive</span>
                          </li>
                          <li className="flex items-center">
                            <MapPin className="h-3 w-3 mr-2 text-gray-500" />
                            <span>Burj Khalifa - 12 min drive</span>
                          </li>
                          <li className="flex items-center">
                            <MapPin className="h-3 w-3 mr-2 text-gray-500" />
                            <span>Dubai Marina - 5 min walk</span>
                          </li>
                          <li className="flex items-center">
                            <MapPin className="h-3 w-3 mr-2 text-gray-500" />
                            <span>JBR Beach - 8 min walk</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Transportation</h4>
                        <ul className="space-y-1 text-sm">
                          <li className="flex items-center">
                            <Train className="h-3 w-3 mr-2 text-gray-500" />
                            <span>Metro Station - 7 min walk</span>
                          </li>
                          <li className="flex items-center">
                            <Bus className="h-3 w-3 mr-2 text-gray-500" />
                            <span>Bus Stop - 3 min walk</span>
                          </li>
                          <li className="flex items-center">
                            <Plane className="h-3 w-3 mr-2 text-gray-500" />
                            <span>
                              Dubai International Airport - 25 min drive
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">House Rules</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                        <div>
                          <span className="font-medium">Check-in:</span> After
                          2:00 PM
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Clock className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                        <div>
                          <span className="font-medium">Check-out:</span> Before
                          11:00 AM
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Cigarette className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                        <div>
                          <span className="font-medium">Smoking:</span> Not
                          allowed
                        </div>
                      </div>
                      <div className="flex items-start">
                        <PawPrint className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                        <div>
                          <span className="font-medium">Pets:</span> Not allowed
                        </div>
                      </div>
                      <div className="flex items-start">
                        <Users className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                        <div>
                          <span className="font-medium">Parties/events:</span>{" "}
                          Not allowed
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3">Availability</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.availableDates.map((date, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="bg-gray-100"
                        >
                          {date}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                {/* Location tab */}
                <TabsContent value="location">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Location</h2>
                    <div className="rounded-lg overflow-hidden h-[400px] mb-4">
                      {/* Google Maps iframe */}
                      <iframe
                        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(property.location)}`}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Property Location"
                      ></iframe>
                    </div>
                    <p className="text-gray-700">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      {property.location}
                    </p>
                  </div>
                </TabsContent>

                {/* Reviews tab */}
                <TabsContent value="reviews">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold">Reviews</h2>
                      <div className="flex items-center">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-semibold">
                          {property.rating.toFixed(1)}
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
                                      <p className="text-sm text-gray-500">
                                        {new Date(
                                          review.date,
                                        ).toLocaleDateString()}
                                      </p>
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
                        No reviews yet for this property.
                      </p>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right column - Booking and contact */}
            <div>
              {/* Booking card */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold mb-2 text-right">
                      <span className="text-2xl">
                        MAD{pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-sm font-normal text-gray-500 mr-1">
                        الليلة
                      </span>
                    </h3>
                  </div>

                  <div className="mb-4">
                    <div className="border rounded-md">
                      <div
                        className="grid grid-cols-2 border-b cursor-pointer"
                        onClick={() => setShowCalendar(!showCalendar)}
                      >
                        <div className="p-3 text-center border-r">
                          <div className="text-sm font-medium mb-1">
                            تسجيل المغادرة
                          </div>
                          <div className="text-base font-bold">
                            {selectedDates && selectedDates.length === 2
                              ? format(selectedDates[1], "yyyy/M/d")
                              : "اختر تاريخ"}
                          </div>
                        </div>
                        <div className="p-3 text-center">
                          <div className="text-sm font-medium mb-1">
                            تسجيل الوصول
                          </div>
                          <div className="text-base font-bold">
                            {selectedDates && selectedDates.length > 0
                              ? format(selectedDates[0], "yyyy/M/d")
                              : "اختر تاريخ"}
                          </div>
                        </div>
                      </div>

                      {showCalendar && (
                        <div className="p-3 border-b">
                          <Calendar
                            mode="range"
                            selected={selectedDates}
                            onSelect={handleDateSelect}
                            disabled={{
                              before: new Date(),
                              dayOfWeek: [],
                            }}
                            modifiers={{
                              unavailable: isDateUnavailable,
                            }}
                            modifiersClassNames={{
                              unavailable:
                                "line-through bg-red-100 text-gray-400",
                            }}
                            numberOfMonths={1}
                            className="rounded-md mx-auto"
                          />
                        </div>
                      )}

                      <div
                        className="p-3 flex justify-between items-center cursor-pointer"
                        onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                      >
                        <button className="flex items-center">
                          <ChevronDown className="h-5 w-5" />
                        </button>
                        <div className="text-right">
                          <div className="text-sm font-medium">الضيوف</div>
                          <div className="text-base font-bold">
                            {guestCount} {guestCount === 1 ? "ضيف" : "ضيوف"}
                          </div>
                        </div>
                      </div>

                      {showGuestDropdown && (
                        <div className="p-3 border-t">
                          <div className="flex justify-between items-center">
                            <div className="flex space-x-2 rtl:space-x-reverse">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  setGuestCount(Math.min(guestCount + 1, 10))
                                }
                                className="h-8 w-8"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() =>
                                  setGuestCount(Math.max(guestCount - 1, 1))
                                }
                                className="h-8 w-8"
                                disabled={guestCount <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">البالغين</div>
                              <div className="text-sm text-gray-500">
                                12+ سنة
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <Button
                      className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-xl py-6 rounded-full"
                      size="lg"
                      onClick={() => {
                        if (selectedDates && selectedDates.length === 2) {
                          console.log("Opening booking dialog");
                          setShowBookingDialog(true);
                        } else {
                          console.log("Please select dates first");
                          setShowCalendar(true); // Show calendar if dates not selected
                        }
                      }}
                      disabled={!selectedDates || selectedDates.length !== 2}
                    >
                      حجز
                    </Button>

                    <p className="text-center text-sm text-gray-600 mt-2">
                      لن تخصم رسوم الحجز في هذه المرحلة
                    </p>

                    <div className="mt-4 space-y-2">
                      {selectedDates && selectedDates.length === 2 ? (
                        <>
                          <div className="flex justify-between">
                            <div className="font-medium">
                              MAD{totalPrice.toLocaleString()}
                            </div>
                            <div>
                              {numberOfDays} ليالي x MAD
                              {pricePerNight.toLocaleString()}
                            </div>
                          </div>
                          <Separator className="my-3" />
                          <div className="flex justify-between font-bold text-lg">
                            <div>MAD{totalPrice.toLocaleString()}</div>
                            <div>الإجمالي، قبل الضرائب</div>
                          </div>
                        </>
                      ) : (
                        <div className="text-center text-gray-500">
                          يرجى اختيار تواريخ الوصول والمغادرة لعرض السعر
                          الإجمالي
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Agent info card */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Avatar className="h-12 w-12 mr-3">
                      <AvatarImage
                        src={property.agent.avatar}
                        alt={property.agent.name}
                      />
                      <AvatarFallback>
                        {property.agent.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{property.agent.name}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span>{property.agent.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <h4 className="font-medium mb-3">Send a message</h4>
                  <div className="space-y-3">
                    {chatMessages.length > 0 ? (
                      <div className="max-h-[200px] overflow-y-auto space-y-3 mb-3 p-2 bg-gray-50 rounded-md">
                        {chatMessages.map((msg, index) => (
                          <div
                            key={index}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[80%] p-3 rounded-lg ${msg.sender === "user" ? "bg-primary text-white" : "bg-gray-200"}`}
                            >
                              <p className="text-sm">{msg.message}</p>
                              <p className="text-xs text-right mt-1 opacity-70">
                                {format(msg.timestamp, "HH:mm")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-gray-50 rounded-md mb-3">
                        <p className="text-gray-500 text-sm">
                          Start a conversation with the agent
                        </p>
                      </div>
                    )}

                    {messageError && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{messageError}</AlertDescription>
                      </Alert>
                    )}

                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Type your message here..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="resize-none"
                      />
                      <Button
                        size="icon"
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-xs text-gray-500">
                      <Info className="h-3 w-3 inline mr-1" />
                      For your security, all communication is monitored. Do not
                      share contact information.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Similar properties section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">
            Similar Properties You May Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockProperties
              .filter((p) => p.id !== property.id && p.type === property.type)
              .slice(0, 3)
              .map((similarProperty) => (
                <Card
                  key={similarProperty.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={similarProperty.image}
                      alt={similarProperty.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary">
                      {similarProperty.type}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-1 line-clamp-1">
                      {similarProperty.title}
                    </h3>
                    <div className="flex items-center text-gray-500 mb-2">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span className="text-xs">
                        {similarProperty.location}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <BedDouble className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm mr-2">
                          {similarProperty.bedrooms}
                        </span>
                        <Bath className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="text-sm">
                          {similarProperty.bathrooms}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm">
                          {similarProperty.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="font-bold text-primary">
                        ${similarProperty.price.toLocaleString()}
                        {similarProperty.type === "Rent" && (
                          <span className="text-xs text-gray-500">/month</span>
                        )}
                      </span>
                      <Button size="sm" variant="outline" asChild>
                        <Link
                          to={`/services/real-estate/${similarProperty.id}`}
                        >
                          View
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">Services We Offer</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: <Home className="h-8 w-8 mb-2 text-primary" />,
                title: "Property Management",
                description:
                  "Professional management services for your property.",
              },
              {
                icon: <Wrench className="h-8 w-8 mb-2 text-primary" />,
                title: "Maintenance",
                description: "24/7 maintenance services for all your needs.",
              },
              {
                icon: <ShieldCheck className="h-8 w-8 mb-2 text-primary" />,
                title: "Insurance",
                description:
                  "Comprehensive insurance coverage for your property.",
              },
              {
                icon: <Users className="h-8 w-8 mb-2 text-primary" />,
                title: "Tenant Screening",
                description: "Thorough screening process for quality tenants.",
              },
            ].map((service, index) => (
              <Card
                key={index}
                className="text-center p-4 hover:shadow-md transition-shadow"
              >
                <CardContent className="p-2">
                  <div className="flex flex-col items-center">
                    {service.icon}
                    <h3 className="font-medium mb-1">{service.title}</h3>
                    <p className="text-sm text-gray-500">
                      {service.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking confirmation dialog */}
      <Dialog
        open={showBookingDialog}
        onOpenChange={(open) => {
          if (!open) {
            setShowPaymentPage(false);
          }
          setShowBookingDialog(open);
        }}
      >
        <DialogContent className="max-w-md">
          {!showPaymentPage ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-right">تأكيد الحجز</DialogTitle>
                <DialogDescription className="text-right">
                  يرجى مراجعة تفاصيل الحجز قبل التأكيد
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-right">
                    <h4 className="text-sm font-medium text-gray-500">
                      العقار
                    </h4>
                    <p>{property.title}</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-sm font-medium text-gray-500">
                      الموقع
                    </h4>
                    <p>{property.location}</p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-sm font-medium text-gray-500">
                      تسجيل الوصول
                    </h4>
                    <p>
                      {selectedDates && selectedDates.length > 0
                        ? format(selectedDates[0], "yyyy/M/d")
                        : ""}
                    </p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-sm font-medium text-gray-500">
                      تسجيل المغادرة
                    </h4>
                    <p>
                      {selectedDates && selectedDates.length === 2
                        ? format(selectedDates[1], "yyyy/M/d")
                        : ""}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>{numberOfDays} ليالي</span>
                    <span className="text-gray-500">عدد الليالي:</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MAD{pricePerNight.toLocaleString()}</span>
                    <span className="text-gray-500">سعر الليلة:</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>MAD{totalPrice.toLocaleString()}</span>
                    <span>الإجمالي:</span>
                  </div>
                </div>

                <Alert>
                  <Check className="h-4 w-4" />
                  <AlertTitle className="text-right">حماية الحجز</AlertTitle>
                  <AlertDescription className="text-right">
                    دفعتك محمية بنظام الدفع الآمن الخاص بنا. لن يتم خصم المبلغ
                    إلا بعد تأكيد الحجز.
                  </AlertDescription>
                </Alert>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setShowBookingDialog(false)}
                >
                  إلغاء
                </Button>
                <Button
                  className="bg-pink-600 hover:bg-pink-700"
                  onClick={handleBookingSubmit}
                >
                  متابعة الدفع
                </Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-right">إتمام الحجز</DialogTitle>
                <DialogDescription className="text-right">
                  يرجى إدخال بياناتك لإتمام عملية الحجز
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handlePaymentSubmit} className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-right">
                    الاسم الكامل
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={bookingFormData.fullName}
                    onChange={handleInputChange}
                    required
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-right">
                    البريد الإلكتروني
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={bookingFormData.email}
                    onChange={handleInputChange}
                    required
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-right">
                    رقم الهاتف
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    value={bookingFormData.phone}
                    onChange={handleInputChange}
                    required
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="specialRequests" className="block text-right">
                    طلبات خاصة (اختياري)
                  </label>
                  <Textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={bookingFormData.specialRequests}
                    onChange={handleInputChange}
                    className="resize-none"
                    dir="rtl"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-right">طريقة الدفع</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                      <label htmlFor="credit-card" className="cursor-pointer">
                        بطاقة ائتمان
                      </label>
                      <input
                        type="radio"
                        id="credit-card"
                        name="paymentMethod"
                        value="credit-card"
                        checked={
                          bookingFormData.paymentMethod === "credit-card"
                        }
                        onChange={handleInputChange}
                        className="h-4 w-4"
                      />
                    </div>
                    <div className="flex items-center justify-end space-x-2 rtl:space-x-reverse">
                      <label htmlFor="paypal" className="cursor-pointer">
                        باي بال
                      </label>
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={bookingFormData.paymentMethod === "paypal"}
                        onChange={handleInputChange}
                        className="h-4 w-4"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between font-medium text-lg">
                    <span>MAD{totalPrice.toLocaleString()}</span>
                    <span>المبلغ الإجمالي:</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 text-right">
                    لإقامة {numberOfDays} ليالي
                  </p>
                </div>

                <DialogFooter className="pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowPaymentPage(false)}
                  >
                    رجوع
                  </Button>
                  <Button
                    type="submit"
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    تأكيد الحجز
                  </Button>
                </DialogFooter>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RealEstateDetailPage;
