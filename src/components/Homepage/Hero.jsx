import Link from "next/link";
export default function Hero() {
  return (
    <section className="bg-neutral-800">
      <div className="w-full h-[100vh] flex flex-col items-center justify-center text-center container cus-hidden">
        {/* Title */}
        <h1 className="text-6xl 2xl:text-8xl max-sm:text-4xl font-bold mb-6 gradient-text">
          My Snippet Board
        </h1>

        {/* Short Description */}
        <p className="text-xl 2xl:text-2xl text-zinc-500 max-w-2xl">
          Efficiently organize, save, and manage your code snippets in one place
        </p>

        {/* Video */}
        <div className="w-[900px] 2xl:w-[1200px] max-lg:w-[100%] rounded-xl my-6">
          <video
            className="w-full h-full  rounded-lg pointer-events-none"
            autoPlay
            muted
            loop
          >
            <source src="/videos/demo2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* CTA Buttons */}
        <div className="mt-6 flex gap-4">
          <Link
            href={"/app"}
            className="px-6  2xl:text-2xl py-3 bg-violet-600 text-white rounded-lg shadow-md hover:bg-violet-500"
          >
            Try it For Free
          </Link>
          {/* <button className="px-6 py-3 border border-gray-300 text-white rounded-lg hover:bg-gray-100 hover:text-black">
            Learn More
          </button> */}
        </div>
      </div>
    </section>
  );
}
