"use client";
import { ReactNode, useCallback } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Balancer from "react-wrap-balancer";

export default function Card({
  title,
  description,
  demo,
  url,
}: {
  title: string;
  description: string;
  demo: ReactNode;
  url?: string;
}) {
  const Content = useCallback(
    ({
      title,
      description,
      demo,
    }: {
      title: string;
      description: string;
      demo: ReactNode;
    }) => (
      <div className="relative col-span-1 h-96 overflow-hidden rounded-xl border border-gray-200 hover:shadow-md dark:border-gray-700 dark:hover:shadow-gray-700">
        <div className="flex h-60 items-center justify-center">{demo}</div>
        <div className="mx-auto max-w-md text-center">
          <h2 className="font-display bg-clip-text text-xl font-bold text-black/80 md:text-3xl md:font-normal dark:text-white/80">
            <Balancer>{title}</Balancer>
          </h2>
          <div className="prose-sm md:prose -mt-2 leading-normal text-gray-500 dark:text-white/80">
            <Balancer>
              <ReactMarkdown
                components={{
                  a: ({ node, ...props }) => (
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      {...props}
                      className="font-medium text-gray-800 underline transition-colors dark:text-gray-200"
                    />
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      {...props}
                      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                      // @ts-ignore (to fix "Received `true` for a non-boolean attribute `inline`." warning)
                      inline="true"
                      className="rounded-sm bg-gray-100 px-1 py-0.5 font-mono font-medium text-gray-800 dark:bg-gray-700"
                    />
                  ),
                }}
              >
                {description}
              </ReactMarkdown>
            </Balancer>
          </div>
        </div>
      </div>
    ),
    [],
  );

  return url ? (
    <Link href={url} target="_blank" rel="noreferrer">
      <Content title={title} description={description} demo={demo} />
    </Link>
  ) : (
    <Content title={title} description={description} demo={demo} />
  );
}
