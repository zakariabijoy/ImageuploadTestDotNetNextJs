"use client";
import { ChangeEvent, useState } from "react";
import { uploadImage } from "./actions/fileupload";

export default function UploadComponent() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFilePath, setUploadedFilePath] = useState<string>('');
    
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

    const handleUpload = async () => {
        if (!selectedFile) return;

        try {
            const filePath = await uploadImage(selectedFile);
            setUploadedFilePath(filePath);
          } catch (error) {
            console.error('Error uploading file:', error);
          }
    }
    return(
        <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {uploadedFilePath && (
          <div>
            <p>File uploaded to: {uploadedFilePath}</p>
            <img src={uploadedFilePath} alt="Uploaded" />
          </div>
        )}
      </div>
    );
}