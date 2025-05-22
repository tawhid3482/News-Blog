"use client";

import { useFormContext, Controller } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";

type TImgInputProps = {
  name: string;
  label?: string;
  required?: boolean;
};

const ImgInput = ({ name, label = "", required = false }: TImgInputProps) => {
  const { control } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <Controller
  name={name}
  control={control}
  rules={{ required: required ? `${label || name} is required` : false }}
  render={({ field: { onChange, onBlur, name, ref }, fieldState: { error } }) => (
    <>
      <div className="mt-2 flex items-center space-x-4">
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            width={200}
            height={300}
            className="w-20 h-20 object-cover rounded-full border"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 border text-xs">
            No Image
          </div>
        )}
        <label
          htmlFor={name}
          className="cursor-pointer inline-block bg-[#0896EF] text-white px-4 py-2 text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          Choose Photo
        </label>
      </div>
      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        className="hidden"
        onBlur={onBlur}
        onChange={(e) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            setPreview(URL.createObjectURL(files[0]));
            onChange(files);
          } else {
            setPreview(null);
            onChange(null);
          }
        }}
        ref={ref}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </>
  )}
/>

    </div>
  );
};

export default ImgInput;
