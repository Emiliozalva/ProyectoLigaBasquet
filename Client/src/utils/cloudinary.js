export const uploadImageToCloudinary = async (file) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME; 
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al subir la imagen");
    }

    const data = await response.json();
    
    if (data.secure_url) {
      const urlOptimizada = data.secure_url.replace('/upload/', '/upload/q_auto,f_auto/');
      return urlOptimizada; 
    }
    
    return null; 
    
  } catch (error) {
    console.error("Error en Cloudinary:", error);
    return null;
  }
};