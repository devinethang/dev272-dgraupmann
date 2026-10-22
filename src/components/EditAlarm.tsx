import { AlarmData, validateAlarm } from "@/app/utils/alarmSchema";
import { useAlarms } from "@/context/AlarmContext";
import { useRouter } from "expo-router";

export default function handleSubmit({form}: {form: AlarmData}) {

const router = useRouter();
const { addPlace } = useAlarms();

const isValid = Object.keys(validateAlarm(form)).length === 0;

const handleSubmit = () => {
  const nextErrors = validateAlarm(form);
  setErrors(nextErrors);
  if (Object.keys(nextErrors).length > 0) return;

  editAlarm({
    id: Date.now().toString(),
    name: form.name.trim(),
    time: form.time.trim(),
    selector: form.selector,
  });
  router.back();

  function editAlarm({form}: {form: AlarmData}) {

  }
};

}