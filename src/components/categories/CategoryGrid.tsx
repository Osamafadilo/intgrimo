import React from "react";
import { useTranslation } from "react-i18next";
import CategoryCard from "./CategoryCard";

interface CategoryGridProps {
  categories?: CategoryItem[];
  onCategoryClick?: (category: string) => void;
}

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const CategoryGrid = ({
  categories = [
    {
      id: "1",
      title: "Restaurants",
      description:
        "Discover the best local and international cuisine in your area.",
      icon: "restaurants",
    },
    {
      id: "2",
      title: "Stores",
      description: "Shop from a wide range of local and international stores.",
      icon: "stores",
    },
    {
      id: "3",
      title: "Maintenance",
      description:
        "Find reliable maintenance services for your home and office.",
      icon: "maintenance",
    },
    {
      id: "4",
      title: "Travel",
      description:
        "Book flights, hotels, and travel packages for your next adventure.",
      icon: "travel",
    },
    {
      id: "5",
      title: "Delivery",
      description: "Get your packages and food delivered quickly and reliably.",
      icon: "delivery",
    },
    {
      id: "6",
      title: "Real Estate",
      description:
        "Browse properties for rent or sale in your preferred locations.",
      icon: "real estate",
    },
  ],
  onCategoryClick = (category) => console.log(`Category clicked: ${category}`),
}: CategoryGridProps) => {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-[1200px] mx-auto py-8 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-8">
        {t("home.categories.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            title={category.title}
            description={category.description}
            icon={category.icon}
            onClick={() => onCategoryClick(category.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
