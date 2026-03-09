import Link from "next/link";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border/80 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-lg font-semibold tracking-tight">D-AIO</p>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            브랜드 디자인, 소개서, 웹사이트를 빠르고 정교하게 제작합니다.
          </p>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground">
          <Link
            href="mailto:hello@aio.design"
            className="block transition-colors hover:text-foreground focus-visible:text-foreground focus-visible:outline-none"
          >
            hello@aio.design
          </Link>
          <p>Seoul · Remote Worldwide</p>
          <p className="text-foreground/50">© {new Date().getFullYear()} D-AIO. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
