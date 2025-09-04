// CadastroBlog.tsx
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { Upload } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5003/api";

const MAX_MB = 10; // deve bater com o backend (MAX_CONTENT_LENGTH ~ 10MB) 
const ACCEPTED = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];

const CadastroBlog = () => {
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingUpload, setLoadingUpload] = useState(false);
  const { toast } = useToast();

  const canSubmit = useMemo(() => !!titulo && !!texto && !loadingCreate && !loadingUpload, [titulo, texto, loadingCreate, loadingUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setFoto(null);
      setPreview(null);
      return;
    }
    if (!ACCEPTED.includes(file.type)) {
      toast({ title: "Arquivo não suportado", description: "Envie PNG, JPG, JPEG, WEBP ou GIF.", variant: "destructive" });
      e.currentTarget.value = "";
      return;
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      toast({ title: "Arquivo muito grande", description: `Tamanho máximo: ${MAX_MB} MB.`, variant: "destructive" });
      e.currentTarget.value = "";
      return;
    }
    setFoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!titulo || !texto) {
      toast({ title: "Erro", description: "Preencha título e texto.", variant: "destructive" });
      return;
    }

    const userRaw = localStorage.getItem("sb:user");
    const user = userRaw ? JSON.parse(userRaw) : null;
    if (!user?.id) {
      toast({ title: "Não autenticado", description: "Faça login para criar o post.", variant: "destructive" });
      return;
    }

    // 1) cria o post
    setLoadingCreate(true);
    let postId: number | null = null;
    try {
      const resCreate = await fetch(`${API_BASE}/blog/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, texto, autor_id: user.id }),
      });
      const dataCreate = await resCreate.json();
      if (!resCreate.ok) throw new Error(dataCreate?.error ?? "Falha ao criar post");
      postId = dataCreate.id;
    } catch (err: any) {
      toast({ title: "Erro ao criar post", description: err.message ?? "Tente novamente.", variant: "destructive" });
      setLoadingCreate(false);
      return;
    }
    setLoadingCreate(false);

    // 2) upload opcional da foto
    if (foto && postId) {
      setLoadingUpload(true);
      try {
        const form = new FormData();
        form.append("foto", foto);
        const resUpload = await fetch(`${API_BASE}/blog/posts/${postId}/foto`, {
          method: "POST",
          body: form,
        });
        const dataUpload = await resUpload.json();
        if (!resUpload.ok) throw new Error(dataUpload?.error ?? "Falha ao enviar a foto");

        // sucesso
        toast({ title: "Post criado", description: "Seu post e a foto foram enviados!" });
      } catch (err: any) {
        // Se o upload falhar, o post já existe; deixe o usuário editar depois se quiser
        toast({ title: "Post criado sem foto", description: err.message ?? "Você pode tentar enviar a imagem depois na edição.", variant: "destructive" });
      } finally {
        setLoadingUpload(false);
      }
    } else {
      toast({ title: "Post criado", description: "Seu post foi criado com sucesso!" });
    }

    // reset
    setTitulo("");
    setTexto("");
    setFoto(null);
    setPreview(null);
    const inputFile = document.getElementById("foto") as HTMLInputElement | null;
    if (inputFile) inputFile.value = "";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Cadastro de Blog</CardTitle>
          <CardDescription className="text-center">Crie seu novo post de blog</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título do Blog</Label>
              <Input id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="foto">Foto (opcional)</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="foto"
                  className="flex flex-col items-center justify-center w-full min-h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center py-6 px-3 w-full">
                    {preview ? (
                      <img src={preview} alt="preview" className="max-h-48 object-contain rounded-md mb-3" />
                    ) : (
                      <>
                        <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Clique para enviar uma foto</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Tipos: PNG, JPG, JPEG, WEBP, GIF • Máx: {MAX_MB}MB
                        </p>
                      </>
                    )}
                  </div>
                  <input id="foto" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="texto">Texto do Blog</Label>
              <Textarea id="texto" value={texto} onChange={(e) => setTexto(e.target.value)} required rows={10} />
            </div>

            <Button type="submit" className="w-full" disabled={!canSubmit}>
              {loadingCreate
                ? "Criando post..."
                : loadingUpload
                ? "Enviando foto..."
                : "Criar Blog"}
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
