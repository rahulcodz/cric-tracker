"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

interface ITOver {
  name: string;
  runs: number;
}

export default function AddScores() {
  const [getCurrentBowlersName, setCurrentBowlersName] = useState("");
  const [getBallActionResult, setBallActionResult] = useState("0");
  const [getCurrentOverPreview, setCurrentOverPreview] = useState([]);

  const [getTotalInningsOver, setTotalInningsOver] = useState<ITOver[]>([]);

  const totalRuns =
    getTotalInningsOver?.length > 0 &&
    getTotalInningsOver.reduce(
      (sum: number, player: ITOver) => sum + player.runs,
      0
    );

  const currentOverRuns =
    getCurrentOverPreview?.length > 0 &&
    getCurrentOverPreview.reduce((acc, run) => {
      if (run === "No" || run === "Wide") {
        return acc + 1;
      } else {
        return acc + parseInt(run, 10);
      }
    }, 0);

  useEffect(() => {
    const current_over_preveiew = JSON.parse(
      localStorage.getItem("current_over") as string
    );
    const total_innings_overs = JSON.parse(
      localStorage.getItem("totalInningOvers") as string
    );
    setCurrentOverPreview(current_over_preveiew?.runs);
    setCurrentBowlersName(current_over_preveiew?.name);
    setTotalInningsOver(total_innings_overs || []);
  }, []);

  return (
    <main className="flex gap-4 items-start justify-center flex-col m-5">
      <div className="flex items-center justify-between w-full">
        <code className="relative rounded bg-muted px-[15px] py-[4px] font-mono text-2xl font-semibold">
          Tracker
        </code>
        <Button
          disabled={getCurrentOverPreview?.length > 0 ? true : false}
          variant="destructive"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Start New Inning
        </Button>
      </div>
      <Separator className="mt-0 border-inherit" />
      <div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-1">
          Score (Current Inning)
        </h4>
        <div className="w-full p-0 rounded-lg mt-0">
          <div className="my-2 w-full overflow-y-auto">
            <table className="w-full">
              <thead>
                {getTotalInningsOver.length > 0 &&
                  getTotalInningsOver.map((data, index) => (
                    <tr className="m-0 border-t-3 p-0" key={index}>
                      <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                        {index+1}. {data.name}
                      </th>
                      <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                        {data.runs}
                      </th>
                    </tr>
                  ))}
                <tr className="m-0 border-t-3 p-0 bg-muted">
                  <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    Total Runs:
                  </th>
                  <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    {totalRuns || 0}
                  </th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-1 mt-3">
          Current Over action
        </h4>
        <div className="bg-slate-300 w-full p-5 rounded-lg mt-3">
          <div className="flex gap-4 items-center justify-center mt-0">
            <Input
              placeholder="Add Bowler's name"
              disabled={getCurrentOverPreview?.length > 0 ? true : false}
              type="text"
              value={getCurrentBowlersName}
              onChange={(e) => {
                setCurrentBowlersName(e.target.value);
              }}
            />
          </div>
          <div className="flex gap-4 items-center justify-center mt-3">
            <Input
              placeholder="Add Ball Action"
              disabled
              type="text"
              value={getBallActionResult}
              onChange={(e) => {
                setBallActionResult(e.target.value);
              }}
            />
            <Button
              variant="destructive"
              onClick={(e) => {
                e.preventDefault();
                let payload = {
                  name: getCurrentBowlersName || "John",
                  runs:
                    getCurrentOverPreview?.length > 0
                      ? [...getCurrentOverPreview, getBallActionResult]
                      : [getBallActionResult],
                };
                localStorage.setItem("current_over", JSON.stringify(payload));
                window.location.reload();
              }}
            >
              Add
            </Button>
          </div>
          <div className="flex gap-4 flex-wrap items-center justify-center mt-3">
            <Button onClick={() => setBallActionResult("0")}>0</Button>
            <Button onClick={() => setBallActionResult("1")}>1</Button>
            <Button onClick={() => setBallActionResult("2")}>2</Button>
            <Button onClick={() => setBallActionResult("3")}>3</Button>
            <Button onClick={() => setBallActionResult("4")}>4</Button>
            <Button onClick={() => setBallActionResult("6")}>6</Button>
            <Button onClick={() => setBallActionResult("Wide")}>Wide</Button>
            <Button onClick={() => setBallActionResult("No")}>No</Button>
          </div>
          <Separator className="mt-5 border-inherit" />
          <div className="mt-4 text-right">
            <Button
              variant="destructive"
              onClick={(e) => {
                e.preventDefault();
                const payload = [
                  ...getTotalInningsOver,
                  { name: getCurrentBowlersName, runs: currentOverRuns },
                ];
                localStorage.setItem(
                  "totalInningOvers",
                  JSON.stringify(payload)
                );
                localStorage.removeItem("current_over");
                window.location.reload();
              }}
            >
              Mark Complete
            </Button>
          </div>
        </div>
        {getCurrentOverPreview?.length > 0 && (
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-1 mt-3">
            Preview ({getCurrentBowlersName} - {currentOverRuns})
          </h4>
        )}
        <div className="max-w-full flex gap-4 flex-wrap items-center justify-center mt-3">
          {getCurrentOverPreview?.length > 0 &&
            getCurrentOverPreview.map((data, index) => (
              <Button key={index}>{data}</Button>
            ))}
        </div>
      </div>
    </main>
  );
}
