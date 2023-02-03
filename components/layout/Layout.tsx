import { FC, PropsWithChildren } from "react";
import Head from "next/head";

import { SideBar } from "../ui/NabBar";

interface Props {
  title: string;
  pageDescription: string;
}

export const Layout: FC<PropsWithChildren<Props>> = ({ children, title, pageDescription }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar />
      <main className={`container mx-auto h-full w-full`}>{children}</main>
    </>
  );
};
