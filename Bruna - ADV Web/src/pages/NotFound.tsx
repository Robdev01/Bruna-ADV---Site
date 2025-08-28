import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 animate-fade-in">
        <h1 className="text-6xl font-bold text-purple-primary">404</h1>
        <p className="text-2xl text-foreground mb-4">Oops! Página não encontrada</p>
        <p className="text-muted-foreground mb-8">A página que você está procurando não existe.</p>
        <a 
          href="/" 
          className="inline-flex items-center justify-center rounded-md bg-purple-primary px-8 py-3 text-white font-medium hover:bg-purple-secondary transition-colors"
        >
          Voltar para Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
