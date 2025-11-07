import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@/App.css";
import LandingPage from "@/pages/LandingPage";
import AboutPage from "@/pages/AboutPage";
import VillasPage from "@/pages/VillasPage";
import RomanBathsPage from "@/pages/RomanBathsPage";
import RestaurantPage from "@/pages/RestaurantPage";
import GalleryPage from "@/pages/GalleryPage";
import NearbyAttractionsPage from "@/pages/NearbyAttractionsPage";
import BookingPage from "@/pages/BookingPage";
import ContactPage from "@/pages/ContactPage";
import BookingSuccessPage from "@/pages/BookingSuccessPage";
import Layout from "@/components/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="villas" element={<VillasPage />} />
            <Route path="roman-baths" element={<RomanBathsPage />} />
            <Route path="restaurant" element={<RestaurantPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="attractions" element={<NearbyAttractionsPage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="booking-success" element={<BookingSuccessPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;