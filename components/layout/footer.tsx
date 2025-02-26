"use client";
import Link from "next/link";
import { LngProps } from "@/types/i18next-lng";
import { useTranslation } from "@/i18n/client";

const NEXT_PUBLIC_GIT_COMMIT_SHA = process.env.NEXT_PUBLIC_GIT_COMMIT_SHA;

function Footer(props: LngProps) {
  const { t } = useTranslation(props.lng, "footer");
  const { t: th } = useTranslation(props.lng, "header");
  const fullYear = new Date().getFullYear();

  return (
    <div className="w-full border-b border-gray-200 py-5 text-center dark:border-gray-700">
      {/*<p className="text-gray-500 dark:text-white/80">*/}
      {/*  {t("footer")}&nbsp;*/}
      {/*  <a*/}
      {/*    className="font-medium text-gray-800 underline transition-colors dark:text-white/90"*/}
      {/*    href="https://github.com/picguard/websites"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    GitHub*/}
      {/*  </a>*/}
      {/*</p>*/}
      <p className="mt-2 flex items-center justify-center">
        <Link
          className="font-medium text-gray-800 underline transition-colors dark:text-white/90"
          href={`/${props.lng}/legal/privacy`}
          rel="noopener noreferrer"
        >
          {t("privacy")}
        </Link>
        &nbsp;
        <Link
          className="font-medium text-gray-800 underline transition-colors dark:text-white/90"
          href={`/${props.lng}/legal/terms-of-use`}
          rel="noopener noreferrer"
        >
          {t("terms-of-use")}
        </Link>
      </p>
      <span className="mt-2 flex flex-wrap items-center justify-center text-sm text-gray-500 dark:text-gray-400 sm:text-center">
        &copy;&nbsp;{`2023${fullYear === 2023 ? "" : `-${fullYear}`}`}&nbsp;
        {th("title")}.&nbsp;{t("copyright")}&nbsp;
        {NEXT_PUBLIC_GIT_COMMIT_SHA && (
          <>{NEXT_PUBLIC_GIT_COMMIT_SHA.substring(0, 8)}&nbsp;</>
        )}
      </span>
    </div>
  );
}

export default Footer;
