import { redirect } from "next/navigation";
import acceptLanguage from "accept-language";
import Cookies from "js-cookie";
import { cacheLngKey } from "@/constants";
import { languages, fallbackLng } from "@/i18n/settings";

acceptLanguage.languages(languages);

export default function RootPage() {
  // const headersList = headers();
  // const lng = acceptLanguage.get(headersList.get("Accept-Language")) ?? 'en';
  const lng = Cookies.get(cacheLngKey) ?? fallbackLng;
  redirect(`/${lng}`);
}
