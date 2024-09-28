import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  BugOff,
  PartyPopper,
  SunMoon,
  UserCircle,
} from "lucide-react";

export const features = [
  {
    id: "ui_update",
    title: "UI Update",
    description:
      "The user interface has been updated for a more modern and intuitive experience.",
    icon: <PartyPopper className="h-7 w-7" />,
  },
  {
    id: "dark_mode",
    title: "Dark Mode",
    description:
      "Toggle between light and dark themes for comfortable viewing.",
    icon: <SunMoon className="h-7 w-7" />,
  },
  {
    id: "avatar_upload",
    title: "Add Avatar Photo",
    description: "Users can now upload and personalize their avatar photos.",
    icon: <UserCircle className="h-7 w-7" />,
  },
  {
    id: "bug_fixes",
    title: "Bug Fixes",
    description:
      "Various bugs have been fixed to improve the overall stability and performance.",
    icon: <BugOff className="h-7 w-7" />,
  },
];

function NewFeatures() {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const userSeenFeatures =
      JSON.parse(localStorage.getItem("userSeenFeatures")) || [];

    const firstUnseenFeature = features.findIndex(
      (feature) => !userSeenFeatures.includes(feature.id)
    );

    if (firstUnseenFeature !== -1) {
      setCurrentFeatureIndex(firstUnseenFeature);
      setIsModalOpen(true);
    }
  }, []);

  const handleNextFeature = () => {
    let userSeenFeatures =
      JSON.parse(localStorage.getItem("userSeenFeatures")) || [];
    const currentFeature = features[currentFeatureIndex].id;

    if (!userSeenFeatures.includes(currentFeature)) {
      userSeenFeatures.push(currentFeature);
      localStorage.setItem(
        "userSeenFeatures",
        JSON.stringify(userSeenFeatures)
      );
    }

    if (currentFeatureIndex < features.length - 1) {
      setCurrentFeatureIndex(currentFeatureIndex + 1);
    } else {
      setIsModalOpen(false);
    }
  };

  const handlePreviousFeature = () => {
    if (currentFeatureIndex > 0) {
      setCurrentFeatureIndex(currentFeatureIndex - 1);
    }
  };

  const currentFeature = features[currentFeatureIndex];

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-primary-foreground p-6 text-white relative">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-3xl font-bold">
              Exciting New Features!
            </AlertDialogTitle>
          </AlertDialogHeader>
        </div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="mr-4 p-3 bg-primary/10 rounded-full">
              {currentFeature.icon}
            </div>
            <h3 className="text-2xl font-semibold">{currentFeature.title}</h3>
          </div>
          <AlertDialogDescription className="text-base mb-6">
            {currentFeature.description}
          </AlertDialogDescription>
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>
              Feature {currentFeatureIndex + 1} of {features.length}
            </span>
            <span>
              {Math.round(((currentFeatureIndex + 1) / features.length) * 100)}%
              Complete
            </span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2 mb-6">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: `${
                  ((currentFeatureIndex + 1) / features.length) * 100
                }%`,
              }}
            />
          </div>
          <AlertDialogFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button
              variant="outline"
              onClick={handlePreviousFeature}
              disabled={currentFeatureIndex === 0}
              className="w-full sm:w-auto"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={handleNextFeature} className="w-full sm:w-auto">
              {currentFeatureIndex < features.length - 1 ? (
                <>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Get Started"
              )}
            </Button>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default NewFeatures;
