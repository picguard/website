import { SystemExtensions, SystemOSKeys, SystemOSName } from "@/types/common";

export const cacheLngKey: string = "__picguard_lng__";
export const cacheThemeKey: string = "__picguard_theme__";

export const domain =
  process.env.NODE_ENV === "production"
    ? "https://www.picguard.app"
    : "http://localhost:3000";

export const platformNames: SystemOSName = {
  android: "Android",
  ios: "iOS",
  macos: "macOS",
  windows: "Windows",
  linux: "Linux",
};

export const platforms: SystemOSKeys[] = [
  "ios",
  "android",
  "macos",
  "windows",
  "linux",
];
export const systemExtensions: SystemExtensions = {
  ios: [".ipa"],
  android: [".apk" /*, ".aab"*/],
  macos: [
    ".dmg",
    { name: ".pkg", exclude: "appstore" },
    { name: ".zip", include: true },
    { name: ".tar.gz", include: true },
  ],
  windows: [".exe", ".msi", /* ".msix",*/ { name: ".zip", include: true }],
  linux: [
    ".AppImage",
    ".deb",
    ".rpm",
    // ".snap",
    // ".flatpak",
    { name: ".zip", include: true },
    { name: ".tar.gz", include: true },
  ],
};

export const pageSize: number = 10;
export const sitemapUrls = ["download", "releases", "support"];

export const manifest = {
  name: "PicGuard",
  short_name: "PicGuard",
  description: "Your pictures, your signature.",
  start_url: `/`,
  display: "standalone",
  background_color: "#fff",
  theme_color: "#fff",
  icons: [
    {
      src: `${domain}/logo.png`,
      sizes: "any",
      type: "image/png",
    },
  ],
};
