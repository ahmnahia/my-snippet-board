import { IoCheckmark } from "react-icons/io5";

export default function WhatCanYouStore() {
  return (
    <section className="bg-neutral-800 py-20">
      <div className="container text-center cus-hidden">
        {/* <h1 className="text-6xl max-sm:text-4xl font-bold mb-6">Use Cases</h1> */}
        <div className="flex max-md:flex-wrap justify-center text-start  gap-5">
          <div className="md:w-[27%] max-md:text-center">
            <p className="text-xs text-violet-600">
              Save your daily used snippets
            </p>
            <h4 className="text-4xl"> All-In-One Place</h4>
            <p className="text-sm mt-2 text-zinc-500">
              Always searching for or trying to remember your snippets? Worry no
              more—store and manage them effortlessly in one place!
            </p>
          </div>
          <div className="md:w-[70%]">

          <div className="flex flex-wrap gap-y-10">
            <div className="w-[48%] px-2 max-sm:px-0">
              <div className="flex gap-2 ">
                <span className="text-violet-600 text-2xl">
                  <IoCheckmark />
                </span>
                <div>
                  <p>Web Snippets</p>
                  <p className="text-xs text-zinc-500 mt-3">
                    Keep your frequently used HTML, CSS, and JavaScript snippets
                    organized in one place.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[48%] px-2 max-sm:px-0">
              <div className="flex gap-2 ">
                <span className="text-violet-600 text-2xl">
                  <IoCheckmark />
                </span>
                <div>
                  <p>Linux Commands</p>
                  <p className="text-xs text-zinc-500 mt-3">
                    Save your most-used terminal commands for quick reference.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[48%] px-2 max-sm:px-0">
              <div className="flex gap-2 ">
                <span className="text-violet-600 text-2xl">
                  <IoCheckmark />
                </span>
                <div>
                  <p>SQL Queries</p>
                  <p className="text-xs text-zinc-500 mt-3">
                    Store and reuse common database queries effortlessly.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[48%] px-2 max-sm:px-0">
              <div className="flex gap-2 ">
                <span className="text-violet-600 text-2xl">
                  <IoCheckmark />
                </span>
                <div>
                  <p>API Endpoints</p>
                  <p className="text-xs text-zinc-500 mt-3">
                    Keep track of frequently accessed API requests.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[48%] px-2 max-sm:px-0">
              <div className="flex gap-2 ">
                <span className="text-violet-600 text-2xl">
                  <IoCheckmark />
                </span>
                <div>
                  <p>Regex Patterns</p>
                  <p className="text-xs text-zinc-500 mt-3">
                    Save and test your most useful regular expressions.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[48%] px-2 max-sm:px-0">
              <div className="flex gap-2 ">
                <span className="text-violet-600 text-2xl">
                  <IoCheckmark />
                </span>
                <div>
                  <p>AI Prompts</p>
                  <p className="text-xs text-zinc-500 mt-3">
                    Save and organize your frequently used AI prompts for
                    ChatGPT, and other AI tools.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[48%] px-2 max-sm:px-0">
              <div className="flex gap-2 ">
                <span className="text-violet-600 text-2xl">
                  <IoCheckmark />
                </span>
                <div>
                  <p>Formulas & Calculations</p>
                  <p className="text-xs text-zinc-500 mt-3">
                    Store frequently used mathematical or Excel formulas.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-[48%] px-2 max-sm:px-0">
              <div className="flex gap-2 ">
                <span className="text-violet-600 text-2xl">
                  <IoCheckmark />
                </span>
                <div>
                  <p>Store Any Important Text</p>
                  <p className="text-xs text-zinc-500 mt-3">
                    Basically store any kind of text that you might need to
                    return to later.
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
