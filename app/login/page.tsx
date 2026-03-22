"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../components/ui/Button";
import useAuthStore from "../store/useAuthStore";

/* ─── SVG Assets ─────────────────────────────────────────── */
const LogoIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
    <path d="M15 3L27 9.5V20.5L15 27L3 20.5V9.5L15 3Z" stroke="white" strokeWidth="1.8" fill="none" />
    <path d="M15 9L21 12.5V19.5L15 23L9 19.5V12.5L15 9Z" fill="white" fillOpacity="0.45" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const AlertIcon = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
    <circle cx="7.5" cy="7.5" r="6.5" stroke="#c0392b" strokeWidth="1.2" />
    <path d="M7.5 4.5v3.5" stroke="#c0392b" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="7.5" cy="10.5" r="0.7" fill="#c0392b" />
  </svg>
);

const Spinner = () => (
  <span
    aria-hidden="true"
    style={{
      width: 18,
      height: 18,
      border: "2.5px solid rgba(60,30,10,.15)",
      borderTopColor: "#e85520",
      borderRadius: "50%",
      animation: "lsc-spin .7s linear infinite",
      flexShrink: 0,
      display: "inline-block",
    }}
  />
);

/* ─── Illustration ───────────────────────────────────────── */
const PanelIllustration = () => (
  <svg
    viewBox="0 0 520 500"
    xmlns="http://www.w3.org/2000/svg"
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="lsc-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ffe8cc" /><stop offset="100%" stopColor="#ffb87a" />
      </linearGradient>
      <linearGradient id="lsc-h1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ef8050" /><stop offset="100%" stopColor="#d85f2a" />
      </linearGradient>
      <linearGradient id="lsc-h2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#e87050" /><stop offset="100%" stopColor="#c84e20" />
      </linearGradient>
      <linearGradient id="lsc-h3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f59060" /><stop offset="100%" stopColor="#df6030" />
      </linearGradient>
      <linearGradient id="lsc-h4" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#fbaa70" /><stop offset="100%" stopColor="#ef7038" />
      </linearGradient>
      <radialGradient id="lsc-sunG" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ffd580" stopOpacity=".65" />
        <stop offset="100%" stopColor="#ffd580" stopOpacity="0" />
      </radialGradient>
    </defs>
    <rect width="520" height="500" fill="url(#lsc-sky)" />
    <circle cx="355" cy="115" r="85" fill="url(#lsc-sunG)" />
    <circle cx="355" cy="115" r="46" fill="#fdd87a" opacity=".88" />
    <g stroke="#b85820" strokeWidth="1.6" fill="none" strokeLinecap="round">
      <path d="M75 68 Q81 63 87 68" /><path d="M98 55 Q105 50 112 55" />
      <path d="M120 44 Q126 39 132 44" /><path d="M155 78 Q161 73 167 78" />
      <path d="M175 90 Q180 85 185 90" /><path d="M55 90 Q60 85 65 90" />
    </g>
    <path d="M0 265 Q90 160 210 205 Q310 238 415 172 Q460 152 520 185 L520 500 L0 500Z" fill="url(#lsc-h4)" opacity=".58" />
    <path d="M0 295 Q110 215 230 245 Q350 272 470 215 Q495 208 520 225 L520 500 L0 500Z" fill="url(#lsc-h3)" opacity=".72" />
    <path d="M0 328 Q130 265 258 295 Q378 320 520 270 L520 500 L0 500Z" fill="url(#lsc-h2)" opacity=".84" />
    <path d="M0 368 Q148 315 285 346 Q398 366 520 326 L520 500 L0 500Z" fill="url(#lsc-h1)" />
    <g transform="translate(248,-8)">
      <path d="M272 0 Q242 44 210 86 Q188 116 166 138" stroke="#5a2e10" strokeWidth="5.5" fill="none" strokeLinecap="round" />
      <path d="M228 52 Q206 64 190 80" stroke="#5a2e10" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M200 94 Q178 100 162 112" stroke="#5a2e10" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      {[
        { tx: 188, ty: 62,  r: -22, s: 1.25, c: "#e8511a" },
        { tx: 178, ty: 78,  r:  18, s: 1.05, c: "#d44015" },
        { tx: 162, ty: 93,  r: -38, s: 0.92, c: "#f06022" },
        { tx: 198, ty: 80,  r:  28, s: 1.12, c: "#c83010" },
        { tx: 213, ty: 57,  r: -12, s: 1.35, c: "#e96018" },
        { tx: 167, ty: 111, r:  42, s: 0.82, c: "#f07030" },
        { tx: 182, ty: 98,  r: -28, s: 1.02, c: "#dc4818" },
        { tx: 203, ty: 103, r:  12, s: 1.18, c: "#e55012" },
      ].map(({ tx, ty, r, s, c }, i) => (
        <g key={i} transform={`translate(${tx},${ty}) rotate(${r}) scale(${s})`}>
          <path d="M0-15 C2-11 8-9 6-5 C11-5 13-1 9 2 C11 6 9 9 5 7 C3 10 0 11 0 11 C0 11-3 10-5 7 C-9 9-11 6-9 2 C-13-1-11-5-6-5 C-8-9-2-11 0-15Z" fill={c} opacity=".93" />
        </g>
      ))}
      {[
        { tx: 105, ty: 155, r:  18, c: "#e8511a" },
        { tx: 136, ty: 195, r: -32, c: "#f06022" },
        { tx:  82, ty: 228, r:  47, c: "#d44015" },
        { tx: 155, ty: 258, r: -12, c: "#c83010" },
      ].map(({ tx, ty, r, c }, i) => (
        <g key={i} transform={`translate(${tx},${ty}) rotate(${r}) scale(.7)`}>
          <path d="M0-11 C1-8 5-6 4-3 C8-3 9-1 7 1 C8 4 6 6 3 5 C2 7 0 8 0 8 C0 8-2 7-3 5 C-6 6-8 4-7 1 C-9-1-8-3-4-3 C-5-6-1-8 0-11Z" fill={c} opacity=".82" />
        </g>
      ))}
    </g>
  </svg>
);

/* ─── Scoped styles ──────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Sora:wght@400;600;700;800&display=swap');

  @keyframes lsc-spin   { to { transform: rotate(360deg); } }
  @keyframes lsc-fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lsc-root *, .lsc-root *::before, .lsc-root *::after {
    box-sizing: border-box; margin: 0; padding: 0;
  }
  .lsc-root {
    font-family: 'DM Sans', sans-serif;
    background: #fdeede;
    min-height: 100dvh;
    -webkit-font-smoothing: antialiased;
  }
  .lsc-page {
    display: grid;
    grid-template-columns: 46fr 54fr;
    min-height: 100dvh;
  }

  .lsc-panel {
    position: relative;
    background: linear-gradient(158deg, #ffd09a 0%, #f68540 42%, #e85520 100%);
    border-radius: 0 36px 36px 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .lsc-panel-header {
    padding: 28px 32px;
    position: relative;
    z-index: 3;
    flex-shrink: 0;
  }
  .lsc-logo-wrap { display: flex; align-items: center; gap: 10px; }
  .lsc-logo-text {
    font-family: 'Sora', sans-serif;
    font-size: clamp(12px, 1.1vw, 15px);
    font-weight: 700;
    color: rgba(255,255,255,.96);
    letter-spacing: 1.3px;
  }
  .lsc-illustration {
    flex: 1;
    position: relative;
    overflow: hidden;
    min-height: 0;
  }
  .lsc-panel-footer {
    position: relative;
    z-index: 3;
    padding: clamp(20px,3vw,36px) clamp(24px,3.5vw,38px) clamp(24px,3.5vw,40px);
    background: linear-gradient(to top, rgba(175,38,0,.75) 0%, transparent 100%);
    flex-shrink: 0;
  }
  .lsc-eyebrow {
    font-size: clamp(11px, 1vw, 13px);
    color: rgba(255,255,255,.78);
    margin-bottom: 6px;
  }
  .lsc-headline {
    font-family: 'Sora', sans-serif;
    font-size: clamp(20px, 2.8vw, 36px);
    font-weight: 800;
    color: #fff;
    line-height: 1.2;
    letter-spacing: -.5px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .lsc-headline-sub { display: flex; align-items: center; gap: 12px; flex-wrap: nowrap; }
  .lsc-arrow-badge {
    width: clamp(34px, 3.2vw, 46px);
    height: clamp(34px, 3.2vw, 46px);
    border-radius: 50%;
    background: rgba(255,255,255,.22);
    border: 1.5px solid rgba(255,255,255,.48);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .lsc-form-side {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(32px,5vw,64px) clamp(24px,5vw,64px);
  }
  .lsc-form-card {
    width: 100%;
    max-width: 420px;
    animation: lsc-fadeUp .5s cubic-bezier(.16,1,.3,1) both;
  }
  .lsc-form-title {
    font-family: 'Sora', sans-serif;
    font-size: clamp(28px, 3.5vw, 42px);
    font-weight: 800;
    color: #e85520;
    letter-spacing: -1px;
    margin-bottom: 10px;
    line-height: 1.08;
  }
  .lsc-form-sub {
    font-size: clamp(13px, 1.1vw, 14px);
    color: #8a6650;
    line-height: 1.68;
    margin-bottom: clamp(28px, 3.5vw, 40px);
  }

  .lsc-error {
    display: none;
    align-items: center;
    gap: 10px;
    background: #fde8e8;
    border: 1px solid #f5bcbc;
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 13px;
    color: #c0392b;
    margin-bottom: 18px;
  }
  .lsc-error.visible { display: flex; }

  .lsc-google-btn {
    width: 100% !important;
    min-height: 54px !important;
    border-radius: 14px !important;
    background: #fff !important;
    background-image: none !important;
    border: 2px solid #e8c8a8 !important;
    color: #1f2937 !important;
    font-size: clamp(14px, 1.3vw, 16px) !important;
    font-family: 'Sora', sans-serif !important;
    font-weight: 700 !important;
    box-shadow: 0 4px 16px rgba(0,0,0,.09) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 12px !important;
    padding: clamp(13px,1.4vw,16px) 20px !important;
    transition: border-color .2s, box-shadow .2s, transform .15s, background .2s !important;
    position: relative;
    overflow: hidden;
  }
  .lsc-google-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(232,85,32,.06), transparent);
    opacity: 0;
    transition: opacity .2s;
    pointer-events: none;
  }
  .lsc-google-btn:hover:not(:disabled) {
    border-color: #e85520 !important;
    box-shadow: 0 8px 24px rgba(232,85,32,.28) !important;
    transform: translateY(-2px) !important;
  }
  .lsc-google-btn:hover:not(:disabled)::after { opacity: 1; }
  .lsc-google-btn:active:not(:disabled) { transform: translateY(0) !important; }
  .lsc-google-btn:disabled {
    opacity: .55 !important;
    box-shadow: none !important;
    background: #f3f4f6 !important;
  }

  .lsc-btn-label { flex: 1; text-align: center; transition: opacity .2s; }

  .lsc-secured {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    margin-top: 14px;
    font-size: 12px;
    color: #a08870;
    font-weight: 500;
  }

  @media (max-width: 860px) {
    .lsc-page { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
    .lsc-panel {
      border-radius: 0 0 32px 32px;
      min-height: 0; max-height: 280px;
      flex-direction: row; align-items: stretch;
    }
    .lsc-panel-header { padding: 20px 22px; display: flex; align-items: flex-start; min-width: 0; flex-shrink: 0; }
    .lsc-illustration { display: none; }
    .lsc-panel-footer {
      flex: 1; position: static; background: none;
      display: flex; flex-direction: column; justify-content: center;
      padding: 24px 28px 24px 8px;
    }
    .lsc-headline { font-size: clamp(22px, 4vw, 32px); }
    .lsc-arrow-badge { width: 38px; height: 38px; }
    .lsc-form-side { align-items: flex-start; padding: 36px 32px 48px; }
  }

  @media (max-width: 520px) {
    .lsc-panel { max-height: 160px; flex-direction: column; }
    .lsc-panel-header { padding: 18px 20px 10px; }
    .lsc-panel-footer { padding: 0 20px 20px; background: none; position: static; flex: 1; justify-content: flex-end; }
    .lsc-headline { font-size: 20px; gap: 3px; }
    .lsc-arrow-badge { width: 32px; height: 32px; }
    .lsc-form-side { padding: 28px 20px 48px; }
    .lsc-form-title { font-size: 28px; }
    .lsc-form-sub { font-size: 13px; margin-bottom: 28px; }
    .lsc-google-btn { min-height: 52px !important; border-radius: 12px !important; font-size: 14.5px !important; }
  }

  @media (max-width: 380px) {
    .lsc-panel { max-height: 140px; }
    .lsc-headline { font-size: 17px; }
    .lsc-form-title { font-size: 24px; }
    .lsc-form-sub { font-size: 12.5px; line-height: 1.6; margin-bottom: 24px; }
    .lsc-form-side { padding: 24px 16px 40px; }
    .lsc-google-btn { padding: 13px 16px !important; font-size: 14px !important; gap: 10px !important; }
  }

  @media (prefers-contrast: high) {
    .lsc-google-btn { border-width: 3px !important; border-color: #e85520 !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .lsc-root *, .lsc-root *::before, .lsc-root *::after {
      animation-duration: .01ms !important;
      transition-duration: .01ms !important;
    }
  }
  @media (prefers-color-scheme: dark) {
    .lsc-root       { background: #1c0f06; }
    .lsc-form-side  { background: #1c0f06; }
    .lsc-form-title { color: #f97848; }
    .lsc-form-sub   { color: #b89888; }
    .lsc-google-btn { background: #2a1608 !important; border-color: #5a3020 !important; color: #f1e4d8 !important; }
    .lsc-google-btn:hover:not(:disabled) { border-color: #f97848 !important; background: #341c0a !important; }
    .lsc-secured { color: #7a5848; }
  }
`;

/* ─── Login Page ─────────────────────────────────────────── */
export default function LoginPage() {
  const router = useRouter();
  const { signInWithGoogle, user, loading, error } = useAuthStore();
  const [welcomeName, setWelcomeName] = useState<string>("");

  useEffect(() => {
    const id = "lsc-login-styles";
    if (!document.getElementById(id)) {
      const tag = document.createElement("style");
      tag.id = id;
      tag.textContent = STYLES;
      document.head.appendChild(tag);
    }
    return () => { document.getElementById(id)?.remove(); };
  }, []);

  useEffect(() => {
    if (user) {
      setWelcomeName(user.displayName?.split(" ")[0] ?? "");
      // ✅ Redirect to home page instead of non-existent /dashboard
      router.replace("/");
    }
  }, [user, router]);

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch {
      // error already set in store
    }
  };

  const isDisabled = loading || !!welcomeName;

  const btnLabel = welcomeName
    ? `Welcome, ${welcomeName}!`
    : loading
    ? "Signing you in…"
    : "Continue with Google";

  return (
    <div className="lsc-root">
      <div className="lsc-page">

        {/* ════ Left Panel ════ */}
        <div className="lsc-panel" role="complementary" aria-label="Salford & Co. branding">
          <div className="lsc-panel-header">
            <div className="lsc-logo-wrap">
              <LogoIcon />
              <span className="lsc-logo-text">SALFORD &amp; CO.</span>
            </div>
          </div>

          <div className="lsc-illustration" aria-hidden="true">
            <PanelIllustration />
          </div>

          <div className="lsc-panel-footer">
            <p className="lsc-eyebrow">Your Digital Record</p>
            <h2 className="lsc-headline">
              <span>Smart Health for</span>
              <span className="lsc-headline-sub">
                <span className="lsc-arrow-badge" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M4 14L14 4M14 4H7M14 4V11" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                Smarter Work
              </span>
            </h2>
          </div>
        </div>

        {/* ════ Right Form ════ */}
        <div className="lsc-form-side" role="main">
          <div className="lsc-form-card">
            <h1 className="lsc-form-title">Welcome Back!</h1>
            <p className="lsc-form-sub">
              Log in to access your dashboard, manage your account, and continue
              securely with full control.
            </p>

            <div
              className={`lsc-error${error ? " visible" : ""}`}
              role="alert"
              aria-live="polite"
            >
              {error && (
                <>
                  <AlertIcon />
                  <span>{error}</span>
                </>
              )}
            </div>

            <Button
              variant="outline"
              size="lg"
              className="lsc-google-btn"
              onClick={handleSignIn}
              disabled={isDisabled}
              type="button"
              aria-label="Sign in with Google"
            >
              {loading ? <Spinner /> : <GoogleIcon />}
              <span className="lsc-btn-label" style={{ opacity: loading ? 0.7 : 1 }}>
                {btnLabel}
              </span>
            </Button>

            <div className="lsc-secured" aria-label="Authentication security notice">
              <ShieldIcon />
              Secured by Firebase &amp; Google OAuth 2.0
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
