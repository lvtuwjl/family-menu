import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "http://localhost:3000"),
  title: "好好吃饭 · 全家阶段营养菜单",
  description: "从备孕、孕期、产后到宝宝辅食和全家餐，按阶段找到适合的一餐。",
  openGraph: {
    title: "好好吃饭 · 全家阶段营养菜单",
    description: "照顾全家每个阶段的一日三餐。",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
