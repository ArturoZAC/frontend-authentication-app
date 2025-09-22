import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { useAuthCentralized } from "../hooks/userAuthCentralized";
import type { userData } from "../interfaces/user.response";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      secondPassword: "",
    },
  });

  const rootLocation = window.location.origin;
  const { mutation: mutationRegister } = useAuthCentralized();

  const onSubmit = async (data: userData) => {
    if (data.password !== data.secondPassword) return;

    // await registerAction(data.name, data.email, data.password, rootLocation);
    reset();
    await mutationRegister.mutateAsync(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        rootLocation: rootLocation,
      },
      {
        onSuccess: () => {
          toast.success(
            "Te has registrado correctamente. Revisa tu correo para continuar con la verificación."
          );
        },
        onError: () => {
          toast.error("Correo ya registrado.");
        },
      }
    );
  };

  return (
    <>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Crear Cuenta</h1>
        <p className="text-muted-foreground">Regístrate para comenzar</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registro</CardTitle>
          <CardDescription>
            Completa los datos para crear tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre completo"
                {...register("name", {
                  required: {
                    value: true,
                    message: "El nombre es obligatorio",
                  },
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres",
                  },
                })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "El correo es obligatorio",
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

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es obligatorio",
                  },
                  minLength: {
                    value: 5,
                    message: "La contraseña debe tener al menos 5 caracteres",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("secondPassword", {
                  required: {
                    value: true,
                    message: "La contraseña es obligatorio",
                  },
                  minLength: {
                    value: 5,
                    message: "La contraseña debe tener al menos 5 caracteres",
                  },
                })}
              />
              {errors.secondPassword && (
                <span className="text-red-500 text-sm">
                  {errors.secondPassword.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={mutationRegister.isPending}
            >
              {mutationRegister.isPending ? (
                <span className="flex justify-center items-center">
                  <span className="inline-block w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                  Procesando...
                </span>
              ) : (
                <>Crear Cuenta</>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <div className="text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/auth"
                className="text-primary hover:underline font-semibold"
              >
                Inicia sesión aquí
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
