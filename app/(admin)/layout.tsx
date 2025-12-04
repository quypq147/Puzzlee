export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
    <div className="auth-layout">
      {children}
    </div>
  );
}