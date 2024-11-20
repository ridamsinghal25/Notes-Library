import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

export default function CommentModalSkeleton() {
  return (
    <div>
      <ScrollArea className="h-[400px] pr-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="mb-6 transition-all duration-300 ease-in-out"
          >
            <div className="flex items-start space-x-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-center w-full">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex items-center mt-2 space-x-2">
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="mt-4">
        <div className="flex items-center justify-center gap-2">
          <div className="w-11/12">
            <Skeleton className="h-16 w-full" />
          </div>
          <Send size={25} />
        </div>
      </div>
    </div>
  );
}
