import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Loader2 } from "lucide-react";
import FormFieldSelect from "@/components/basic/FormFieldSelect";
import FormFieldInput from "@/components/basic/FormFieldInput";
import { updateDailyNotesFormValidation } from "@/validation/zodValidation";
import UpdateFilesContainer from "@/components/pageComponent/UpdateFiles/container/UpdateFilesContainer";

function UpdateDailyNotes({
  userSubjects,
  selectedNotes,
  isSubmitting,
  onDailyNotesUpdate,
  navigate,
  currentSubjectChapters,
  getSubjectChapters,
}) {
  const updateDailyNotesForm = useForm({
    resolver: zodResolver(updateDailyNotesFormValidation),
    defaultValues: {
      subject: selectedNotes?.subject || "",
      chapterNumber: `${selectedNotes?.chapterNumber}` || "",
      chapterName: selectedNotes?.chapterName || "",
    },
  });

  return (
    <div className="min-h-screen p-6 md:p-8 mt-7">
      <div className="max-w-4xl mx-auto border border-gray-400 dark:border-gray-200 rounded-lg shadow-xl backdrop-blur-sm p-6">
        <div className="flex items-center justify-between mb-8 pb-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Update Daily Notes
            </h1>
          </div>
          <div className="hidden sm:block text-sm text-gray-500 dark:text-gray-400">
            Refine your knowledge
          </div>
        </div>

        <Tabs defaultValue="notesDetails" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="notesDetails">Note Details</TabsTrigger>
            <TabsTrigger value="updateFiles">Update Files</TabsTrigger>
          </TabsList>

          <TabsContent value="notesDetails">
            <Form {...updateDailyNotesForm}>
              <form
                onSubmit={updateDailyNotesForm.handleSubmit((data) =>
                  onDailyNotesUpdate(data).then(() => {
                    updateDailyNotesForm.reset();
                  })
                )}
                className="space-y-6"
              >
                <FormFieldSelect
                  form={updateDailyNotesForm}
                  label="Subject Name"
                  name="subject"
                  values={userSubjects?.map((subject) => subject.subjectName)}
                  placeholder="Enter the subject name"
                />
                <FormFieldInput
                  form={updateDailyNotesForm}
                  label="Chapter No."
                  name="chapterNumber"
                  placeholder="Enter the chapter number"
                  type="number"
                  min={1}
                  max={10}
                />
                <FormFieldSelect
                  form={updateDailyNotesForm}
                  label="Chapter Name"
                  name="chapterName"
                  values={currentSubjectChapters}
                  onOpenChange={() =>
                    getSubjectChapters(
                      updateDailyNotesForm.getValues("subject")
                    )
                  }
                  placeholder="Enter the subject name"
                  disabled={!updateDailyNotesForm.getValues("subject")}
                  description="Select a subject first"
                />
                <div className="w-full flex justify-end">
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                        Wait
                      </>
                    ) : (
                      "Update Details"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="updateFiles">
            <UpdateFilesContainer selectedNotes={selectedNotes} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default UpdateDailyNotes;
