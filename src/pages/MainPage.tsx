import { BarChart2, FileText, ShoppingBag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import documentsData from "../data/documents.json";

export function MainPage() {
  const navigate = useNavigate();
  const [activityData, setActivityData] = useState<any[]>([]);
  
  useEffect(() => {
    // Generate activity data for the last 30 days
    const data = [];
    const now = new Date();
    const allDates = documentsData.documents.flatMap(doc => doc.editHistory);
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const actionsCount = allDates.filter(d => d.startsWith(dateStr)).length;
      data.push({
        date: dateStr,
        actions: actionsCount
      });
    }
    setActivityData(data);
  }, []);

  return (
    <div className="p-8 space-y-8 animate-fadeIn">
      <h1 className="text-3xl font-bold">Главная доска</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Активность */}
        <Card className="col-span-full hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart2 className="h-5 w-5" />
              <span>Активность пользователя</span>
            </CardTitle>
            <CardDescription>
              Статистика использования за последний месяц
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
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
          </CardContent>
        </Card>

        {/* Частые листы */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Частые листы</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documentsData.documents.map((doc) => (
                <a
                  key={doc.id}
                  href={`/user/sheet/${doc.id}`}
                  className="block p-3 rounded-lg hover:bg-accent transition-colors animate-fadeIn"
                >
                  <div className="font-medium">{doc.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Последнее изменение: {new Date(doc.lastModified).toLocaleDateString()}
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Рекомендуемые шаблоны */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Рекомендуемые шаблоны</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularTemplates.map((template) => (
                <a
                  key={template.id}
                  href={`/templates#template-${template.id}`}
                  className="block p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="font-medium">{template.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {template.description}
                  </div>
                  <div className="text-sm font-medium text-primary mt-2">
                    {template.price} ₽
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
