// BlogPost.tsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5003/api";
const API_ORIGIN = (() => {
  try {
    return new URL(API_BASE).origin;
  } catch {
    return API_BASE.replace(/\/api$/, "");
  }
})();

type BlogPost = {
  id: number;
  titulo: string;
  texto: string;
  dt_criacao: string;       // ISO ou "YYYY-MM-DD HH:mm:ss"
  autor_id: number;
  caminho_foto?: string | null; // ex.: "/static/uploads/blog/abc.jpg"
};

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const readTime = useMemo(() => {
    if (!post?.texto) return "—";
    const words = post.texto.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min`;
  }, [post]);

  const formatDate = (raw: string) => {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString("pt-BR");
  };

  const imageUrl = useMemo(() => {
    if (!post?.caminho_foto) return null;
    return `${API_ORIGIN}${post.caminho_foto}`;
  }, [post]);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!id) return;
      setLoading(true);
      setErrMsg(null);
      try {
        const res = await fetch(`${API_BASE}/blog/posts/${id}`);
        const data = await res.json();
        if (!res.ok || data?.error) throw new Error(data?.error ?? "Falha ao carregar o post");
        if (alive) setPost(data as BlogPost);
      } catch (e: any) {
        if (alive) setErrMsg(e?.message ?? "Erro ao carregar o post");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-white/90 w-full max-w-3xl">
          <CardContent className="p-8 animate-pulse">
            <div className="h-8 bg-muted rounded w-2/3 mb-6" />
            <div className="h-4 bg-muted rounded w-1/3 mb-8" />
            <div className="aspect-video bg-muted rounded mb-8" />
            <div className="space-y-3">
              <div className="h-3 bg-muted rounded" />
              <div className="h-3 bg-muted rounded w-5/6" />
              <div className="h-3 bg-muted rounded w-4/6" />
              <div className="h-3 bg-muted rounded w-3/6" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (errMsg || !post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="bg-white/95 backdrop-blur-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            {errMsg ?? "Post não encontrado"}
          </h1>
          <Link to="/blog">
            <Button className="bg-purple-primary hover:bg-purple-secondary text-white">
              Voltar ao Blog
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  // quebra o texto simples em parágrafos (se preferir Markdown, é só trocar aqui por um renderer)
  const paragraphs = post.texto.split(/\n{2,}/).map((p, i) => p.trim() && <p key={i} className="mb-4">{p}</p>);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-16 md:py-20">
        {/* Back */}
        <div className="mb-8">
          <Link to="/blog">
            <Button variant="outline" className="bg-white border-border text-primary hover:bg-secondary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Blog
            </Button>
          </Link>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              {/* Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                  {post.titulo}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.dt_criacao)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {readTime} de leitura
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-purple-light to-purple-primary mb-8 flex items-center justify-center">
                {imageUrl ? (
                  <img src={imageUrl} alt={post.titulo} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl font-bold text-white">
                    {String(post.id).padStart(2, "0")}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none text-foreground" style={{ lineHeight: "1.7" }}>
                {paragraphs}
              </div>

              {/* CTA */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="bg-gradient-to-r from-purple-light/10 to-purple-primary/10 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">Precisa de ajuda jurídica?</h3>
                  <p className="text-muted-foreground mb-4">Entre em contato para uma consulta personalizada</p>
                  <Link to="/contato">
                    <Button className="bg-purple-primary hover:bg-purple-secondary text-white">
                      Agendar Consulta
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
