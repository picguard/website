import React, { useMemo } from "react";
import Link from "next/link";
import { useTranslation } from "@/i18n/client";
import type { LngProps } from "@/types/i18next-lng";
import type { Asset } from "@/types/github";
import type { SystemOS } from "@/types/common";

export default function BinariesCard({
  lng,
  platform,
  assets,
}: LngProps & { platform: SystemOS; assets: Asset[] }) {
  const { t } = useTranslation(lng, "download");

  const windowsBinariesCard = useMemo(() => {
    const freeVer = assets.filter(
      (value: Asset) => !value.name?.includes("pro"),
    );
    const x64FreeVer = freeVer.filter((value: Asset) =>
      value.name?.includes("x64"),
    );
    const arm64FreeVer = freeVer.filter((value: Asset) =>
      value.name?.includes("arm64"),
    );

    const proVer = assets.filter((value: Asset) => value.name?.includes("pro"));
    const x64ProVer = proVer.filter((value: Asset) =>
      value.name?.includes("x64"),
    );
    const arm64ProVer = proVer.filter((value: Asset) =>
      value.name?.includes("arm64"),
    );

    return (
      <>
        <span className="mb-2 mt-2 text-gray-600 dark:text-white/80">
          Free version
        </span>
        <div className="mb-2 mt-2 flex flex-col px-2">
          <span className="mb-2 text-gray-600 dark:text-white/80">x64</span>
          <ul>
            {x64FreeVer.map((value: Asset) => {
              return (
                <li
                  key={value.id}
                  className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                >
                  <Link
                    className="text-gray-600 dark:text-white/80"
                    href={value.browser_download_url || ""}
                  >
                    {value.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          {arm64FreeVer.length > 0 && (
            <>
              <span className="mb-2 mt-2 text-gray-600 dark:text-white/80">
                Arm64
              </span>
              <ul>
                {arm64FreeVer.map((value: Asset) => {
                  return (
                    <li
                      key={value.id}
                      className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                    >
                      <Link
                        className="text-gray-600 dark:text-white/80"
                        href={value.browser_download_url || ""}
                      >
                        {value.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
        <span className="mb-2 mt-2 text-gray-600 dark:text-white/80">
          Pro version
        </span>
        <div className="mb-2 mt-2 flex flex-col px-2">
          <span className="mb-2 text-gray-600 dark:text-white/80">x64</span>
          <ul>
            {x64ProVer.map((value: Asset) => {
              return (
                <li
                  key={value.id}
                  className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                >
                  <Link
                    className="text-gray-600 dark:text-white/80"
                    href={value.browser_download_url || ""}
                  >
                    {value.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          {arm64ProVer.length > 0 && (
            <>
              <span className="mb-2 mt-2 text-gray-600 dark:text-white/80">
                Arm64
              </span>
              <ul>
                {arm64ProVer.map((value: Asset) => {
                  return (
                    <li
                      key={value.id}
                      className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                    >
                      <Link
                        className="text-gray-600 dark:text-white/80"
                        href={value.browser_download_url || ""}
                      >
                        {value.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </>
    );
  }, [assets]);

  const linuxBinariesCard = useMemo(() => {
    const freeVer = assets.filter(
      (value: Asset) => !value.name?.includes("pro"),
    );
    const x64FreeVer = freeVer.filter((value: Asset) =>
      value.name?.includes("amd64"),
    );
    const arm64FreeVer = freeVer.filter((value: Asset) =>
      value.name?.includes("aarch64"),
    );

    const proVer = assets.filter((value: Asset) => value.name?.includes("pro"));
    const x64ProVer = proVer.filter((value: Asset) =>
      value.name?.includes("amd64"),
    );
    const arm64ProVer = proVer.filter((value: Asset) =>
      value.name?.includes("aarch64"),
    );

    return (
      <>
        <span className="mb-2 mt-2 text-gray-600 dark:text-white/80">
          Free version
        </span>
        <div className="mb-2 mt-2 flex flex-col px-2">
          <span className="mb-2 text-gray-600 dark:text-white/80">x64</span>
          <ul>
            {x64FreeVer.map((value: Asset) => {
              return (
                <li
                  key={value.id}
                  className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                >
                  <Link
                    className="text-gray-600 dark:text-white/80"
                    href={value.browser_download_url || ""}
                  >
                    {value.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          {arm64FreeVer.length > 0 && (
            <>
              <span className="mb-2 mt-2 text-gray-600 dark:text-white/80">
                Arm64
              </span>
              <ul>
                {arm64FreeVer.map((value: Asset) => {
                  return (
                    <li
                      key={value.id}
                      className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                    >
                      <Link
                        className="text-gray-600 dark:text-white/80"
                        href={value.browser_download_url || ""}
                      >
                        {value.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
        <span className="mb-2 mt-2 text-gray-600 dark:text-white/80">
          Pro version
        </span>
        <div className="mb-2 mt-2 flex flex-col px-2">
          <span className="mb-2 text-gray-600 dark:text-white/80">x64</span>
          <ul>
            {x64ProVer.map((value: Asset) => {
              return (
                <li
                  key={value.id}
                  className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                >
                  <Link
                    className="text-gray-600 dark:text-white/80"
                    href={value.browser_download_url || ""}
                  >
                    {value.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          {arm64ProVer.length > 0 && (
            <>
              <span className="mb-2 mt-2 text-gray-600 dark:text-white/80">
                Arm64
              </span>
              <ul>
                {arm64ProVer.map((value: Asset) => {
                  return (
                    <li
                      key={value.id}
                      className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                    >
                      <Link
                        className="text-gray-600 dark:text-white/80"
                        href={value.browser_download_url || ""}
                      >
                        {value.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </>
    );
  }, [assets]);

  const binaryLinks = useMemo(() => {
    const links: Record<SystemOS, React.ReactNode> = {
      ios: (
        <>
          <span className="mb-2 mt-2 text-gray-600 dark:text-white/80">
            Free version
          </span>
          <ul>
            {assets
              .filter((value: Asset) => !value.name?.includes("Pro"))
              .map((value: Asset) => {
                return (
                  <li
                    key={value.id}
                    className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                  >
                    <Link
                      className="text-gray-600 dark:text-white/80"
                      href={value.browser_download_url || ""}
                    >
                      {value.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
          <span className="mb-2 mt-4 text-gray-600 dark:text-white/80">
            Pro version
          </span>
          <ul>
            {assets
              .filter((value: Asset) => value.name?.includes("Pro"))
              .map((value: Asset) => {
                return (
                  <li
                    key={value.id}
                    className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                  >
                    <Link
                      className="text-gray-600 dark:text-white/80"
                      href={value.browser_download_url || ""}
                    >
                      {value.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </>
      ),
      android: (
        <>
          <span className="mb-2 mt-2 text-gray-600 dark:text-white/80">
            Free version
          </span>
          <ul>
            {assets
              .filter((value: Asset) => !value.name?.includes("Pro"))
              .map((value: Asset) => {
                return (
                  <li
                    key={value.id}
                    className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                  >
                    <Link
                      className="text-gray-600 dark:text-white/80"
                      href={value.browser_download_url || ""}
                    >
                      {value.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
          <span className="mb-2 mt-4 text-gray-600 dark:text-white/80">
            Pro version
          </span>
          <ul>
            {assets
              .filter((value: Asset) => value.name?.includes("Pro"))
              .map((value: Asset) => {
                return (
                  <li
                    key={value.id}
                    className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                  >
                    <Link
                      className="text-gray-600 dark:text-white/80"
                      href={value.browser_download_url || ""}
                    >
                      {value.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </>
      ),
      macos: (
        <>
          <span className="mb-2 mt-2 text-gray-600 dark:text-white/80">
            Free version
          </span>
          <ul>
            {assets
              .filter((value: Asset) => !value.name?.includes("Pro"))
              .map((value: Asset) => {
                return (
                  <li
                    key={value.id}
                    className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                  >
                    <Link
                      className="text-gray-600 dark:text-white/80"
                      href={value.browser_download_url || ""}
                    >
                      {value.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
          <span className="mb-2 mt-2 text-gray-600 dark:text-white/80">
            Pro version
          </span>
          <ul>
            {assets
              .filter((value: Asset) => value.name?.includes("Pro"))
              .map((value: Asset) => {
                return (
                  <li
                    key={value.id}
                    className="w-fit rounded-sm px-2 py-1.5 hover:bg-gray-200 dark:hover:bg-gray-400"
                  >
                    <Link
                      className="text-gray-600 dark:text-white/80"
                      href={value.browser_download_url || ""}
                    >
                      {value.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </>
      ),
      windows: windowsBinariesCard,
      linux: linuxBinariesCard,
    };

    return links;
  }, [assets, windowsBinariesCard, linuxBinariesCard]);

  return (
    <div className="flex min-h-64 w-full max-w-screen-xl animate-fade-up flex-col rounded-xl border border-gray-200 p-4 hover:shadow-md dark:border-gray-700 dark:hover:shadow-gray-700">
      <span className="text-xl font-bold">{t("binaries")}</span>
      <span className="text-base text-gray-600 dark:text-white/80">
        {t("binaries-description")}
      </span>
      <div className="flex flex-col justify-center">
        {binaryLinks[platform]}
      </div>
    </div>
  );
}
