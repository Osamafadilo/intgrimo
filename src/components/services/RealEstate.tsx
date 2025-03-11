import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, MapPin, Home, Star, Clock, ArrowRight } from "lucide-react";

export interface RealEstateProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  availableDates: string[];
  rating: number;
  image: string;
  agent: {
    name: string;
    avatar: string;
    rating: number;
  };
}

interface RealEstateCardProps {
  property: RealEstateProperty;
  onClick?: () => void;
}

export const RealEstateCard: React.FC<RealEstateCardProps> = ({
  property,
  onClick = () => {},
}) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <Badge className="absolute top-2 right-2 bg-primary">
          {property.type}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{property.title}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">
              {property.rating.toFixed(1)}
            </span>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <CardDescription>{property.location}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
            <span className="text-xs text-gray-500">Bedrooms</span>
            <span className="font-medium">{property.bedrooms}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
            <span className="text-xs text-gray-500">Bathrooms</span>
            <span className="font-medium">{property.bathrooms}</span>
          </div>
          <div className="flex flex-col items-center p-2 bg-gray-50 rounded-md">
            <span className="text-xs text-gray-500">Area</span>
            <span className="font-medium">{property.area} m²</span>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-sm">
            Available: {property.availableDates.join(", ")}
          </span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-sm">Listed 2 days ago</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div>
          <span className="text-2xl font-bold text-primary">
            ${property.price.toLocaleString()}
          </span>
          {property.type === "Rent" && (
            <span className="text-sm text-gray-500">/month</span>
          )}
        </div>
        <Button onClick={onClick} className="flex items-center" asChild>
          <Link to={`/services/real-estate/${property.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RealEstateCard;
