import { Link, useNavigate } from "react-router";
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
import { useForm } from "react-hook-form";
import type { userData } from "../interfaces/user.response";
import { toast } from "sonner";
import { useAuthStore } from "../store/auth.store";
import { useState } from "react";
// import { Checkbox } from "@/components/ui/checkbox";

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<userData, "name" | "secondPassword">>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async ({
    email,
    password,
  }: Omit<userData, "name" | "secondPassword">) => {
    reset();

    setIsLoading(true);
    const response = await login(email, password);
    setIsLoading(false);

    if (typeof response === "string") {
      const errorType = response.toString().toLowerCase();

      if (errorType.includes("password")) {
        return toast.error("Correo o contraseña incorrectas.");
      }

      if (errorType.includes("user")) {
        return toast.error("No se encontró ninguna cuenta con esos datos.");
      }

      return toast.error("Cuenta no verificada.");
    }

    return navigate("/");
  };

  return (
    <>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Bienvenido</h1>
        <p className="text-muted-foreground">Inicia sesión en tu cuenta</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>
            Ingresa tus credenciales para acceder
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

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password", {
                  required: {
                    value: true,
                    message: "La contraseña es obligatoria",
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

            {/* <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm">
                Recordarme
              </Label>
            </div> */}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex justify-center items-center">
                  <span className="inline-block w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                  Procesando...
                </span>
              ) : (
                <>Iniciar Sesión</>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center space-y-2">
            <Link
              to="/auth/reset-password"
              className="text-sm font-semibold text-primary hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
            <div className="text-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <Link
                to={"/auth/register"}
                className="text-primary hover:underline font-semibold"
              >
                Regístrate aquí
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
