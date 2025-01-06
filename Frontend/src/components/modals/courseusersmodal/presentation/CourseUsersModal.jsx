import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CourseUsersModalSkeleton from "@/components/basic/CourseUsersModalSkeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AVATAR_URL } from "@/constants/constants";
import { ScrollArea } from "@/components/ui/scroll-area";

function CourseUsersModal({
  setShowDialog,
  showDialog,
  isLoading,
  users,
  currentPage,
  totalPages,
  handlePageChange,
}) {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent
        className="max-w-xs sm:max-w-[425px] rounded-lg [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:border-gray-400"
        hideClose
      >
        <DialogHeader>
          <DialogTitle>Enrolled Users</DialogTitle>
          <DialogDescription>
            You're on page {currentPage} of {totalPages}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-3">
          <ScrollArea className="h-[400px]">
            {isLoading ? (
              <CourseUsersModalSkeleton />
            ) : users?.length > 0 ? (
              users?.map((user) => (
                <Card className="dark:bg-gray-700 m-2" key={user._id}>
                  <CardContent className="flex items-center space-x-4 py-4">
                    <Avatar>
                      <AvatarImage
                        src={user?.avatar?.url || AVATAR_URL}
                        alt={user?.name}
                      />
                      <AvatarFallback>{user?.name}</AvatarFallback>
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
      </DialogContent>
    </Dialog>
  );
}

export default CourseUsersModal;
