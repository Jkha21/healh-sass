"use client";

import React, { useState, useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import Sidebar, { ActiveNavItem } from "./Sidebar";
import Topbar from "./Topbar";

/* ─── Types ──────────────────────────────────────────────── */
interface AppLayoutProps {
  title:              string;
  activeItem?:        ActiveNavItem;
  breadcrumbs?:       { label: string; onClick?: () => void }[];
  showSearch?:        boolean;
  searchPlaceholder?: string;
  onSearchChange?:    (value: string) => void;
  children:           React.ReactNode;
}

/* ─── Helpers ────────────────────────────────────────────── */
function getInitials(name: string): string {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

/* ─── AppLayout ──────────────────────────────────────────── */
export default function AppLayout({
  title,
  activeItem,
  breadcrumbs = [],
  showSearch = false,
  searchPlaceholder,
  onSearchChange,
  children,
}: AppLayoutProps) {
  const { user, signOut } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [sidebarOpen]);

  const displayName = user?.displayName ?? "Doctor";
  const firstName   = displayName.split(" ")[0];
  const initials    = getInitials(displayName);

  const handleSignOut = async () => {
    try { await signOut(); } catch (e) { console.error(e); }
  };

  return (
    <div className="min-h-screen bg-[#fdeede] font-sans text-[#4a4a4a] antialiased">
      <div className="flex min-h-screen">

        {/*
         * Sidebar owns its own useRouter — routes itself on nav click.
         * No onNavigate prop needed.
         */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem={activeItem}
          displayName={displayName}
          initials={initials}
        />

        <div className="flex flex-1 flex-col min-h-screen ml-0 md:ml-60 transition-[margin] duration-200">
          <Topbar
            title={title}
            initials={initials}
            firstName={firstName}
            onMenuClick={() => setSidebarOpen((o) => !o)}
            onSignOut={handleSignOut}
            breadcrumbs={breadcrumbs}
            showSearch={showSearch}
            searchPlaceholder={searchPlaceholder}
            onSearchChange={onSearchChange}
          />
          <main className="flex-1 p-7 md:p-5 sm:p-4">
            {children}
          </main>
        </div>

      </div>
    </div>
  );
}