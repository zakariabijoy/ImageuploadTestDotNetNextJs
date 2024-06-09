import axios from 'axios';

export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', 'name');
  formData.append('profession', 'SE');

    // const response = await axios.post('https://localhost:7006/api/ImageUpload/upload', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    // return response.data;

    const response = await fetch('https://localhost:7006/api/ImageUpload/upload', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
return data;
}
