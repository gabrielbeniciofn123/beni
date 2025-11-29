import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
}

const Controls = ({ isRunning, onStart, onPause, onReset, onSkip }: ControlsProps) => {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={onReset}
        className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 transition-all duration-200"
      >
        <RotateCcw className="w-5 h-5" />
      </Button>

      <Button
        onClick={isRunning ? onPause : onStart}
        className="w-16 h-16 rounded-full shadow-timer hover:scale-105 transition-all duration-200"
      >
        {isRunning ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6 ml-0.5" />
        )}
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={onSkip}
        className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 transition-all duration-200"
      >
        <SkipForward className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Controls;
