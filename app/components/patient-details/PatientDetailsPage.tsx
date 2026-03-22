"use client";

import React, { useState } from "react";
import AppLayout      from "../../components/common/AppLayout";
import PatientProfile from "./PatientProfile";
import AppointmentsList from "./AppointmentsList";
import MedicalHistory from "./MedicalHistory";
import { Patient, STATUS_META } from "./index";

interface PatientDetailsPageProps {
  patient: Patient;
  onBack: () => void;
}

type Tab = "overview" | "appointments" | "history";

/* ─── Vital card ─────────────────────────────────────────── */
function VitalCard({ icon, label, value, sub, color }: {
  icon: string; label: string; value: string; sub: string; color: string;
}) {
  return (
    <div className={`rounded-2xl p-4 border ${color} flex items-start gap-3`}>
      <span className="text-2xl shrink-0">{icon}</span>
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wide text-orange-800/50">{label}</div>
        <div className="font-display text-xl font-extrabold text-gray-800 leading-tight">{value}</div>
        <div className="text-[11px] text-orange-800/50 mt-0.5">{sub}</div>
      </div>
    </div>
  );
}

/* ─── PatientDetailsPage ─────────────────────────────────── */
export default function PatientDetailsPage({ patient, onBack }: PatientDetailsPageProps) {
  const [tab, setTab] = useState<Tab>("overview");
  const m = STATUS_META[patient.status];

  return (
    <AppLayout
      title={patient.name}
      activeItem="patients"
      breadcrumbs={[
        { label: "Patients", onClick: onBack },
        { label: patient.name },
      ]}
    >
      {/* ══ Page header ══ */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#e8c8a8] bg-white text-[#e85520] font-display text-[13px] font-semibold transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500"
          >
            ← Back
          </button>
          <div>
            <h1 className="font-display text-xl font-bold text-gray-800">{patient.name}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm text-orange-800/60">#{patient.id}</span>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${m.badgeCls}`}>
                {m.label}
              </span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-xl border border-[#e8c8a8] bg-white text-[#e85520] font-display text-[13px] font-semibold transition-all hover:bg-orange-500 hover:text-white hover:border-orange-500">
            Edit Record
          </button>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-400 text-white font-display text-[13px] font-semibold transition-all hover:shadow-[0_6px_18px_rgba(232,85,32,.35)]">
            Schedule Appointment
          </button>
        </div>
      </div>

      {/* ══ Tabs ══ */}
      <div className="flex gap-1 bg-white border border-[#e8c8a8] rounded-xl p-1 w-fit mb-6">
        {(["overview", "appointments", "history"] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={[
              "px-5 py-2 rounded-[9px] text-[13px] font-semibold font-display capitalize transition-all duration-200",
              tab === t
                ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-[0_3px_10px_rgba(232,85,32,.25)]"
                : "text-orange-800/60 hover:text-orange-500",
            ].join(" ")}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ══ Overview tab ══ */}
      {tab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
          {/* Left — profile card */}
          <PatientProfile patient={patient} />

          {/* Right — vitals + notes */}
          <div className="flex flex-col gap-5">
            {/* Vitals */}
            <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
              <div className="px-6 py-5 border-b border-orange-100">
                <div className="font-display text-base font-bold text-gray-800">Vitals</div>
                <div className="text-xs text-orange-800/60 mt-0.5">Last recorded today</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5">
                <VitalCard icon="❤️" label="Heart Rate"  value="72 bpm"   sub="Normal"      color="border-red-100 bg-red-50/50"    />
                <VitalCard icon="🩸" label="Blood Press." value="118/76"  sub="Normal"      color="border-blue-100 bg-blue-50/50"  />
                <VitalCard icon="🌡️" label="Temperature"  value="98.6°F"  sub="Normal"      color="border-amber-100 bg-amber-50/50"/>
                <VitalCard icon="💨" label="SpO2"         value="98%"     sub="Normal"      color="border-green-100 bg-green-50/50"/>
              </div>
            </div>

            {/* Clinical notes */}
            <div className="rounded-2xl bg-white border border-orange-900/[.08] shadow-[0_8px_32px_rgba(232,85,32,.10)] overflow-hidden">
              <div className="flex items-center justify-between px-6 py-5 border-b border-orange-100">
                <div>
                  <div className="font-display text-base font-bold text-gray-800">Clinical Notes</div>
                  <div className="text-xs text-orange-800/60 mt-0.5">Latest notes from {patient.doctor}</div>
                </div>
                <button className="text-[13px] font-semibold text-orange-500 hover:text-orange-600 transition-colors">
                  + Add Note
                </button>
              </div>
              <div className="p-5 space-y-4">
                {[
                  { date: "Mar 15, 2026", note: `Patient presenting with ${patient.condition}. Vitals stable. Current treatment plan responding well. Continue monitoring and schedule follow-up in two weeks.` },
                  { date: "Feb 28, 2026", note: "Lab results reviewed. No significant changes. Patient reports improved energy levels and reduced symptoms. Medication adherence confirmed." },
                ].map((n, i) => (
                  <div key={i} className="p-4 rounded-xl bg-orange-50/50 border border-orange-100">
                    <div className="text-[11px] font-semibold text-orange-800/50 mb-1.5">📅 {n.date} · {patient.doctor}</div>
                    <p className="text-[13.5px] text-gray-700 leading-relaxed">{n.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ Appointments tab ══ */}
      {tab === "appointments" && (
        <AppointmentsList patient={patient} />
      )}

      {/* ══ History tab ══ */}
      {tab === "history" && (
        <MedicalHistory patient={patient} />
      )}

    </AppLayout>
  );
}