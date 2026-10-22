import { z } from "zod";

export const alarmSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .min(2, "Name must be at least 2 characters."),
  time: z.string().trim().min(1, "Time is required."),
  selector: z.enum(["AM", "PM"], "A time of day is required."),
});

// What the inputs hold: time is a string, because TextInput gives strings.
export type AlarmFormValues = z.input<typeof alarmSchema>;
// What you save: rating is a number.
export type AlarmData = z.output<typeof alarmSchema>;