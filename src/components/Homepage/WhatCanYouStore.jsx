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
            <h2 className="text-4xl gradient-text"> All-In-One Place</h2>
            <p className="text-sm mt-2 text-zinc-500 2xl:text-lg">
              Always searching for or trying to remember your snippets? Worry no
              more—store and manage them effortlessly in one place!
            </p>
          </div>
          <div className="md:w-[70%]">
            <div className="flex flex-wrap gap-y-10 justify-between">
              <div className="w-[48%] px-2 max-sm:px-0">
                <div className="flex gap-2 ">
                  <span className="text-violet-600 text-2xl 2xl:text-4xl">
                    <IoCheckmark />
                  </span>
                  <div>
                    <p className="2xl:text-2xl">Web Snippets</p>
                    <p className="text-xs text-zinc-500 mt-3 2xl:text-lg">
                      Keep your frequently used HTML, CSS, and JavaScript
                      snippets organized in one place.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[48%] px-2 max-sm:px-0">
                <div className="flex gap-2 ">
                  <span className="text-violet-600 text-2xl 2xl:text-4xl">
                    <IoCheckmark />
                  </span>
                  <div>
                    <p className="2xl:text-2xl">Linux Commands</p>
                    <p className="text-xs text-zinc-500 mt-3 2xl:text-lg">
                      Save your most-used terminal commands for quick reference.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[48%] px-2 max-sm:px-0">
                <div className="flex gap-2 ">
                  <span className="text-violet-600 text-2xl 2xl:text-4xl">
                    <IoCheckmark />
                  </span>
                  <div>
                    <p className="2xl:text-2xl">SQL Queries</p>
                    <p className="text-xs text-zinc-500 mt-3 2xl:text-lg">
                      Store and reuse common database queries effortlessly.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[48%] px-2 max-sm:px-0">
                <div className="flex gap-2 ">
                  <span className="text-violet-600 text-2xl 2xl:text-4xl">
                    <IoCheckmark />
                  </span>
                  <div>
                    <p className="2xl:text-2xl">API Endpoints</p>
                    <p className="text-xs text-zinc-500 mt-3 2xl:text-lg">
                      Keep track of frequently accessed API requests.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[48%] px-2 max-sm:px-0">
                <div className="flex gap-2 ">
                  <span className="text-violet-600 text-2xl 2xl:text-4xl">
                    <IoCheckmark />
                  </span>
                  <div>
                    <p className="2xl:text-2xl">Regex Patterns</p>
                    <p className="text-xs text-zinc-500 mt-3 2xl:text-lg">
                      Save and test your most useful regular expressions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[48%] px-2 max-sm:px-0">
                <div className="flex gap-2 ">
                  <span className="text-violet-600 text-2xl 2xl:text-4xl">
                    <IoCheckmark />
                  </span>
                  <div>
                    <p className="2xl:text-2xl">AI Prompts</p>
                    <p className="text-xs text-zinc-500 mt-3 2xl:text-lg">
                      Save and organize your frequently used AI prompts for
                      ChatGPT, and other AI tools.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[48%] px-2 max-sm:px-0">
                <div className="flex gap-2 ">
                  <span className="text-violet-600 text-2xl 2xl:text-4xl">
                    <IoCheckmark />
                  </span>
                  <div>
                    <p className="2xl:text-2xl">Formulas & Calculations</p>
                    <p className="text-xs text-zinc-500 mt-3 2xl:text-lg">
                      Store frequently used mathematical or Excel formulas.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[48%] px-2 max-sm:px-0">
                <div className="flex gap-2 ">
                  <span className="text-violet-600 text-2xl 2xl:text-4xl">
                    <IoCheckmark />
                  </span>
                  <div>
                    <p className="2xl:text-2xl">Store Any Important Text</p>
                    <p className="text-xs text-zinc-500 mt-3 2xl:text-lg">
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
