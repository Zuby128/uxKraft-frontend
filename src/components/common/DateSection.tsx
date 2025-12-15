import { memo } from "react";
import DatePickerField from "./DatePickerField";

export type DateFieldConfig = {
  key: string;
  label: string;
};

interface DateSectionProps {
  title: string;
  sectionKey: "planning" | "production" | "logistics";
  data?: Record<string, any>;
  fields: DateFieldConfig[];
  onChange: (field: string, value: string | null) => void;
}

function DateSection({ title, data, fields, onChange }: DateSectionProps) {
  return (
    <div className="p-4 bg-white">
      <div className="font-semibold mb-4">{title}</div>

      <div className="grid grid-cols-3 gap-4">
        {fields.map(({ key, label }) => (
          <DatePickerField
            key={key}
            label={label}
            value={data?.[key] ?? null}
            onChange={(date) => onChange(key, date as any)}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(DateSection);
