import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldInput from "@/components/basic/FormFieldInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { courseFormValidation } from "@/validation/zodValidation";
import { Loader2, X } from "lucide-react";

function CourseModal({
  selectedCourse,
  setShowDialog,
  showDialog,
  isSubmitting,
  onSubmit,
  currentSubject,
  setCurrentSubject,
  subjects,
  setSubjects,
  addSubject,
  removeSubject,
  handleKeyPress,
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
    <Dialog
      open={showDialog}
      onOpenChange={() => setShowDialog(selectedCourse)}
    >
      <DialogContent className="max-w-xs sm:max-w-[425px] rounded-lg [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] dark:border-gray-400 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {selectedCourse?._id ? "Update Course" : "Add New Course"}
          </DialogTitle>
        </DialogHeader>
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
            className="space-y-8 mt-4"
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
      </DialogContent>
    </Dialog>
  );
}

export default CourseModal;
