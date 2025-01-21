"use client";
import { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar";

export function AppSidebar({ snippets }) {
  //   const { open } = useSidebar();
  const [filteredSnippets, setFilteredSnippets] = useState(undefined);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    if (!searchString) {
      setFilteredSnippets(snippets);
    }
  }, [snippets]);

  return (
    <div style={{ position: "absolute" }}>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup>
            <SidebarGroupLabel>Search</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <div className="my-1 flex items-center border-[1px] border-zinc-200 px-2 rounded-lg max-w-[300px] bg-zinc-50/60 dark:bg-zinc-800/60 ">
                    <label htmlFor="search-input">
                      <IoSearch className="text-xl me-2 max-sm:text-xl max-sm:me-0" />
                    </label>
                    <input
                      id="search-input"
                      type="text"
                      className="p-3 bg-transparent outline-none text-xs"
                      placeholder="Search for snippets."
                    />
                  </div>
                </SidebarMenuItem>
                {snippets.map((eachSnippet) => (
                  <SidebarMenuItem
                    key={eachSnippet.id}
                    className="mt-2 border border-zinc-400 p-2 rounded-lg overflow-hidden max-h-[100px] hover:cursor-pointer hover:opacity-70"
                  >
                    <div>
                      <p>{eachSnippet.title}</p>
                      <p className="text-zinc-400">{eachSnippet.content}</p>
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
