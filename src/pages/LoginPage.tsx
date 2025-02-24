
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export function LoginPage() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login
    setTimeout(() => {
      if (isLogin) {
        navigate("/main");
        toast({
          title: "Успешный вход",
          description: "Добро пожаловать в Генераль",
        });
      } else {
        toast({
          title: "Регистрация временно недоступна",
          description: "Пожалуйста, используйте демо-аккаунт",
          variant: "destructive",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Генераль</h1>
          <p className="mt-2 text-muted-foreground">
            Все главное для бизнеса
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Логин"
              disabled={loading}
            />
            <Input
              type="password"
              placeholder="Пароль"
              disabled={loading}
            />
          </div>
          
          <Button className="w-full" type="submit" disabled={loading}>
            {isLogin ? "Войти" : "Зарегистрироваться"}
          </Button>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin
                ? "Создать аккаунт"
                : "Уже есть аккаунт? Войти"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
