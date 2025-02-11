import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTES } from "@/constants/route";

function NotesCard({ subject, isOpen, setIsOpen }) {
  return (
    <div className="border border-gray-400 rounded-lg p-4 shadow-md transition-transform transform hover:shadow-lg block">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <h4 className="font-semibold text-lg text-gray-800 mb-2 dark:text-gray-200">
          {subject}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-200 mb-4">
          Comprehensive {subject.toLowerCase()} notes for effective learning.
        </p>
        <DropdownMenuTrigger asChild>
          <Button className="justify-between">View Notes</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-80">
          <DropdownMenuItem>
            <Link
              to={`${ROUTES.DAILY_NOTES?.replace(":subject", subject)}`}
              className="w-full"
            >
              Latest Notes
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link
              to={`${ROUTES.NOTES_SUBJECT?.replace(":subject", subject)}`}
              className="w-full"
            >
              Notes PDF
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default NotesCard;
