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
} from "./pages";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
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
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
