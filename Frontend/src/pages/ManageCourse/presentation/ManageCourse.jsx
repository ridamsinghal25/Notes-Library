import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, ArrowLeft, BookOpen, PlusCircle, Trash2 } from "lucide-react";
import FormFieldInput from "@/components/basic/FormFieldInput";
import { useFieldArray, useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { courseFormValidation } from "@/validation/zodValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import CourseChaptersArray from "@/components/pageComponent/CourseChaptersArray/presentation/CourseChaptersArray";

export default function ManageCourse({
  selectedCourse,
  isSubmitting,
  onSubmit,
  navigateBackToCourse,
}) {
  const courseForm = useForm({
    resolver: zodResolver(courseFormValidation),
    defaultValues: {
      courseName: selectedCourse?.courseName || "",
      semester: selectedCourse?.semester || "",
      subjects: selectedCourse?.subjects || [
        { subjectName: "Subject Name", chapters: ["Chapter Name"] },
      ],
      startDate: selectedCourse?.startDate?.split("T")[0] || "",
      endDate: selectedCourse?.endDate?.split("T")[0] || "",
    },
  });

  const {
    fields: subjectFields,
    append: addSubject,
    remove: removeSubject,
  } = useFieldArray({
    control: courseForm.control,
    name: "subjects",
  });

  return (
    <div className="min-h-screen p-6 md:p-8 mt-7">
      <div className="max-w-3xl mx-auto border border-gray-400 dark:border-gray-200 rounded-lg shadow-xl backdrop-blur-sm p-6">
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
              onSubmit(data).then(() => {
                courseForm.reset();
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
            <div className="space-y-4 mt-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-violet-600" />
                  Subjects
                  <Badge variant="outline" className="ml-2">
                    {subjectFields.length}
                  </Badge>
                </h2>
              </div>

              {courseForm.formState.errors?.subjects?.root && (
                <div className="text-red-500">
                  {courseForm.formState.errors?.subjects?.root?.message}
                </div>
              )}
              {courseForm.formState.errors?.subjects?.[0]?.chapters?.root && (
                <div className="text-red-500">
                  {
                    courseForm.formState.errors?.subjects?.[0].chapters.root
                      .message
                  }
                </div>
              )}

              <Accordion type="single" className="space-y-4" collapsible="true">
                {subjectFields.map((subject, subjectIndex) => (
                  <AccordionItem
                    key={subject.id}
                    value={`subject-${subjectIndex}`}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <AccordionTrigger className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                      <div className="flex items-center gap-3 w-full">
                        <div className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300">
                          {subjectIndex + 1}
                        </div>
                        <div className="flex-1 text-left">
                          <span className="font-medium">
                            {subjectFields[subjectIndex].subjectName}
                          </span>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {courseForm.watch(
                              `subjects.${subjectIndex}.chapters`
                            )?.length || 0}{" "}
                            chapters
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-3 border-t border-gray-200 dark:border-gray-800">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <FormFieldInput
                              form={courseForm}
                              name={`subjects.${subjectIndex}.subjectName`}
                              label="Subject Name"
                              className="w-full"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 mt-7 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600"
                            onClick={() => removeSubject(subjectIndex)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>

                        <CourseChaptersArray
                          subject={subject}
                          subjectIndex={subjectIndex}
                          courseForm={courseForm}
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Button
                type="button"
                variant="outline"
                className="w-full py-6 border-dashed border-violet-300 dark:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950 text-violet-700 dark:text-violet-300"
                onClick={() =>
                  addSubject({
                    subjectName: "New Subject",
                    chapters: ["New Chapter"],
                  })
                }
              >
                <PlusCircle size={18} className="mr-2" />
                Add Subject
              </Button>
            </div>

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
