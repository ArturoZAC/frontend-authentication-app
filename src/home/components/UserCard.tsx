import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
// import { Calendar, Mail } from "lucide-react";

export const UserCard = ({
  user,
}: {
  user: {
    id: string;
    name: string;
    email: string;
    emailValidated: boolean;
    password: string;
    createdAt: Date;
  };
}) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardContent className="p-6">
      <div className="flex mx-auto items-center justify-center mb-4 gap-x-6">
        <Avatar className="w-12 h-12">
          <AvatarImage src={"/placeholder.svg"} alt={user.name} />
          <AvatarFallback>
            {user.name
              .toUpperCase()
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-lg">{user.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant={"default"}>Usuario Premium</Badge>
          </div>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span>{user.email}</span>
        </div>
        {/* <div className="flex items-center justify-center space-x-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>Miembro desde {user.joinDate}</span>
        </div> */}
      </div>
    </CardContent>
  </Card>
);
