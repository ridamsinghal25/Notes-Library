import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, ArrowLeft, X, Plus } from "lucide-react";
import FormFieldInput from "@/components/basic/FormFieldInput";
import { Input } from "@/components/ui/input";

export default function ManageCourse({
  selectedCourse,
  isSubmitting,
  onSubmit,
  currentSubject,
  setCurrentSubject,
  addSubject,
  removeSubject,
  handleKeyPress,
  navigateBackToCourse,
  currentChapter,
  setCurrentChapter,
  addChapter,
  removeChapter,
  editingSubject,
  setEditingSubject,
  courseForm,
  fields,
}) {
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
            <div>
              <div className="space-y-4">
                <div>
                  <FormFieldInput
                    form={courseForm}
                    label="Subjects"
                    name="subjects"
                    type="text"
                    value={currentSubject}
                    onChange={(e) => setCurrentSubject(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter course subjects"
                  />
                  <div className="flex justify-end mt-2">
                    <Button type="button" onClick={() => addSubject()}>
                      Add
                    </Button>
                  </div>
                </div>
                {fields?.map((subject, subjectIndex) => (
                  <div key={subject.id} className="border p-4 rounded">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{subject.subjectName}</h3>
                      <div className="flex items-center space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingSubject(subject.subjectName)}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeSubject(subjectIndex)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {editingSubject === subject.subjectName && (
                      <div className="space-y-2 mt-2">
                        <div className="flex items-center space-x-2">
                          <Input
                            type="text"
                            value={currentChapter}
                            onChange={(e) => setCurrentChapter(e.target.value)}
                            placeholder="Enter chapter name"
                            className="flex-grow p-2 border rounded"
                          />
                          <Button
                            type="button"
                            size="sm"
                            onClick={() => addChapter(subjectIndex)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        {subject?.chapters?.map((chapter, chapterIndex) => (
                          <div
                            key={chapterIndex}
                            className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded"
                          >
                            <span>{chapter}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                removeChapter(subjectIndex, chapterIndex)
                              }
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
