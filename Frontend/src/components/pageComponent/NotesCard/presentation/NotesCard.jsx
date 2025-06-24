import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Clock } from "lucide-react";
import { ROUTES } from "@/constants/route";

function NotesCard({ subject }) {
  return (
    <div className="border border-gray-400 rounded-lg p-6 shadow-md transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
      <div className="mb-4">
        <h4 className="font-semibold text-xl text-gray-800 mb-2 dark:text-gray-200">
          {subject}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Comprehensive {subject.toLowerCase()} notes for effective learning.
        </p>
      </div>

      <div className="space-y-3">
        <Link
          to={`${ROUTES.DAILY_NOTES?.replace(":subject", subject)}`}
          className="block"
        >
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12 bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 hover:text-blue-800 dark:bg-blue-900/20 dark:hover:bg-blue-900/50 dark:border-blue-800 dark:text-blue-300"
          >
            <Clock className="h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">Latest Notes</div>
              <div className="text-xs opacity-75">Recent updates & content</div>
            </div>
          </Button>
        </Link>

        <Link
          to={`${ROUTES.NOTES_SUBJECT?.replace(":subject", subject)}`}
          className="block"
        >
          <Button
            variant="outline"
            className="w-full justify-start gap-3 h-12 bg-green-50 hover:bg-green-100 border-green-200 text-green-700 hover:text-green-800 dark:bg-green-900/20 dark:hover:bg-green-900/50 dark:border-green-800 dark:text-green-300"
          >
            <FileText className="h-4 w-4" />
            <div className="text-left">
              <div className="font-medium">Notes PDF</div>
              <div className="text-xs opacity-75">Complete study material</div>
            </div>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotesCard;
