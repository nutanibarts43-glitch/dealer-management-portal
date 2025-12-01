import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 text-sm font-medium capitalize">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="border rounded-lg p-2 w-full"
      />
    </div>
  );
}
