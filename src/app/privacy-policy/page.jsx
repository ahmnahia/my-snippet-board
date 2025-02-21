import BreadcrumbWrapper from "@/components/BreadcrumbWrapper";

export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <div className="py-16 flex justify-center ">
      <div className="max-w-[600px] flex-1 h-[100%] cus-hidden show">
        <BreadcrumbWrapper pagename={"Privacy Policy"} />
        <h1 className="text-6xl font-bold my-6">Privacy Policy</h1>
        <p className="my-3 text-zinc-400">
          We value your privacy and do not collect or store any of your data.
        </p>
        <p className="text-muted-foreground text-zinc-400">
          All your snippets are stored locally in the browser and are never sent
          to a server. We do not track, analyze, or share any information.
        </p>
      </div>
    </div>
  );
}
