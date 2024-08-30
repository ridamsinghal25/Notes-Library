import { Button } from "../components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import UploadNotes from "../components/modals/UploadNotes";

function NotesPage() {
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="fixed top-4 right-4 z-10">
        <Button onClick={handleClick}>
          <Upload />
        </Button>
      </div>
      <UploadNotes showDialog={showDialog} setShowDialog={setShowDialog} />

      <header className="p-4 lg:p-6">
        <h1 className="text-lg font-semibold md:text-2xl">Notes</h1>
      </header>

      <main className="flex-grow flex p-4 lg:p-6">
        <div className="w-full flex items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-4 text-center p-8">
            <h3 className="text-2xl font-bold tracking-tight">
              Select the notes that suites you
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start learning as soon as you download the notes.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotesPage;
