import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-12">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-6 lg:px-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold tracking-[0.1em] text-foreground">D-AIO</p>
          <p className="mt-2 max-w-xs text-xs leading-6 text-muted-foreground">
            브랜드 디자인, 소개서, 웹사이트를 빠르고 정교하게 제작합니다.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-xs text-muted-foreground">
          <Link
            href="mailto:hello@d-aio.design"
            className="transition-colors hover:text-foreground focus-visible:outline-none"
          >
            hello@d-aio.design
          </Link>
          <p>Seoul · Remote Worldwide</p>
          <p className="text-white/25">© {new Date().getFullYear()} D-AIO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
