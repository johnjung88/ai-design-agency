import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";

const channels = [
  {
    id: "kakao",
    label: "카카오톡",
    href: "https://open.kakao.com/",
    icon: <MessageCircle className="size-4" />,
    bg: "bg-[#fee500] text-[#3a1d1d] hover:bg-[#fdd800]",
  },
  {
    id: "soomgo",
    label: "숨고",
    href: "https://soomgo.com",
    icon: <span className="text-xs font-black">숨</span>,
    bg: "bg-[#ff5b35]/15 text-[#ff7a5a] hover:bg-[#ff5b35]/25 border border-[#ff5b35]/30",
  },
  {
    id: "kmong",
    label: "크몽",
    href: "https://kmong.com",
    icon: <span className="text-xs font-black">크</span>,
    bg: "bg-[#00b3b4]/15 text-[#00d0d1] hover:bg-[#00b3b4]/25 border border-[#00b3b4]/30",
  },
  {
    id: "email",
    label: "이메일",
    href: "mailto:koreabencb@gmail.com",
    icon: <Mail className="size-4" />,
    bg: "bg-white/8 text-foreground/80 hover:bg-white/12 border border-white/10",
  },
] as const;

interface ChannelBadgesProps {
  className?: string;
  size?: "sm" | "md";
}

export function ChannelBadges({ className = "", size = "md" }: ChannelBadgesProps) {
  const height = size === "sm" ? "h-9 px-4 text-xs" : "h-11 px-5 text-sm";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {channels.map((ch) => (
        <Link
          key={ch.id}
          href={ch.href}
          target={ch.id !== "email" ? "_blank" : undefined}
          rel={ch.id !== "email" ? "noreferrer" : undefined}
          className={`inline-flex items-center gap-2 rounded-full font-semibold transition-colors ${height} ${ch.bg}`}
        >
          {ch.icon}
          {ch.label}
        </Link>
      ))}
    </div>
  );
}
