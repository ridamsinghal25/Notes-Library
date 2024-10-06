import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

function NewFeaturesModal({
  currentFeatureIndex,
  isModalOpen,
  setIsModalOpen,
  currentFeature,
  handleNextFeature,
  handlePreviousFeature,
  features,
}) {
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

export default NewFeaturesModal;
