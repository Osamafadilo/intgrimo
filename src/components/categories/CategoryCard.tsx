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
import { Button } from "../ui/button";
import {
  ArrowRight,
  Store,
  Utensils,
  Wrench,
  Plane,
  Truck,
  Home,
  ShoppingBag,
} from "lucide-react";

interface CategoryCardProps {
  title?: string;
  description?: string;
  icon?: string;
  onClick?: () => void;
  linkTo?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  restaurants: <Utensils className="h-10 w-10" />,
  stores: <Store className="h-10 w-10" />,
  maintenance: <Wrench className="h-10 w-10" />,
  travel: <Plane className="h-10 w-10" />,
  delivery: <Truck className="h-10 w-10" />,
  "real estate": <Home className="h-10 w-10" />,
  grocery: <ShoppingBag className="h-10 w-10" />,
};

const getServicePath = (title: string): string => {
  const normalizedTitle = title.toLowerCase().replace(/\s+/g, "-");

  // Map specific categories to their routes
  if (normalizedTitle === "restaurants") {
    return "/services/restaurants";
  } else if (normalizedTitle === "real-estate") {
    return "/services/real-estate";
  } else if (normalizedTitle === "stores") {
    return "/services/stores";
  } else if (normalizedTitle === "maintenance") {
    return "/services/maintenance";
  } else if (normalizedTitle === "plumbing") {
    return "/services/maintenance?category=plumbing";
  } else if (normalizedTitle === "electrical") {
    return "/services/maintenance?category=electrical";
  } else if (normalizedTitle === "cleaning") {
    return "/services/maintenance?category=cleaning";
  }

  return `/services/${normalizedTitle}`;
};

const CategoryCard = ({
  title = "Restaurants",
  description = "Discover the best local and international cuisine in your area.",
  icon = "restaurants",
  onClick = () => console.log("Category clicked"),
  linkTo,
}: CategoryCardProps) => {
  const { t } = useTranslation();
  const IconComponent = iconMap[icon.toLowerCase()] || (
    <Store className="h-10 w-10" />
  );

  const path = linkTo || getServicePath(title);

  return (
    <Card className="w-[350px] h-[250px] overflow-hidden transition-all duration-300 hover:shadow-lg bg-white">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
          {IconComponent}
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-gray-600">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          variant="ghost"
          className="w-full justify-between text-primary"
          onClick={onClick}
          asChild
        >
          <Link to={path}>
            <span>
              {t("home.categories.explore")} {title}
            </span>
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
