import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

export const useStorage = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  const uploadImage = async (file, folder) => {
    if (!file) return null;
    setError(null);

    return new Promise((resolve, reject) => {
      // Creamos una ruta única para la imagen (ej: logos/167890123.jpg)
      const fileExtension = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${fileExtension}`;
      const storageRef = ref(storage, fileName);

      // Iniciamos la subida
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Calculamos el porcentaje para la barra de progreso
          const percentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(percentage);
        },
        (err) => {
          console.error("Error al subir:", err);
          setError(err);
          reject(err);
        },
        async () => {
          // Cuando termina, pedimos la URL pública de la imagen
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setProgress(0); // Reiniciamos el progreso
          resolve(downloadUrl);
        }
      );
    });
  };

  return { uploadImage, progress, error };
};