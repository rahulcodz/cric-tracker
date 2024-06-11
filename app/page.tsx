import AddScores from "@/components/Scores/AddScores";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  return (
    <main className="d-flex gap-2 ">
      <Toaster />
      <AddScores />
    </main>
  );
}
