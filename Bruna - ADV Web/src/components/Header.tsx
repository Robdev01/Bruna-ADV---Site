import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import imagem_logoBruna from "@/assets/img_bruna/Logo_01.png";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/diferenciais", label: "Diferenciais" },
    { href: "/area-atuacao", label: "Área de Atuação" },
    { href: "/blog", label: "Blog" },
    { href: "/contato", label: "Contato" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-border'
        : 'bg-white/90 backdrop-blur-sm border-b border-border/50'
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-4 group">
            <div className="relative">
              <div className="w-28 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <img src={imagem_logoBruna} alt="Logo Bruna Calheira ADV" className="max-h-32" />
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-purple-primary to-purple-secondary rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            <div className="hidden md:block">
              <div className="text-xl font-bold text-foreground tracking-tight">BRUNA CALHEIRA</div>
              <div className="text-sm text-muted-foreground font-medium tracking-wide">ADVOCACIA E CONSULTORIA JURÍDICA</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-primary group ${isActive(item.href) ? "text-primary" : "text-foreground"
                  }`}
              >
                {item.label}
                <span className={`absolute -bottom-2 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link to="/contato">
              <Button className="bg-gradient-to-r from-purple-primary to-purple-secondary hover:from-purple-secondary hover:to-purple-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-2.5">
                Consulta Gratuita
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-white/95 backdrop-blur-md animate-fade-in">
            <nav className="py-6 space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-200 hover:bg-secondary/50 hover:text-primary rounded-lg mx-2 ${isActive(item.href) ? "text-primary bg-secondary" : "text-foreground"
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-6 pt-4">
                <Link to="/contato" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-purple-primary to-purple-secondary text-white">
                    Consulta Gratuita
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;