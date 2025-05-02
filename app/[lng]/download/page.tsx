"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { ToggleGroup, ToggleGroupItem } from "muse-ui";
import BinariesCard from "@/components/download/binaries-card";
import PkgCard from "@/components/download/pkg-card";
import StoreCard from "@/components/download/store-card";
import { platforms, platformNames } from "@/constants";
import { useTranslation } from "@/i18n/client";
import { matcher } from "@/lib/utils";
import github from "@/lib/github";

import type { SystemOS } from "@/types/common";
import type { Asset, Release } from "@/types/github";

type Params = Promise<{ lng: string }>;

export default function Home({ params }: { params: Params }) {
  const { lng } = use(params);
  const { t } = useTranslation(lng, "common");
  const [platform, setPlatform] = useState<SystemOS>();
  const [data, setData] = useState<Release>();

  const availableAssets = useMemo(() => {
    const packages: Record<SystemOS, Asset[]> = {
      ios: [],
      android: [],
      macos: [],
      windows: [],
      linux: [],
    };
    platforms.forEach((platform: SystemOS) => {
      packages[platform] =
        data?.assets?.filter(({ name }) => name && matcher(name, platform)) ||
        [];
    });
    return packages;
  }, [data?.assets]);

  const loadData = () => {
    github.repos
      .getLatestRelease({
        owner: process.env.GH_REPO_OWNER,
        repo: process.env.GH_REPO,
      })
      .then((res) => {
        if (res?.status === 200) {
          setData(res?.data || {});
        } else {
          console.error(res?.status);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const substrings = ["iP", "Android", "Macintosh", "Win", "X11"];
    const idx = substrings.findIndex((s) => userAgent.includes(s));
    console.log("userAgent", userAgent, "idx", idx);
    const detectPlatform = idx === -1 ? "android" : platforms[idx];
    setPlatform(detectPlatform);
  }, []);

  return (
    <>
      <div className="w-full max-w-xl px-5 xl:px-0">
        <h1
          className="font-display animate-fade-up bg-clip-text text-center text-3xl font-bold tracking-[-0.02em] text-black/80 opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem] dark:text-white/80"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>{t("download")}</Balancer>
        </h1>
      </div>
      <p
        className="animate-fade-up mt-4 text-center text-sm opacity-0"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        <Balancer>
          {data?.tag_name && (
            <>
              {t("latest")}:&nbsp;
              <Link
                className="text-[#3e8fc8]"
                href={`https://github.com/picguard/picguard/releases/tag/${data?.tag_name}`}
                target="_blank"
              >
                {data?.tag_name}
              </Link>
            </>
          )}
          <Link
            href={`/${lng}/releases`}
            className="ml-2 text-sm text-gray-500 hover:underline dark:text-gray-400"
          >
            {t("more-versions")}
          </Link>
        </Balancer>
      </p>
      <ToggleGroup
        variant="outline"
        type="single"
        className="mt-12 w-full flex-wrap gap-x-6 gap-y-4"
        value={platform}
        onValueChange={(value) => {
          if (value) setPlatform(value as SystemOS);
        }}
      >
        {Object.entries<string>(platformNames).map(([platform, name]) => (
          <ToggleGroupItem
            key={platform}
            className="font-bold"
            size="lg"
            value={platform}
          >
            {name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <div
        className={`animate-fade-up mt-16 mb-20 w-full max-w-screen-xl px-5 xl:px-0`}
      >
        {platform && (
          <div className="animate-fade-up mt-6 grid w-full max-w-screen-xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <StoreCard lng={lng} platform={platform} />
            <BinariesCard
              lng={lng}
              platform={platform}
              assets={availableAssets[platform]}
            />
            <PkgCard lng={lng} platform={platform} />
          </div>
        )}
      </div>
    </>
  );
}
