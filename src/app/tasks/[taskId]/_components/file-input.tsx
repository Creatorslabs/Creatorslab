import { Button, Label, FileInput } from 'flowbite-react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const ImageUpload = ({ handleSuccess }: {
    handleSuccess: (url: string) => void
}) => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState("");
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadedImageUrl, setUploadedImageUrl] = useState(null);


  const handleFileChange = async (event) => {
    const newFile = event.target.files[0];
    if (!newFile) return;

    if (!newFile.type.match("image.*")) {
        setUploadError("Please select an image file (SVG, PNG, JPG, or GIF)");
        return;
    }

    const maxSize = 5 * 1024 * 1024;
    if (newFile.size > maxSize) {
        setUploadError("File size exceeds 5MB limit");
        return;
    }

    setUploadError("");
    setUploadProgress(0);
    setIsUploading(true);

    let progressInterval;
    try {
        if (uploadedImageUrl) {
        await fetch(`/api/delete`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: uploadedImageUrl }),
        });
        }

        const simulateProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) clearInterval(interval);
        }, 200);
        return interval;
        };

        progressInterval = simulateProgress();

        const formData = new FormData();
        formData.append("file", newFile);
        formData.append("type", "proofs");

        const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");

        const { url } = await response.json();
        setUploadedImageUrl(url);

        handleSuccess(url)

        await new Promise((r) => setTimeout(r, 2000));
        clearInterval(progressInterval);
        setUploadProgress(100);
    } catch (error) {
        console.error("Upload error:", error);
        setUploadError("Failed to upload image. Please try again.");
        setUploadProgress(0);
    } finally {
        clearInterval(progressInterval);
        setIsUploading(false);
    }
};


  return (          
      <div>
          <div className='w-full'>
          <Label className="mb-2 block" htmlFor="multiple-file-upload">
                Upload task proof
            </Label>
            <FileInput id="multiple-file-upload"className={`${
                      uploadError ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
              }`}
              onChange={handleFileChange}
              accept="image/*"
              disabled={isUploading} />
          </div>

          {isUploading && (
              <p className="text-sm text-gray-500 mt-1 text-center">Uploading... {uploadProgress}%</p>
          )}
      </div>
  );
};

export default ImageUpload;
