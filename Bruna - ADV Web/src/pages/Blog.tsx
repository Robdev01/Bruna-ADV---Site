import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [acceptEmails, setAcceptEmails] = useState(false);

  const blogPosts = [
    {
      id: 1,
      title: "Direitos na Guarda Compartilhada",
      excerpt: "Entenda como funciona a guarda compartilhada e quais são os direitos e deveres dos pais.",
      date: "15 Jan 2024"
    },
    {
      id: 2,
      title: "Processo de Divórcio Consensual",
      excerpt: "Saiba como funciona o processo de divórcio quando ambas as partes estão de acordo.",
      date: "10 Jan 2024"
    },
    {
      id: 3,
      title: "Pensão Alimentícia: Valores e Critérios",
      excerpt: "Descubra como é calculado o valor da pensão alimentícia e quais critérios são considerados.",
      date: "05 Jan 2024"
    },
    {
      id: 4,
      title: "União Estável vs Casamento",
      excerpt: "Conheça as principais diferenças jurídicas entre união estável e casamento civil.",
      date: "01 Jan 2024"
    },
    {
      id: 5,
      title: "Adoção: Passo a Passo Legal",
      excerpt: "Guia completo sobre o processo legal de adoção no Brasil e seus requisitos.",
      date: "28 Dez 2023"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", { name, email, acceptEmails });
    // Here would be the newsletter signup logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-primary to-purple-secondary">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Blog
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-8">
            Artigos recentes
          </h2>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
          {blogPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`}>
              <Card className="bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 hover:shadow-lg cursor-pointer group">
                <CardContent className="p-6 h-full flex flex-col">
                  <div className="flex-1 space-y-4">
                    <div className="aspect-video bg-gradient-to-br from-purple-light to-purple-primary rounded-lg flex items-center justify-center group-hover:from-purple-primary group-hover:to-purple-secondary transition-all duration-300">
                      <span className="text-2xl font-bold text-white">
                        {String(post.id).padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2 leading-tight group-hover:text-purple-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Quer receber mais informações? Se inscreva em nossa Newsletter
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
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