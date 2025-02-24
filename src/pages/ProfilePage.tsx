
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Linkedin } from "lucide-react";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

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
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  useEffect(() => {
    // Load profile from localStorage or use initial
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    } else {
      setProfile(INITIAL_PROFILE);
    }
  }, []);

  // Generate activity data based on timeRange
  const getActivityData = () => {
    const now = new Date();
    const data = [];
    const daysToShow = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 365;

    for (let i = daysToShow - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Find matching log entry or use 0
      const logEntry = profile.activityLog.find(log => log.date === dateStr);
      data.push({
        date: dateStr,
        actions: logEntry?.actions || 0
      });
    }
    return data;
  };

  const handleSave = () => {
    setIsEditing(false);
    localStorage.setItem('userProfile', JSON.stringify(profile));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
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
                className="text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => setIsEditing(true)}
              >
                {profile.description}
              </div>
            )}
          </div>
        </div>

        {/* График активности */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Активность</h2>
            <div className="space-x-2">
              <Button 
                variant={timeRange === 'week' ? 'default' : 'outline'}
                onClick={() => setTimeRange('week')}
              >
                Неделя
              </Button>
              <Button 
                variant={timeRange === 'month' ? 'default' : 'outline'}
                onClick={() => setTimeRange('month')}
              >
                Месяц
              </Button>
              <Button 
                variant={timeRange === 'year' ? 'default' : 'outline'}
                onClick={() => setTimeRange('year')}
              >
                Год
              </Button>
            </div>
          </div>
          <div className="h-[300px] bg-background rounded-lg p-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={getActivityData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="actions" 
                  stroke="#8b5cf6" 
                  fill="#8b5cf6" 
                  fillOpacity={0.3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-accent">
            <div className="text-2xl font-bold">{profile.sheets}</div>
            <div className="text-sm text-muted-foreground">Созданные листы</div>
          </div>
          <div className="p-6 rounded-lg bg-accent">
            <div className="text-2xl font-bold">{profile.templates}</div>
            <div className="text-sm text-muted-foreground">Шаблоны</div>
          </div>
          <div className="p-6 rounded-lg bg-accent">
            <div className="text-2xl font-bold">{profile.activity}%</div>
            <div className="text-sm text-muted-foreground">Активность</div>
          </div>
        </div>

        {/* Контакты */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Контакты</h2>
          <div className="flex space-x-4">
            <Button variant="outline" className="space-x-2" asChild>
              <a href={`https://t.me/${profile.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                <span>Telegram</span>
              </a>
            </Button>
            <Button variant="outline" className="space-x-2" asChild>
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
