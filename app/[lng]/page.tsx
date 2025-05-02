"use client";
import React, { use, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Balancer from "react-wrap-balancer";
import Marquee from "react-fast-marquee";
import { RoughNotation } from "react-rough-notation";
import {
  MdOutlinePrivacyTip,
  MdDevices,
  MdOutlinePaid,
  MdOutlineDashboardCustomize,
} from "react-icons/md";
import {
  RiCommunityLine,
  RiDownload2Line,
  RiOpenSourceLine,
  RiHeart3Line,
} from "react-icons/ri";
import { FaBlog } from "react-icons/fa";
import Card from "@/components/home/card";
import Comment from "@/components/home/comment";
import { useAppTheme } from "@/lib/hooks";
import { useTranslation } from "@/i18n/client";
import { allPosts } from "contentlayer/generated";

type Params = Promise<{ lng: string }>;

export default function Home({ params }: { params: Params }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "common");
  const { t: tf } = useTranslation(lng, "home");
  const { t: th } = useTranslation(lng, "header");
  const { t: ts } = useTranslation(lng, "support");
  const { t: tm } = useTranslation(lng, "comments");

  const { resolvedTheme: theme } = useAppTheme();

  const post = allPosts
    .filter((post) => post.slug.startsWith(`${lng}/blog`))
    .sort((a, b) => {
      return new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1;
    })
    .at(0);

  const SectionTip = useCallback(
    ({
      title,
      children,
      className,
    }: {
      title: string;
      children: React.ReactNode;
      className?: string;
    }) => {
      return (
        <div
          className={`animate-fade-up mt-14 w-full max-w-screen-xl px-5 xl:px-0 ${className || ""}`}
        >
          <div className="flex flex-row flex-nowrap items-center justify-center text-center text-3xl before:mr-5 before:h-[1px] before:max-w-xs before:flex-1 before:border-b-[1px] before:border-dashed before:border-b-gray-300 before:content-[''] after:ml-5 after:h-[1px] after:max-w-xs after:flex-1 after:border-b-[1px] after:border-dashed after:border-b-gray-300 after:content-[''] dark:before:border-b-gray-600 dark:after:border-b-gray-600">
            {title}
          </div>
          {children}
        </div>
      );
    },
    [],
  );

  const DynamicSection = useCallback(
    ({
      title,
      links,
      className,
    }: {
      title: string;
      links: any[];
      className?: string;
    }) => {
      return (
        <SectionTip title={title} className={className}>
          <div className="animate-fade-up mt-6 grid w-full max-w-screen-xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {links.map(({ title, description, demo, url }) => (
              <Card
                key={title}
                title={title}
                description={description}
                demo={demo}
                url={url}
              />
            ))}
          </div>
        </SectionTip>
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const features = [
    {
      title: tf("privacy"),
      description: tf("privacy-description"),
      demo: (
        <MdOutlinePrivacyTip className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
      ),
    },
    {
      title: tf("free"),
      description: tf("free-description"),
      demo: (
        <RiHeart3Line className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
      ),
    },
    {
      title: tf("customizable"),
      description: tf("customizable-description"),
      demo: (
        <MdOutlineDashboardCustomize className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
      ),
    },
    {
      title: tf("cross-platform"),
      description: tf("cross-platform-description"),
      demo: (
        <MdDevices className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
      ),
    },
    {
      title: tf("open-source"),
      description: tf("open-source-description"),
      demo: (
        <RiOpenSourceLine className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
      ),
    },
    {
      title: tf("pro"),
      description: tf("pro-description"),
      demo: (
        <MdOutlinePaid className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
      ),
    },
  ];

  return (
    <>
      <div className="w-full max-w-xl px-5 xl:px-0">
        {post && (
          <Link
            href={`/${post.slug}`}
            rel="noreferrer"
            className="animate-fade-up mx-auto mb-12 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full bg-blue-100 px-7 py-2 transition-colors hover:bg-blue-200"
          >
            <FaBlog className="h-5 w-5 text-[#3e8fc8]" />
            <p className="text-sm font-semibold text-[#3e8fc8]">{post.title}</p>
          </Link>
        )}
        <div className="mb-8 flex items-center justify-center space-x-20">
          <Image
            className="rounded-full"
            alt="PicGuard logo"
            src="/logo.png"
            width={160}
            height={160}
            loading="lazy"
            decoding="async"
          />
        </div>
        <h1
          className="font-display animate-fade-up bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-black/80 opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem] dark:text-white/80"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>{th("title")}</Balancer>
        </h1>
        <p
          className="animate-fade-up mt-6 text-center text-[#3e8fc8] opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            <RoughNotation
              animate
              type="highlight"
              show={true}
              color="#f1f2f6"
              animationDelay={1000}
              animationDuration={2500}
            >
              {t("slogan")}
            </RoughNotation>
          </Balancer>
        </p>
        <div
          className="animate-fade-up mx-auto mt-6 flex items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <Link
            className="flex max-w-fit min-w-32 items-center justify-center space-x-2 rounded-full bg-blue-300 px-5 py-2 text-sm text-gray-700 shadow-md transition-colors hover:bg-blue-400 dark:bg-blue-500 dark:text-white/80 dark:hover:bg-blue-600"
            href="download"
            rel="noopener noreferrer"
          >
            <RiDownload2Line className="h-6 w-6" />
            <p>
              <span className="sm:inline-block">{t("download")}</span>
            </p>
          </Link>
          <Link
            className="flex max-w-fit min-w-32 items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800 dark:bg-black dark:text-white/80"
            href="support"
            rel="noopener noreferrer"
          >
            <RiCommunityLine className="h-6 w-6" />
            <p>
              <span className="sm:inline-block">{ts("community")}</span>
            </p>
          </Link>
        </div>
      </div>
      <DynamicSection
        className="mt-32"
        title={t("features")}
        links={features}
      />
      <SectionTip title={t("comments")} className="mt-32">
        <div className="w-full px-5 xl:px-0">
          <div
            className="animate-fade-up mt-6 flex w-full items-center justify-center space-x-5 opacity-0"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <Marquee
              pauseOnHover
              autoFill
              gradient
              speed={25}
              gradientColor={theme === "light" ? "#ffffff" : "#020817"}
              className="mx-4"
            >
              {Array.from({ length: 8 }).map((_: any, idx: number) => {
                return (
                  <Comment
                    key={idx}
                    lng={lng}
                    author={tm(`author${idx}`)}
                    flag={tm(`flag${idx}`)}
                    comment={tm(`comment${idx}`)}
                  />
                );
              })}
            </Marquee>
          </div>
        </div>
      </SectionTip>
      <SectionTip title={t("get-picguard")} className="mt-32 mb-20">
        <div className="w-full px-5 xl:px-0">
          <div
            className="animate-fade-up mt-6 flex w-full items-center justify-center space-x-5 opacity-0"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            <Link
              className="flex max-w-fit min-w-32 items-center justify-center space-x-2 rounded-lg bg-blue-400 px-5 py-2 text-sm text-gray-700 shadow-md transition-colors hover:bg-blue-500 dark:bg-blue-500 dark:text-white/80 dark:hover:bg-blue-600"
              href="download"
              target="_blank"
              rel="noopener noreferrer"
            >
              <RiDownload2Line className="h-6 w-6" />
              <p>
                <span className="sm:inline-block">{t("download")}</span>
              </p>
            </Link>
          </div>
        </div>
      </SectionTip>
    </>
  );
}
