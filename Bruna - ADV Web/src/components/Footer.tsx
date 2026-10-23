import { ArrowUpRight, Instagram, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand"><Link to="/">Bruna Calheira<span>ADVOCACIA E CONSULTORIA JURÍDICA</span></Link><p>Orientação jurídica com escuta, responsabilidade e respeito à sua história.</p></div>
        <div><h2>Explore</h2><nav aria-label="Navegação do rodapé">{[["/", "Início"], ["/diferenciais", "O escritório"], ["/area-atuacao", "Áreas de atuação"], ["/blog", "Artigos"], ["/contato", "Contato"]].map(([to, label]) => <Link to={to} key={to}>{label}</Link>)}</nav></div>
        <div className="footer-contact"><h2>Fale com o escritório</h2><a href="https://wa.me/5511982419086" target="_blank" rel="noopener noreferrer"><Phone size={15} /> (11) 98241-9086 <ArrowUpRight size={14} /></a><a href="mailto:brunacalheiraadv@gmail.com"><Mail size={15} /> brunacalheiraadv@gmail.com</a><p>Segunda a sexta, das 9h às 18h<br />Atendimento on-line em todo o Brasil</p><a href="https://www.instagram.com/brunacassianoadv/" target="_blank" rel="noopener noreferrer"><Instagram size={15} /> Acompanhe no Instagram <ArrowUpRight size={14} /></a></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Bruna Calheira. Todos os direitos reservados.</span><span>Desenvolvido por <a href="https://skillbase.com.br/" target="_blank" rel="noopener noreferrer">SkillBase <ArrowUpRight size={12} /></a></span></div>
    </div>
  </footer>
);
export default Footer;
