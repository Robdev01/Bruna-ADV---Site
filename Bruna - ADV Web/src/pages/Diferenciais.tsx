import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Clock, Shield, Award, Target } from "lucide-react";
import imagem_Bruna from "@/assets/img_bruna/IMG_9187.jpg";

const Diferenciais = () => {
  const benefits = [
    {
      icon: Users,
      title: "Atendimento Humanizado",
      description: "Cada caso é único e merece atenção especializada. Desenvolvemos estratégias sob medida para suas necessidades específicas."
    },
    {
      icon: Clock,
      title: "Transparência Total",
      description: "Relatórios quinzenais mantêm você sempre informado sobre o progresso do seu processo judicial."
    },
    {
      icon: Shield,
      title: "Atuação Nacional",
      description: "Cobertura em todo território brasileiro para atender suas necessidades onde quer que esteja."
    }
  ];

  const values = [
    "Compromisso com resultados eficazes",
    "Atendimento personalizado e artesanal", 
    "Transparência em todas as etapas",
    "Estratégias baseadas em cada caso",
    "Relatórios quinzenais detalhados",
    "Busca pela solução menos dolorosa"
  ];

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="pb-16 bg-gradient-to-br from-purple-primary to-purple-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 mb-6">
              💼 Por que nos escolher?
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Nossos Diferenciais
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Descubra o que torna nossa abordagem jurídica única e eficaz para resolver questões familiares.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="order-2 lg:order-1 animate-scale-in">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-purple-primary/20 to-purple-secondary/20 rounded-3xl blur-2xl"></div>
                <img
                  src={imagem_Bruna}
                  alt="Bruna Calheira - Advogada especialista em Direito de Família"
                  className="relative w-full max-w-lg rounded-2xl shadow-2xl mx-auto"
                />
                <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl">
                  <div className="flex items-center space-x-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm font-semibold text-foreground">3+ Anos</span>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-8 animate-slide-up">
              <Card className="bg-gradient-to-br from-white to-secondary/30 border-0 shadow-2xl">
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <Badge className="bg-primary text-primary-foreground px-4 py-2">
                      ⚖️ Compromisso com a Justiça
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                      Excelência Jurídica com Toque Humano
                    </h2>
                  </div>

                  <div className="space-y-6 text-foreground">
                    <p className="text-lg leading-relaxed">
                      <strong>Bruna Calheira</strong> é advogada especializada em Direito de Família e Sucessões, com atuação consolidada em todo o Brasil e mais de 15 anos de experiência.
                    </p>

                    <p className="text-lg leading-relaxed">
                      No escritório de advocacia Bruna Calheira, destacamo-nos pela <strong>abordagem humanizada, profissional, transparente e diligente</strong>. Oferecemos um atendimento personalizado e artesanal, compreendendo as particularidades de cada caso.
                    </p>

                    <p className="text-lg leading-relaxed">
                      Nosso objetivo é garantir uma atuação eficaz e ágil, sempre buscando a <strong>solução menos dolorosa</strong> e mais satisfatória para nossos clientes.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {values.map((value, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-foreground font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-purple-primary to-purple-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30 px-4 py-2 mb-6">
              🏆 Nossos Pilares
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              O que nos torna únicos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <Card key={index} className="bg-white/95 backdrop-blur-sm border-0 hover:bg-white transition-all duration-300 hover:shadow-2xl group">
                  <CardContent className="p-8 text-center space-y-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-purple-primary to-purple-secondary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Diferenciais;