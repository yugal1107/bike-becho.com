'use client'

import React, { useState } from 'react';
import { Button } from "@nextui-org/react";
import { Upload, X } from 'lucide-react';

const ImageUploadSection = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files);
    
    // Create local preview URLs
    const imagePreviewUrls = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file,
      uploading: false
    }));
    
    setSelectedImages(prev => [...prev, ...imagePreviewUrls]);
  };

  const handleImageUpload = async () => {
    setLoading(true);

    try {
      const uploadPromises = selectedImages
        .filter(img => !img.uploaded) // Only upload images that haven't been uploaded yet
        .map(async (image) => {
          const formData = new FormData();
          formData.append('file', image.file);
          formData.append('upload_preset', 'your_upload_preset'); // Replace with your Cloudinary upload preset

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`, // Replace with your cloud name
            {
              method: 'POST',
              body: formData,
            }
          );

          const data = await response.json();
          return data.secure_url;
        });

      const newUploadedUrls = await Promise.all(uploadPromises);
      setUploadedImages(prev => [...prev, ...newUploadedUrls]);
      
      // Clear selected images after successful upload
      setSelectedImages([]);
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setSelectedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const removeUploadedImage = (indexToRemove) => {
    setUploadedImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm mb-2">Vehicle Images</p>
        <input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelection}
          className="hidden"
        />
        <label
          htmlFor="images"
          className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="text-sm text-gray-600">
              Click to upload images
            </div>
            <div className="text-xs text-gray-500">
              PNG, JPG up to 10MB
            </div>
          </div>
        </label>
      </div>

      {/* Selected Images Preview */}
      {selectedImages.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Selected Images</p>
            <Button
              size="sm"
              color="primary"
              onClick={handleImageUpload}
              isLoading={loading}
            >
              Upload Selected
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {selectedImages.map((image, index) => (
              <div key={`selected-${index}`} className="relative group">
                <img
                  src={image.url}
                  alt={`Selected preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Uploaded Images</p>
          <div className="grid grid-cols-4 gap-4">
            {uploadedImages.map((url, index) => (
              <div key={`uploaded-${index}`} className="relative group">
                <img
                  src={url}
                  alt={`Uploaded preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeUploadedImage(index)}
                  className="absolute top-1 right-1 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button
        type="submit"
        color="primary"
        isLoading={loading}
        fullWidth
      >
        {loading ? 'Submitting...' : 'List Vehicle'}
      </Button>
    </div>
  );
};

export default ImageUploadSection;