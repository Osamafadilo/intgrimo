import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "./layout/Header";
import SearchBar from "./search/SearchBar";
import CategoryGrid from "./categories/CategoryGrid";
import AuthModal from "./auth/AuthModal";
import ProfileDropdown from "./profile/ProfileDropdown";
import CartPreview from "./cart/CartPreview";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [cartItems, setCartItems] = useState<
    Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      image?: string;
    }>
  >([]);

  // Mock authentication handlers
  const handleLogin = (email: string, password: string) => {
    console.log(`Login attempt with ${email} and password`);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleRegister = (email: string, password: string, name: string) => {
    console.log(`Register attempt with ${email}, ${password}, and ${name}`);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with ${provider}`);
    setIsAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Search handler
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log(`Searching for: ${query}`);
  };

  // Category click handler
  const handleCategoryClick = (category: string) => {
    console.log(`Category selected: ${category}`);
    // Navigation is now handled by the Link component in CategoryCard
  };

  // Language change handler
  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
    i18n.changeLanguage(language);
    console.log(`Language changed to: ${language}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header with authentication and search */}
      <Header
        isAuthenticated={isAuthenticated}
        username={isAuthenticated ? "Ahmed Mohammed" : undefined}
        cartItemCount={cartItems.length}
        onLogin={() => setShowAuthModal(true)}
        onLogout={handleLogout}
        onLanguageChange={handleLanguageChange}
        currentLanguage={currentLanguage}
      />

      {/* Main content */}
      <main className="flex-1">
        {/* Hero section with search */}
        <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {t("home.hero.title")}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex justify-center">
              <SearchBar
                onSearch={handleSearch}
                placeholder="Search for services, providers, or categories..."
              />
            </div>
          </div>
        </section>

        {/* Categories section */}
        <section className="py-12">
          <CategoryGrid onCategoryClick={handleCategoryClick} />
        </section>

        {/* Featured services section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              {t("home.featured.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder for featured services */}
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-gray-100 rounded-lg p-6 h-64 flex items-center justify-center"
                >
                  <p className="text-gray-500">
                    {t("home.featured.service")} {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
              {t("home.testimonials.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Testimonial cards */}
              {[
                {
                  name: "Fatima A.",
                  role: "Homeowner",
                  text: "I found an excellent plumber through this platform. The service was prompt and professional.",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima",
                },
                {
                  name: "Mohammed K.",
                  role: "Business Owner",
                  text: "As a restaurant owner, I've been able to reach more customers through this marketplace. Highly recommended!",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed",
                },
                {
                  name: "Layla H.",
                  role: "Student",
                  text: "The delivery services available here have made my life so much easier. Quick and reliable every time.",
                  avatar:
                    "https://api.dicebear.com/7.x/avataaars/svg?seed=Layla",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-medium">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
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
                  "Grocery",
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

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onOpenChange={setShowAuthModal}
        onLogin={handleLogin}
        onRegister={handleRegister}
        onSocialLogin={handleSocialLogin}
      />
    </div>
  );
};

export default Home;
