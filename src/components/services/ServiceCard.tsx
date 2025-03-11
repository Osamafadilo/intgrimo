import React from "react";
import { useTranslation } from "react-i18next";
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
import { Star, MapPin, Clock, ArrowRight } from "lucide-react";

export interface ServiceProvider {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: number | string;
  priceUnit?: string;
  location: string;
  image: string;
  availability: string[];
  tags?: string[];
  featured?: boolean;
}

interface ServiceCardProps {
  service: ServiceProvider;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onClick = () => {},
}) => {
  const { t } = useTranslation();

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {service.featured && (
          <Badge className="absolute top-2 right-2 bg-primary">Featured</Badge>
        )}
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold">{service.name}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">
              {service.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-500 ml-1">
              ({service.reviewCount})
            </span>
          </div>
        </div>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          <CardDescription>{service.location}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {service.description}
        </p>
        {service.tags && service.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {service.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-gray-100"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2 text-gray-500" />
          <span className="text-sm">
            Available: {service.availability.join(", ")}
          </span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div>
          <span className="text-2xl font-bold text-primary">
            {typeof service.price === "number"
              ? `$${service.price}`
              : service.price}
          </span>
          {service.priceUnit && (
            <span className="text-sm text-gray-500">/{service.priceUnit}</span>
          )}
        </div>
        <Button onClick={onClick} className="flex items-center">
          View Details
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
