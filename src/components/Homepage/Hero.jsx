import Link from "next/link";
export default function Hero() {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center text-center">
      {/* Title */}
      <h1 className="text-6xl font-bold mb-6">My Snippet Board</h1>

      {/* Short Description */}
      <p className="text-xl text-zinc-500 max-w-2xl">
        Effortlessly organize, save, and manage your code snippets in one place
      </p>

      {/* CTA Buttons */}
      <div className="mt-6 flex gap-4">
        <Link
          href={"/app"}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-500"
        >
          Start Now For Free 🚀
        </Link>
        <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100">
          Learn More 📖
        </button>
      </div>

      {/* Screenshots */}
    </div>
  );
}
