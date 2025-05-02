import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { domain } from "@/constants";
import { languages } from "@/i18n/settings";

// export const runtime = "edge";
export const alt = "PicGuard";
export const contentType = "image/png";
export const dynamic = "force-static";

export async function generateStaticParams() {
  return languages.map((lng: string) => ({ lng }));
}

export default async function OG({ params }: { params: { slug: string } }) {
  // Font loading, process.cwd() is Next.js project directory
  const sfPro = await readFile(
    join(process.cwd(), "public", "fonts", "SF-Pro-Display-Medium.otf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          backgroundImage:
            "linear-gradient(to bottom right, #E0E7FF 25%, #ffffff 50%, #CFFAFE 75%)",
        }}
      >
        <img
          src={`${domain}/logo.png`}
          alt={alt}
          tw="w-20 h-20 mb-4 opacity-95 rounded-full"
        />
        <h1
          style={{
            fontSize: "100px",
            fontFamily: "SF Pro",
            background:
              "linear-gradient(to bottom right, #000000 21.66%, #78716c 86.47%)",
            backgroundClip: "text",
            color: "transparent",
            lineHeight: "5rem",
            letterSpacing: "-0.02em",
          }}
        >
          {alt}
        </h1>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "SF Pro",
          data: sfPro,
        },
      ],
    },
  );
}
