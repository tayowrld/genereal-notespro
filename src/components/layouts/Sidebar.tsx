import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, Plus, FileText, Home, User, ShoppingBag, Sun, Moon, BarChart2 } from "lucide-react";
import { useState, useEffect } from "react";

// Имитация данных пользователя
const DEMO_USER = {
  login: "admin",
  password: "1",
  nickname: "Администратор",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
  description: "Главный администратор системы",
  telegram: "@admin",
  linkedin: "linkedin.com/admin"
};
export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [pinnedSheets] = useState([{
    id: 1,
    title: "Важная заметка",
    icon: FileText
  }, {
    id: 2,
    title: "Календарь",
    icon: FileText
  }, {
    id: 3,
    title: "Задачи",
    icon: FileText
  }]);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);
  return <div className="w-64 border-r bg-background flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <NavLink to="/main" className="font-semibold hover:text-primary">
          Генераль
        </NavLink>
        
      </div>
      
      {isExpanded && <ScrollArea className="flex-1">
          <div className="p-4 space-y-6">
            {/* Профиль пользователя */}
            <div className="flex items-center space-x-3 px-2">
              <NavLink to={`/user/${DEMO_USER.nickname}`} className="flex items-center space-x-3 hover:text-primary">
                <img src={DEMO_USER.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
                <span className="text-sm font-medium">{DEMO_USER.nickname}</span>
              </NavLink>
            </div>

            {/* Основная навигация */}
            <div className="space-y-1">
              <NavLink to="/main" className={({
            isActive
          }) => `flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-accent ${isActive ? "bg-accent" : ""}`}>
                <Home className="w-4 h-4" />
                <span className="text-sm">Главная доска</span>
              </NavLink>
              <NavLink to="/templates" className={({
            isActive
          }) => `flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-accent ${isActive ? "bg-accent" : ""}`}>
                <ShoppingBag className="w-4 h-4" />
                <span className="text-sm">Магазин шаблонов</span>
              </NavLink>
              <NavLink to="/analytics" className={({
            isActive
          }) => `flex items-center space-x-3 px-2 py-2 rounded-lg hover:bg-accent ${isActive ? "bg-accent" : ""}`}>
                <BarChart2 className="w-4 h-4" />
                <span className="text-sm">Аналитика</span>
              </NavLink>
            </div>

            {/* Закрепленные листы */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-2">
                <span className="text-sm font-medium">Поток</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                {pinnedSheets.map(sheet => <Button key={sheet.id} variant="ghost" className="w-full justify-start" asChild>
                    <NavLink to={`/sheet/${sheet.id}`}>
                      <sheet.icon className="mr-2 h-4 w-4" />
                      {sheet.title}
                    </NavLink>
                  </Button>)}
              </div>
            </div>
          </div>
        </ScrollArea>}

      {/* Нижняя панель */}
      <div className="p-4 border-t">
        <Button variant="ghost" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="w-full flex items-center justify-center">
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>
    </div>;
}