import { Card, CardContent } from "@/components/ui/card";
import { Scale, Heart, Shield, Users, Home, FileText, Gavel, Handshake, DollarSign, Building } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-rose-light to-secondary">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Serviços
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-purple-primary mb-8">
            Atuação especializada
          </h2>
        </div>

        {/* Services Icon */}
        <div className="flex justify-center mb-16">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-primary to-purple-secondary rounded-full flex items-center justify-center">
            <Scale className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-primary rounded-lg flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg text-foreground leading-tight">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-white/90 backdrop-blur-sm max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Precisa de Orientação Jurídica?
              </h3>
              <p className="text-muted-foreground mb-6">
                Entre em contato conosco para uma consulta personalizada. Estamos prontos para ajudar você a encontrar a melhor solução para seu caso.
              </p>
              <Link
                to="/contato"
                className="inline-flex items-center justify-center rounded-md bg-purple-primary px-8 py-3 text-white font-medium hover:bg-purple-secondary transition-colors"
              >
                Agendar Consulta
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AreaAtuacao;