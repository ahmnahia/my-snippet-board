import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-10 bg-zinc-900 flex items-center ">
      <div className="container flex flex-col items-center gap-y-3 cus-hidden">
        <div className="border-b-2 border-zinc-200/20 pb-4">
          <ul className="flex max-md:flex-wrap max-md:justify-center max-md:gap-5 gap-12 text-xs text-zinc-300">
            <li className="hover:underline hover:text-white">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="hover:underline hover:text-white">
              <Link href={"/app"}>App</Link>
            </li>
            <li className="hover:underline hover:text-white">
              <Link href={"/privacy-policy"}>Privacy Policy</Link>
            </li>
            <li className="hover:underline hover:text-white">
              <Link href={"/terms-and-conditions"}>Terms & Conditions</Link>
            </li>
          </ul>
        </div>
        <div className=""></div>
        <div className="text-xs"><p>© 2025 MySnippetBoard.</p></div>
        <div></div>
      </div>
    </footer>
  );
}
