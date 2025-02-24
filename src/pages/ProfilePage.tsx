
import { useParams } from "react-router-dom";

export function ProfilePage() {
  const { nickname } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Профиль</h1>
      <p className="mt-4 text-muted-foreground">
        Профиль пользователя: {nickname}
      </p>
    </div>
  );
}
