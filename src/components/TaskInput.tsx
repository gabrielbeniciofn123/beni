import { useState } from "react";
import { Plus, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskInputProps {
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TaskInput = ({ tasks, onAddTask, onToggleTask, onDeleteTask }: TaskInputProps) => {
  const [newTask, setNewTask] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask(newTask.trim());
      setNewTask("");
      setIsAdding(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Tarefas de Hoje</h3>
        {!isAdding && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAdding(true)}
            className="h-8 text-muted-foreground hover:text-foreground"
          >
            <Plus className="w-4 h-4 mr-1" />
            Adicionar
          </Button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="flex gap-2 fade-in">
          <Input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="O que você vai estudar?"
            className="flex-1"
            autoFocus
          />
          <Button type="submit" size="sm">
            Adicionar
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsAdding(false);
              setNewTask("");
            }}
          >
            <X className="w-4 h-4" />
          </Button>
        </form>
      )}

      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg bg-card border border-border transition-all duration-200 hover:shadow-card",
              task.completed && "opacity-60"
            )}
          >
            <button
              onClick={() => onToggleTask(task.id)}
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                task.completed
                  ? "bg-pomodoro-work border-pomodoro-work"
                  : "border-muted-foreground/40 hover:border-pomodoro-work"
              )}
            >
              {task.completed && <Check className="w-3 h-3 text-primary-foreground" />}
            </button>
            <span
              className={cn(
                "flex-1 text-sm transition-all duration-200",
                task.completed && "line-through text-muted-foreground"
              )}
            >
              {task.text}
            </span>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="text-muted-foreground/40 hover:text-destructive transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}

        {tasks.length === 0 && !isAdding && (
          <p className="text-center text-sm text-muted-foreground py-4">
            Nenhuma tarefa adicionada
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskInput;
