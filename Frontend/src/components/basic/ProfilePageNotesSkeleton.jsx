import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePageNotesSkeleton() {
  return (
    <div className="w-full lg:w-11/12">
      <div className="w-full flex justify-start flex-col ">
        <Skeleton className="h-8 w-2/4 max-w-2xl mb-4" />

        <Skeleton className="h-6 w-1/4 max-w-xl mb-8" />
      </div>

      {[1, 2, 3].map((_, index) => (
        <article
          key={index}
          className="border border-gray-200 dark:border-gray-400 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 pb-8 mt-4 flex justify-between items-start px-6 sm:p-6"
        >
          <div className="w-3/4">
            <div className="flex items-center mb-4 mt-4">
              <Skeleton className="w-9 h-9 rounded-full mr-3" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-4" />
            <div className="flex flex-wrap gap-4 md:gap-10 items-center mt-7">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-4 w-8" />
              </div>
            </div>
          </div>
          <div>
            <Skeleton className="w-28 sm:w-36 h-36 rounded-lg mt-8 sm:mt-0 sm:ml-4" />
          </div>
        </article>
      ))}
    </div>
  );
}
