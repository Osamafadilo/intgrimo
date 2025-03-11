import React from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { ServiceProvider } from "./ServiceCard";

interface FeaturedServicesCarouselProps {
  services: ServiceProvider[];
  onServiceClick?: (serviceId: string) => void;
}

const FeaturedServicesCarousel: React.FC<FeaturedServicesCarouselProps> = ({
  services = [],
  onServiceClick = () => {},
}) => {
  const { t } = useTranslation();
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 320; // Approximate card width + gap
      const scrollLeft =
        direction === "left"
          ? current.scrollLeft - scrollAmount
          : current.scrollLeft + scrollAmount;

      current.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  };

  if (services.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full py-6">
      <h3 className="text-xl font-bold mb-4">{t("home.featured.title")}</h3>

      <div className="relative">
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full"
          onClick={() => scroll("left")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((service) => (
            <Card
              key={service.id}
              className="flex-shrink-0 w-[280px] cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onServiceClick(service.id)}
            >
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium line-clamp-1">{service.name}</h4>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-xs">{service.rating.toFixed(1)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {service.description}
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-primary font-bold">
                    {typeof service.price === "number"
                      ? `$${service.price}`
                      : service.price}
                    {service.priceUnit && (
                      <span className="text-xs text-gray-500">
                        /{service.priceUnit}
                      </span>
                    )}
                  </span>
                  <span className="text-xs text-gray-500">
                    {service.category}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full"
          onClick={() => scroll("right")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default FeaturedServicesCarousel;
