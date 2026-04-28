import type { ServiceCategory } from "@/lib/services-data";

const colorMap: Record<ServiceCategory, string> = {
  web: "bg-[#7c3aed]/15 text-[#a78bfa] border-[#7c3aed]/30",
  app: "bg-[#f59e0b]/15 text-[#fbbf24] border-[#f59e0b]/30",
  design: "bg-[#f43f5e]/15 text-[#fb7185] border-[#f43f5e]/30",
  video: "bg-[#06b6d4]/15 text-[#22d3ee] border-[#06b6d4]/30",
  automation: "bg-[#10b981]/15 text-[#34d399] border-[#10b981]/30",
};

const labelMap: Record<ServiceCategory, string> = {
  web: "웹",
  app: "앱",
  design: "디자인",
  video: "영상",
  automation: "자동화",
};

interface TypeBadgeProps {
  type: ServiceCategory;
  className?: string;
}

export function TypeBadge({ type, className = "" }: TypeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${colorMap[type]} ${className}`}
    >
      {labelMap[type]}
    </span>
  );
}
