import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CircleCheck, CircleX } from "lucide-react";
import { Link, useParams } from "react-router";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

export const VerifyEmail = () => {
  const { codeVerification } = useParams();

  const { verifyData, isLoading } = useVerifyEmail(codeVerification!);

  if (isLoading) {
    return (
      <Card className="gap-4 animate-pulse">
        <CardHeader className="text-center gap-y-6">
          <div className="h-8 w-48 mx-auto">
            <Skeleton className="h-8 w-48 mx-auto rounded mb-4 bg-gray-300 dark:bg-gray-700" />
          </div>
          <div className="mx-auto" style={{ width: "5rem", height: "5rem" }}>
            <Skeleton className="rounded-full w-full h-full mx-auto bg-gray-300 dark:bg-gray-700" />
          </div>
          <div className="h-12 w-74 mx-auto">
            <Skeleton className="h-12 w-74 mx-auto rounded bg-gray-300 dark:bg-gray-700" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="inline-flex items-center">
              <Skeleton className="h-8 w-50 rounded bg-gray-300 dark:bg-gray-700" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (verifyData?.ok) {
    return (
      <>
        <Card className="gap-4">
          <CardHeader className="text-center gap-y-6">
            <CardTitle className="text-3xl text-green-600">
              Correo Verificado
            </CardTitle>
            <CircleCheck className="mx-auto size-[5rem] text-green-600" />
            <CardDescription className="text-base">
              Correo verificado. Por favor, inicia sesión con tu usuario ya
              confirmado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Link
                to={"/auth"}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                <Button variant={"default"} className="bg-green-600">
                  <ArrowLeft className="w-4 h-4 inline mr-1" />
                  Volver al inicio de sesión
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </>
    );
  }

  return (
    <>
      <Card className="gap-4">
        <CardHeader className="text-center gap-y-6">
          <CardTitle className="text-3xl text-red-600">
            Error de Verificación
          </CardTitle>
          <CircleX className="mx-auto size-[5rem] text-red-600" />
          <CardDescription className="text-base">
            Error al verificar el correo. El enlace no es válido o ya fue usado.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <Link
              to={"/auth"}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              <Button variant={"default"} className="bg-red-600">
                <ArrowLeft className="w-4 h-4 inline mr-1" />
                Volver al inicio de sesión
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
