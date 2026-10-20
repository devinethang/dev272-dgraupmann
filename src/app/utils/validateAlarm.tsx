// src/utils/validateAlarm.ts
export type AlarmData = { name: string; time: string; selector: "AM" | "PM"; };
export type AlarmErrors = Partial<Record<keyof AlarmData, string>>;

export function validateAlarm(form: AlarmData): AlarmErrors {
  const errors: AlarmErrors = {};

  if (!form.name.trim()) errors.name = "Name is required.";
  else if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";

  if (!form.time.trim()) errors.time = "Time is required.";

  if (form.selector !== "AM" && form.selector !== "PM") errors.selector = "A time of day is required.";

  return errors;
}