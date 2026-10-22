import { z } from "zod";

export const alarmSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required.")
    .min(2, "Name must be at least 2 characters.")
  ,

  time: z.string().trim().min(1, "Time is required.")
    .regex(/^\d{1,2}:\d{2}$/, "Input time like 00:00.")
  ,

  selector: z.enum(["AM", "PM"], "A time of day is required."),

  snooze: z.coerce
    .number<string>("Snooze must be a number.")
    .int("Snooze must be a whole number.")
    .min(1, "Snooze must be 1 to 30 minutes.")
    .max(30, "Snooze must be 1 to 30 minutes.")
  ,

});

// What the inputs hold: time is a string, because TextInput gives strings.
export type AlarmFormValues = z.input<typeof alarmSchema>;
// What you save: rating is a number.
export type AlarmData = z.output<typeof alarmSchema>;
export type Alarm = AlarmData & { id: string };