

 export async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'plant_images');

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/udsja4sv/image/upload`,
    { method: 'POST', body: formData }
  );

  if (!response.ok) throw new Error('Image upload failed');

  const data = await response.json();
  return data.secure_url; // this is what you save to Firestore instead of the Storage download URL
}