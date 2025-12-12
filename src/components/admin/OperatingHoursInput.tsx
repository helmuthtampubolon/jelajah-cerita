import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface DayHours {
  open: string;
  close: string;
  isClosed: boolean;
}

interface OperatingHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

interface OperatingHoursInputProps {
  value: OperatingHours;
  onChange: (hours: OperatingHours) => void;
}

const DAY_LABELS: Record<keyof OperatingHours, string> = {
  monday: "Senin",
  tuesday: "Selasa",
  wednesday: "Rabu",
  thursday: "Kamis",
  friday: "Jumat",
  saturday: "Sabtu",
  sunday: "Minggu",
};

const DEFAULT_HOURS: DayHours = {
  open: "08:00",
  close: "17:00",
  isClosed: false,
};

export const getDefaultOperatingHours = (): OperatingHours => ({
  monday: { ...DEFAULT_HOURS },
  tuesday: { ...DEFAULT_HOURS },
  wednesday: { ...DEFAULT_HOURS },
  thursday: { ...DEFAULT_HOURS },
  friday: { ...DEFAULT_HOURS },
  saturday: { ...DEFAULT_HOURS },
  sunday: { ...DEFAULT_HOURS },
});

export default function OperatingHoursInput({ value, onChange }: OperatingHoursInputProps) {
  const handleDayChange = (day: keyof OperatingHours, field: keyof DayHours, newValue: string | boolean) => {
    onChange({
      ...value,
      [day]: {
        ...value[day],
        [field]: newValue,
      },
    });
  };

  const applyToAll = (day: keyof OperatingHours) => {
    const sourceHours = value[day];
    const updated: OperatingHours = {} as OperatingHours;
    
    (Object.keys(value) as Array<keyof OperatingHours>).forEach((d) => {
      updated[d] = { ...sourceHours };
    });
    
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Jam Operasional</Label>
      </div>

      <div className="space-y-2 p-3 bg-muted/50 rounded-lg border border-border">
        {(Object.keys(value) as Array<keyof OperatingHours>).map((day) => (
          <div
            key={day}
            className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
              value[day].isClosed ? "bg-muted" : "bg-background"
            }`}
          >
            {/* Day name */}
            <div className="w-16 font-medium text-sm">{DAY_LABELS[day]}</div>

            {/* Open/Close toggle */}
            <div className="flex items-center gap-2">
              <Switch
                checked={!value[day].isClosed}
                onCheckedChange={(checked) => handleDayChange(day, "isClosed", !checked)}
              />
              <span className="text-xs text-muted-foreground w-12">
                {value[day].isClosed ? "Tutup" : "Buka"}
              </span>
            </div>

            {/* Time inputs */}
            {!value[day].isClosed && (
              <>
                <Input
                  type="time"
                  value={value[day].open}
                  onChange={(e) => handleDayChange(day, "open", e.target.value)}
                  className="w-28"
                />
                <span className="text-muted-foreground">-</span>
                <Input
                  type="time"
                  value={value[day].close}
                  onChange={(e) => handleDayChange(day, "close", e.target.value)}
                  className="w-28"
                />
              </>
            )}

            {/* Apply to all button */}
            <button
              type="button"
              onClick={() => applyToAll(day)}
              className="text-xs text-primary hover:underline ml-auto"
            >
              Terapkan ke semua
            </button>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground">
        Atur jam operasional untuk setiap hari. Gunakan "Terapkan ke semua" untuk menyalin ke hari lainnya.
      </p>
    </div>
  );
}
