"use client";

import { Copy, ExternalLink, MessageCircle, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { SocialPlatform, VehicleSharePayload } from "@/lib/social-listing";
import { socialPlatformLabels, socialPlatforms } from "@/lib/social-listing";

export function SocialSharePanel({ payload, publicReady = true }: { payload: VehicleSharePayload; publicReady?: boolean }) {
  const [platform, setPlatform] = useState<SocialPlatform>("whatsapp");
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(payload.lines.map((line) => [line.id, line.defaultOn]))
  );
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const publicUrl = `${origin}${payload.publicPath}`;
  const text = useMemo(() => {
    const selectedLines = payload.lines.filter((line) => enabled[line.id]).map((line) => line.text);
    const linkLine = publicReady ? `Ver detalhes: ${publicUrl}` : "Gere o link de visualizacao antes de postar.";
    return [payload.platformIntros[platform], "", payload.headline, ...selectedLines, "", linkLine, "", payload.hashtags]
      .filter(Boolean)
      .join("\n");
  }, [enabled, payload, platform, publicReady, publicUrl]);

  async function copy(value: string, label: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(""), 1800);
  }

  async function nativeShare() {
    if (!navigator.share) {
      await copy(text, "Texto copiado");
      return;
    }

    await navigator.share({
      title: payload.headline,
      text,
      url: publicUrl
    });
  }

  return (
    <div className="social-share-panel">
      <div className="platform-switch" aria-label="Plataforma do anuncio">
        {socialPlatforms.map((item) => (
          <button key={item} type="button" className={platform === item ? "is-active" : ""} onClick={() => setPlatform(item)}>
            {socialPlatformLabels[item]}
          </button>
        ))}
      </div>

      <div className="share-options">
        {payload.lines.map((line) => (
          <label key={line.id}>
            <input
              type="checkbox"
              checked={enabled[line.id]}
              onChange={(event) => setEnabled((current) => ({ ...current, [line.id]: event.target.checked }))}
            />
            {line.label}
          </label>
        ))}
      </div>

      <textarea className="share-copy" value={text} readOnly rows={12} />

      {!publicReady ? <div className="auth-alert">Gere o link de visualizacao antes de copiar ou postar em redes sociais.</div> : null}

      <div className="share-actions">
        <button className="button" type="button" onClick={() => copy(text, "Texto copiado")} disabled={!publicReady}>
          <Copy size={17} /> Copiar anuncio
        </button>
        <button className="button secondary" type="button" onClick={() => copy(publicUrl, "Link copiado")} disabled={!publicReady}>
          <Copy size={17} /> Copiar link
        </button>
        {publicReady ? (
          <>
            <a className="button secondary" href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer">
              <MessageCircle size={17} /> WhatsApp
            </a>
            <a className="button secondary" href={payload.publicPath} target="_blank" rel="noreferrer">
              <ExternalLink size={17} /> Preview
            </a>
          </>
        ) : null}
        <button className="button secondary" type="button" onClick={nativeShare} disabled={!publicReady}>
          <Share2 size={17} /> Compartilhar
        </button>
      </div>

      {copied ? <span className="copy-feedback">{copied}</span> : null}
    </div>
  );
}
