"use client";
import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Logo from "../assest/logo";

interface ITOver {
  name: string;
  runs: number;
}

export default function AddScores() {
  const [getCurrentBowlersName, setCurrentBowlersName] = useState("");
  const [getBallActionResult, setBallActionResult] = useState("0");
  const [getCurrentOverPreview, setCurrentOverPreview] = useState([]);

  const elementRef = useRef<any>();

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

  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  console.log(getCurrentOverPreview?.filter(item => item !== "Wide" && item !== "No")?.length);

  const ballCount = getCurrentOverPreview?.filter(item => item !== "Wide" && item !== "No")?.length || 0;


  return (
    <main className="flex gap-4 items-start justify-center flex-col m-5">
      <div className="flex items-center justify-between w-full">
        {/* <code className="relative rounded bg-muted px-[15px] py-[4px] font-mono text-2xl font-semibold">
          Codz Cricket
        </code> */}
        <div><Logo /></div>
        <div>
          <Dialog>
            <DialogTrigger>
              <Button variant="destructive" className="text-md">Action</Button>
            </DialogTrigger>
            <DialogContent>
              <div className="flex flex-col gap-px">
                <DialogClose asChild>
                  <Button
                    className="rounded-none rounded-t-lg text-xl h-12 flex items-center justify-start"
                    onClick={(e) => {
                      e.preventDefault();
                      let payload = {
                        name: getCurrentBowlersName || "John",
                        runs: getCurrentOverPreview,
                      };
                      payload?.runs?.pop()
                      localStorage.setItem("current_over", JSON.stringify(payload));
                      window.location.reload();
                    }}
                  >
                    Remove previous ball
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    className="rounded-none text-xl h-12 flex items-center justify-start"
                    onClick={(e) => {
                      e.preventDefault();
                      let payload = [...getTotalInningsOver]
                      payload?.pop()
                      localStorage.setItem("totalInningOvers", JSON.stringify(payload));
                      window.location.reload();
                    }}
                  >
                    Remove previous over
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    className="rounded-none text-lg text-xl h-12 flex items-center justify-start"
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Start new inning
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    className="rounded-none text-lg text-xl h-12 flex items-center justify-start"
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          "https://6667e188f53957909ff597dd.mockapi.io/api/v1/crick-tracker/current_over/1",
                          {
                            method: "GET",
                            headers: { "content-type": "application/json" },
                          }
                        );

                        if (res.ok) {
                          const data = await res.json();
                          localStorage.setItem(
                            "totalInningOvers",
                            JSON.stringify(data?.totalInningOvers)
                          );
                          localStorage.setItem(
                            "current_over",
                            JSON.stringify(data?.current_over)
                          );
                          window.location.reload();
                          alert("Inning imported successfully!");
                        } else {
                          console.log(
                            "Request failed with status:",
                            res.status
                          );
                        }
                      } catch (error) {
                        console.error("An error occurred:", error);
                      }
                    }}
                  >
                    Import inning
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    className="rounded-none text-lg text-xl h-12 flex items-center justify-start"
                    onClick={async () => {
                      try {
                        const current_over_preveiew = JSON.parse(
                          localStorage.getItem("current_over") as string
                        );
                        const total_innings_overs = JSON.parse(
                          localStorage.getItem("totalInningOvers") as string
                        );
                        const url =
                          "https://6667e188f53957909ff597dd.mockapi.io/api/v1/crick-tracker/current_over/1";
                        const dataToUpdate = {
                          totalInningOvers: total_innings_overs,
                          current_over: current_over_preveiew,
                          id: "1",
                        };

                        const res = await fetch(url, {
                          method: "PUT",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(dataToUpdate),
                        });

                        if (res.ok) {
                          console.log("Data updated successfully!");
                          alert("Inning exported successfully!");
                        } else {
                          console.log(
                            "Request failed with status:",
                            res.status
                          );
                        }
                      } catch (error) {
                        console.error("An error occurred:", error);
                      }
                    }}
                  >
                    Export inning
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    className="rounded-none rounded-b-lg text-lg text-xl h-12 flex items-center justify-start"
                    onClick={htmlToImageConvert}
                  >
                    Download inning
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Separator className="mt-0 border-inherit" />
      <div>
        <div ref={elementRef}>
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
                        <th className="border border-slate-500 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                          {index + 1}. {data.name}
                        </th>
                        <th className="border border-slate-500 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                          {data.runs}
                        </th>
                      </tr>
                    ))}
                  <tr className="m-0 border-t-3 p-0 bg-muted">
                    <th className="border border-slate-500 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      Total Runs:
                    </th>
                    <th className="border border-slate-500 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                      {totalRuns || 0}
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-1 mt-3">
          Current Over Action
        </h4>
        <div className="bg-muted w-full p-5 rounded-lg mt-3">
          <div className="flex gap-4 items-center justify-center mt-0">
            <Input
              placeholder="Add Bowler's name"
              className="text-md"
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
              className="text-md"
              type="text"
              value={getBallActionResult}
              onChange={(e) => {
                setBallActionResult(e.target.value);
              }}
            />
            <Button
              variant="destructive"
              className="text-md"
              disabled={ballCount >= 6 ? true : false}
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
            <Button className="text-xl" onClick={() => setBallActionResult("0")}>0</Button>
            <Button className="text-xl" onClick={() => setBallActionResult("1")}>1</Button>
            <Button className="text-xl" onClick={() => setBallActionResult("2")}>2</Button>
            <Button className="text-xl" onClick={() => setBallActionResult("3")}>3</Button>
            <Button className="text-xl" onClick={() => setBallActionResult("4")}>4</Button>
            <Button className="text-xl" onClick={() => setBallActionResult("6")}>6</Button>
            <Button className="text-xl" onClick={() => setBallActionResult("Wide")}>Wide</Button>
            <Button className="text-xl" onClick={() => setBallActionResult("No")}>No</Button>
          </div>
          <Separator className="mt-5 border-inherit" />
          <div className="mt-4 text-right">
            <Button
              className="text-md"
              variant="destructive"
              disabled={ballCount === 6 ? false : true}
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
              Mark Complete ({getCurrentOverPreview?.length > 0 && getCurrentOverPreview?.filter(item => item !== "Wide" && item !== "No")?.length || 0})
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
              <Button className="text-md" key={index}>{data}</Button>
            ))}
        </div>
      </div>
    </main>
  );
}
