import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAuthCentralized } from "../hooks/userAuthCentralized";
import { useState } from "react";
import { toast } from "sonner";

export const ResetPasswordPage = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<{ email: string }>({
    defaultValues: {
      email: "",
    },
  });

  const [emailSave, setEmailSave] = useState("");
  const { mutationResetPasswordWithEmail } = useAuthCentralized();

  const rootLocation = window.location.origin;
  // console.log({ rootLocation });

  const onSubmit = async ({ email }: { email: string }) => {
    reset();

    await mutationResetPasswordWithEmail.mutateAsync(
      { email, frontBaseUrl: rootLocation },
      {
        onSuccess: () => {
          setEmailSave(email);
          toast.success("Revisa tu correo para continuar.");
        },
        onError: () => {
          toast.error(
            "No existe una cuenta asociada a este correo electrónico."
          );
        },
      }
    );
  };

  if (mutationResetPasswordWithEmail.data?.ok) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-primary">Correo Enviado</CardTitle>
          <CardDescription>
            Hemos enviado las instrucciones para restablecer tu contraseña a{" "}
            <strong>{emailSave}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            Revisa tu bandeja de entrada y sigue las instrucciones del correo.
          </p>
          <Link to="/">
            <Button variant="default" className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio de sesión
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Restablecer Contraseña
        </h1>
        <p className="text-muted-foreground">
          Ingresa tu correo electrónico y te enviaremos las instrucciones
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recuperar Acceso</CardTitle>
          <CardDescription>
            Te enviaremos un enlace para restablecer tu contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El email es obligatorio",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "El correo no es válido",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            <Button type="submit" className="w-full">
              Enviar Instrucciones
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to={"/auth"}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              Volver al inicio de sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
