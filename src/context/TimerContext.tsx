// src/context/FavoritesContext.tsx
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type TimerContextValue = {
  remaining: number;
  startTimer: (totalSeconds: number) => void;
};

const TimerContext = createContext<TimerContextValue | null>(null);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [endTime, setEndTime] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number>(0);

  function startTimer(totalSeconds: number) {
    setRemaining(totalSeconds);
    setEndTime(Date.now() + totalSeconds * 1000);
  }

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
    <TimerContext.Provider value = {{ remaining, startTimer}}>
        {children}
    </TimerContext.Provider>
   )

}

export function useTimer() {
    const context = useContext(TimerContext);

    // Error Hnadling
    if (context === null) {
        throw new Error("UseTimer only works inside TimerProvider")
    }

    return context;
}