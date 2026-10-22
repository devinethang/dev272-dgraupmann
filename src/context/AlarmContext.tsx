import { Alarm } from "@/utils/alarmSchema";
import { createContext, ReactNode, useContext, useState } from "react";
import { alarms as seedAlarms } from "../data/alarms";

type AlarmContextValue = {
    alarms: Alarm[];
    addAlarm: (alarm: Alarm) => void;
    editAlarm: (alarm: Alarm) => void;
};

const AlarmContext = createContext<AlarmContextValue | null>(null);

export function AlarmProvider({ children }: {children: ReactNode }) {
    const [alarms, setAlarms] = useState<Alarm[]>(seedAlarms);

    const addAlarm = (alarm: Alarm) => setAlarms((cur) => [...cur, alarm]);
    const editAlarm = (alarm: Alarm) => setAlarms((cur) => cur.map((a) => (addAlarm.id === alarms.id ? alarm : a)));

    return (
        <AlarmContext.Provider value={{ alarms, addAlarm, editAlarm }}>
            {children}
        </AlarmContext.Provider>
    )
}

export function useAlarms() {
    const ctx = useContext(AlarmContext);
    if (!ctx) throw new Error("useAlarms must be used inside AlarmProvider");
    return ctx;
}