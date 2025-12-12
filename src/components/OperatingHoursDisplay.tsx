import { Clock, CheckCircle, XCircle } from "lucide-react";
import type { OperatingHours } from "@/lib/data";

interface OperatingHoursDisplayProps {
  hours: OperatingHours;
  compact?: boolean;
}

const DAY_LABELS: Record<keyof OperatingHours, { short: string; full: string }> = {
  monday: { short: "Sen", full: "Senin" },
  tuesday: { short: "Sel", full: "Selasa" },
  wednesday: { short: "Rab", full: "Rabu" },
  thursday: { short: "Kam", full: "Kamis" },
  friday: { short: "Jum", full: "Jumat" },
  saturday: { short: "Sab", full: "Sabtu" },
  sunday: { short: "Min", full: "Minggu" },
};

const DAY_ORDER: (keyof OperatingHours)[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

// Helper to check if it's 24 hours
const is24Hours = (hours: OperatingHours): boolean => {
  return DAY_ORDER.every(
    (day) =>
      !hours[day].isClosed &&
      hours[day].open === "00:00" &&
      (hours[day].close === "23:59" || hours[day].close === "24:00")
  );
};

// Helper to get current day
const getCurrentDay = (): keyof OperatingHours => {
  const days: (keyof OperatingHours)[] = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  return days[new Date().getDay()];
};

// Helper to check if currently open
const isCurrentlyOpen = (hours: OperatingHours): boolean => {
  const today = getCurrentDay();
  const todayHours = hours[today];

  if (todayHours.isClosed) return false;

  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;

  return currentTime >= todayHours.open && currentTime <= todayHours.close;
};

// Format time
const formatTime = (time: string): string => {
  return time;
};

export default function OperatingHoursDisplay({
  hours,
  compact = false,
}: OperatingHoursDisplayProps) {
  const currentDay = getCurrentDay();
  const isOpen = isCurrentlyOpen(hours);

  if (is24Hours(hours)) {
    return (
      <div className="flex items-center gap-2">
        <Clock className="w-4 h-4 text-primary" />
        <span className="font-medium text-primary">Buka 24 Jam</span>
      </div>
    );
  }

  if (compact) {
    const todayHours = hours[currentDay];
    return (
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {isOpen ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="font-medium text-green-600">Buka Sekarang</span>
            </>
          ) : (
            <>
              <XCircle className="w-4 h-4 text-destructive" />
              <span className="font-medium text-destructive">Tutup</span>
            </>
          )}
        </div>
        {!todayHours.isClosed && (
          <p className="text-sm text-muted-foreground">
            Hari ini: {formatTime(todayHours.open)} - {formatTime(todayHours.close)}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Status Badge */}
      <div className="flex items-center gap-2">
        {isOpen ? (
          <>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="font-medium text-green-600">Buka Sekarang</span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-destructive rounded-full" />
            <span className="font-medium text-destructive">Tutup</span>
          </>
        )}
      </div>

      {/* Full Schedule */}
      <div className="grid gap-1.5">
        {DAY_ORDER.map((day) => {
          const dayHours = hours[day];
          const isToday = day === currentDay;

          return (
            <div
              key={day}
              className={`flex items-center justify-between py-1.5 px-2 rounded text-sm ${
                isToday ? "bg-primary/10 font-medium" : ""
              }`}
            >
              <span className={isToday ? "text-primary" : "text-muted-foreground"}>
                {DAY_LABELS[day].full}
                {isToday && " (Hari ini)"}
              </span>
              {dayHours.isClosed ? (
                <span className="text-destructive">Tutup</span>
              ) : (
                <span className={isToday ? "text-primary" : ""}>
                  {formatTime(dayHours.open)} - {formatTime(dayHours.close)}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
