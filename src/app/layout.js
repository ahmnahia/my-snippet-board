import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: {
    default: "MySnippetBoard",
    template: "%s - MySnippetBoard",
  },
  description:
    "Organize, save, and manage your code snippets efficiently—all in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        <ThemeProvider attribute={"class"} defaultTheme="dark">
          <div className="flex-grow">{children}</div>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon={JSON.stringify({ token: process.env.CF_WA_TOKEN })}
        ></script>
      </body>
    </html>
  );
}
