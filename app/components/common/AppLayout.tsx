"use client";

import React, { useState, useEffect } from "react";
import useAuthStore from "../../store/useAuthStore";
import Sidebar, { ActiveNavItem } from "./Sidebar";
import Topbar from "./Topbar";

/* ─── Types ──────────────────────────────────────────────── */
interface AppLayoutProps {
  title: string;
  activeItem?: ActiveNavItem;
  breadcrumbs?: { label: string; onClick?: () => void }[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onNavigate?: (item: ActiveNavItem) => void;
  children: React.ReactNode;
}

function getInitials(name: string) {
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
  onNavigate,
  children,
}: AppLayoutProps) {
  const { user, signOut }             = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Lock body scroll when sidebar open on mobile
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
    <div className="min-h-screen bg-[#fdeede] antialiased">
      <div className="flex min-h-screen">

        {/* Sidebar + overlay */}
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          activeItem={activeItem}
          onNavigate={onNavigate}
          displayName={displayName}
          initials={initials}
        />

        {/*
         * md:ml-60 = 240px — matches the fixed sidebar width (w-60)
         * On mobile sidebar is off-canvas, no margin needed
         */}
        <div className="flex flex-1 flex-col min-h-screen md:ml-60 transition-[margin] duration-200 ease-[cubic-bezier(.4,0,.2,1)]">

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

          <main className="flex-1 p-7 sm:p-5">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}