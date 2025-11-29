import { Circle, CheckCircle2 } from "lucide-react";

interface SessionCounterProps {
  completedSessions: number;
  sessionsUntilLongBreak: number;
}

const SessionCounter = ({ completedSessions, sessionsUntilLongBreak }: SessionCounterProps) => {
  const sessions = Array.from({ length: sessionsUntilLongBreak }, (_, i) => i);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        {sessions.map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ${
              index < completedSessions % sessionsUntilLongBreak
                ? "scale-110"
                : "scale-100"
            }`}
          >
            {index < completedSessions % sessionsUntilLongBreak ? (
              <CheckCircle2 className="w-5 h-5 text-pomodoro-work" />
            ) : (
              <Circle className="w-5 h-5 text-muted-foreground/40" />
            )}
          </div>
        ))}
      </div>
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{completedSessions}</span>
        {" "}sessões completadas
      </p>
    </div>
  );
};

export default SessionCounter;
