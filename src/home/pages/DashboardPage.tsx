import { useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Grid3X3, List } from "lucide-react";
import { UserCard } from "../components/UserCard";
import { UserListItem } from "../components/UserListItem";
import { Badge } from "@/components/ui/badge";

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto p-6 max-w-[80rem]">
          <div className="flex items-center justify-between">
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
          </div>
        </div>
      </header>

      <div className="max-w-[80rem] mx-auto px-4 py-8">
        <div className="flex justify-between items-stretch mb-8">
          <Badge className="max-h-full text-base">Total: 30</Badge>
          <div>
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
        {/* Estadísticas */}

        {/* Lista/Grid de usuarios */}
        {allUsers.length === 0 ? (
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
            {allUsers.map((user) =>
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
