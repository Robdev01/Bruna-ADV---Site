// Contato.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { CheckCircle2, AlertTriangle, Mail, Phone, Video, LockKeyhole, ArrowUpRight } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:5003/api";

const Contato = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalKind, setModalKind] = useState<"success" | "error">("success");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openModal = (kind: "success" | "error", title: string, message: string) => {
    setModalKind(kind);
    setModalTitle(title);
    setModalMessage(message);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Falha ao enviar");

      // sucesso
      openModal(
        "success",
        "Mensagem enviada!",
        "Recebemos sua solicitação. Em breve entraremos em contato."
      );
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err: unknown) {
      openModal(
        "error",
        "Erro ao enviar",
        err instanceof Error ? err.message : "Ocorreu um erro inesperado. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="section-space">
      <div className="container">
        <div className="page-heading"><span className="eyebrow">Contato</span><h1>Vamos ouvir<br /><em>a sua história.</em></h1><p>O primeiro contato é o início de uma orientação cuidadosa. Fale com o escritório para saber mais sobre o atendimento.</p></div>
        <div className="contact-layout">
          <div className="contact-intro"><h2>Como podemos ajudar?</h2><p>Conte brevemente o que você precisa e suas principais dúvidas. Retornaremos com informações sobre a consulta e os horários disponíveis.</p><div className="contact-details"><a href="https://wa.me/5511982419086" target="_blank" rel="noopener noreferrer"><Phone size={17} /> (11) 98241-9086 <ArrowUpRight size={15} /></a><a href="mailto:brunacalheiraadv@gmail.com"><Mail size={17} /> brunacalheiraadv@gmail.com</a><span className="flex items-center gap-2"><Video size={17} /> Consultas on-line em todo o Brasil</span></div><p>Segunda a sexta, das 9h às 18h.</p><p className="flex items-center gap-2"><LockKeyhole size={16} /> Suas informações são tratadas com sigilo.</p></div>
          <Card className="contact-form-card">
            <CardContent className="p-8">
              <h2 className="text-3xl mb-7">Envie sua mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Seu Nome
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Como você se chama?"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="focus-visible:ring-primary/30"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-medium">
                    Seu Telefone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="(DDD) 99999-9999"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="focus-visible:ring-primary/30"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Seu E-mail
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="voce@exemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="focus-visible:ring-primary/30"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground font-medium">
                    Mensagem
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Descreva seu caso, suas principais dúvidas e o grau de urgência..."
                    className="focus-visible:ring-primary/30 resize-y"
                    required
                  />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-sm bg-primary hover:bg-purple-secondary text-white text-sm font-medium"
                    disabled={submitting}
                  >
                    {submitting ? "Enviando..." : "Enviar mensagem"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de feedback */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              {modalKind === "success" ? (
                <CheckCircle2 className="h-6 w-6 text-purple-600" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-purple-600" />
              )}
              <DialogTitle>{modalTitle}</DialogTitle>
            </div>
            <DialogDescription>{modalMessage}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setModalOpen(false)}
              className="bg-primary hover:bg-purple-secondary"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contato;
