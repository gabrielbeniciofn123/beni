import { useEffect, useRef } from "react";

interface TimerProps {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  mode: "work" | "break" | "longBreak";
}

const Timer = ({ timeLeft, totalTime, isRunning, mode }: TimerProps) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  
  const circumference = 2 * Math.PI * 140;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getStrokeColor = () => {
    switch (mode) {
      case "work":
        return "hsl(var(--pomodoro-work))";
      case "break":
        return "hsl(var(--pomodoro-break))";
      case "longBreak":
        return "hsl(var(--pomodoro-long-break))";
    }
  };

  const getBgColor = () => {
    switch (mode) {
      case "work":
        return "hsl(var(--pomodoro-work) / 0.1)";
      case "break":
        return "hsl(var(--pomodoro-break) / 0.1)";
      case "longBreak":
        return "hsl(var(--pomodoro-long-break) / 0.1)";
    }
  };

  return (
    <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
      {/* Background glow */}
      <div 
        className={`absolute inset-0 rounded-full blur-3xl opacity-30 transition-all duration-500 ${
          isRunning ? "scale-110" : "scale-100"
        }`}
        style={{ backgroundColor: getStrokeColor() }}
      />
      
      {/* SVG Ring */}
      <svg className="absolute w-full h-full -rotate-90 transform">
        {/* Background ring */}
        <circle
          cx="50%"
          cy="50%"
          r="140"
          fill="none"
          stroke={getBgColor()}
          strokeWidth="8"
        />
        {/* Progress ring */}
        <circle
          cx="50%"
          cy="50%"
          r="140"
          fill="none"
          stroke={getStrokeColor()}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="timer-ring"
          style={{
            filter: isRunning ? `drop-shadow(0 0 10px ${getStrokeColor()})` : "none",
          }}
        />
      </svg>

      {/* Timer display */}
      <div className="relative z-10 flex flex-col items-center">
        <span className="timer-display text-6xl sm:text-7xl font-semibold tracking-tight text-foreground">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
        <span className="mt-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
          {mode === "work" ? "Foco" : mode === "break" ? "Pausa" : "Pausa Longa"}
        </span>
      </div>
    </div>
  );
};

export default Timer;
