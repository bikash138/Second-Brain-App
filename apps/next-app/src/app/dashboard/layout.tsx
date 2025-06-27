import NavBar from "@/components/Common/NavBar";
import { SignedIn } from "@clerk/nextjs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <SignedIn>
            <NavBar />
            <main>{children}</main>
        </SignedIn>
    </>
  );
}