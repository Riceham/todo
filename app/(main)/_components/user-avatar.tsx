import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserAvatarProps = {
  src: string;
  alt: string;
};

export const UserAvatar = ({ src, alt }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} alt={alt} height={40} width={40} />
      <AvatarFallback className="bg-foreground/10">{alt[0]}</AvatarFallback>
    </Avatar>
  );
};
