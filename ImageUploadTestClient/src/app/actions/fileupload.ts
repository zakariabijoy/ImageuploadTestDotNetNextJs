import fs from 'fs';
import FormData from 'form-data';
import path from 'path';

export async function uploadImage(file: File): Promise<string> {
  const tempFilePath = path.join(process.cwd(), 'temp', file.name);
  
  // Save the file temporarily
  fs.writeFileSync(tempFilePath, Buffer.from(await file.arrayBuffer()));


  const formData = new FormData();
  formData.append('file', fs.createReadStream(tempFilePath));

  const response = await fetch('https://localhost:7006/api/ImageUpload/upload', {
    method: 'POST',
    body: formData as unknown as BodyInit,
  });

  // Remove the temporary file after uploading
  fs.unlinkSync(tempFilePath);

  if (!response.ok) {
    throw new Error('Error uploading file to the server');
  }

  const data = await response.json();
  return data.filePath;
}
