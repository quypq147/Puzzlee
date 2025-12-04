"use client";

import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center md:flex-row md:text-left">
          <div className="flex-1 space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Ứng dụng Hỏi Đáp thời gian thực cho{" "}
              <span className="text-primary">lớp học & sự kiện</span>.
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground md:text-base">
              Puzzlee giúp người tham gia đặt câu hỏi, bình chọn và thảo luận
              ngay lập tức. Giảng viên và MC dễ dàng quản lý, lọc nội dung và
              chọn câu hỏi hay nhất.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                href="/login"
                className="rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Bắt đầu ngay
              </Link>
              <Link
                href="#features"
                className="text-sm text-muted-foreground underline-offset-4 hover:underline"
              >
                Xem tính năng
              </Link>
            </div>
          </div>

          <div className="flex-1">
            {/* Placeholder cho hình ảnh / mockup giao diện */}
            <div className="h-64 w-full rounded-xl border bg-muted/40" />
          </div>
        </section>

        {/* Các section khác: features, how it works, v.v. */}
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;
