"use client";
import { use, useCallback } from "react";
import Balancer from "react-wrap-balancer";
import { RoughNotation } from "react-rough-notation";
import { MdEmail } from "react-icons/md";
import { IssueOpenedIcon, CommentDiscussionIcon } from "@primer/octicons-react";
import Card from "@/components/home/card";
import { useTranslation } from "@/i18n/client";

type Params = Promise<{ lng: string }>;

export default function Support({ params }: { params: Params }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "support");

  const Section = useCallback(
    ({ title, links }: { title: string; links: any[] }) => {
      return (
        <div className="animate-fade-up mt-14 w-full max-w-screen-xl px-5 xl:px-0">
          <div className="flex flex-row flex-nowrap items-center justify-center text-center text-3xl before:mr-5 before:h-[1px] before:max-w-xs before:flex-1 before:border-b-[1px] before:border-dashed before:border-b-gray-300 before:content-[''] after:ml-5 after:h-[1px] after:max-w-xs after:flex-1 after:border-b-[1px] after:border-dashed after:border-b-gray-300 after:content-[''] dark:before:border-b-gray-600 dark:after:border-b-gray-600">
            {title}
          </div>
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
        </div>
      );
    },
    [],
  );

  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="font-display animate-fade-up bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-black/80 opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem] dark:text-white/80"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>{t("support")}</Balancer>
        </h1>
        <p
          className="animate-fade-up mt-6 text-center text-red-400 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>
            <RoughNotation
              animate
              type="highlight"
              show={true}
              color="rgb(36, 54, 110)"
              animationDelay={1000}
              animationDuration={2500}
            >
              {t("description")}
            </RoughNotation>
          </Balancer>
        </p>
      </div>
      <Section title={t("community")} links={apps} />
    </>
  );
}

const apps = [
  {
    title: "Email",
    description: "Create a support request by sending an email.",
    demo: (
      <MdEmail className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "mailto:picguard-support@insco.io",
    large: false,
  },
  {
    title: "GitHub Issues",
    description:
      "Please report any issues you encounter while using the app in `GitHub Issues`.",
    demo: (
      <IssueOpenedIcon className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "https://github.com/picguard/picguard/issues",
  },
  {
    title: "GitHub Discussions",
    description:
      "We're using `GitHub Discussions` as a place to connect with other members of our community.",
    demo: (
      <CommentDiscussionIcon className="h-24 w-24 text-gray-600 transition-all dark:text-white/80" />
    ),
    url: "https://github.com/picguard/picguard/discussions",
    large: false,
  },
];
