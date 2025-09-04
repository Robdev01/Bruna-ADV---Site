// Blog.tsx
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5003/api";
// origem do backend para montar URL da imagem: ex.: http://localhost:5003
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
  dt_criacao: string;     // ISO ou "YYYY-MM-DD HH:mm:ss"
  autor_id: number;
  caminho_foto?: string | null; // ex.: "/static/uploads/blog/xxx.jpg"
};

type ListResponse = {
  page: number;
  page_size: number;
  total: number;
  items: BlogPost[];
};

const PAGE_SIZE = 12;

const Blog = () => {
  // newsletter (mantidos)
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [acceptEmails, setAcceptEmails] = useState(false);

  // blog list
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<BlogPost[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(total / PAGE_SIZE)),
    [total]
  );

  const fetchPosts = async (opts?: { reset?: boolean; toPage?: number }) => {
    const goTo = opts?.toPage ?? page;
    setLoading(true);
    setErrMsg(null);
    try {
      const params = new URLSearchParams({
        page: String(goTo),
        page_size: String(PAGE_SIZE),
      });
      if (query.trim()) params.set("q", query.trim());

      const res = await fetch(`${API_BASE}/blog/posts?` + params.toString(), {
        method: "GET",
      });
      const data: ListResponse | { error: string } = await res.json();
      if (!res.ok || (data as any).error) {
        throw new Error((data as any).error ?? "Falha ao carregar posts");
      }

      const payload = data as ListResponse;
      setPage(payload.page);
      setTotal(payload.total);
      setItems((old) => (opts?.reset ? payload.items : payload.items));
    } catch (e: any) {
      setErrMsg(e?.message ?? "Erro ao carregar posts");
    } finally {
      setLoading(false);
    }
  };

  // primeira carga
  useEffect(() => {
    fetchPosts({ reset: true, toPage: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // reset para página 1 com nova query
    fetchPosts({ reset: true, toPage: 1 });
  };

  const goPage = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    fetchPosts({ reset: true, toPage: p });
  };

  const formatDate = (raw: string) => {
    // tenta parse simples; se já vier formatado, apenas retorna
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString();
  };

  const imageUrl = (post: BlogPost) => {
    if (!post.caminho_foto) return null;
    // caminho_foto já começa com "/static/...": prefixamos com origem do backend
    return `${API_ORIGIN}${post.caminho_foto}`;
  };

  // newsletter dummy
  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, accept: acceptEmails }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Falha ao inscrever");
      alert("Inscrição registrada! Você receberá novidades por e-mail.");
      setName(""); setEmail(""); setAcceptEmails(false);
    } catch (err: any) {
      alert(err.message ?? "Erro ao inscrever");
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-primary to-purple-secondary">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Blog</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-4">
            Artigos recentes
          </h2>

          {/* busca */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto flex gap-2">
            <Input
              placeholder="Buscar por título ou texto…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-white"
            />
            <Button type="submit" className="bg-white text-purple-primary hover:bg-white/90">
              Buscar
            </Button>
          </form>

          {errMsg && (
            <p className="mt-4 text-sm text-red-100 bg-red-600/40 inline-block px-3 py-1 rounded">
              {errMsg}
            </p>
          )}
        </div>

        {/* Grid de posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
          {loading && items.length === 0 ? (
            // skeleton simples
            Array.from({ length: 5 }).map((_, i) => (
              <Card key={`sk-${i}`} className="bg-white/60 animate-pulse">
                <CardContent className="p-6 h-full">
                  <div className="aspect-video rounded-lg bg-purple-200/50 mb-4" />
                  <div className="h-4 bg-purple-200/60 rounded mb-2" />
                  <div className="h-3 bg-purple-200/40 rounded w-3/4" />
                </CardContent>
              </Card>
            ))
          ) : items.length === 0 ? (
            <div className="col-span-full text-center text-white/90">
              Nenhum post encontrado.
            </div>
          ) : (
            items.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg cursor-pointer group">
                  <CardContent className="p-6 h-full flex flex-col">
                    <div className="flex-1 space-y-4">
                      <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-purple-light to-purple-primary flex items-center justify-center group-hover:from-purple-primary group-hover:to-purple-secondary transition-all duration-300">
                        {imageUrl(post) ? (
                          <img
                            src={imageUrl(post)!}
                            alt={post.titulo}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-2xl font-bold text-white">
                            {String(post.id).padStart(2, "0")}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-lg text-foreground mb-2 leading-tight group-hover:text-purple-primary transition-colors">
                          {post.titulo}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                          {post.texto}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border">
                      <span className="text-xs text-muted-foreground">
                        {formatDate(post.dt_criacao)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>

        {/* Paginação */}
        {items.length > 0 && (
          <div className="flex items-center justify-center gap-2 mb-20">
            <Button
              variant="secondary"
              onClick={() => goPage(page - 1)}
              disabled={loading || page <= 1}
            >
              Anterior
            </Button>
            <span className="text-white text-sm">
              Página {page} de {totalPages}
            </span>
            <Button
              variant="secondary"
              onClick={() => goPage(page + 1)}
              disabled={loading || page >= totalPages}
            >
              Próxima
            </Button>
          </div>
        )}

        {/* Newsletter (mantido) */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Quer receber mais informações? Se inscreva em nossa Newsletter
                </h3>
              </div>

              <form onSubmit={handleNewsletter} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white border-2 border-purple-primary/20 focus:border-purple-primary"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white border-2 border-purple-primary/20 focus:border-purple-primary"
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accept-emails"
                    checked={acceptEmails}
                    onCheckedChange={(checked) => setAcceptEmails(checked as boolean)}
                    className="border-purple-primary data-[state=checked]:bg-purple-primary"
                  />
                  <Label htmlFor="accept-emails" className="text-sm text-foreground">
                    Aceito receber e-mails com novos posts deste site.
                  </Label>
                </div>

                <div className="text-center">
                  <Button
                    type="submit"
                    className="bg-purple-primary hover:bg-purple-secondary text-white px-8 py-3"
                    disabled={!acceptEmails}
                  >
                    INSCREVER
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blog;
