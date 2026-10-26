// src/api/alarms.ts
import { supabase } from "@/lib/supabase";

export type Alarm = {
  id: string;
  name: string;
  time: string;
  selector: string;
  snooze: Int16Array;
};

export type NewAlarm = Omit<Alarm, "id" | "created_at">;

export async function fetchAlarms(): Promise<Alarm[]> {
  const { data, error } = await supabase
    .from("alarm")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function fetchAlarm(id: string): Promise<Alarm | null> {
  const { data, error } = await supabase.from("alarm").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function createAlarm(input: NewAlarm): Promise<Alarm> {
  const { data, error } = await supabase.from("alarm").insert(input).select().single();
  if (error) throw error;
  return data;
}