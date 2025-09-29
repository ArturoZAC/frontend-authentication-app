import { useState } from "react";
import { Link } from "react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Grid3X3, List } from "lucide-react";
import { UserCard } from "../components/UserCard";
import { UserListItem } from "../components/UserListItem";
import { Badge } from "@/components/ui/badge";
import { useUsers } from "../hooks/useUsers";
import { CustomLoader } from "@/components/ui/CustomLoader";

export const DashboardPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { users } = useUsers();

  if (users.isLoading) {
    return <CustomLoader />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto p-6 max-w-[80rem] max-sm:px-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x- w-full justify-between">
              <Link to="/" className="mx-0">
                <Button variant="default" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                  Volver al Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground max-sm:text-end max-sm:text-xl">
                Usuarios Registrados
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[80rem] mx-auto px-4 py-8">
        <div className="flex justify-between items-stretch mb-8">
          <Badge className="max-h-full text-base">
            Total: {users.data?.length}
          </Badge>
          <div className="grid grid-cols-2 gap-x-4 max-md:hidden">
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
        {users.data?.length === 0 ? (
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
            {users.data?.map((user) => (
              <div className="md:hidden" key={user.id}>
                <UserCard user={user} />
              </div>
            ))}
            {users.data?.map((user) => (
              <div className="hidden md:block" key={user.id}>
                {viewMode === "grid" ? (
                  <UserCard user={user} />
                ) : (
                  <UserListItem user={user} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
