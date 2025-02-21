import {
  CiFolderOn,
  CiSearch,
  CiExport,
  CiLock,
  CiDollar,
} from "react-icons/ci";
import { IoClipboardOutline } from "react-icons/io5";

const features = [
  {
    icon: <IoClipboardOutline />,

    title: "Snippet Creation & Customization",
    desc: "Easily create new snippets by pasting your code directly into the board and customize them freely.",
  },
  {
    icon: <CiFolderOn />,
    title: "Easy Snippet Organization",
    desc: "Group your code snippets under different folders and files for efficient management.",
  },
  {
    icon: <CiExport />,
    title: "Export & Import",
    desc: "Easily backup and restore your snippets. Export your collection for safekeeping and import it back whenever you need.",
  },
  {
    icon: <CiSearch />,
    title: "Sidebar Search",
    desc: "Quickly find snippets and navigate to them.",
  },
  {
    icon: <CiLock />,
    title: "Local & Private",
    desc: "Your snippets stay in the browser. No data is sent to servers, ensuring your code is always private.",
  },
  {
    icon: <CiDollar />,
    title: "Completely Free",
    desc: "MySnippetBoard is free to use, with no hidden charges. Manage your snippets effortlessly without any subscriptions or fees.",
  },
];

export default function Features() {
  return (
    <section className="bg-zinc-900 py-20" id="features">
      <div className="container text-center cus-hidden">
        <h1 className="text-6xl 2xl:text-8xl max-sm:text-4xl font-bold mb-6 gradient-text">Features</h1>
        <div className="flex gap-x-3 gap-y-5 flex-wrap mt-12 justify-between">
          {features.map((ef) => (
            <div
              key={ef.title}
              className="max-md:w-full md:w-[32%] border border-zinc-800 bg-zinc-800/30 rounded-md px-3 py-9 justify-start text-start"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl bg-slate-800  p-2 rounded-lg">
                  {ef.icon}
                </span>
                <h3 className="2xl:text-2xl"> {ef.title}</h3>
              </div>
              <p className="text-zinc-500 mt-5 2xl:text-md">{ef.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
