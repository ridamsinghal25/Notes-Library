import { useState, useEffect } from "react";
import NewFeaturesModal from "../presentation/NewFeaturesModal";
import {
  BugOff,
  MessageSquareText,
  PartyPopper,
  SunMoon,
  UserCircle,
} from "lucide-react";

const features = [
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
  {
    id: "feedback",
    title: "Feedback",
    description:
      "Provide feedback on the app and improve the user experience and notes.",
    icon: <MessageSquareText className="h-7 w-7" />,
  },
];

function NewFeaturesModalContainer() {
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
    <NewFeaturesModal
      currentFeatureIndex={currentFeatureIndex}
      isModalOpen={isModalOpen}
      setIsModalOpen={setIsModalOpen}
      currentFeature={currentFeature}
      handleNextFeature={handleNextFeature}
      handlePreviousFeature={handlePreviousFeature}
      features={features}
    />
  );
}

export default NewFeaturesModalContainer;
