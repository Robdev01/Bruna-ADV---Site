import { Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import imagem_logoBruna from "@/assets/img_bruna/Logo_01.png";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden text-white">
      {/* Base com o mesmo gradiente do site, levemente escurecido */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-primary/90 to-purple-secondary/90" />
      {/* Radial glow sutil para profundidade */}
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.12),transparent_60%)]" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                <img
                  src={imagem_logoBruna}
                  alt="Logo Bruna Calheira ADV"
                  className="max-h-18 object-contain"
                />
              </div>
              <div>
                <div className="text-xl font-bold">BRUNA CALHEIRA</div>
                <div className="text-sm text-white/80 font-medium">
                  ADVOCACIA E CONSULTORIA
                </div>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed text-sm">
              Especialista em Direito de Família com mais de 3 anos de
              experiência. Defendendo seus direitos com excelência e humanização.
            </p>
          </div>

          {/* Navegação */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Navegação</h3>
            <nav className="space-y-3">
              {[
                { to: "/", label: "Home" },
                { to: "/diferenciais", label: "Diferenciais" },
                { to: "/area-atuacao", label: "Área de Atuação" },
                { to: "/blog", label: "Blog" },
                { to: "/contato", label: "Contato" },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="block text-white/80 hover:text-white transition-all duration-300 hover:translate-x-1"
                >
                  → {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Serviços */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Principais Serviços</h3>
            <div className="space-y-3 text-sm text-white/85">
              <div>• Divórcio e Separação</div>
              <div>• Guarda de Filhos</div>
              <div>• Pensão Alimentícia</div>
              <div>• União Estável</div>
              <div>• Inventário e Partilha</div>
              <div>• Adoção</div>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 mt-0.5 text-pink-300/90 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">+55 11 98241-9086</div>
                  <div className="text-white/75 text-sm">WhatsApp disponível</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 mt-0.5 text-pink-300/90 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">brunacalheiraadv@gmail.com</div>
                  <div className="text-white/75 text-sm">Resposta em até 24h</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 text-pink-300/90 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Atendimento Nacional</div>
                  <div className="text-white/75 text-sm">Consultas online</div>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 mt-0.5 text-pink-300/90 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">Seg - Sex: 9h às 18h</div>
                  <div className="text-white/75 text-sm">Emergências: 24h</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social / Créditos */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/70 text-sm">
              © 2025 Bruna Calheira - Advogada. Todos os direitos reservados.
            </div>

            <div className="flex items-center gap-4">
              {[
                {
                  href: "https://www.instagram.com/brunacassianoadv/",
                  Icon: Instagram,
                  label: "Instagram",
                },
                { href: "mailto:brunacalheiraadv@gmail.com", Icon: Mail, label: "Email" },
                { href: "tel:+5511982419086", Icon: Phone, label: "Telefone" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 transition-all duration-300 hover:scale-110 group"
                >
                  <Icon className="h-5 w-5 text-white group-hover:text-pink-200" />
                </a>
              ))}
            </div>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-white/10">
            <div className="text-white/70 text-sm">
              Desenvolvido por{" "}
              <a
                href="https://skillbase.com.br/"
                className="text-white font-medium underline decoration-pink-300/60 underline-offset-4 hover:decoration-pink-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                SkillBase
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
