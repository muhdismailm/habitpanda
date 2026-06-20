"use client";

import { useState } from "react";
import { useHabits } from "@/hooks/useHabits";
import { HabitForm } from "@/components/habits/HabitForm";
import { HabitFormValues } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import * as Icons from "lucide-react";
import { calculateCurrentStreak, calculateLongestStreak, normalizeDate } from "@/lib/streak";
import Link from "next/link";

export default function HabitsPage() {
  const { habits, addHabit, updateHabit, deleteHabit, isLoaded } = useHabits();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  if (!isLoaded) return null;

  const handleCreate = (data: HabitFormValues) => {
    addHabit(data);
    setIsCreateOpen(false);
  };

  const handleUpdate = (data: HabitFormValues) => {
    if (editingId) {
      updateHabit(editingId, data);
      setEditingId(null);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground">My Habits</h1>
          <p className="text-muted-foreground mt-1">Manage your daily goals and track your streaks.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>Create Habit</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Habit</DialogTitle>
              </DialogHeader>
              <HabitForm onSubmit={handleCreate} onCancel={() => setIsCreateOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {habits.length === 0 ? (
        <div className="text-center py-24 bg-card rounded-2xl border shadow-sm">
          <Icons.Leaf className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No habits yet</h2>
          <p className="text-muted-foreground mb-6">Plant the first seed to start your jungle.</p>
          <Button onClick={() => setIsCreateOpen(true)}>Create Your First Habit</Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => {
            // @ts-ignore
            const Icon = Icons[habit.icon] || Icons.Target;
            const currentStreak = calculateCurrentStreak(habit.completedDates, habit.schedule);
            const longestStreak = calculateLongestStreak(habit.completedDates, habit.schedule);

            return (
              <div key={habit.id} className="p-5 rounded-2xl border bg-card text-card-foreground shadow-sm flex flex-col gap-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl" style={{ backgroundColor: `${habit.color}15`, color: habit.color }}>
                  <Icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-tight">{habit.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {habit.schedule.length === 7 ? "Every day" : `${habit.schedule.length} days/week`}
                  </p>
                </div>
              </div>

              {/* Past 7 Days Tracker */}
              <div className="flex justify-between items-center bg-muted/30 p-2 rounded-xl border">
                {[...Array(7)].map((_, i) => {
                  const d = new Date();
                  d.setDate(d.getDate() - (6 - i));
                  const dateStr = normalizeDate(d);
                  const isScheduled = habit.schedule.includes(d.getDay());
                  const isCompleted = habit.completedDates.includes(dateStr);
                  
                  return (
                    <button
                      key={dateStr}
                      onClick={() => toggleCompletion(habit.id, d)}
                      disabled={!isScheduled}
                      className={`flex flex-col items-center gap-1 p-1 rounded-lg transition-colors ${!isScheduled ? 'opacity-30 cursor-not-allowed' : 'hover:bg-muted/80'}`}
                    >
                      <span className="text-[10px] uppercase font-semibold text-muted-foreground">
                        {d.toLocaleDateString('en-US', { weekday: 'narrow' })}
                      </span>
                      <div 
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isCompleted ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30 text-transparent'}`}
                      >
                        <Icons.Check className="w-3 h-3" />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-muted/50 p-3 rounded-xl text-center border">
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-1">Current</p>
                    <p className="text-2xl font-bold">{currentStreak} <span className="text-xs font-normal text-muted-foreground">days</span></p>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-xl text-center border">
                    <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wider mb-1">Longest</p>
                    <p className="text-2xl font-bold">{longestStreak} <span className="text-xs font-normal text-muted-foreground">days</span></p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-auto pt-4 border-t">
                  <Button variant="ghost" size="sm" className="h-8" onClick={() => setEditingId(habit.id)}>Edit</Button>
                  <Button variant="destructive" size="sm" className="h-8" onClick={() => deleteHabit(habit.id)}>Delete</Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Dialog open={!!editingId} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Habit</DialogTitle>
          </DialogHeader>
          {editingId && (
            <HabitForm
              initialValues={habits.find((h) => h.id === editingId)}
              onSubmit={handleUpdate}
              onCancel={() => setEditingId(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}