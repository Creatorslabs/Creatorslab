import { Button, Label, FileInput } from 'flowbite-react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const ImageUploader = ({ onImageUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
      return () => {
          if (previewUrl) {
              URL.revokeObjectURL(previewUrl);
          }
      };
  }, [previewUrl]);

  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (!file) return;

      // File validation
      if (!file.type.match('image.*')) {
          setUploadError("Please select an image file (SVG, PNG, JPG, or GIF)");
          return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
          setUploadError("File size exceeds 5MB limit");
          return;
      }

      // Set file state
      setFile(file);
      setUploadError("");

      // Create a preview URL for the selected image
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
  };

  const uploadImage = async () => {
      if (!file) {
          setUploadError("No file selected. Please choose an image.");
          return;
      }

      setIsUploading(true);
      setUploadError("");
      setUploadProgress(0);

      let progressInterval;
      try {
          // Create a FormData object
          const formData = new FormData();
          formData.append('file', file);

          // Simulate upload progress
          const simulateProgress = () => {
              let progress = 0;
              const interval = setInterval(() => {
                  progress += 10;
                  setUploadProgress(progress);
                  if (progress >= 100) {
                      clearInterval(interval);
                  }
              }, 200);
              return interval;
          };

          progressInterval = simulateProgress();

          // Simulated API call
          const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
          });

          if (!response.ok) throw new Error("Failed to upload!");

          const { url } = await response.json();

          // Simulating API response delay
          await new Promise(resolve => setTimeout(resolve, 2000));
          clearInterval(progressInterval);
          setUploadProgress(100);

          // Call the parent component's handler with the image URL
          console.log("Image URL:", url);
          
          onImageUpload(url);
      } catch (error) {
          setUploadError("Failed to upload image. Please try again.");
          console.error("Upload error:", error);
      } finally {
          clearInterval(progressInterval);
          setIsUploading(false);
      }
  };

  return (
      <div className="w-full">
          {previewUrl ? (
              <div className="mb-4 relative">
                  <Image
                      src={previewUrl}
                      alt="Preview"
                      className="w-full max-h-32 object-contain rounded-lg"
                      height={100}
                      width={100}
                  />
                  <Button
                      color="blue"
                      size="sm"
                      className="absolute top-2 right-2 bg-white bg-opacity-70"
                      onClick={() => {
                          setPreviewUrl("");
                          setFile(null);
                          setUploadProgress(0);
                          setIsUploading(false)
                      }}
                  >
                      Change
                  </Button>
              </div>
          ) : (
              <Label
                  htmlFor="dropzone-file"
                  className={`flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed ${
                      uploadError ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                  }`}
              >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5 w-full">
                      <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                      {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
                  </div>
                  <FileInput id="dropzone-file" className="hidden" onChange={handleFileChange} accept="image/*" disabled={isUploading} />
              </Label>
          )}

          {isUploading && (
              <p className="text-sm text-gray-500 mt-1 text-center">Uploading... {uploadProgress}%</p>
          )}

          {previewUrl.trim().length !== 0 && !isUploading && (
              <Button onClick={uploadImage}>Upload</Button>
          )}
      </div>
  );
};

export default ImageUploader;
