import Image from "next/image";

type BrandLogoVariant = "header" | "footer" | "hero";

interface BrandLogoProps {
  variant?: BrandLogoVariant;
  className?: string;
}

const styles: Record<
  BrandLogoVariant,
  {
    width: number;
    height: number;
    className: string;
  }
> = {
  header: {
    width: 112,
    height: 48,
    className: "h-11 w-[104px] md:h-12 md:w-[112px]",
  },
  footer: {
    width: 140,
    height: 60,
    className: "h-[58px] w-[136px]",
  },
  hero: {
    width: 190,
    height: 82,
    className: "h-[76px] w-[180px] md:h-[82px] md:w-[190px]",
  },
};

export function BrandLogo({ variant = "header", className = "" }: BrandLogoProps) {
  const style = styles[variant];

  return (
    <span className={`inline-flex items-center ${style.className} ${className}`} aria-label="AIO All-In-One Agency">
      <Image
        src="/brand/aio-agency-logo-final/aio-agency-site-lockup-dark.svg"
        alt="AIO All-In-One Agency"
        width={style.width}
        height={style.height}
        priority={variant === "header"}
        className="h-full w-full object-contain object-left"
      />
    </span>
  );
}
