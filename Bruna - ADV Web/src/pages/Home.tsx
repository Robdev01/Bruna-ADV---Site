import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scale, Heart, Shield, Users, CheckCircle, Star, Award, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import imagem_BrunaHome from "@/assets/img_bruna/Bruna de lado.jpg";

const Home = () => {
  

  const services = [
    {
      icon: Scale,
      title: "Divórcio & Separação",
      description: "Orientação completa em processos de divórcio consensual e litigioso com foco na proteção dos seus direitos."
    },
    {
      icon: Heart,
      title: "Guarda de Filhos",
      description: "Defesa dos melhores interesses das crianças com experiência em guarda compartilhada e unilateral."
    },
    {
      icon: Shield,
      title: "Pensão Alimentícia",
      description: "Ação, revisão e execução de pensão alimentícia com cálculos precisos e fundamentação jurídica sólida."
    },
    {
      icon: Users,
      title: "União Estável",
      description: "Reconhecimento, dissolução e regulamentação de direitos patrimoniais em união estável."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pb-16 bg-gradient-to-br from-purple-primary via-purple-secondary to-purple-accent overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8 animate-fade-in">
              <div className="space-y-4">
                              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Protegendo Famílias com 
                  <span className="block bg-gradient-to-r from-white to-purple-light bg-clip-text text-transparent">
                    Excelência Jurídica
                  </span>
                </h1>
              </div>
              
              <p className="text-lg md:text-xl leading-relaxed opacity-95 max-w-2xl">
                Com mais de 3 anos de experiência, ofereço soluções jurídicas personalizadas 
                para questões familiares complexas. Meu compromisso é proteger 
                seus direitos com estratégias eficazes e atendimento humanizado.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contato">
                  <Button 
                    size="lg" 
                    className="bg-white text-purple-primary hover:bg-white/90 transition-all duration-300 text-lg px-8 py-4 shadow-xl hover:shadow-2xl"
                  >
                    Consulta Gratuita
                  </Button>
                </Link>
                <Link to="/area-atuacao">
                  <Button 
                    size="lg" 
                    className="bg-white text-purple-primary hover:bg-white/90 transition-all duration-300 text-lg px-8 py-4 shadow-xl hover:shadow-2xl"
                  >
                    Nossos Serviços
                  </Button>
                </Link>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end animate-scale-in">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-white/20 to-transparent rounded-2xl blur-2xl"></div>
                <img
                  src={imagem_BrunaHome}
                  alt="Bruna Calheira - Advogada especialista em Direito de Família"
                  className="relative w-full max-w-md rounded-2xl shadow-2xl border-4 border-white/20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>     

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-slide-up">
           
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Expertise em Direito de Família
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Soluções jurídicas completas com foco em resultados eficazes e atendimento personalizado para cada situação familiar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-primary to-purple-secondary rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="space-y-4 flex-1">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                        <Link to="/area-atuacao" className="inline-flex items-center text-primary hover:text-purple-secondary font-medium text-sm transition-colors duration-300">
                          Saiba mais →
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/area-atuacao">
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                Ver Todos os Serviços
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-primary to-purple-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto text-white space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Sua Família Merece a 
              <span className="block">Melhor Defesa Jurídica</span>
            </h2>
            <p className="text-xl opacity-95 leading-relaxed max-w-2xl mx-auto">
              Agende sua consulta gratuita e descubra como podemos proteger seus direitos com estratégias jurídicas eficazes e atendimento humanizado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contato">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-primary hover:bg-white/90 transition-all duration-300 text-lg px-10 py-4 shadow-2xl hover:shadow-3xl"
                >
                  📞 Agendar Consulta Gratuita
                </Button>
              </Link>
              <Link to="/diferenciais">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-primary hover:bg-white/90 transition-all duration-300 text-lg px-10 py-4 shadow-2xl hover:shadow-3xl"
                >
                  Conheça Nossos Diferenciais
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;