import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MapPin, User, Heart, LogOut, Shield, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLocale } from "@/contexts/LocaleContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Navigation items will use translations
const getNavItems = (t: any) => [
  { name: t.nav.home, path: "/" },
  { name: t.nav.destinations, path: "/destinations" },
  { name: t.nav.about, path: "/about" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { locale, setLocale, t } = useLocale();
  
  const navItems = getNavItems(t);

  // Handle scroll untuk efek navbar transparan
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
              <MapPin className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              TravelHub
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Languages className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLocale('id')} className="cursor-pointer">
                  🇮🇩 Bahasa Indonesia {locale === 'id' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLocale('en')} className="cursor-pointer">
                  🇬🇧 English {locale === 'en' && '✓'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>{locale === 'id' ? 'Akun Saya' : 'My Account'}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.isAdmin && (
                    <>
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                          <Shield className="h-4 w-4" />
                          {t.nav.admin}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="flex items-center gap-2 cursor-pointer">
                      <Heart className="h-4 w-4" />
                      {t.nav.wishlist}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="h-4 w-4" />
                    {t.nav.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild>
                <Link to="/login">{t.nav.login}</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-lg ${
                    location.pathname === item.path
                      ? "text-primary bg-muted"
                      : "text-foreground"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Language Switcher Mobile */}
              <div className="px-4 py-2 border-t border-b">
                <p className="text-xs text-muted-foreground mb-2">{locale === 'id' ? 'Bahasa' : 'Language'}</p>
                <div className="flex gap-2">
                  <Button
                    variant={locale === 'id' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLocale('id')}
                    className="flex-1"
                  >
                    🇮🇩 ID
                  </Button>
                  <Button
                    variant={locale === 'en' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setLocale('en')}
                    className="flex-1"
                  >
                    🇬🇧 EN
                  </Button>
                </div>
              </div>
              
              {isAuthenticated && user ? (
                <>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsOpen(false)}
                      className="text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Shield className="h-4 w-4" />
                      {t.nav.admin}
                    </Link>
                  )}
                  <Link
                    to="/wishlist"
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <Heart className="h-4 w-4" />
                    {t.nav.wishlist}
                  </Link>
                  <div className="px-4 py-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      {locale === 'id' ? 'Login sebagai' : 'Logged in as'}: <span className="font-medium text-foreground">{user.name}</span>
                    </p>
                    <Button 
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {t.nav.logout}
                    </Button>
                  </div>
                </>
              ) : (
                <Button asChild className="mx-4">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    {t.nav.login}
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
