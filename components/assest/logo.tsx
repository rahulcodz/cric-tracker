"use client"
import Image from "next/image";


export default function Logo() {
    return <> <Image
        className=""
        src="/codz.svg"
        alt="Next.js logo"
        width={150}
        height={38}
        priority
    /></>
}