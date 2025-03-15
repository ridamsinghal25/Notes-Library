export function getCroppedImage(image, canvas, crop) {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext("2d");

  const pixelRatio = window.devicePixelRatio;

  canvas.width = crop.width * scaleX * pixelRatio;
  canvas.height = crop.height * scaleY * pixelRatio;

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  ctx.save();

  // Draw the image at the calculated position
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width * scaleX,
    crop.height * scaleY
  );

  ctx.restore();

  // Convert canvas to URL
  const dataUrl = canvas.toDataURL("image/jpeg");
  return dataUrl;
}
