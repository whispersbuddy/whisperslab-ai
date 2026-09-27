import Image from "next/image";

const PLATFORM_LOGOS: Record<string, { src: string; alt: string; wide?: boolean }> = {
  airtable: { src: "/assets/airtable.png", alt: "Airtable logo" },
  "airtable automations": { src: "/assets/airtable.png", alt: "Airtable logo" },
  n8n: { src: "/assets/n8n.png", alt: "n8n logo", wide: true },
  zapier: { src: "/assets/zapier_icon_146029.webp", alt: "Zapier logo" },
  hubspot: { src: "/assets/hubspot-logo.png", alt: "HubSpot logo", wide: true },
  openai: { src: "/assets/openai.webp", alt: "OpenAI logo" },
  claude: { src: "/assets/Claude-ai-logo.png", alt: "Claude logo" },
  slack: { src: "/assets/slack-outline-logo-minimal-line-art-editable-and-transparent-free-png.webp", alt: "Slack logo" },
};

export default function PlatformLogo({
  name,
  showName = true,
  className = "",
}: {
  name: string;
  showName?: boolean;
  className?: string;
}) {
  const logo = PLATFORM_LOGOS[name.trim().toLowerCase()];

  return (
    <span className={`platform-logo${logo?.wide ? " is-wide" : ""}${className ? ` ${className}` : ""}`}>
      {logo ? (
        <span className="platform-logo-mark">
          <Image src={logo.src} alt={showName ? "" : logo.alt} width={48} height={48} sizes="48px" />
        </span>
      ) : null}
      {showName ? <span className="platform-logo-name">{name}</span> : null}
    </span>
  );
}
