import BreadcrumbWrapper from "@/components/BreadcrumbWrapper";

export const metadata = {
  title: "Terms and Conditions",
};

export default function TermsAndConditions() {
  return (
    <div className="py-16 flex justify-center bg-neutral-800 text-white">
      <div className="container max-w-[600px] flex-1 h-[100%] cus-hidden show">
        <BreadcrumbWrapper pagename={"Terms and Conditions"} />
        <h1 className="text-4xl max-sm:text-3xl font-bold my-6">Terms and Conditions</h1>
        <p className="mt-4">
          <b>Last Updated:</b>{" "}
          <span className="text-zinc-400">28 February, 2025</span>
        </p>
        <p className="mt-4 text-zinc-400">
          Welcome to MySnippetBoard! By using our service, you agree to comply
          with and be bound by the following terms and conditions. Please read
          them carefully.
        </p>
        <ul className="mt-4 [&>li]:list-decimal [&>li]:mt-4 [&>li]:ml-4 text-xl">
          <li>
            <div>
              <h3 className="text-xl">Acceptance of Terms</h3>
              <p className="mt-3 text-zinc-400 text-lg">
                By accessing or using MySnippetBoard, you agree to these terms
                and conditions. If you do not agree, please do not use our
                service.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h3 className="text-xl">Description of Service</h3>
              <p className="mt-3 text-zinc-400 text-lg">
                MySnippetBoard allows users to create, organize, and manage code
                snippets under different folders or files. The service is
                designed for personal use.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h3 className="text-xl">Limitation of Liability</h3>
              <p className="mt-3 text-zinc-400 text-lg">
                MySnippetBoard is provided "as is" without any warranties. We
                are not liable for any loss of data, service interruptions, or
                any damages arising from your use of the service.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h3 className="text-xl"> Local Storage Disclaimer</h3>
              <p className="mt-3 text-zinc-400 text-lg">
                All data is stored locally in your browser. MySnippetBoard does
                not upload or transmit any user content to servers, so users are
                free to upload whatever they wish without restriction.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h3 className="text-xl">Changes to Terms</h3>
              <p className="mt-3 text-zinc-400 text-lg">
                We reserve the right to modify these terms at any time. We will
                notify users of any changes by updating the terms on our
                website.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
