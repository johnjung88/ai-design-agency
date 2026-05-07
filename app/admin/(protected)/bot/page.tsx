import { BotWorkbench } from "@/components/admin/bot-workbench";

export default function AdminBotPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase text-primary">Quote Assistant</p>
        <h2 className="mt-2 text-3xl font-semibold">외부 플랫폼 응답봇</h2>
        <p className="mt-2 text-sm text-muted-foreground">요청 글을 붙여넣고 V6 견적 응답을 만든 뒤 직접 발송합니다.</p>
      </div>
      <BotWorkbench />
    </div>
  );
}
