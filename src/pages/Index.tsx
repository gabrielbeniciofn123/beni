import { useState } from "react";
import Timer from "@/components/Timer";
import Controls from "@/components/Controls";
import ModeSelector from "@/components/ModeSelector";
import SessionCounter from "@/components/SessionCounter";
import TaskInput from "@/components/TaskInput";
import { usePomodoro } from "@/hooks/usePomodoro";
import { Clock } from "lucide-react";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const Index = () => {
  const {
    mode,
    timeLeft,
    totalTime,
    isRunning,
    completedSessions,
    sessionsUntilLongBreak,
    handleModeChange,
    handleStart,
    handlePause,
    handleReset,
    handleSkip,
  } = usePomodoro();

  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (text: string) => {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, completed: false },
    ]);
  };

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg text-foreground">Pomodoro</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 gap-8">
        {/* Mode Selector */}
        <div className="fade-in">
          <ModeSelector currentMode={mode} onModeChange={handleModeChange} />
        </div>

        {/* Timer */}
        <div className="fade-in" style={{ animationDelay: "0.1s" }}>
          <Timer
            timeLeft={timeLeft}
            totalTime={totalTime}
            isRunning={isRunning}
            mode={mode}
          />
        </div>

        {/* Controls */}
        <div className="fade-in" style={{ animationDelay: "0.2s" }}>
          <Controls
            isRunning={isRunning}
            onStart={handleStart}
            onPause={handlePause}
            onReset={handleReset}
            onSkip={handleSkip}
          />
        </div>

        {/* Session Counter */}
        <div className="fade-in" style={{ animationDelay: "0.3s" }}>
          <SessionCounter
            completedSessions={completedSessions}
            sessionsUntilLongBreak={sessionsUntilLongBreak}
          />
        </div>

        {/* Tasks */}
        <div className="w-full max-w-md mt-4 fade-in" style={{ animationDelay: "0.4s" }}>
          <TaskInput
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full px-6 py-4 text-center">
        <p className="text-xs text-muted-foreground">
          Técnica Pomodoro — Foque por 25 minutos, descanse por 5
        </p>
      </footer>
    </main>
  );
};

export default Index;
