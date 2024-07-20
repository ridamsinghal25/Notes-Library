import { Button } from "../components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";
import UploadNotes from "../components/UploadNotes";

function NotesPage() {
  const [showDialog, setShowDialog] = useState(false);

  function handleClick() {
    setShowDialog(true);
  }

  return (
    <div>
      <div>
        <div className="fixed top-4 right-4">
          <Button onClick={handleClick}>
            <Upload />
          </Button>
        </div>
        <UploadNotes showDialog={showDialog} setShowDialog={setShowDialog} />
      </div>
    </div>
  );
}

export default NotesPage;
