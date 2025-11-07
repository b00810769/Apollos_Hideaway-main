import { Link, Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {  
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/villas", label: "Villas" },
    { path: "/roman-baths", label: "Roman Baths" },
    { path: "/restaurant", label: "Restaurant" },
    { path: "/gallery", label: "Gallery" },
    { path: "/attractions", label: "Nearby" },
    { path: "/booking", label: "Book" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2" data-testid="logo-link">
              <h1
                className={`font-display text-2xl md:text-3xl font-bold transition-colors ${
                  isScrolled ? "text-garden" : "text-white"
                }`}
              >
                Apollo's Hideaway
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`nav-${link.label.toLowerCase().replace(" ", "-")}`}
                  className={`navbar-link font-medium text-sm ${
                    isScrolled ? "text-gray-800" : "text-white"
                  } ${
                    location.pathname === link.path ? "active" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              data-testid="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg" data-testid="mobile-menu">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-gray-800 font-medium hover:bg-gray-100 ${
                    location.pathname === link.path ? "bg-gray-50 text-terracotta" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </nav>
      </header>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-garden text-white py-12" data-testid="footer">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-display text-2xl font-bold mb-4">Apollo's Hideaway</h3>
              <p className="text-gray-300 text-sm mb-4">
                A luxury neoclassical wellness retreat in New Buffalo, Michigan.
                Experience ancient Roman-inspired wellness with modern luxury.
              </p>
              <div className="text-sm text-gray-300">
                <p className="font-semibold text-white mb-1">William Grodesky</p>
                <p>7619 N Bosworth Ave, Unit 1</p>
                <p>Chicago, IL 60626</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-display text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-gray-300 hover:text-gold transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>New Buffalo, Michigan</li>
                <li>2 hours from Chicago/Milwaukee</li>
                <li>wgrodesky@gmail.com</li>
                <li>(614) 595-2218</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Apollo's Hideaway. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;