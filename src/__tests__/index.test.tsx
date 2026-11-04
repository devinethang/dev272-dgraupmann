import * as api from "@/api/alarms";
import Index from "@/app/(tabs)/index";
import { Providers } from "@/test/renderWithProviders";
import { fireEvent } from "@testing-library/react-native";
import { renderRouter, screen } from "expo-router/testing-library";

jest.mock("@/api/alarms");
const mockedApi = jest.mocked(api);

const routes = {
  index: Index,
  "alarms/[id]": () => null,
  AddAlarm: () => null,
};

function renderHome() {
  return renderRouter(routes, { initialUrl: "/", wrapper: Providers });
}

beforeEach(() => {
  mockedApi.fetchAlarms.mockResolvedValue([
    { id: "1", name: "Morning", time: "7:30", selector: "AM", snooze: 5 },
    { id: "2", name: "Gym", time: "6:00", selector: "PM", snooze: 10 },
  ]);
});

afterEach(() => jest.clearAllMocks());

test("renders the list of alarms", async () => {
  await renderHome();
  expect(await screen.findByText("Morning")).toBeOnTheScreen();
  expect(screen.getByText("Gym")).toBeOnTheScreen();
});

test("filters the list when the search bar is used", async () => {
  await renderHome();
  await screen.findByText("Morning");
  await fireEvent.changeText(
    screen.getByPlaceholderText("Search Alarms"),
    "gym",
  );
  expect(screen.getByText("Gym")).toBeOnTheScreen();
  expect(screen.queryByText("Morning")).toBeNull();
});

test("shows the error and Try again when the API fails", async () => {
  mockedApi.fetchAlarms.mockRejectedValue(new Error("Network down"));
  await renderHome();
  expect(await screen.findByText("Network down")).toBeOnTheScreen();
  expect(screen.getByText("Try again")).toBeOnTheScreen();
});
