import { Alarm } from "@/utils/alarmSchema";

export const alarms: Alarm[] = [
    {
        id: "1",
        name: "Wake up",
        time: "5:30",
        selector: "AM",
        snooze: 5,
    },
    {
        id: "2",
        name: "Shower",
        time: "6:00",
        selector: "AM",
        snooze: 5,
    },
    {
        id: "3",
        name: "Head out",
        time: "7:45",
        selector: "AM",
        snooze: 5,
    },
    {
        id: "4",
        name: "Lunch",
        time: "1:00",
        selector: "PM",
        snooze: 5,
    },
    {
        id: "5",
        name: "Break",
        time: "3:00",
        selector: "PM",
        snooze: 5,
    },
    {
        id: "6",
        name: "Head Home",
        time: "5:00",
        selector: "PM",
        snooze: 5,
    },
    {
        id: "7",
        name: "Make Dinner",
        time: "6:30",
        selector: "PM",
        snooze: 5,
    },
    {
        id: "8",
        name: "Bed",
        time: "10:00",
        selector: "PM",
        snooze: 5,
    }
]