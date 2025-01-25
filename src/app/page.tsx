import Link from "next/link";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-purple-600">Welcome to Next.js</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center sm:text-left">
          Explore the list of countries and learn more about them.
        </p>
        <div className="flex gap-4 items-center">
          <Link
            href="/countries"
            className="rounded-full border border-solid border-purple-600 text-purple-600 transition-colors flex items-center justify-center hover:bg-purple-600 hover:text-white text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Go to Countries
          </Link>
        </div>
      </main>
    </div>
  );
}
