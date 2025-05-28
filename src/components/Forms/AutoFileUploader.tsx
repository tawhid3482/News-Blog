"use client";

import { ChangeEvent, ReactElement } from "react";

interface IFileUploadButton {
  name: string;
  label?: string;
  accept?: string;
  icon?: ReactElement;
  variant?: "contained" | "text"| "icon";
  onFileUpload: (file: File) => void;
}

const AutoFileUploader = ({
  name,
  label = "",
  accept,
  icon,
  variant = "contained",
  onFileUpload,
}: IFileUploadButton) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div>
      <label
        htmlFor={name}
        className={`inline-flex items-center gap-2 cursor-pointer rounded ${
          variant === "contained"
            ? "bg-blue-600 hover:bg-blue-700 text-white"
            : "text-blue-600 hover:underline"
        } px-4 py-2 text-sm font-medium transition duration-150`}
      >
        {icon}
        {label}
        <input
          id={name}
          type="file"
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default AutoFileUploader;
