
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Linkedin } from "lucide-react";

// Имитация данных пользователя
const DEMO_USER = {
  login: "admin",
  password: "1",
  nickname: "Администратор",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  description: "Главный администратор системы",
  telegram: "@admin",
  linkedin: "linkedin.com/admin",
};

export function ProfilePage() {
  const { nickname } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(DEMO_USER.description);

  const handleSave = () => {
    setIsEditing(false);
    // В реальном приложении здесь был бы запрос к API
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="space-y-8">
        {/* Профиль */}
        <div className="flex items-start space-x-8">
          <img
            src={DEMO_USER.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{DEMO_USER.nickname}</h1>
            
            {isEditing ? (
              <div className="space-y-4">
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Описание профиля"
                  className="min-h-[100px]"
                />
                <div className="space-x-4">
                  <Button onClick={handleSave}>Сохранить</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setDescription(DEMO_USER.description);
                    }}
                  >
                    Отменить
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => setIsEditing(true)}
              >
                {description}
              </div>
            )}
          </div>
        </div>

        {/* Контакты */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Контакты</h2>
          <div className="flex space-x-4">
            <Button variant="outline" className="space-x-2">
              <MessageCircle className="h-4 w-4" />
              <span>Telegram</span>
            </Button>
            <Button variant="outline" className="space-x-2">
              <Linkedin className="h-4 w-4" />
              <span>LinkedIn</span>
            </Button>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-accent">
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm text-muted-foreground">Созданные листы</div>
          </div>
          <div className="p-6 rounded-lg bg-accent">
            <div className="text-2xl font-bold">12</div>
            <div className="text-sm text-muted-foreground">Шаблоны</div>
          </div>
          <div className="p-6 rounded-lg bg-accent">
            <div className="text-2xl font-bold">89%</div>
            <div className="text-sm text-muted-foreground">Активность</div>
          </div>
        </div>
      </div>
    </div>
  );
}
