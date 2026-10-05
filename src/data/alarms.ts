export type Alarm = {
    id: string;
    name: string;
    time: string;
    selector: string;
}

export const alarms: Alarm[] = [
    {
        id: "1",
        name: "Wake up",
        time: "5:30",
        selector: "am",
    },
    {
        id: "2",
        name: "Shower",
        time: "6:00",
        selector: "am",
    },
    {
        id: "3",
        name: "Head out",
        time: "7:45",
        selector: "am",
    },
    {
        id: "4",
        name: "Lunch",
        time: "1:00",
        selector: "pm",
    },
    {
        id: "5",
        name: "Break",
        time: "3:00",
        selector: "pm",
    },
    {
        id: "6",
        name: "Head Home",
        time: "5:00",
        selector: "pm",
    },
    {
        id: "7",
        name: "Make Dinner",
        time: "6:30",
        selector: "pm",
    },
    {
        id: "1",
        name: "Bed",
        time: "10:00",
        selector: "pm",
    }
]