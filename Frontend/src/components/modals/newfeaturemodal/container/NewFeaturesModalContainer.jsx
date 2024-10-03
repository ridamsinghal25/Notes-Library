import { useState, useEffect } from "react";
import NewFeaturesModal from "../presentation/NewFeaturesModal";

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
    />
  );
}

export default NewFeaturesModalContainer;
