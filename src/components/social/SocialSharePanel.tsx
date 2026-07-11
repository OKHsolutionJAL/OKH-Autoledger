"use client";

import { Copy, ExternalLink, MessageCircle, Share2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { SocialPlatform, VehicleSharePayload } from "@/lib/social-listing";
import { socialPlatformLabels, socialPlatforms } from "@/lib/social-listing";

export function SocialSharePanel({ payload }: { payload: VehicleSharePayload }) {
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
    return [payload.platformIntros[platform], "", payload.headline, ...selectedLines, "", `Ver detalhes: ${publicUrl}`, "", payload.hashtags]
      .filter(Boolean)
      .join("\n");
  }, [enabled, payload, platform, publicUrl]);

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

      <div className="share-actions">
        <button className="button" type="button" onClick={() => copy(text, "Texto copiado")}>
          <Copy size={17} /> Copiar anuncio
        </button>
        <button className="button secondary" type="button" onClick={() => copy(publicUrl, "Link copiado")}>
          <Copy size={17} /> Copiar link
        </button>
        <a className="button secondary" href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer">
          <MessageCircle size={17} /> WhatsApp
        </a>
        <a className="button secondary" href={payload.publicPath} target="_blank" rel="noreferrer">
          <ExternalLink size={17} /> Preview
        </a>
        <button className="button secondary" type="button" onClick={nativeShare}>
          <Share2 size={17} /> Compartilhar
        </button>
      </div>

      {copied ? <span className="copy-feedback">{copied}</span> : null}
    </div>
  );
}
