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
import {
  LogOut,
  Users,
  Settings,
  Mail,
  Phone,
  MapPin,
  Calendar,
} from "lucide-react";

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
  const [showUsers, setShowUsers] = useState(false);

  const handleLogout = () => {
    // Aquí conectarías con tu backend para cerrar sesión
    console.log("Logging out...");
    window.location.href = "/";
  };

  const handleShowUsers = () => {
    setShowUsers(true);
    // Redirigir a la página de usuarios
    window.location.href = "/users";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">
            Panel de Usuario
          </h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </Button>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna principal - Información del usuario */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mensaje de bienvenida */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-primary">
                  Bienvenido, {currentUser.name}
                </CardTitle>
                <CardDescription>
                  Es un placer tenerte de vuelta en tu panel personal
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Datos del usuario */}
            <Card>
              <CardHeader>
                <CardTitle>Mis Datos</CardTitle>
                <CardDescription>
                  Información de tu perfil personal
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
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
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">
                      {currentUser.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{currentUser.role}</Badge>
                      <Badge variant="outline" className="text-primary">
                        {currentUser.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{currentUser.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Teléfono</p>
                      <p className="font-medium">{currentUser.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Ubicación</p>
                      <p className="font-medium">{currentUser.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Miembro desde
                      </p>
                      <p className="font-medium">{currentUser.joinDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Columna lateral - Acciones */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Acciones Rápidas</CardTitle>
                <CardDescription>
                  Gestiona tu cuenta y explora usuarios
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleShowUsers} className="w-full" size="lg">
                  <Users className="w-5 h-5 mr-2" />
                  Ver Otros Usuarios
                </Button>

                <Button variant="outline" className="w-full bg-transparent">
                  <Settings className="w-5 h-5 mr-2" />
                  Editar Perfil
                </Button>
              </CardContent>
            </Card>

            {/* Estadísticas rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Estadísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Perfil completado
                  </span>
                  <span className="font-semibold text-primary">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Última conexión</span>
                  <span className="font-semibold">Hoy</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tipo de cuenta</span>
                  <Badge variant="secondary">{currentUser.role}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
