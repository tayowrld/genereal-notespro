
import { BarChart2, FileText, ShoppingBag } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function MainPage() {
  const frequentSheets = [
    { id: 1, title: "Важная заметка", date: "2024-02-20" },
    { id: 2, title: "Календарь", date: "2024-02-19" },
    { id: 3, title: "Задачи", date: "2024-02-18" },
  ];

  const popularTemplates = [
    {
      id: 1,
      title: "Управление проектами",
      description: "Шаблон для эффективного управления проектами",
      price: 450,
    },
    {
      id: 2,
      title: "CRM система",
      description: "Простая CRM система для малого бизнеса",
      price: 450,
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">Главная доска</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Активность */}
        <Card className="col-span-full">
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
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              График активности (имитация)
            </div>
          </CardContent>
        </Card>

        {/* Частые листы */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>Частые листы</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {frequentSheets.map((sheet) => (
                <a
                  key={sheet.id}
                  href={`/sheet/${sheet.id}`}
                  className="block p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="font-medium">{sheet.title}</div>
                  <div className="text-sm text-muted-foreground">
                    Последнее изменение: {sheet.date}
                  </div>
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Рекомендуемые шаблоны */}
        <Card>
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
