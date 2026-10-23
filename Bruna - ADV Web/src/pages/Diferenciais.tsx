import { ArrowUpRight, Users, Eye, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import portrait from "@/assets/img_bruna/bruna-escritorio.webp";

const benefits = [
  { icon: Users, title: "Escuta e acolhimento", description: "Cada caso é único. O atendimento começa pela compreensão da sua realidade, com atenção às suas necessidades e prioridades." },
  { icon: Eye, title: "Comunicação transparente", description: "Orientações em linguagem acessível para que você compreenda as alternativas e acompanhe cada etapa do seu caso." },
  { icon: ShieldCheck, title: "Estratégia individualizada", description: "Análise cuidadosa das particularidades de cada situação, com responsabilidade, discrição e compromisso com seus direitos." },
];
const Diferenciais = () => (
  <div>
    <section className="section-space"><div className="container">
      <div className="page-heading"><span className="eyebrow">O escritório</span><h1>Advocacia feita de conhecimento.<br /><em>E de cuidado com as pessoas.</em></h1><p>Uma atuação próxima e responsável em Direito de Família e Sucessões, com atendimento on-line em todo o Brasil.</p></div>
      <div className="about-grid"><div className="about-image"><img src={portrait} alt="Bruna Calheira, advogada" width="700" height="610" /></div><div className="about-copy"><span className="eyebrow">Conheça Bruna Calheira</span><h2>Seu caso merece<br /><em>atenção de verdade.</em></h2><p>Questões familiares envolvem muito mais do que documentos e processos. Envolvem vínculos, expectativas e decisões que impactam o futuro.</p><p>À frente do escritório, Bruna Calheira une atuação jurídica e atendimento humanizado para orientar cada cliente com clareza. O trabalho é desenvolvido a partir da escuta, da análise das particularidades do caso e da construção de uma estratégia individualizada.</p><p>Nosso compromisso é oferecer o apoio necessário para que você compreenda seus direitos e avalie os próximos passos com segurança.</p><Link to="/contato" className="text-link">Converse com o escritório <ArrowUpRight size={17} /></Link></div></div>
    </div></section>
    <section className="section-space about-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">Nossos compromissos</span><h2>Uma relação construída<br />com confiança.</h2></div></div><div className="steps-grid">{benefits.map(({ icon: Icon, title, description }) => <div className="step" key={title}><Icon className="text-primary" size={28} strokeWidth={1.4} /><h3>{title}</h3><p>{description}</p></div>)}</div></div></section>
  </div>
);
export default Diferenciais;
