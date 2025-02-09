import { Skeleton } from "@/components/ui/skeleton";

const ListDailyNotesSkeleton = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 transition-colors duration-200">
      <Skeleton className="w-3/4 h-8 mb-6 mx-auto" />

      <div className="flex items-center mb-4 flex-col sm:flex-row justify-center sm:justify-normal gap-4">
        <Skeleton className="w-16 h-6" />
        <Skeleton className="w-32 h-10 rounded-lg" />
      </div>

      <div className="max-w-6xl mx-auto">
        <Skeleton className="w-1/2 h-8 mb-6" />

        {[...Array(3)].map((_, index) => (
          <div key={index} className="mb-8">
            <div className="flex items-center mb-4 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <Skeleton className="w-8 h-8 mr-4 rounded-full" />
              <div className="flex-grow">
                <Skeleton className="w-1/3 h-6 mb-2" />
                <Skeleton className="w-1/4 h-4" />
              </div>
              <Skeleton className="w-16 h-6 rounded-full" />
            </div>

            <div className="flex flex-wrap justify-start gap-4 p-4">
              {[...Array(4)].map((_, imgIndex) => (
                <div key={imgIndex} className="relative group">
                  <Skeleton className="w-[200px] h-[150px] rounded-lg" />
                  <Skeleton className="absolute bottom-2 right-2 w-12 h-6 rounded-md" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListDailyNotesSkeleton;
