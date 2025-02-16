import Homepage from "@/components/Homepage/Homepage";
import Footer from "@/components/Footer";

export const metadata = {
  title: {
    default: "MySnippetBoard",
    template: "%s - MySnippetBoard",
  },
  description: "Organize, save, and manage your code snippets efficiently—all in one place."
};

export default function Home() {
  return (
    <div className="w-full">
      <main className="">
        <Homepage />
      </main>
    </div>
  );
}
