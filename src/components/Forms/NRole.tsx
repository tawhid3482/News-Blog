"use client";

import { useFormContext, Controller } from "react-hook-form";

type TSelectProps = {
  name: string;
  label?: string;
  required?: boolean;
  options: { label: string; value: string }[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // ✅ add this
};

const NRole = ({ name, label = "", required = false, options, onChange }: TSelectProps) => {
  const { control } = useFormContext();

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? `${label || name} is required` : false }}
        render={({ field, fieldState: { error } }) => (
          <>
            <select
              {...field}
              id={name}
              className={`w-full mt-2 px-4 py-2 border ${
                error ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-400 outline-none`}
              onChange={(e) => {
                field.onChange(e); // update form state
                onChange?.(e);     // call external handler if provided
              }}
            >
              <option value="">Select {label.toLowerCase()}</option>
              {options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
          </>
        )}
      />
    </div>
  );
};

export default NRole;
