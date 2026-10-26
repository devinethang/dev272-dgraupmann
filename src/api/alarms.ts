// src/api/alarms.ts
import { supabase } from "@/lib/supabase";
import { Alarm, AlarmData } from "@/utils/alarmSchema";

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

export async function createAlarm(input: AlarmData): Promise<Alarm> {
  const { data, error } = await supabase.from("alarm").insert(input).select().single();
  if (error) throw error;
  return data;
}

export async function updateAlarm(id: string, input: AlarmData): Promise<Alarm> {
  const { data, error } = await supabase.from("alarm").update(input).eq("id", id).select().single();
  if (error) throw error;
  return data;
}