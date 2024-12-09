import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CourseModalContainer from "@/components/modals/coursemodal/container/CourseModalContainer";
import DeleteModalContainer from "@/components/modals/deletemodal/container/DeleteModalContainer";
import { BookOpen, Calendar, GraduationCap, PlusCircle } from "lucide-react";

export default function Course({
  courses,
  toggleCourseModal,
  toggleEditCourseModal,
  toggelDeleteModal,
}) {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Course Management</h1>
        <Button
          onClick={toggleCourseModal}
          className="flex items-center space-x-2"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Course</span>
        </Button>
      </div>

      <CourseModalContainer />

      <DeleteModalContainer />

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
                {course.subjects.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {course.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                )}
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
              <div className="flex justify-end space-x-2 pt-4">
                <Button onClick={() => toggleEditCourseModal(course)}>
                  Update
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => toggelDeleteModal(course)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}