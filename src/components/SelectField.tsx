import React from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
}

export default function SelectField({
  label,
  name,
  required,
  value,
  onChange,
  options,
}: SelectFieldProps) {
  return (
    <div className="flex flex-col w-full">
      <label className="mb-1 text-sm font-medium capitalize">{label}</label>
      <select
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="border rounded-lg p-2 w-full"
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
