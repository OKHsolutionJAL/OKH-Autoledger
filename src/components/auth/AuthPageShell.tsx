import Image from "next/image";
import type { ReactNode } from "react";
import { BrandMark } from "@/components/ui/BrandMark";
import { translator } from "@/lib/i18n";
import type { Locale } from "@/lib/domain";

export function AuthPageShell({
  locale,
  children
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const t = translator(locale);

  return (
    <main className="login-page">
      <section className="login-visual">
        <Image src="/assets/premium-sport-garage.png" alt="Premium sport car in dark garage" fill priority sizes="(max-width: 900px) 100vw, 52vw" />
        <div className="login-overlay" />
        <div className="login-copy">
          <BrandMark />
          <h1>{t("loginTitle")}</h1>
          <p>{t("loginSubtitle")}</p>
        </div>
      </section>
      <section className="login-panel">{children}</section>
    </main>
  );
}
