import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, Clock } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();

  // Mock data - em um app real, você buscaria os dados de uma API
  const blogPosts = {
    "1": {
      id: 1,
      title: "Direitos na Guarda Compartilhada",
      excerpt: "Entenda como funciona a guarda compartilhada e quais são os direitos e deveres dos pais.",
      date: "15 Jan 2024",
      readTime: "8 min",
      content: `
        <h2>O que é Guarda Compartilhada?</h2>
        <p>A guarda compartilhada é uma modalidade de guarda em que ambos os pais exercem o poder familiar sobre os filhos, compartilhando as responsabilidades e decisões importantes sobre a vida da criança ou adolescente.</p>
        
        <h3>Principais Características</h3>
        <p>Na guarda compartilhada, os pais dividem:</p>
        <ul>
          <li>Responsabilidade pela educação dos filhos</li>
          <li>Decisões sobre saúde e bem-estar</li>
          <li>Tempo de convivência</li>
          <li>Responsabilidades financeiras</li>
        </ul>

        <h3>Direitos dos Pais</h3>
        <p>Cada genitor tem direito a:</p>
        <ul>
          <li>Participar ativamente da vida dos filhos</li>
          <li>Ser consultado sobre decisões importantes</li>
          <li>Ter acesso a informações sobre saúde e educação</li>
          <li>Conviver regularmente com os filhos</li>
        </ul>

        <h3>Deveres dos Pais</h3>
        <p>Os deveres incluem:</p>
        <ul>
          <li>Prover sustento e educação</li>
          <li>Manter diálogo constante sobre os filhos</li>
          <li>Respeitar o tempo de convivência do outro genitor</li>
          <li>Comunicar mudanças significativas</li>
        </ul>

        <h3>Quando é Recomendada?</h3>
        <p>A guarda compartilhada é recomendada quando:</p>
        <ul>
          <li>Ambos os pais têm condições de exercer o poder familiar</li>
          <li>Existe possibilidade de diálogo entre os genitores</li>
          <li>Os pais residem em locais que permitam a convivência regular</li>
        </ul>

        <p><strong>Importante:</strong> A guarda compartilhada sempre deve priorizar o melhor interesse da criança ou adolescente.</p>
      `
    },
    "2": {
      id: 2,
      title: "Processo de Divórcio Consensual",
      excerpt: "Saiba como funciona o processo de divórcio quando ambas as partes estão de acordo.",
      date: "10 Jan 2024",
      readTime: "6 min",
      content: `
        <h2>O que é Divórcio Consensual?</h2>
        <p>O divórcio consensual ocorre quando ambos os cônjuges concordam com a separação e com todos os termos do processo, incluindo partilha de bens, guarda dos filhos e pensão alimentícia.</p>

        <h3>Vantagens do Divórcio Consensual</h3>
        <ul>
          <li>Processo mais rápido e econômico</li>
          <li>Menor desgaste emocional</li>
          <li>Maior controle sobre as decisões</li>
          <li>Possibilidade de realização em cartório</li>
        </ul>

        <h3>Documentos Necessários</h3>
        <p>Para dar entrada no processo, são necessários:</p>
        <ul>
          <li>Certidão de casamento atualizada</li>
          <li>RG e CPF de ambos os cônjuges</li>
          <li>Certidão de nascimento dos filhos menores</li>
          <li>Comprovante de renda</li>
          <li>Inventário dos bens do casal</li>
        </ul>

        <h3>Etapas do Processo</h3>
        <ol>
          <li>Acordo entre os cônjuges sobre todos os termos</li>
          <li>Elaboração da petição inicial</li>
          <li>Apresentação ao juiz ou ida ao cartório</li>
          <li>Homologação do acordo</li>
          <li>Expedição da certidão de divórcio</li>
        </ol>

        <p>O divórcio consensual é uma excelente opção para casais que conseguem manter o diálogo e chegar a um acordo justo para ambas as partes.</p>
      `
    },
    "3": {
      id: 3,
      title: "Pensão Alimentícia: Valores e Critérios",
      excerpt: "Descubra como é calculado o valor da pensão alimentícia e quais critérios são considerados.",
      date: "05 Jan 2024",
      readTime: "7 min",
      content: `
        <h2>Como é Calculada a Pensão Alimentícia?</h2>
        <p>A pensão alimentícia é calculada com base na necessidade de quem recebe e na possibilidade de quem paga, seguindo o princípio da proporcionalidade.</p>

        <h3>Critérios Principais</h3>
        <p>Os juízes consideram:</p>
        <ul>
          <li>Renda do alimentante</li>
          <li>Necessidades do alimentando</li>
          <li>Padrão de vida da família</li>
          <li>Idade dos filhos</li>
          <li>Gastos com educação e saúde</li>
        </ul>

        <h3>Percentual Comum</h3>
        <p>Embora não exista uma regra fixa, é comum que a pensão represente:</p>
        <ul>
          <li>30% da renda líquida para um filho</li>
          <li>40% da renda líquida para dois filhos</li>
          <li>50% da renda líquida para três ou mais filhos</li>
        </ul>

        <h3>O que a Pensão Deve Cobrir</h3>
        <ul>
          <li>Alimentação</li>
          <li>Vestuário</li>
          <li>Moradia</li>
          <li>Saúde</li>
          <li>Educação</li>
          <li>Lazer</li>
        </ul>

        <h3>Revisão da Pensão</h3>
        <p>A pensão pode ser revista quando houver:</p>
        <ul>
          <li>Mudança na situação financeira do alimentante</li>
          <li>Alteração nas necessidades do alimentando</li>
          <li>Mudança no custo de vida</li>
        </ul>

        <p><strong>Lembre-se:</strong> O não pagamento da pensão alimentícia pode resultar em prisão civil do devedor.</p>
      `
    },
    "4": {
      id: 4,
      title: "União Estável vs Casamento",
      excerpt: "Conheça as principais diferenças jurídicas entre união estável e casamento civil.",
      date: "01 Jan 2024",
      readTime: "5 min",
      content: `
        <h2>União Estável e Casamento: Principais Diferenças</h2>
        <p>Embora ambas sejam formas de constituir família, união estável e casamento possuem diferenças importantes no âmbito jurídico.</p>

        <h3>União Estável</h3>
        <p>Características da união estável:</p>
        <ul>
          <li>Não exige formalização em cartório</li>
          <li>Pode ser reconhecida judicialmente</li>
          <li>Regime de bens: comunhão parcial (padrão)</li>
          <li>Mais flexível para dissolução</li>
        </ul>

        <h3>Casamento Civil</h3>
        <p>Características do casamento:</p>
        <ul>
          <li>Requer cerimônia formal</li>
          <li>Documentação obrigatória</li>
          <li>Escolha do regime de bens antes da cerimônia</li>
          <li>Processo formal para divórcio</li>
        </ul>

        <h3>Direitos Similares</h3>
        <p>Tanto na união estável quanto no casamento:</p>
        <ul>
          <li>Direito à herança</li>
          <li>Pensão por morte do INSS</li>
          <li>Plano de saúde como dependente</li>
          <li>Imposto de renda conjunto</li>
        </ul>

        <h3>Quando Escolher Cada Um?</h3>
        <p><strong>União Estável:</strong> Para casais que preferem menos formalidades e maior flexibilidade.</p>
        <p><strong>Casamento:</strong> Para quem deseja maior segurança jurídica e formalização.</p>

        <p>A escolha deve sempre considerar os objetivos e necessidades específicas do casal.</p>
      `
    },
    "5": {
      id: 5,
      title: "Adoção: Passo a Passo Legal",
      excerpt: "Guia completo sobre o processo legal de adoção no Brasil e seus requisitos.",
      date: "28 Dez 2023",
      readTime: "10 min",
      content: `
        <h2>O Processo de Adoção no Brasil</h2>
        <p>A adoção é um ato jurídico que estabelece uma relação de filiação entre pessoas não ligadas pelo parentesco natural, criando vínculos permanentes.</p>

        <h3>Requisitos para Adotar</h3>
        <p>Para se candidatar à adoção, é necessário:</p>
        <ul>
          <li>Ter pelo menos 18 anos de idade</li>
          <li>Ser pelo menos 16 anos mais velho que o adotando</li>
          <li>Possuir idoneidade moral e financeira</li>
          <li>Não ter antecedentes criminais</li>
        </ul>

        <h3>Etapas do Processo</h3>
        <ol>
          <li><strong>Habilitação:</strong> Inscrição no Sistema Nacional de Adoção</li>
          <li><strong>Documentação:</strong> Apresentação de documentos pessoais</li>
          <li><strong>Curso de Preparação:</strong> Participação obrigatória</li>
          <li><strong>Avaliação Psicossocial:</strong> Análise da família</li>
          <li><strong>Busca e Encontro:</strong> Localização de criança compatível</li>
          <li><strong>Período de Convivência:</strong> Adaptação supervisionada</li>
          <li><strong>Sentença:</strong> Decisão judicial final</li>
        </ol>

        <h3>Documentos Necessários</h3>
        <ul>
          <li>RG e CPF</li>
          <li>Certidão de nascimento ou casamento</li>
          <li>Comprovante de renda</li>
          <li>Atestado médico</li>
          <li>Certidão de antecedentes criminais</li>
          <li>Comprovante de residência</li>
        </ul>

        <h3>Tempo do Processo</h3>
        <p>O processo pode levar de 1 a 4 anos, dependendo do perfil da criança desejada pelos adotantes.</p>

        <h3>Direitos da Criança Adotada</h3>
        <ul>
          <li>Igualdade com filhos biológicos</li>
          <li>Direito ao nome da família adotante</li>
          <li>Herança</li>
          <li>Pensão alimentícia</li>
        </ul>

        <p><strong>Importante:</strong> A adoção é um ato de amor que deve sempre priorizar o melhor interesse da criança.</p>
      `
    }
  };

  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-primary to-purple-secondary flex items-center justify-center">
        <Card className="bg-white/95 backdrop-blur-sm p-8 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post não encontrado</h1>
          <Link to="/blog">
            <Button className="bg-purple-primary hover:bg-purple-secondary text-white">
              Voltar ao Blog
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-primary to-purple-secondary">
      <div className="container mx-auto px-4 py-20">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/blog">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Blog
            </Button>
          </Link>
        </div>

        {/* Article */}
        <article className="max-w-4xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8 md:p-12">
              {/* Header */}
              <header className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime} de leitura
                  </div>
                </div>
              </header>

              {/* Featured Image Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-purple-light to-purple-primary rounded-lg mb-8 flex items-center justify-center">
                <span className="text-4xl font-bold text-white">
                  {String(post.id).padStart(2, '0')}
                </span>
              </div>

              {/* Content */}
              <div 
                className="prose prose-lg max-w-none text-foreground"
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  lineHeight: '1.7',
                }}
              />

              {/* Call to Action */}
              <div className="mt-12 pt-8 border-t border-border">
                <div className="bg-gradient-to-r from-purple-light/10 to-purple-primary/10 rounded-lg p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Precisa de ajuda jurídica?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Entre em contato para uma consulta personalizada
                  </p>
                  <Link to="/contato">
                    <Button className="bg-purple-primary hover:bg-purple-secondary text-white">
                      Agendar Consulta
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;