
import { useParams } from "react-router-dom";

export function SheetPage() {
  const { id } = useParams();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Лист</h1>
      <p className="mt-4 text-muted-foreground">
        ID листа: {id}
      </p>
    </div>
  );
}
