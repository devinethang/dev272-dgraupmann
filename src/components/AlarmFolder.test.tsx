import { userEvent } from "@testing-library/react-native";
import { useLocalSearchParams } from "expo-router";
import { renderRouter, screen } from "expo-router/testing-library";
import { Text } from "react-native";
import AlarmFolder from "./AlarmFolder";

function DetailStub() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Text>Detail for {id}</Text>;
}
const alarm = {
  id: "1",
  name: "Morning",
  time: "7:30",
  selector: "AM" as const,
  snooze: 5,
};

test("navigates to the detail route when pressed", async () => {
  const user = userEvent.setup();
  await renderRouter(
    {
      index: () => <AlarmFolder alarm={alarm} />,
      "alarms/[id]": DetailStub,
    },
    { initialUrl: "/" },
  );
  await user.press(await screen.findByText("Edit"));
  expect(await screen.findByText("Detail for 1")).toBeOnTheScreen();
});

test("shows the alarm name", async () => {
  await renderRouter(
    { index: () => <AlarmFolder alarm={alarm} /> },
    { initialUrl: "/" },
  );
  expect(await screen.findByText("Morning")).toBeOnTheScreen();
});
