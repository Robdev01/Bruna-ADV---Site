import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/img_bruna/logo_nome_lado-removebg-preview (1).png";

const menuItems = [
  { href: "/", label: "Início" },
  { href: "/diferenciais", label: "O escritório" },
  { href: "/area-atuacao", label: "Áreas de atuação" },
  { href: "/blog", label: "Artigos" },
  { href: "/contato", label: "Contato" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand-link" aria-label="Bruna Calheira — página inicial">
          <img src={logo} alt="Bruna Calheira — Advocacia e Consultoria Jurídica" width="437" height="158" />
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {menuItems.map(({ href, label }) => (
            <Link key={href} to={href} aria-current={(href === "/" ? pathname === href : pathname.startsWith(href)) ? "page" : undefined}>{label}</Link>
          ))}
        </nav>
        <Link to="/contato" className="action-link header-cta">Agendar consulta <ArrowUpRight size={16} /></Link>
        <button type="button" className="mobile-toggle" aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={isMenuOpen} aria-controls="mobile-navigation" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isMenuOpen && <nav id="mobile-navigation" className="mobile-nav container" aria-label="Navegação para celular">
        {menuItems.map(({ href, label }) => <Link key={href} to={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}
        <Link to="/contato" className="action-link">Agendar consulta <ArrowUpRight size={16} /></Link>
      </nav>}
    </header>
  );
};
export default Header;
