import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold mb-4 text-primary">Blog Platform</h1>
        <p className="text-xl text-muted-foreground mb-8">Sua plataforma de blogs com cores roxas</p>
        <div className="space-x-4">
          <Button asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/cadastro-blog">Criar Blog</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
