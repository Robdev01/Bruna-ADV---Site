import { ArrowDown, ArrowRight, ArrowUpRight, HeartHandshake, Scale, ShieldCheck, Users, Video, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import portrait from "@/assets/img_bruna/bruna-retrato.webp";
import aboutPortrait from "@/assets/img_bruna/bruna-escritorio.webp";

const services = [
  { icon: Scale, title: "Divórcio e separação", description: "Orientação para conduzir o fim de um ciclo com clareza, cuidado e proteção dos seus direitos." },
  { icon: Users, title: "Guarda e convivência", description: "Atuação voltada ao bem-estar dos filhos e à construção de relações familiares equilibradas." },
  { icon: ShieldCheck, title: "Pensão alimentícia", description: "Assessoria em fixação, revisão e execução de alimentos, considerando cada realidade familiar." },
  { icon: HeartHandshake, title: "Família e sucessões", description: "União estável, inventário e planejamento sucessório para cuidar de quem e do que importa." },
];

const Home = () => (
  <div>
    <section className="home-hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow"><span /> Direito de Família e Sucessões</span>
          <h1>Segurança para decidir.<br /><em>Cuidado para recomeçar.</em></h1>
          <p>Por trás de cada questão jurídica, existe uma história. Encontre orientação próxima e responsável para proteger seus direitos e seguir em frente com confiança.</p>
          <div className="hero-actions">
            <Link to="/contato" className="action-link">Agendar uma consulta <ArrowUpRight size={18} /></Link>
            <Link to="/area-atuacao" className="text-link">Conheça nossa atuação <ArrowRight size={17} /></Link>
          </div>
          <div className="hero-note"><Video size={17} strokeWidth={1.5} /><span>Atendimento on-line em todo o Brasil</span></div>
        </div>
        <div className="hero-portrait">
          <img src={portrait} alt="Bruna Calheira, advogada de Família e Sucessões" fetchPriority="high" width="800" height="1200" />
          <div className="portrait-caption"><span>Bruna Calheira</span><small>Advocacia e Consultoria Jurídica</small></div>
          <span className="portrait-side" aria-hidden="true">ESCUTA. CLAREZA. CONFIANÇA.</span>
        </div>
      </div>
      <div className="container hero-bottom"><span>Um olhar atento para a sua história.</span><a href="#atuacao" aria-label="Conhecer as áreas de atuação"><ArrowDown size={18} /></a><span>Direito com sensibilidade e propósito</span></div>
    </section>

    <section id="atuacao" className="section-space services-section">
      <div className="container">
        <div className="section-heading"><div><span className="eyebrow">Como podemos ajudar</span><h2>Amparo jurídico nos momentos<br className="hidden md:block" /> que pedem atenção.</h2></div><p>Cada família tem suas particularidades. Nossa atuação começa pela escuta e se desenvolve com uma estratégia pensada para você.</p></div>
        <div className="services-grid">{services.map(({ icon: Icon, title, description }, index) => (
          <Link to="/area-atuacao" className="service-item" key={title}>
            <div className="service-top"><Icon size={29} strokeWidth={1.3} /><span>0{index + 1}</span></div>
            <h3>{title}</h3><p>{description}</p><span className="service-more">Conhecer atuação <ArrowUpRight size={17} /></span>
          </Link>
        ))}</div>
        <Link to="/area-atuacao" className="text-link all-services">Ver todas as áreas de atuação <ArrowRight size={17} /></Link>
      </div>
    </section>

    <section className="section-space about-section"><div className="container about-grid">
      <div className="about-image"><img src={aboutPortrait} alt="Bruna Calheira em seu retrato profissional" loading="lazy" width="700" height="610" /></div>
      <div className="about-copy"><span className="eyebrow">À frente do escritório</span><h2>Compromisso com o direito.<br /><em>Respeito à sua história.</em></h2><p>Sou Bruna Calheira, advogada com atuação em Direito de Família e Sucessões. Acredito em uma advocacia que une conhecimento técnico, diálogo e sensibilidade.</p><p>Meu compromisso é ajudar você a compreender suas possibilidades e tomar decisões informadas, com acompanhamento próximo em cada etapa.</p><Link to="/diferenciais" className="text-link">Conheça o escritório <ArrowRight size={17} /></Link></div>
    </div></section>

    <section className="section-space approach-section"><div className="container">
      <div className="section-heading"><div><span className="eyebrow">Nossa forma de trabalhar</span><h2>Clareza em cada passo.</h2></div><p>Um atendimento que acolhe suas dúvidas e traz direção para os próximos passos.</p></div>
      <div className="steps-grid">{[
        ["01", "Escuta e acolhimento", "Um primeiro contato para entender sua história, suas necessidades e suas principais dúvidas."],
        ["02", "Análise e orientação", "Avaliação cuidadosa do seu caso, com explicações claras sobre os caminhos jurídicos possíveis."],
        ["03", "Acompanhamento próximo", "Uma estratégia individualizada e comunicação transparente durante o andamento do seu caso."],
      ].map(([number, title, description]) => <div className="step" key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></div>)}</div>
    </div></section>

    <section className="contact-banner"><div className="container contact-banner-inner"><div><span className="eyebrow">Vamos conversar?</span><h2>O primeiro passo é ter<br /><em>com quem contar.</em></h2></div><div><p>Conte-nos o que você precisa. Estamos aqui para ouvir e orientar você com atenção e responsabilidade.</p><Link to="/contato" className="action-link action-light">Entre em contato <ArrowUpRight size={18} /></Link><span className="confidential-note"><LockKeyhole size={14} /> Atendimento com discrição e sigilo</span></div></div></section>
  </div>
);
export default Home;
