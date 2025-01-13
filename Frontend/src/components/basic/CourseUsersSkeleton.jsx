import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CourseUsersSkeleton() {
  return [1, 2, 3, 4, 5, 6, 7].map((_, index) => (
    <Card key={index} className="dark:bg-gray-700 m-5 mx-5">
      <CardContent className="flex items-center space-x-4 py-4">
        <Skeleton className="h-12 w-12 rounded-full dark:bg-gray-400" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[120px] sm:w-[200px] dark:bg-gray-400" />
          <Skeleton className="h-4 w-[80px] sm:w-[150px] dark:bg-gray-400" />
        </div>
      </CardContent>
    </Card>
  ));
}
