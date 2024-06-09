import AddScores from "@/components/Scores/AddScores";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="d-flex gap-2 ">
      <AddScores />
    </main>
  );
}
