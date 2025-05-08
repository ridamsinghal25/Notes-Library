import FormFieldInput from "@/components/basic/FormFieldInput";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BookText, PlusCircle, X } from "lucide-react";
import { useFieldArray } from "react-hook-form";

function CourseChaptersArray({ subjectIndex, courseForm, subject }) {
  const {
    fields: chapterFields,
    append: appendChapter,
    remove: removeChapter,
  } = useFieldArray({
    name: `subjects.${subjectIndex}.chapters`,
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <BookText size={16} className="text-amber-500" />
        <Label className="text-sm font-medium">Chapters</Label>
        <Badge variant="outline" className="ml-auto">
          {chapterFields.length}{" "}
          {chapterFields.length === 1 ? "chapter" : "chapters"}
        </Badge>
      </div>

      <div className="pl-2 border-l-2 border-amber-200 dark:border-amber-800">
        {chapterFields.map((chapter, chapterIndex) => (
          <div key={chapter.id} className="flex items-center gap-3">
            <div className="flex-1">
              <FormFieldInput
                form={courseForm}
                name={`subjects.${subjectIndex}.chapters.${chapterIndex}`}
                className="w-full"
              />
            </div>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => removeChapter(chapterIndex)}
            >
              <X size={16} />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full mt-2 border-dashed border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950 text-amber-700 dark:text-amber-300"
        onClick={() => appendChapter("New chapter")}
      >
        <PlusCircle size={16} className="mr-2" />
        Add Chapter
      </Button>
    </div>
  );
}

export default CourseChaptersArray;
