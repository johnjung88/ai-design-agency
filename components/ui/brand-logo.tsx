type BrandLogoVariant = "header" | "footer" | "hero";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
}

const styles: Record<
  BrandLogoVariant,
  {
    mark: string;
    text: string;
    line: string;
    tagline: string;
    gap: string;
    showTagline: boolean;
  }
> = {
  header: {
    mark: "size-6",
    text: "text-[24px] leading-none",
    line: "ml-8 mt-1.5 h-0.5 w-[92px]",
    tagline: "ml-8 mt-1 text-[8px] leading-none",
    gap: "gap-2.5",
    showTagline: true,
  },
  footer: {
    mark: "size-6",
    text: "text-[24px] leading-none",
    line: "ml-8 mt-1.5 h-0.5 w-[92px]",
    tagline: "ml-8 mt-1 text-[8px] leading-none",
    gap: "gap-2.5",
    showTagline: true,
  },
  hero: {
    mark: "size-8",
    text: "text-[34px] leading-none",
    line: "ml-11 mt-2 h-0.5 w-[132px]",
    tagline: "ml-11 mt-1.5 text-[10px] leading-none",
    gap: "gap-3",
    showTagline: true,
  },
};

function BrandMark({ className }: { className: string }) {
  return (
    <span className={`relative flex shrink-0 items-center justify-center ${className}`} aria-hidden="true">
      <span className="absolute h-[115%] w-[15%] rounded-full bg-[#34456f]" />
      <span className="absolute h-[15%] w-[115%] rounded-full bg-[#34456f]" />
      <span className="absolute h-[115%] w-[15%] rotate-45 rounded-full bg-[#34456f]" />
      <span className="absolute h-[115%] w-[15%] -rotate-45 rounded-full bg-[#34456f]" />
      <span className="relative size-[58%] rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.35)]" />
    </span>
  );
}

export function BrandLogo({ variant = "header", className = "" }: BrandLogoProps) {
  const style = styles[variant];

  return (
    <span className={`inline-flex flex-col ${className}`} aria-label="AIO All-In-One">
      <span className={`flex items-center ${style.gap}`}>
        <BrandMark className={style.mark} />
        <span className={`${style.text} font-black text-foreground`}>AIO</span>
      </span>
      <span className={`${style.line} block rounded-full bg-cyan-400`} />
      {style.showTagline && (
        <span className={`${style.tagline} font-semibold text-[#93a4c7]`}>ALL-IN-ONE</span>
      )}
    </span>
  );
}
