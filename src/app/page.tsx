"use client";
import Image from 'next/image'
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
    <div className="bg-white p-10 border rounded-2xl border-spacing-4 flex flex-col items-center justify-center gap-5">
    <h1 className="text-2xl">Quiz - Padrões de projeto e Framework</h1>
    <h2 className="text-2xl">Versão desenhos</h2>
    <Link href="/quiz">
      <button className="font-mono bg-green-500 p-5 border rounded-3xl ">Começar Quiz</button>
    </Link>
    </div>
    </main>
  )
}
