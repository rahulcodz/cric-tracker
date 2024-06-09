"use client"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

const totalOvers = [
    { name: "Ayush", runs: 12 },
    { name: "Rahul", runs: 3 },
    { name: "John", runs: 12 }
];

export default function AddScores() {
    const [getCurrentBowlersName, setCurrentBowlersName] = useState("")
    const [getBallActionResult, setBallActionResult] = useState("")
    const [getCurrentOverPreview, setCurrentOverPreview] = useState([])

    const totalRuns = totalOvers.reduce((sum, player) => sum + player.runs, 0);

    useEffect(() => {
        const current_over_preveiew = JSON.parse(localStorage.getItem("current_over") as string)
        setCurrentOverPreview(current_over_preveiew.runs)
    }, [])

    return (
        <main className="flex gap-4 items-start justify-center flex-col m-5" >
            <Separator className="mt-5 border-inherit" />
            <div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-1">
                    Score (Current Inning)
                </h4>
                <div className="w-full p-0 rounded-lg mt-0">
                    <div className="my-2 w-full overflow-y-auto">
                        <table className="w-full">
                            <thead>
                                {totalOvers.length > 0 && totalOvers.map((data, index) => (
                                    <tr className="m-0 border-t-3 p-0" key={index}>
                                        <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                                            {data.name}
                                        </th>
                                        <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                                            {data.runs}
                                        </th>
                                    </tr>))}
                                <tr className="m-0 border-t-3 p-0 bg-muted">
                                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                                        Total Runs:
                                    </th>
                                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                                        {totalRuns}
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
                        <Input placeholder="Add Bowler's name" type="text" value={getCurrentBowlersName} onChange={(e) => {
                            setCurrentBowlersName(e.target.value)
                        }} />
                    </div>
                    <div className="flex gap-4 items-center justify-center mt-3">
                        <Input placeholder="Add Ball Action" type="text" value={getBallActionResult} onChange={(e) => {
                            setBallActionResult(e.target.value)
                        }} />
                        <Button variant="destructive" onClick={(e) => {
                            e.preventDefault()
                            const current = { name: getCurrentBowlersName || "Rahul", runs: ["1", "2", "Wide", "No", "6"] }
                            localStorage.setItem("current_over", JSON.stringify(current))
                        }}>Add</Button>
                    </div>
                    <div className="flex gap-4 items-center justify-center mt-3">
                        <Button onClick={() => setBallActionResult("1")}>1</Button>
                        <Button onClick={() => setBallActionResult("2")}>2</Button>
                        <Button onClick={() => setBallActionResult("3")}>3</Button>
                        <Button onClick={() => setBallActionResult("4")}>4</Button>
                        <Button onClick={() => setBallActionResult("6")}>6</Button>
                    </div>
                    <div className="flex gap-4 items-start justify-center mt-3">
                        <Button onClick={() => setBallActionResult("Wide")}>Wide</Button>
                        <Button onClick={() => setBallActionResult("No")}>No</Button>
                    </div>
                    <Separator className="mt-5 border-inherit" />
                    <div className="mt-4 text-right">
                        <Button variant="destructive">
                            Mark Complete
                        </Button>
                    </div>
                </div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mx-1 mt-3">
                    Current Over Preview (John -14)
                </h4>
                <div className="max-w-full flex gap-4 flex-wrap items-center justify-center mt-3">
                    {getCurrentOverPreview.length > 0 && getCurrentOverPreview.map((data, index) => (<Button key={index}>{data}</Button>))}
                </div>
            </div>
        </main>
    );
}
