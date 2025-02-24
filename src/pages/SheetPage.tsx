
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  FileText,
  Image as ImageIcon,
  Link,
  CheckSquare,
} from "lucide-react";

interface SheetContent {
  title: string;
  content: string;
  lastModified: string;
}

export function SheetPage() {
  const { id } = useParams();
  const [sheet, setSheet] = useState<SheetContent>({
    title: "Новый лист",
    content: "",
    lastModified: new Date().toISOString(),
  });

  // Загрузка данных из localStorage
  useEffect(() => {
    const savedSheet = localStorage.getItem(`sheet-${id}`);
    if (savedSheet) {
      setSheet(JSON.parse(savedSheet));
    }
  }, [id]);

  // Автосохранение
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      localStorage.setItem(`sheet-${id}`, JSON.stringify({
        ...sheet,
        lastModified: new Date().toISOString(),
      }));
    }, 1000);

    return () => clearTimeout(saveTimeout);
  }, [sheet, id]);

  const handleKeyCommand = (e: React.KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          document.execCommand('bold', false);
          break;
        case 'i':
          e.preventDefault();
          document.execCommand('italic', false);
          break;
      }
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Панель инструментов */}
      <div className="mb-4 flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={() => document.execCommand('bold', false)}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => document.execCommand('italic', false)}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => document.execCommand('insertUnorderedList', false)}>
          <List className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => document.execCommand('insertHTML', false, '<input type="checkbox" /> ')}>
          <CheckSquare className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <ImageIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Link className="h-4 w-4" />
        </Button>
      </div>

      {/* Заголовок */}
      <div
        className="text-3xl font-bold outline-none mb-4"
        contentEditable
        onBlur={(e) => setSheet({ ...sheet, title: e.currentTarget.textContent || "Новый лист" })}
        dangerouslySetInnerHTML={{ __html: sheet.title }}
      />

      {/* Редактор */}
      <div
        className="prose prose-sm max-w-none"
        contentEditable
        onKeyDown={handleKeyCommand}
        onBlur={(e) => setSheet({ ...sheet, content: e.currentTarget.innerHTML })}
        dangerouslySetInnerHTML={{ __html: sheet.content }}
      />
    </div>
  );
}
