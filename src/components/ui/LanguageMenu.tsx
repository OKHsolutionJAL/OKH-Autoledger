import { Globe2 } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/lib/domain";

const labels: Record<Locale, string> = {
  pt: "Portugues",
  en: "English",
  ja: "日本語",
  es: "Espanol"
};

export function LanguageMenu({ locale, path }: { locale: Locale; path: string }) {
  return (
    <details className="language-menu">
      <summary aria-label="Idioma">
        <Globe2 size={18} />
      </summary>
      <div className="language-popover">
        {(Object.keys(labels) as Locale[]).map((item) => (
          <Link key={item} href={`${path}?locale=${item}`} className={item === locale ? "is-active" : ""}>
            {labels[item]}
          </Link>
        ))}
      </div>
    </details>
  );
}
