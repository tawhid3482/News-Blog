"use client";

import { useFormContext, Controller } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

const NInput = ({
  name,
  label = "",
  type = "text",
  placeholder = "",
  required = false,
}: TInputProps) => {
  const { control } = useFormContext();

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label || name} is required` : false }}
        render={({ field, fieldState: { error } }) => (
          <>
            {type === "textarea" ? (
              <textarea
                {...field}
                id={name}
                placeholder={placeholder || label}
                rows={4}
                className={`w-full px-4 py-2 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y`}
              />
            ) : (
              <input
                {...field}
                id={name}
                type={type}
                placeholder={placeholder || label}
                className={`w-full px-4 py-2 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
              />
            )}

            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default NInput;
