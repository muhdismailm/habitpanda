import { Habit } from "@/types/habit";

export const seedHabits: Habit[] = [
  {
    id: crypto.randomUUID(),
    name: "Drink Water",
    icon: "💧",
    color: "#22c55e",
    schedule: [0,1,2,3,4,5,6],
    completedDates: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Read 20 Minutes",
    icon: "📚",
    color: "#3b82f6",
    schedule: [0,1,2,3,4,5,6],
    completedDates: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Exercise",
    icon: "💪",
    color: "#ef4444",
    schedule: [1,2,3,4,5],
    completedDates: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    name: "Meditate",
    icon: "🧘",
    color: "#a855f7",
    schedule: [0,1,2,3,4,5,6],
    completedDates: [],
    createdAt: new Date().toISOString(),
  },
];