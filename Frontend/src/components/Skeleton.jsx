import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function SkeletonUI({ isCard = false }) {
  return (
    <div className="container mx-auto py-8 px-4">
      {!isCard && <Skeleton className="h-10 w-3/4 mx-auto mb-6" />}

      <div className="flex flex-col items-center sm:block">
        {[1, 2, 3].map((index) => (
          <div key={index} className="mb-8 sm:ml-8 w-full max-w-4xl">
            <div className="flex items-center mb-4 flex-col sm:flex-row justify-center sm:justify-normal">
              <Skeleton className="h-10 w-20 rounded-lg mr-4 mb-3 sm:mb-0" />
              <Skeleton className="h-8 w-48" />
            </div>
            <Separator className="mb-4" />
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col items-center gap-4 w-72">
                <div className="flex justify-between items-start gap-4 w-full">
                  <div className="flex-1 w-full">
                    <div className="bg-background border rounded-lg p-4 w-full">
                      <div className="flex items-center space-x-2 mb-4">
                        <Skeleton className="h-10 w-10" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-48 w-full mb-4" />
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <Skeleton className="h-10 w-10" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isCard && <Skeleton className="h-6 w-64 mx-auto mt-8" />}
    </div>
  );
}
