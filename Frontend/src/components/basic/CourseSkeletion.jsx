import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CourseSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <CardHeader className="bg-primary/10">
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <div className="space-y-2">
                {[...Array(3)].map((_, subIndex) => (
                  <div
                    key={subIndex}
                    className="bg-secondary/20 p-2 rounded-md"
                  >
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="flex justify-between pt-4">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="space-x-2">
                <Skeleton className="h-8 w-20 inline-block" />
                <Skeleton className="h-8 w-20 inline-block" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
