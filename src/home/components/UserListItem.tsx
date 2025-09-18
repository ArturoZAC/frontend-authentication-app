import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const UserListItem = ({
  user,
}: {
  user: {
    id: number;
    name: string;
    email: string;
    location: string;
    joinDate: string;
    avatar: string;
    role: string;
    status: string;
  };
}) => (
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
          <div className="flex flex-col gap-1">
            <Badge variant={"default"} className="text-xs">
              Usuario Premium
            </Badge>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
