import { useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Grid3X3,
  List,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";

// Datos simulados de usuarios - en tu app real vendrían del backend
const allUsers = [
  {
    id: 1,
    name: "María González",
    email: "maria.gonzalez@email.com",
    location: "Madrid, España",
    joinDate: "Enero 2024",
    avatar: "/placeholder.svg?key=kv1z1",
    role: "Usuario Premium",
    status: "Activo",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    location: "Barcelona, España",
    joinDate: "Febrero 2024",
    avatar: "/placeholder.svg?key=kv1z2",
    role: "Usuario Básico",
    status: "Activo",
  },
  {
    id: 3,
    name: "Ana Martínez",
    email: "ana.martinez@email.com",
    location: "Valencia, España",
    joinDate: "Marzo 2024",
    avatar: "/placeholder.svg?key=kv1z3",
    role: "Usuario Premium",
    status: "Inactivo",
  },
  {
    id: 4,
    name: "Luis Fernández",
    email: "luis.fernandez@email.com",
    location: "Sevilla, España",
    joinDate: "Abril 2024",
    avatar: "/placeholder.svg?key=kv1z4",
    role: "Usuario Básico",
    status: "Activo",
  },
  {
    id: 5,
    name: "Carmen López",
    email: "carmen.lopez@email.com",
    location: "Bilbao, España",
    joinDate: "Mayo 2024",
    avatar: "/placeholder.svg?key=kv1z5",
    role: "Usuario Premium",
    status: "Activo",
  },
  {
    id: 6,
    name: "David Sánchez",
    email: "david.sanchez@email.com",
    location: "Zaragoza, España",
    joinDate: "Junio 2024",
    avatar: "/placeholder.svg?key=kv1z6",
    role: "Usuario Básico",
    status: "Activo",
  },
];

export const DashboardPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const UserCard = ({ user }: { user: (typeof allUsers)[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src={user.avatar || "/placeholder.svg"}
              alt={user.name}
            />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant={
                  user.role === "Usuario Premium" ? "default" : "secondary"
                }
              >
                {user.role}
              </Badge>
              <Badge
                variant="outline"
                className={
                  user.status === "Activo"
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              >
                {user.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Miembro desde {user.joinDate}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const UserListItem = ({ user }: { user: (typeof allUsers)[0] }) => (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={user.avatar || "/placeholder.svg"}
                alt={user.name}
              />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right text-sm">
              <p className="text-muted-foreground">{user.location}</p>
              <p className="text-muted-foreground">{user.joinDate}</p>
            </div>
            <div className="flex flex-col gap-1">
              <Badge
                variant={
                  user.role === "Usuario Premium" ? "default" : "secondary"
                }
                className="text-xs"
              >
                {user.role}
              </Badge>
              <Badge
                variant="outline"
                className={`text-xs ${
                  user.status === "Activo"
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {user.status}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">
                Usuarios Registrados
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Barra de búsqueda */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar usuarios por nombre, email o ubicación..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {allUsers.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Usuarios
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {allUsers.filter((u) => u.status === "Activo").length}
              </div>
              <div className="text-sm text-muted-foreground">
                Usuarios Activos
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {allUsers.filter((u) => u.role === "Usuario Premium").length}
              </div>
              <div className="text-sm text-muted-foreground">
                Usuarios Premium
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">
                {filteredUsers.length}
              </div>
              <div className="text-sm text-muted-foreground">Resultados</div>
            </CardContent>
          </Card>
        </div>

        {/* Lista/Grid de usuarios */}
        {filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">
                No se encontraron usuarios que coincidan con tu búsqueda.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            {filteredUsers.map((user) =>
              viewMode === "grid" ? (
                <UserCard key={user.id} user={user} />
              ) : (
                <UserListItem key={user.id} user={user} />
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};
