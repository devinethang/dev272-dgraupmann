import { alarmSchema, type AlarmFormValues } from "./alarmSchema";

const valid: AlarmFormValues = {
  name: "Wake up",
  time: "5:30",
  selector: "AM",
  snooze: "5",
};

// The message the schema gives for one field, or undefined if that field is fine.
function errorFor(values: AlarmFormValues, field: keyof AlarmFormValues) {
  const result = alarmSchema.safeParse(values);
  return result.success
    ? undefined
    : result.error.issues.find((issue) => issue.path[0] === field)?.message;
}

describe("alarmSchema", () => {
  test("requires a name", () => {
    expect(errorFor({ ...valid, name: "" }, "name")).toBe("Name is required.");
  });

  test("requires at least 2 characters in the name", () => {
    expect(errorFor({ ...valid, name: "K" }, "name")).toBe(
      "Name must be at least 2 characters.",
    );
  });

  test("Rejects poorly formated time", () => {
    expect(errorFor({ ...valid, time: "530" }, "time")).toBe(
      "Input time like 00:00.",
    );
  });

  test("accepts a valid alarm and converts the snooze to a number", () => {
    const result = alarmSchema.safeParse(valid);
    expect(result.success).toBe(true);
    expect(result.data?.snooze).toBe(5);
  });

  test.each(["1", "30"])("accepts snooze %p (the edges)", (snooze) => {
    expect(errorFor({ ...valid, snooze }, "snooze")).toBeUndefined();
  });

  test.each(["0", "31"])("accepts snooze %p (the edges)", (snooze) => {
    expect(errorFor({ ...valid, snooze }, "snooze")).toBeDefined();
  });
});
