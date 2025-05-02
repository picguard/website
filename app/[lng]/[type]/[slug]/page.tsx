import type { Metadata } from "next";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import PostDate from "@/components/post/post-date";
import { Mdx } from "@/components/mdx/mdx";
import PostNav from "@/components/post/post-nav";
import { domain } from "@/constants";
import { lngRegex } from "@/i18n/settings";

type Params = Promise<{ slug: string; type: string; lng: string }>;

export async function generateStaticParams() {
  const urls = Array.from(
    new Set(allPosts.map((post) => post.slug.replaceAll(lngRegex, ""))),
  );
  return urls.map((slug) => {
    const slugs = slug.split("/");
    return {
      type: slugs.at(0),
      slug: slugs.at(1),
    };
  });
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata | undefined> {
  const { lng, type, slug } = await params;
  const post = allPosts.find((post) => post.slug === `${lng}/${type}/${slug}`);

  if (!post) return;

  const { title, summary: description } = post;

  return {
    title,
    description,
    metadataBase: new URL(domain),
    icons: {
      icon: `${domain}/logo.png`,
    },
    manifest: `${domain}/manifest.json`,
  };
}

export default async function Legal({ params }: { params: Params }) {
  const { lng, type, slug } = await params;
  const post = allPosts.find((post) => post.slug === `${lng}/${type}/${slug}`);

  if (!post) notFound();

  return (
    <div className="w-full max-w-6xl px-4 sm:px-6">
      <div className="pb-12 md:pb-20">
        <article>
          {/* Article header */}
          <header className="mx-auto mb-20 max-w-3xl">
            {/* Title */}
            <h1 className="h1 mb-4 text-center text-5xl">{post.title}</h1>
          </header>

          {/* Article content */}
          <div className="lg:flex lg:justify-between">
            {/* Sidebar */}
            <PostNav lng={lng} />

            {/* Main content */}
            <div className="flex-1">
              {/* Article meta */}
              <div className="mb-6 flex items-center">
                {post.authorImg && (
                  <div className="mr-3 flex shrink-0">
                    <a
                      className="relative"
                      href="https://www.kjxbyz.com/"
                      target="_blank"
                    >
                      <span
                        className="absolute inset-0 -m-px"
                        aria-hidden="true"
                      >
                        <span className="absolute inset-0 -m-px rounded-full bg-white"></span>
                      </span>
                      <Image
                        className="relative rounded-full"
                        src={post.authorImg}
                        width={32}
                        height={32}
                        alt={post.author}
                      />
                    </a>
                  </div>
                )}
                <div>
                  <span className="text-gray-600 dark:text-gray-300">By </span>
                  <a
                    className="font-medium hover:underline dark:text-gray-300"
                    href="https://www.kjxbyz.com/"
                    target="_blank"
                  >
                    {post.author}
                  </a>
                  <span className="text-gray-600 dark:text-gray-300">
                    {" "}
                    · <PostDate dateString={post.publishedAt} />
                  </span>
                </div>
              </div>
              <hr className="mb-6 h-px w-full border-0 bg-gray-200 pt-px dark:bg-gray-600" />

              {/* Article body */}
              <div>
                <Mdx code={post.body.code} />
              </div>

              {type === "blog" && (
                <div className="text-lg text-gray-600">
                  <hr className="mt-8 h-px w-full border-0 bg-gray-200 pt-px dark:bg-gray-600" />
                  {/*<div className="mt-8 dark:text-gray-300">*/}
                  {/*  Interested in more tips like this? Check out{" "}*/}
                  {/*  <a*/}
                  {/*    className="text-gray-900 underline dark:text-gray-300"*/}
                  {/*    href="#0"*/}
                  {/*  >*/}
                  {/*    Introducing the Testing Field Guide*/}
                  {/*  </a>*/}
                  {/*  .*/}
                  {/*</div>*/}
                  <div className="mt-6">
                    <Link
                      href={`/${lng}/${type}`}
                      className="inline-flex items-center text-base font-medium text-[#3e8fc8] hover:underline"
                    >
                      <svg
                        className="mr-2 h-3 w-3 shrink-0 fill-current"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M.293 5.282L5 .5l1.414 1.436-3 3.048H12v2.032H3.414l3 3.048L5 11.5.293 6.718a1.027 1.027 0 010-1.436z" />
                      </svg>
                      <span>Back to the blog</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Article footer */}
        </article>
      </div>
    </div>
  );
}
