import Link from "next/link";

interface Props {
  locale: string;
}

export function IdeStatusbar({ locale }: Props) {
  return (
    <footer
      className="mt-[60px] grid items-center"
      style={{
        padding: "12px 16px",
        background: "var(--tone-ide-bg-2)",
        borderTop: "1px solid var(--tone-ide-line)",
        gridTemplateColumns: "1fr auto 1fr",
        gap: 16,
        fontFamily: "var(--font-jetbrains)",
        fontSize: 11,
        color: "var(--tone-ide-fg-3)",
      }}
    >
      <div className="flex items-center gap-[14px]">
        <span
          className="inline-flex items-center gap-[5px]"
          style={{ color: "var(--tone-ide-mint)" }}
        >
          <span
            className="w-[5px] h-[5px] rounded-full"
            style={{ background: "var(--tone-ide-mint)" }}
          />
          main
        </span>
        <span>web-development</span>
      </div>

      <div style={{ color: "var(--tone-ide-fg-2)", textAlign: "center" }}>
        AIO Studio © 2026
      </div>

      <div className="flex items-center gap-[14px] justify-end">
        <Link
          href={`/${locale}`}
          style={{ color: "var(--tone-ide-fg-3)", textDecoration: "none" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--tone-ide-mint)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--tone-ide-fg-3)"; }}
        >
          home
        </Link>
        <Link
          href={`/${locale}/quote`}
          style={{ color: "var(--tone-ide-fg-3)", textDecoration: "none" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--tone-ide-mint)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--tone-ide-fg-3)"; }}
        >
          견적 문의
        </Link>
        <Link
          href={`/${locale}/contact`}
          style={{ color: "var(--tone-ide-fg-3)", textDecoration: "none" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--tone-ide-mint)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--tone-ide-fg-3)"; }}
        >
          contact
        </Link>
      </div>
    </footer>
  );
}
