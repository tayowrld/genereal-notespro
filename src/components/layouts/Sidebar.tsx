
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronRight, Plus, FileText } from "lucide-react";
import { useState } from "react";

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="w-64 border-r bg-background flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <h1 className="font-semibold">Поток</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronDown /> : <ChevronRight />}
        </Button>
      </div>
      
      {isExpanded && (
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Закрепленные</span>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <NavLink to="/sheet/1">
                    <FileText className="mr-2 h-4 w-4" />
                    Заметка 1
                  </NavLink>
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
