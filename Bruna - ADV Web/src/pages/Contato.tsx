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
import { CheckCircle2, AlertTriangle } from "lucide-react";

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
    } catch (err: any) {
      openModal(
        "error",
        "Erro ao enviar",
        err?.message ?? "Ocorreu um erro inesperado. Tente novamente."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-light to-secondary">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Contato</h1>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
            <CardContent className="p-8">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Como Agendar</h2>

                <div className="space-y-4 text-foreground">
                  <p className="text-lg">Atendemos todo o Brasil através de consultorias on-line.</p>

                  <p className="text-base leading-relaxed">
                    Preencha abaixo um breve relato do seu caso, suas principais dúvidas e o seu grau de urgência
                    para resolução. Retornaremos com a próxima data e horário de agendamento disponíveis.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">
                    Seu Nome
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white border-2 border-purple-primary/30 focus:border-purple-primary rounded-none border-b-4 border-t-0 border-l-0 border-r-0 border-b-purple-primary"
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
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-white border-2 border-purple-primary/30 focus:border-purple-primary rounded-none border-b-4 border-t-0 border-l-0 border-r-0 border-b-purple-primary"
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
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white border-2 border-purple-primary/30 focus:border-purple-primary rounded-none border-b-4 border-t-0 border-l-0 border-r-0 border-b-purple-primary"
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
                    className="bg-white border-2 border-purple-primary/30 focus:border-purple-primary resize-none"
                    required
                  />
                </div>

                <div className="text-center pt-6">
                  <Button
                    type="submit"
                    className="bg-purple-primary hover:bg-purple-secondary text-white px-12 py-3 text-lg font-semibold rounded-full"
                    disabled={submitting}
                  >
                    {submitting ? "Enviando..." : "ENVIAR"}
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
              className={modalKind === "success" ? "bg-green-600 hover:bg-purple-700" : "bg-purple-600 hover:bg-purple-700"}
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
