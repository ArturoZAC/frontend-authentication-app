import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { LogOut, Users, Mail } from "lucide-react";
import { Link } from "react-router";
import { useAuthStore } from "@/auth/store/auth.store";

// Datos simulados del usuario - en tu app real vendrían del backend
const currentUser = {
  id: 1,
  name: "María González",
  email: "maria.gonzalez@email.com",
  phone: "+34 612 345 678",
  location: "Madrid, España",
  joinDate: "Enero 2024",
  avatar: "/professional-woman-avatar.png",
  role: "Usuario Premium",
  status: "Activo",
};

export const HomePage = () => {
  const [, setShowUsers] = useState(false);
  const { logout } = useAuthStore();

  const handleShowUsers = () => {
    setShowUsers(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto p-6 flex items-center justify-between max-w-[80rem]">
          <h1 className="text-2xl font-bold text-foreground">
            Informacion Personal
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/auth/login"}>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  logout();
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[80rem] px-4 py-8">
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-8"> */}
        <div className="grid grid-cols-3 gap-x-4">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl text-primary">
                Bienvenido, {currentUser.name}
              </CardTitle>
              <CardDescription>
                Información de tu perfil personal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-10">
                <div className="flex flex-row justify-center items-center gap-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage
                      src={currentUser.avatar || "/placeholder.svg"}
                      alt={currentUser.name}
                    />
                    <AvatarFallback className="text-lg">
                      {currentUser.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">
                      {currentUser.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-primary">
                        {currentUser.role}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{currentUser.email}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Acciones Rápidas</CardTitle>
              <CardDescription>
                Gestiona tu cuenta y explora usuarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to={"/dashboard"}>
                <Button onClick={handleShowUsers} className="w-full" size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  Ver Otros Usuarios
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
