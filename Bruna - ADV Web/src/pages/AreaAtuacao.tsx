
import { Scale, Heart, Shield, Users, FileText, Gavel, Handshake, DollarSign, Building } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const AreaAtuacao = () => {
  const services = [
    {
      icon: Scale,
      title: "Regularização de união estável",
      description: "Formalização e reconhecimento legal de relacionamentos consensuais"
    },
    {
      icon: Heart,
      title: "Pacto antenupcial",
      description: "Elaboração de contratos pré-matrimoniais para proteção patrimonial"
    },
    {
      icon: FileText,
      title: "Alteração de regime de bens",
      description: "Modificação do regime patrimonial durante o casamento"
    },
    {
      icon: Handshake,
      title: "Doação",
      description: "Assessoria completa em doações entre cônjuges e familiares"
    },
    {
      icon: FileText,
      title: "Testamento",
      description: "Elaboração e orientação sobre disposições testamentárias"
    },
    {
      icon: Building,
      title: "Holding",
      description: "Constituição de holdings familiares para gestão patrimonial"
    },
    {
      icon: Users,
      title: "Partilha em vida",
      description: "Antecipação da legítima e planejamento sucessório"
    },
    {
      icon: Gavel,
      title: "Divórcio/Dissolução de união estável",
      description: "Processos de separação judicial e extrajudicial"
    },
    {
      icon: Shield,
      title: "Inventário e partilha",
      description: "Partilha de bens em processo de sucessão"
    },
    {
      icon: DollarSign,
      title: "Alvará judicial",
      description: "Liberação de valores e bens através de ordem judicial"
    }
  ];

  return (
    <div className="section-space">
      <div className="container">
        <div className="page-heading">
          <span className="eyebrow">Áreas de atuação</span>
          <h1>Orientação para a sua família.<br /><em>Proteção para o seu futuro.</em></h1>
          <p>Atuação em Direito de Família e Sucessões, com análise individualizada e orientação clara para cada momento da sua vida.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {services.map(({ icon: Icon, title, description }, index) => (
            <Link to="/contato" key={title} className="practice-item group">
              <Icon size={26} strokeWidth={1.3} className="text-primary shrink-0" />
              <div><span className="eyebrow">{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{description}.</p></div>
              <ArrowUpRight size={18} className="text-primary shrink-0 ml-auto" />
            </Link>
          ))}
        </div>
        <div className="practice-cta"><div><span className="eyebrow">Atendimento individualizado</span><h2>Vamos entender o seu caso?</h2><p>Entre em contato para receber informações sobre o atendimento e agendar sua consulta.</p></div><Link to="/contato" className="action-link">Agendar consulta <ArrowUpRight size={17} /></Link></div>
      </div>
    </div>
  );
};
export default AreaAtuacao;
