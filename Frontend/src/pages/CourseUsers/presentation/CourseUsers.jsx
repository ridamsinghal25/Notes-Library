import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowLeft } from "lucide-react";
import CourseUsersSkeleton from "@/components/basic/CourseUsersSkeleton";
import { AVATAR_URL } from "@/constants/constants";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/route";

export default function CourseUsers({
  isLoading,
  users,
  currentPage,
  totalPages,
  handlePageChange,
}) {
  return (
    <div className="min-h-screen p-6 md:p-8 mt-7">
      <div className="max-w-3xl mx-auto border border-gray-400 dark:border-gray-200 rounded-lg shadow-xl backdrop-blur-sm p-6">
        <div className="flex flex-wrap items-center justify-between mb-8 pb-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <Link to={ROUTES.COURSE}>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Go back"
              >
                <ArrowLeft className="h-6 w-6" />
              </Button>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Enrolled Users
            </h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
        </div>

        <div className="space-y-4 mt-3">
          <ScrollArea className="h-[400px]">
            {isLoading ? (
              <CourseUsersSkeleton />
            ) : users?.length > 0 ? (
              users?.map((user) => (
                <Card className="dark:bg-gray-700 m-5 mx-5" key={user._id}>
                  <CardContent className="flex items-center space-x-4 py-4">
                    <Avatar>
                      <AvatarImage
                        src={user?.avatar?.url || AVATAR_URL}
                        alt={user?.fullName}
                      />
                      <AvatarFallback>{user?.fullName}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {user?.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground break-all">
                        {user?.email}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className="text-foreground">No more users</p>
              </div>
            )}
          </ScrollArea>
        </div>

        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                if (pageNumber === currentPage) {
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        onClick={() => handlePageChange(pageNumber)}
                        isActive={true}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              })}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
