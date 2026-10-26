// src/context/TimerContext.tsx
import { loadJson, saveJson, STORAGE_KEYS } from "@/lib/storage";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type TimerContextValue = {
  remaining: number;
  startTimer: (totalSeconds: number) => void;
  lastDuration: number | null;
  hydrated: boolean;
};

const TimerContext = createContext<TimerContextValue | null>(null);
  const [lastDuration, setLastDuration] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [endTime, setEndTime] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number>(0);

  function startTimer(totalSeconds: number) {
    setLastDuration(totalSeconds);
    setRemaining(totalSeconds);
    setEndTime(Date.now() + totalSeconds * 1000);
  }

  useEffect(() => {
    loadJson<number | null>(STORAGE_KEYS.lastTimer, null).then((stored) => {
      setLastDuration(stored);
      setHydrated(true);
    });
  }, []);

    // 2. Save on change, but not before the load has finished
  useEffect(() => {
    if (hydrated) saveJson(STORAGE_KEYS.lastTimer, lastDuration);
  }, [lastDuration, hydrated]);

  useEffect(() => {
      if (endTime === null) {
          return;
      }
  
      const interval = setInterval(() => {
          const timeLeft = Math.ceil((endTime - Date.now()) / 1000 );
  
          if (timeLeft > 0) {
              setRemaining(timeLeft);
          } 
          else {
              setRemaining(0);
              clearInterval(interval);
          }
  
      }, 1000)
  
      return () => clearInterval(interval);
  
   }, [endTime]);

   return (
    <TimerContext.Provider value = {{ remaining, startTimer, lastDuration, hydrated}}>
        {children}
    </TimerContext.Provider>
   )

}

export function useTimer() {
    const context = useContext(TimerContext);

    // Error Handling
    if (context === null) {
        throw new Error("UseTimer only works inside TimerProvider")
    }

    return context;
}