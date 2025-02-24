
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Bold,
  Italic,
  List,
  FileText,
  Image as ImageIcon,
  Link,
  CheckSquare,
  Trash2,
} from "lucide-react";
import { getAllSheets, saveSheet, deleteSheet, SheetMetadata } from "@/utils/sheetUtils";

interface SheetContent {
  title: string;
  content: string;
  lastModified: string;
  created: string;
}

export function SheetPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id } = useParams();
  const [sheet, setSheet] = useState<SheetContent>({
    title: "Новый лист",
    content: "",
    lastModified: new Date().toISOString(),
    created: new Date().toISOString(),
  });

  useEffect(() => {
    const savedSheet = localStorage.getItem(`sheet-${id}`);
    if (savedSheet) {
      setSheet(JSON.parse(savedSheet));
    }
  }, [id]);

  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (id) {
        saveSheet({
          id,
          url: id,
          title: sheet.title,
          content: sheet.content,
          lastModified: sheet.lastModified,
          created: sheet.created,
          editHistory: [sheet.lastModified]
        });
      }
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

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const items = Array.from(e.dataTransfer.items);
    items.forEach(item => {
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target?.result) {
              if (file.type.startsWith('image/')) {
                const img = `<img src="${event.target.result}" alt="${file.name}" style="max-width: 100%; height: auto;" />`;
                document.execCommand('insertHTML', false, img);
              } else if (file.type === 'application/pdf') {
                const link = `<a href="${event.target.result}" target="_blank">${file.name}</a>`;
                document.execCommand('insertHTML', false, link);
              }
            }
          };
          reader.readAsDataURL(file);
        }
      }
    });

    toast({
      title: "Файл добавлен",
      description: "Файл успешно добавлен в документ",
    });
  }, [toast]);

  const handleDelete = () => {
    if (id && window.confirm('Вы уверены, что хотите удалить этот лист?')) {
      deleteSheet(id);
      navigate('/main');
      toast({
        title: "Лист удален",
        description: "Лист был успешно удален",
      });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
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
        <Button variant="destructive" size="icon" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div
        className="text-3xl font-bold outline-none mb-4"
        contentEditable
        onBlur={(e) => setSheet({ ...sheet, title: e.currentTarget.textContent || "Новый лист" })}
        dangerouslySetInnerHTML={{ __html: sheet.title }}
      />

      <div
        className="prose prose-sm max-w-none min-h-[500px] p-4 rounded-lg border border-input"
        contentEditable
        onKeyDown={handleKeyCommand}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onBlur={(e) => setSheet({ ...sheet, content: e.currentTarget.innerHTML })}
        dangerouslySetInnerHTML={{ __html: sheet.content }}
      />
    </div>
  );
}
