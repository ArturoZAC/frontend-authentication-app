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
import { useNavigate, useParams } from "react-router";
import { useAuthCentralized } from "../hooks/userAuthCentralized";
import { toast } from "sonner";
import { useEffect } from "react";

interface dataProperties {
  firstPassword: string;
  secondPassword: string;
}

export const ResetPasswordWithCode = () => {
  const { codePassword } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<dataProperties>({
    defaultValues: {
      firstPassword: "",
      secondPassword: "",
    },
  });

  const { mutationResetPasswordWithCode } = useAuthCentralized();
  const navigate = useNavigate();

  const onSubmit = async ({
    firstPassword,
    secondPassword,
  }: dataProperties) => {
    if (firstPassword !== secondPassword) {
      toast.error("Las contraseñas no coinciden.");
      return;
    }

    if (!codePassword) return;

    reset();

    await mutationResetPasswordWithCode.mutateAsync(
      {
        newPassword: firstPassword,
        code: codePassword!,
      },
      {
        onSuccess: () => {
          toast.success("Contraseña Actualizada.");
        },
        onError: (error) => {
          const errorFormat = (error as unknown as string).toLowerCase();
          if (errorFormat.includes("code")) {
            toast.error("Codigo no encontrado o expirado.");
          }
        },
      }
    );
  };

  useEffect(() => {
    if (!mutationResetPasswordWithCode.isSuccess) return;

    const timer = setTimeout(() => {
      navigate("/auth/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [mutationResetPasswordWithCode.isSuccess, navigate]);

  return (
    <>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Ingrese su nueva contraseña
        </h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recuperar Acceso</CardTitle>
          <CardDescription>
            Como último paso, por favor ingresa tu nueva contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <form className="space-y-6"> */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="firstPassword">Nueva contraseña</Label>
              <Input
                id="firstPassword"
                type="password"
                placeholder="••••••••"
                {...register("firstPassword", {
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
              {errors.firstPassword && (
                <span className="text-red-500 text-sm">
                  {errors.firstPassword.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="secondPassword">
                Confirme la nueva contraseña
              </Label>
              <Input
                id="secondPassword"
                type="password"
                placeholder="••••••••"
                {...register("secondPassword", {
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
              {errors.secondPassword && (
                <span className="text-red-500 text-sm">
                  {errors.secondPassword.message}
                </span>
              )}
            </div>

            <Button
              type="submit"
              className="w-full mt-2"
              disabled={mutationResetPasswordWithCode.isPending}
            >
              {mutationResetPasswordWithCode.isPending ? (
                <span className="flex justify-center items-center">
                  <span className="inline-block w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                  Procesando...
                </span>
              ) : (
                <>Actualizar Contraseña</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
