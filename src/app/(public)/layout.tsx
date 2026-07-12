import { PublicNavbar } from "@/components/layouts/public/PublicNavbar";
import { PublicFooter } from "@/components/layouts/public/PublicFooter";
import {useAuthStore} from "@/store/useAuthStore";

export default function PublicLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex min-h-screen flex-col">
      <PublicNavbar />
      <main className="flex-1">{children}</main>
      <PublicFooter />
    </div>
  );
}
