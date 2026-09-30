export type Alarm = {
    id: string;
    name: string;
    time: string;
    selector: string;
}

export const alarms: Alarm[] = [
    {
        id: "1",
        name: "The First",
        time: "11:53",
        selector: "am",
    },
]