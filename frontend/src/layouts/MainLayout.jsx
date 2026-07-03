import { useState, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/common/Header";
import { navItems } from "../components/common/navConfig";

export default function MainLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { pathname } = useLocation();

  const pageTitle = useMemo(() => {
    const match = navItems.find((item) =>
      item.path === "/" ? pathname === "/" : pathname.startsWith(item.path)
    );
    return match?.label ?? "Traffic Intelligence AI";
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="flex min-h-screen flex-col md:ml-20 lg:ml-[280px]">
        <Header title={pageTitle} onMenuClick={() => setMobileNavOpen(true)} />

        <main className="flex-1 px-5 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
