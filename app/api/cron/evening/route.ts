import { NextResponse } from "next/server";

/**
 * 임시 stub — 원본 파일이 OneDrive 동기화 손상으로 빌드 막고 있어 대체.
 * TODO: 텔레그램 cron job 로직 복구 필요.
 */
export async function GET() {
  return NextResponse.json({ ok: true, note: "evening cron stub" });
}

export async function POST() {
  return NextResponse.json({ ok: true, note: "evening cron stub" });
}
