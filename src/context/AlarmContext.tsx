import { createAlarm, updateAlarm } from "@/api/alarms";
import { Alarm, AlarmData } from "@/utils/alarmSchema";
import { createContext, ReactNode, useContext, useState } from "react";
import { alarms as seedAlarms } from "../data/alarms";

type AlarmContextValue = {
    alarms: Alarm[];
    addAlarm: (input: AlarmData) => Promise<void>;
    editAlarm: (id: string, input: AlarmData) => Promise<void>;
};

const AlarmContext = createContext<AlarmContextValue | null>(null);

export function AlarmProvider({ children }: {children: ReactNode }) {
    const [alarms, setAlarms] = useState<Alarm[]>(seedAlarms);

    const addAlarm = async (input: AlarmData) => {
        const saved = await createAlarm(input);
        setAlarms((cur) => [saved, ...cur]);
    };
    
    const editAlarm = async (id: string, input: AlarmData) => {
        const saved = await updateAlarm(id, input);
        setAlarms((cur) => cur.map((a) => (a.id === id ? saved : a))); 
    }

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