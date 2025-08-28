import { Badge } from "@/components/ui/badge";
import { Loader2, CheckCircle } from "lucide-react";

export const SaveStatusIndicator = ({ isLoading }: { isLoading: boolean }) => (
  <div className="flex justify-end">
    {isLoading ? (
      <Badge variant="outline">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Saving...
      </Badge>
    ) : (
      <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
        <CheckCircle className="mr-2 h-4 w-4" />
        Saved
      </Badge>
    )}
  </div>
);
