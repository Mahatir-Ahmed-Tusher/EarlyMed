import React from 'react';
import { FaImage } from 'react-icons/fa';

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, className }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onImageSelect(file);
  };

  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <div className="flex items-center gap-2">
        <label className="p-2 bg-blue-500 text-white rounded cursor-pointer">
          <FaImage />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        <span>Upload Image</span>
      </div>
    </div>
  );
};

export default ImageUploader;