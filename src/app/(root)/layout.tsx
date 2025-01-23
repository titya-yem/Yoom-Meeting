import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Yoom meeting",
  description: "a newer generation of meeting app",
  icons: {
    icon: "/icons/logo.svg",
  },
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
