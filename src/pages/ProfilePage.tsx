import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Linkedin } from "lucide-react";

interface UserProfile {
  nickname: string;
  avatar: string;
  description: string;
  telegram: string;
  linkedin: string;
  registrationDate: string;
  sheets: number;
  templates: number;
  activity: number;
  activityLog: {
    date: string;
    actions: number;
  }[];
}

const INITIAL_PROFILE: UserProfile = {
  nickname: "Администратор",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  description: "Руководитель проектов с 5-летним опытом в IT. Специализируюсь на agile-методологиях и оптимизации рабочих процессов команды.",
  telegram: "@project_lead",
  linkedin: "linkedin.com/in/project-lead",
  registrationDate: "2024-01-01",
  sheets: 24,
  templates: 0,
  activity: 100,
  activityLog: []
};

export function ProfilePage() {
  const { nickname } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);

  useEffect(() => {
    // Load profile from localStorage or use initial
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile(INITIAL_PROFILE);
    }
  }, []);

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fadeIn">
      <div className="space-y-8">
        {/* Профиль */}
        <div className="flex items-start space-x-8">
          <img
            src={profile.avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full"
          />
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-bold">{profile.nickname}</h1>
            
            {isEditing ? (
              <div className="space-y-4">
                <Textarea
                  value={profile.description}
                  onChange={(e) => setProfile({...profile, description: e.target.value})}
                  placeholder="Описание профиля"
                  className="min-h-[100px]"
                />
                <div className="space-x-4">
                  <Button onClick={handleSave}>Сохранить</Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setProfile(INITIAL_PROFILE);
                    }}
                  >
                    Отменить
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                onClick={() => setIsEditing(true)}
              >
                {profile.description}
              </div>
            )}
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-accent hover:shadow-lg transition-all">
            <div className="text-2xl font-bold">{profile.sheets}</div>
            <div className="text-sm text-muted-foreground">Созданные листы</div>
          </div>
          <div className="p-6 rounded-lg bg-accent hover:shadow-lg transition-all">
            <div className="text-2xl font-bold">{profile.templates}</div>
            <div className="text-sm text-muted-foreground">Шаблоны</div>
          </div>
          <div className="p-6 rounded-lg bg-accent hover:shadow-lg transition-all">
            <div className="text-2xl font-bold">{profile.activity}%</div>
            <div className="text-sm text-muted-foreground">Активность</div>
          </div>
        </div>

        {/* Контакты */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Контакты</h2>
          <div className="flex space-x-4">
            <Button variant="outline" className="space-x-2 transition-colors" asChild>
              <a href={`https://t.me/${profile.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                <span>Telegram</span>
              </a>
            </Button>
            <Button variant="outline" className="space-x-2 transition-colors" asChild>
              <a href={`https://${profile.linkedin}`} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span>LinkedIn</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
