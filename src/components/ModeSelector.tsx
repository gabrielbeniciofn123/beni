import { cn } from "@/lib/utils";

type Mode = "work" | "break" | "longBreak";

interface ModeSelectorProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

const modes: { key: Mode; label: string; time: string }[] = [
  { key: "work", label: "Foco", time: "25 min" },
  { key: "break", label: "Pausa", time: "5 min" },
  { key: "longBreak", label: "Pausa Longa", time: "15 min" },
];

const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-secondary/50 rounded-full">
      {modes.map((mode) => (
        <button
          key={mode.key}
          onClick={() => onModeChange(mode.key)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
            currentMode === mode.key
              ? "bg-card text-foreground shadow-card"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <span className="hidden sm:inline">{mode.label}</span>
          <span className="sm:hidden">{mode.time}</span>
        </button>
      ))}
    </div>
  );
};

export default ModeSelector;
