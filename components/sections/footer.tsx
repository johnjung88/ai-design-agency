import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-12">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
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

        {/* 사업자 정보 */}
        <div className="mt-8 border-t border-white/8 pt-6">
          <p className="text-xs leading-6 text-muted-foreground/60">
            사업자명: 에이아이오 (AIO) &nbsp;|&nbsp; 사업자번호: 682-01-02748 &nbsp;|&nbsp; 주소: 경기도 김포시 대곶면 흥신로67
          </p>
        </div>
      </div>
    </footer>
  );
}
