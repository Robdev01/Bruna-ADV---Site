import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";

const CadastroBlog = () => {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFoto(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !texto) {
      toast({
        title: "Erro",
        description: "Por favor, preencha título e texto do blog.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Blog criado",
      description: "Seu blog foi criado com sucesso!",
    });
    
    // Reset form
    setTitulo("");
    setTexto("");
    setFoto(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Cadastro de Blog</CardTitle>
          <CardDescription className="text-center">
            Crie seu novo post de blog
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título do Blog</Label>
              <Input
                id="titulo"
                type="text"
                placeholder="Digite o título do seu blog"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="foto">Foto (opcional)</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="foto"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {foto ? foto.name : "Clique para enviar uma foto"}
                    </p>
                  </div>
                  <input
                    id="foto"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="texto">Texto do Blog</Label>
              <Textarea
                id="texto"
                placeholder="Escreva o conteúdo do seu blog aqui..."
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                required
                rows={10}
              />
            </div>

            <Button type="submit" className="w-full">
              Criar Blog
            </Button>
          </form>
          
          <div className="text-center text-sm">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Fazer login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CadastroBlog;