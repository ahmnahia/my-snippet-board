import { SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: {
    default: "MySnippetBoard",
    template: "%s - MySnippetBoard",
  },
  description: "Organize, save, and manage your code snippets efficiently—all in one place."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased`}>
        {/* <SidebarProvider> */}
          <ThemeProvider attribute={"class"} defaultTheme="dark">
            <div className="flex-grow">{children}</div>
            <Footer />
            <Toaster />
          </ThemeProvider>
        {/* </SidebarProvider> */}
      </body>
    </html>
  );
}
