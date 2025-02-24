
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const templates = [
  {
    id: 1,
    title: "Управление проектами",
    description: "Шаблон для эффективного управления проектами",
    price: 450,
    image: "https://picsum.photos/400/300?random=1",
  },
  {
    id: 2,
    title: "CRM система",
    description: "Простая CRM система для малого бизнеса",
    price: 450,
    image: "https://picsum.photos/400/300?random=2",
  },
];

export function TemplatePage() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Магазин шаблонов</h1>
        <Button variant="secondary" disabled>
          Добавить шаблон
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="overflow-hidden">
            <img
              src={template.image}
              alt={template.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{template.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {template.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-medium">{template.price} ₽</span>
                <Button variant="secondary" disabled>Купить</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
