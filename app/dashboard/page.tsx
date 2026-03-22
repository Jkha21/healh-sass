"use client";

import React, { useState, useEffect, useMemo } from "react";
import AppLayout    from "../components/common/AppLayout";
import useDashboardStore from "../store/useDashboardStore";
import StatsGrid    from "../components/dashboard/StatsGrid";
import QuickActions from "../components/dashboard/QuickActions";
import RevenueChart from "../components/dashboard/RevenueChart";
import {
  PatientStatus,
  DashboardPatient,
  DashboardAlert,
  ScheduleItem,
  MetricCard,
} from "../types/dashboard";

/* ─── Constants ──────────────────────────────────────────── */
const DAYS   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const METRICS: MetricCard[] = [
  { icon: "👥", trend: "+12%",   trendClass: "trend-up",      value: "247", label: "Active Patients"  },
  { icon: "📅", trend: "Today",  trendClass: "trend-neutral",  value: "14",  label: "Appointments"    },
  { icon: "⚠️", trend: "Urgent", trendClass: "trend-down",     value: "2",   label: "Priority Alerts" },
  { icon: "✅", trend: "+3",     trendClass: "trend-up",       value: "9",   label: "Completed Today" },
];

const STATUS_LABELS: Record<PatientStatus, string> = {
  active:   "Active",
  pending:  "Pending",
  priority: "Priority",
  complete: "Done",
};

const STATUS_BADGE_CLASSES: Record<PatientStatus, string> = {
  active:   "bg-green-100 text-green-700",
  pending:  "bg-yellow-50 text-yellow-700",
  priority: "bg-red-100 text-red-600",
  complete: "bg-sky-100 text-sky-700",
};

const SCHED_DOT_CLASSES: Record<ScheduleItem["status"], string> = {
  now:      "bg-green-500",
  upcoming: "bg-amber-400",
  done:     "bg-gray-300",
};

const ALERT_DOT_CLASSES: Record<DashboardAlert["level"], string> = {
  urgent:  "bg-red-600",
  warning: "bg-amber-400",
  info:    "bg-blue-500",
};

type TabKey = "all" | PatientStatus;

/* ─── Helpers ────────────────────────────────────────────── */
function getGreeting(): string {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
}

const SearchSvg = () => (
  <svg width={13} height={13} viewBox="0 0 24 24" fill="none"
    stroke="#c8a888" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

/* ─── Dashboard ──────────────────────────────────────────── */
export default function Dashboard() {

  /* ── Store ─────────────────────────────────────────────── */
  const {
    patients,
    alerts,
    schedule,
    stats,
    activeTab,
    searchQuery,
    setActiveTab,
    setSearchQuery,
    fetchDashboardData,
  } = useDashboardStore();

  /* ── Stable filtered patients ───────────────────────────── */
  const filteredPatients = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return patients.filter((p) => {
      const matchTab = activeTab === "all" || p.status === activeTab;
      const matchQ   = !q || p.name.toLowerCase().includes(q);
      return matchTab && matchQ;
    });
  }, [patients, activeTab, searchQuery]);

  const [now] = useState(new Date());

  useEffect(() => { fetchDashboardData(); }, [fetchDashboardData]);

  /* ── Live metrics wired to store ────────────────────────── */
  const liveMetrics: MetricCard[] = [
    { ...METRICS[0], value: String(stats.activePatients) },
    { ...METRICS[1], value: String(stats.appointments)   },
    { ...METRICS[2], value: String(stats.priorityAlerts) },
    { ...METRICS[3], value: String(stats.completedToday) },
  ];

  return (
    <AppLayout
      title="Dashboard"
      activeItem="dashboard"
      showSearch
      searchPlaceholder="Search patients, records…"
    >

      {/* ══ Welcome Banner ══ */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 via-orange-400 to-orange-200 p-7 mb-7 flex items-center justify-between gap-5">
        {/* decorative blobs */}
        <span className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/[.08]" />
        <span className="pointer-events-none absolute -bottom-14 right-20 w-36 h-36 rounded-full bg-white/[.05]" />

        <div className="relative z-10">
          <h1 className="font-display text-2xl sm:text-[26px] font-extrabold text-white leading-tight mb-1.5">
            {getGreeting()}, Doctor!
          </h1>
          <p className="text-sm text-white/80 leading-relaxed">
            You have {stats.appointments} appointments today · {stats.priorityAlerts} priority alerts pending
          </p>
        </div>

        {/* Date badge */}
        <div className="relative z-10 hidden sm:block shrink-0 rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm px-5 py-2.5 text-center">
          <div className="text-[11px] uppercase tracking-wide text-white/70">{DAYS[now.getDay()]}</div>
          <div className="font-display text-4xl font-extrabold text-white leading-none">{now.getDate()}</div>
          <div className="text-xs font-medium text-white/80">{MONTHS[now.getMonth()]}</div>
        </div>
      </div>

      {/* ══ Stats — StatsGrid ══ */}
      <StatsGrid metrics={liveMetrics} />

      {/* ══ Content Row ══ */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-5 mb-7">

        {/* ── Patient List ── */}
        <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">

          {/* Card header */}
          <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-orange-100">
            <div>
              <div className="font-display text-base font-bold text-gray-800">Today's Patients</div>
              <div className="text-[12.5px] text-orange-800/60 mt-0.5">
                {stats.appointments} scheduled · {stats.completedToday} completed
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
              {/* Patient search */}
              <div className="flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-xl px-3.5 py-2 transition-all focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/10">
                <SearchSvg />
                <input
                  type="text"
                  placeholder="Search…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-[13px] text-gray-800 placeholder:text-orange-300 w-40 sm:w-36"
                />
              </div>
              <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[13px] font-semibold whitespace-nowrap transition-all hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(232,85,32,.35)]">
                + New Patient
              </button>
            </div>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-1 px-6 pt-3 border-b border-orange-100 overflow-x-auto">
            {(["all", "active", "pending", "priority", "complete"] as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={[
                  "px-4 py-2 rounded-t-lg text-[13px] font-medium whitespace-nowrap border-b-2 transition-all",
                  activeTab === tab
                    ? "text-orange-500 border-orange-500 font-semibold"
                    : "text-orange-800/50 border-transparent hover:text-orange-500",
                ].join(" ")}
              >
                {tab === "all"
                  ? `All (${stats.appointments})`
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Patient rows */}
          <div>
            {filteredPatients.map((p: DashboardPatient, i: number) => (
              <div
                key={i}
                className="flex items-center gap-3.5 px-6 py-3.5 border-b border-orange-50 last:border-0 cursor-pointer hover:bg-orange-50/60 transition-colors"
              >
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center font-bold text-orange-500 text-sm shrink-0 shadow-[0_3px_10px_rgba(232,85,32,.18)]">
                  {p.initials}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[14.5px] text-gray-800 truncate mb-0.5">{p.name}</div>
                  <div className="text-[12.5px] text-orange-800/60 flex flex-wrap items-center gap-1.5">
                    <span>{p.age} yrs</span>
                    <span>·</span>
                    <span>{p.reason}</span>
                  </div>
                </div>

                {/* Time + status — hidden on very small screens */}
                <div className="hidden sm:flex flex-col items-end gap-1.5 shrink-0">
                  <span className="text-[11.5px] font-semibold text-orange-500 bg-orange-500/10 px-2.5 py-0.5 rounded-lg">
                    {p.time}
                  </span>
                  <span className={[
                    "inline-flex items-center gap-1.5 text-[11.5px] font-semibold px-2.5 py-0.5 rounded-full",
                    "before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-current",
                    STATUS_BADGE_CLASSES[p.status],
                  ].join(" ")}>
                    {STATUS_LABELS[p.status]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Side Panel ── */}
        <div className="flex flex-col gap-5">

          {/* Quick Actions */}
          <QuickActions />

          {/* Alerts */}
          <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
            <div className="px-6 py-5 border-b border-orange-100">
              <div className="font-display text-base font-bold text-gray-800">Alerts</div>
              <div className="text-[12.5px] text-orange-800/60 mt-0.5">
                {stats.priorityAlerts} require attention
              </div>
            </div>
            <div>
              {alerts.map((a: DashboardAlert, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-5 py-3.5 border-b border-orange-50 last:border-0 cursor-pointer hover:bg-orange-50/60 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 mt-1.5 ${ALERT_DOT_CLASSES[a.level]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13.5px] font-semibold text-gray-800 mb-0.5">{a.title}</div>
                    <div className="text-xs text-orange-800/60">{a.sub}</div>
                  </div>
                  <span className="text-[11px] font-medium text-orange-300 shrink-0 ml-2">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ══ Bottom Row ══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Upcoming Schedule */}
        <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
          <div className="px-6 py-5 border-b border-orange-100">
            <div className="font-display text-base font-bold text-gray-800">Upcoming Schedule</div>
            <div className="text-[12.5px] text-orange-800/60 mt-0.5">Next 5 appointments</div>
          </div>
          <div>
            {schedule.map((s: ScheduleItem, i: number) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3 border-b border-orange-50 last:border-0 cursor-pointer hover:bg-orange-50/60 transition-colors"
              >
                <span className="font-display text-[13px] font-bold text-orange-500 min-w-[52px]">
                  {s.time}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800 truncate">{s.name}</div>
                  <div className="text-xs text-orange-800/60">{s.type}</div>
                </div>
                <div className={`w-2 h-2 rounded-full shrink-0 ${SCHED_DOT_CLASSES[s.status]}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Weekly bar chart */}
        <RevenueChart />

      </div>
    </AppLayout>
  );
}