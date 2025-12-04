"use client";
import Link from "next/link";

export default function AboutUsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <section className="space-y-3 text-center">
        <h1 className="text-3xl font-bold">Về Puzzlee</h1>
        <p className="text-muted-foreground">
          Puzzlee là nền tảng tạo và tham gia sự kiện tương tác, giúp đội ngũ tổ
          chức xây dựng trải nghiệm vui nhộn, kết nối và đo lường hiệu quả theo
          thời gian thực.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Sứ mệnh</h2>
        <p>
          Chúng tôi mong muốn mang đến công cụ đơn giản, linh hoạt để mọi người
          có thể tạo ra các hoạt động thú vị trong lớp học, workshop,
          teambuilding hay sự kiện cộng đồng—tất cả đều dễ thiết lập, dễ tham
          gia và dễ theo dõi.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Tính năng nổi bật</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Tạo sự kiện nhanh với mã tham gia riêng.</li>
          <li>Quản lý người tham dự và cấu hình luật chơi linh hoạt.</li>
          <li>Hiển thị kết quả theo thời gian thực.</li>
          <li>Đăng nhập/đăng ký an toàn, đổi mật khẩu, quên mật khẩu.</li>
          <li>Giao diện hiện đại, tối ưu cho cả máy tính và di động.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Đội ngũ</h2>
        <p>
          Puzzlee được xây dựng bởi những người yêu công nghệ và giáo dục, luôn
          hướng đến trải nghiệm mượt mà và dễ dùng. Chúng tôi liên tục cải tiến
          dựa trên phản hồi của người dùng.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-semibold">Liên hệ</h2>
        <p>
          Nếu bạn có ý tưởng, góp ý hoặc cần hỗ trợ, hãy liên hệ với chúng tôi.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/(landing)" className="underline">
            Trang chủ
          </Link>
          <Link href="/(event)/join" className="underline">
            Tham gia sự kiện
          </Link>
          <Link href="/(auth)/register" className="underline">
            Đăng ký tài khoản
          </Link>
        </div>
      </section>
    </main>
  );
}
