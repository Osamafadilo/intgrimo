import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import {
  RealEstatePage,
  RealEstateDetailPage,
  RestaurantsPage,
  RestaurantDetailPage,
  StoresPage,
  StoreDetailPage,
  GroceryPage,
  GroceryDetailPage,
  MaintenancePage,
  MaintenanceDetailPage,
  ServiceCategoryPage,
  CheckoutPage,
  TravelPage,
  TravelDetailPage,
  DeliveryPage,
  DeliveryDetailPage,
} from "./pages";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services/real-estate" element={<RealEstatePage />} />
        <Route
          path="/services/real-estate/:id"
          element={<RealEstateDetailPage />}
        />
        <Route path="/services/restaurants" element={<RestaurantsPage />} />
        <Route
          path="/services/restaurants/:id"
          element={<RestaurantDetailPage />}
        />
        <Route path="/services/stores" element={<StoresPage />} />
        <Route path="/services/stores/:id" element={<StoreDetailPage />} />
        <Route path="/services/grocery" element={<GroceryPage />} />
        <Route path="/services/grocery/:id" element={<GroceryDetailPage />} />
        <Route path="/services/maintenance" element={<MaintenancePage />} />
        <Route
          path="/services/maintenance/:id"
          element={<MaintenanceDetailPage />}
        />
        <Route
          path="/services/category/:category"
          element={<ServiceCategoryPage />}
        />
        <Route path="/services/travel" element={<TravelPage />} />
        <Route path="/services/travel/:id" element={<TravelDetailPage />} />
        <Route path="/services/delivery" element={<DeliveryPage />} />
        <Route path="/services/delivery/:id" element={<DeliveryDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {import.meta.env.VITE_TEMPO && <Route path="/tempobook/*" />}
      </Routes>
    </Suspense>
  );
}

export default App;
