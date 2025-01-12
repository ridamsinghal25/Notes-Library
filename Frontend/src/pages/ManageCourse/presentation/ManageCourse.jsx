import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, ArrowLeft, X } from "lucide-react";
import FormFieldInput from "@/components/basic/FormFieldInput";
import { useForm } from "react-hook-form";
import { courseFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ManageCourse({
  selectedCourse,
  isSubmitting,
  onSubmit,
  currentSubject,
  setCurrentSubject,
  subjects,
  setSubjects,
  addSubject,
  removeSubject,
  handleKeyPress,
  navigateBackToCourse,
}) {
  const courseForm = useForm({
    resolver: zodResolver(courseFormValidation),
    defaultValues: {
      courseName: selectedCourse?.courseName || "",
      semester: selectedCourse?.semester || "",
      subjects: [],
      startDate: selectedCourse?.startDate?.split("T")[0] || "",
      endDate: selectedCourse?.endDate?.split("T")[0] || "",
    },
  });

  return (
    <div className="min-h-screen p-6 md:p-8 mt-7">
      <div className="max-w-3xl mx-auto bg-white/80 dark:bg-gray-800/80 rounded-lg shadow-xl backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-8 pb-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={navigateBackToCourse}
              className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {selectedCourse?._id ? "Update Course" : "Add New Course"}
            </h1>
          </div>
          <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
            Manage your courses
          </div>
        </div>
        <Form {...courseForm}>
          <form
            onSubmit={courseForm.handleSubmit((data) =>
              onSubmit({
                ...data,
                subjects,
              }).then(() => {
                courseForm.reset();
                setSubjects([]);
              })
            )}
            className="space-y-6"
          >
            <FormFieldInput
              form={courseForm}
              label="Course Name"
              name="courseName"
              placeholder="Enter course name"
            />
            <FormFieldInput
              form={courseForm}
              label="Semester"
              name="semester"
              placeholder="Enter course semester"
            />
            <div>
              <FormFieldInput
                form={courseForm}
                label="Subjects"
                name="subjects"
                value={currentSubject}
                onChange={(e) => setCurrentSubject(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter course subjects"
              />
              <div className="flex justify-end mt-2">
                <Button type="button" onClick={addSubject}>
                  Add
                </Button>
              </div>
            </div>
            {subjects.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {subjects.map((subject) => (
                  <div
                    key={subject}
                    className="flex items-center bg-gray-300 text-black px-2 py-1 rounded-sm"
                  >
                    {subject}
                    <div>
                      <X
                        className="ml-2 h-4 w-4 cursor-pointer"
                        onClick={() => removeSubject(subject)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <FormFieldInput
              form={courseForm}
              label="Start Date"
              type="date"
              name="startDate"
              placeholder="Enter start date"
              className="bg-gray-300 text-black"
            />
            <FormFieldInput
              form={courseForm}
              label="End Date"
              type="date"
              name="endDate"
              placeholder="Enter end date"
              className="bg-gray-300 text-black"
            />
            <div className="w-full flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
