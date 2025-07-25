import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, resourceType = "auto") => {
  try {
    if (!localFilePath) return null;

    const uploadOptions = {
      resource_type: resourceType,
    };

    // upload file on cloudinary
    const response = await cloudinary.uploader.upload(
      localFilePath,
      uploadOptions
    );

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
    console.log("error occured while uploading files to cloudinary: ", error);
    return null;
  }
};

const deleteFromCloudinary = async (publicId, resourceType = "image") => {
  try {
    if (!publicId) return null;

    // delete from cloudinary
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const deleteMultipleAssestsFromCloudinary = async (publicId) => {
  try {
    if (!publicId.length) return null;

    // delete from cloudinary
    const response = await await cloudinary.api.delete_resources(publicId);

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {
  uploadOnCloudinary,
  deleteFromCloudinary,
  deleteMultipleAssestsFromCloudinary,
};
