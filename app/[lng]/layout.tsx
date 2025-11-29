import "@/styles/globals.css";
import React from "react";
import cx from "classnames";
import { dir } from "i18next";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { GoogleAnalytics } from "@next/third-parties/google";
import { BiArrowToTop } from "react-icons/bi";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/shadcn/sonner";
import CookieYes from "@/components/shared/cookie-yes";
import ScrollToTop from "@/components/layout/scroll-to-top";
import { languages } from "@/i18n/settings";
import Footer from "@/components/layout/footer";
import { domain } from "@/constants";
import { useTranslation } from "@/i18n";
import { sfPro, inter } from "./fonts";
import Particles from "./particles";
import CookiesProvider from "./cookies-provider";
import ThemeProvider from "./theme-provider";

// 是否显示背景特效
const NEXT_PUBLIC_SHOW_PARTICLES = process.env.NEXT_PUBLIC_SHOW_PARTICLES;
// 是否全站置灰
const NEXT_PUBLIC_WEBSITE_GLOBAL_GRAY =
  process.env.NEXT_PUBLIC_WEBSITE_GLOBAL_GRAY;
// Google tag (gtag.js)
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ID;

const Header = dynamic(() => import("@/components/layout/header"));

type Params = Promise<{ lng: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lng } = await params;
  const { t } = await useTranslation(lng, "header"); // eslint-disable-line react-hooks/rules-of-hooks
  const { t: tc } = await useTranslation(lng, "common"); // eslint-disable-line react-hooks/rules-of-hooks
  return {
    title: t("title"),
    description: `${t("title")} - ${tc("slogan")}`,
    metadataBase: new URL(domain),
    icons: {
      icon: `${domain}/logo.png`,
    },
    manifest: `${domain}/manifest.json`,
  };
}

export async function generateStaticParams() {
  return languages.map((lng: string) => ({ lng }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { lng } = await params;

  return (
    <html
      lang={lng}
      dir={dir(lng)}
      className={NEXT_PUBLIC_WEBSITE_GLOBAL_GRAY ? "grayscale" : ""}
      suppressHydrationWarning
    >
      <body
        className={cx(
          sfPro.variable,
          inter.variable,
          "flex min-h-screen flex-col",
        )}
      >
        <CookiesProvider>
          <NextTopLoader height={1} />
          <ThemeProvider>
            {NEXT_PUBLIC_SHOW_PARTICLES && <Particles />}
            <Header lng={lng} />
            <main
              id="main"
              className="flex w-full flex-1 flex-col items-center justify-center pt-32"
            >
              {children}
            </main>
            <Footer lng={lng} />
            <Toaster />
          </ThemeProvider>
          <ScrollToTop
            smooth
            component={
              <BiArrowToTop className="mx-auto my-0 h-5 w-5 text-gray-700" />
            }
          />
        </CookiesProvider>
      </body>
      <CookieYes lng={lng} />
      {GA_TRACKING_ID && <GoogleAnalytics gaId={GA_TRACKING_ID} />}
    </html>
  );
}
