# HabitFlow Panda Jungle

HabitFlow Panda Jungle is a playfully gamified, mobile-first habit tracking application where building consistency is rewarded by growing your own virtual 3D Panda companion. 

Built entirely as a robust client-side Next.js application, it requires no backend or database, leaning entirely on secure Local Storage persistence to ensure a fast, private user experience.

---

## 🚀 How to Run the Project Locally (Setup Steps)

1. **Clone the repository** (or download the source code).
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Open** [http://localhost:3000](http://localhost:3000) in your browser. Seed data will automatically populate your first visit!

---

## 🏗️ Key Decisions and Why

- **Framework (Next.js 16 App Router & React 19):** Chosen for its robust routing, fast development experience, and modern React features.
- **State Management & Persistence:** Custom React hooks (`useHabits`, `usePanda`) syncing to `localStorage`. I chose this over a backend database to keep the app lightweight, fast, and completely private. It eliminated the need for complex authentication flows for this version.
- **UI & Styling:** Tailwind CSS v4 and `shadcn/ui`. Selected to rapidly build a beautiful, accessible, and responsive mobile-first UI without wrestling with custom CSS.
- **3D Graphics:** `@react-three/fiber` and `@react-three/drei`. Chosen to bring the virtual Panda to life, providing a much more engaging and tangible reward mechanism than static images.
- **Data Model:** Designed to be flat and easily serializable. The `Habit` model stores `completedDates` as an array of ISO strings, and `schedule` as an array of days (0-6), making date math and streak calculations straightforward.

---

## 🤯 The Hardest Problem Hit and How I Solved It

The hardest problem was **calculating accurate streaks with custom schedules**. 

Most habit trackers assume a habit must be done every single day. If you miss a day, the streak breaks. However, HabitPanda allows custom schedules (e.g., gym on Mon/Wed/Fri). If a user completes their habit on Friday, their streak must remain active through Saturday and Sunday, only breaking if they fail to complete it on Monday.

**The Solution:** I built a custom pure utility function for streak calculation. Instead of just counting consecutive calendar days, the engine iterates backwards from the current date. For each day, it checks if that day of the week is in the habit's `schedule` array. 
- If the day is scheduled and completed, the streak increments.
- If the day is scheduled and *not* completed (and it's not today), the streak breaks.
- If the day is *not* scheduled (an off-day), the logic simply skips to the previous day without breaking the streak, carrying the streak over the off-days.

---

## 🤖 AI Usage (Where, How, Changes, and Rejections)

I used AI as a pair-programming partner throughout development:
- **Where & How:** I used AI to generate the initial boilerplate for the 3D Panda model using `@react-three/fiber`, write the complex logic for the streak calculator, and generate the Tailwind layout structure for the mobile-first dashboard.
- **What I Changed/Fixed:** The AI initially generated a streak calculator that assumed daily habits. I had to significantly refactor and fix its output to support the custom scheduled off-days logic described above.
- **What I Rejected:** The AI suggested setting up a Redux store for state management. I explicitly rejected this in favor of a much simpler, bespoke `localStorage` hook, which was more appropriate for a local-only application.

---


## ⭐ Stretch Goals Attempted

I successfully integrated several stretch goals to make the app stand out:
1. **Gamification Engine:** Added a dual-currency system (XP and Bamboo). XP drives the Panda's physical evolution (Baby -> Adult -> Elder), while Bamboo acts as a spendable currency.
2. **Dynamic 3D Companion:** Used React Three Fiber to render a 3D Panda whose mood and animation state react dynamically to the day's completion rate.
3. **Advanced Scheduling:** Supported custom days-of-the-week scheduling rather than just simple daily habits.
