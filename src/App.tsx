
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { AppLayout } from "@/components/layouts/AppLayout";
import { LoginPage } from "@/pages/LoginPage";
import { MainPage } from "@/pages/MainPage";
import { TemplatePage } from "@/pages/TemplatePage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SheetPage } from "@/pages/SheetPage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/main" element={<MainPage />} />
                  <Route path="/templates" element={<TemplatePage />} />
                  <Route path="/user/:nickname" element={<ProfilePage />} />
                  <Route path="/user/sheet/:url" element={<SheetPage />} />
                  <Route path="/" element={<Navigate to="/main" replace />} />
                </Routes>
              </AppLayout>
            }
          />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
