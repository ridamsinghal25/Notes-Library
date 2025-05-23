import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  PlusCircle,
  Users,
} from "lucide-react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import DeleteCourseModalContainer from "@/components/modals/deletecoursemodal/container/DeleteCourseModalContainer";
import { CourseSkeleton } from "@/components/basic/CourseSkeletion";

export default function Course({
  courses,
  status,
  toggelDeleteModal,
  userId,
  navigateToManageCourse,
  navigateToCourseUsers,
  toggleChapters,
  expandedSubjects,
}) {
  return (
    <div className="container mx-auto p-6 space-y-8 mt-4">
      <HelmetProvider>
        <Helmet>
          <title>Course</title>
          <meta charset="UTF-8" />
          <meta name="description" content="This is a course page" />
        </Helmet>
      </HelmetProvider>
      <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <div className="flex justify-start w-full sm:w-auto sm:justify-normal">
          <Button
            onClick={() => navigateToManageCourse()}
            className="flex items-center space-x-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Add New Course</span>
          </Button>
        </div>
      </div>

      <DeleteCourseModalContainer />

      {status === "loading" ? (
        <CourseSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <Card
              key={course._id}
              className="overflow-hidden transition-shadow hover:shadow-lg"
            >
              <CardHeader className="bg-primary text-primary-foreground">
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5" />
                  <span>{course.courseName}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <GraduationCap className="w-5 h-5" />
                  <span>Semester: {course.semester}</span>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Subjects:</h3>
                  <div className="space-y-2">
                    {course.subjects?.map((subject, subjectIndex) => (
                      <div
                        key={subjectIndex}
                        className="bg-secondary text-secondary-foreground p-2 rounded-md"
                      >
                        <Button
                          variant="ghost"
                          className="w-full flex justify-between items-center p-0 h-auto"
                          onClick={() =>
                            toggleChapters(course._id, subjectIndex)
                          }
                        >
                          <span className="font-semibold">
                            {subject.subjectName}
                          </span>
                          {expandedSubjects[`${course._id}-${subjectIndex}`] ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </Button>
                        {expandedSubjects[`${course._id}-${subjectIndex}`] && (
                          <ul className="list-disc list-inside text-sm mt-2 space-y-1">
                            {subject.chapters.map((chapter, chapterIndex) => (
                              <li key={chapterIndex}>{chapter}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Start: {new Date(course.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      End: {new Date(course.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {course?.createdBy === userId && (
                  <div className="flex justify-between">
                    <div className="space-x-2 pt-4">
                      <Button onClick={() => navigateToCourseUsers(course._id)}>
                        <Users />
                      </Button>
                    </div>
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button
                        onClick={() => navigateToManageCourse(course?._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => toggelDeleteModal(course?._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
