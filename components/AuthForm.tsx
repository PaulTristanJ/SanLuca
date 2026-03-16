"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const MODES = ["Iniciar Sesión", "Registrar"] as const;
type Mode = (typeof MODES)[number];

interface LoginData {
    email: string;
    password: string;
}

interface RegisterData {
    name: string;
    email: string;
    phone: string;
    birthDate: string;
    password: string;
    confirmPassword: string;
}

export function AuthForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") ?? "/reservation";
    const initialMode = searchParams.get("mode") === "login" ? "Iniciar Sesión" : "Registrar";

    const [mode, setMode] = useState<Mode>(initialMode);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [login, setLogin] = useState<LoginData>({ email: "", password: "" });
    const [register, setRegister] = useState<RegisterData>({
        name: "",
        email: "",
        phone: "",
        birthDate: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (userId) router.push(redirect);
    }, [redirect, router]);

    const setL = <K extends keyof LoginData>(f: K, v: LoginData[K]) =>
        setLogin((p) => ({ ...p, [f]: v }));
    const setR = <K extends keyof RegisterData>(f: K, v: RegisterData[K]) =>
        setRegister((p) => ({ ...p, [f]: v }));

    const handleLogin = async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(login),
            });
            const data = await res.json();
            if (!data.success) {
                if (data.error === "NOT_REGISTERED") {
                    throw new Error("No encontramos una cuenta con ese email. ¿Quieres registrarte?__REGISTER__");
                }
                if (data.error === "WRONG_CREDENTIALS") {
                    throw new Error("Uno de los datos es correcto pero no podemos decirte cuál es el incorrecto.");
                }
                throw new Error(data.error);
            }
            localStorage.setItem("userId", data.data.id);
            localStorage.setItem("userName", data.data.name);
            router.push("/dashboard");
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Error al iniciar sesión");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        setError(null);
        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(register),
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.error);
            localStorage.setItem("userId", data.data.id);
            localStorage.setItem("userName", data.data.name);
            router.push("/reservation");
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : "Error al registrarse");
        } finally {
            setLoading(false);
        }
    };

    const activeIdx = MODES.indexOf(mode);
    const thumbLeft = `calc(${(activeIdx / MODES.length) * 100}% + 4px)`;
    const thumbWidth = `calc(${100 / MODES.length}% - 8px)`;

    return (
        <div className="auth-wrapper">

            {/* ── Panel izquierdo ── */}
            <div className="rf-left">
                <div>
                    <Link href="/" className="auth-back-btn">SAN<br />LUCA</Link>
                    <h1 className="rf-hero-title">San Luca</h1>
                    <p className="rf-hero-sub">Al alcance de tu mano</p>
                </div>

                <div className="rf-image-wrapper">
                    <div className="rf-image-box">
                        <img
                            src="/images/terraza.jpg"
                            alt="San Luca"
                            className="rf-image"
                            style={{ opacity: 1 }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).parentElement!.style.background =
                                    "linear-gradient(135deg, #2a2f2e 0%, #3a3228 100%)";
                            }}
                        />
                    </div>

                    <div className="rf-switch-overlay">
                        <div className="rf-switch-track">
                            <div
                                className="rf-switch-thumb"
                                style={{ left: thumbLeft, width: thumbWidth }}
                            />
                            {MODES.map((m) => (
                                <button
                                    key={m}
                                    className={`rf-switch-btn${mode === m ? " rf-switch-btn--active" : ""}`}
                                    onClick={() => { setMode(m); setError(null); }}
                                >
                                    {m}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Panel derecho ── */}
            <div className="rf-right">

                {mode === "Iniciar Sesión" ? (
                    <>
                        <div>
                            <h2 className="rf-form-title">Iniciar Sesión</h2>
                            <p className="rf-form-sub">Comienza tu experiencia culinaria</p>
                        </div>

                        <div className="rf-divider" />

                        <div>
                            <label className="rf-label">Email</label>
                            <input
                                className="rf-input"
                                type="email"
                                placeholder="tu@email.com"
                                value={login.email}
                                onChange={(e) => setL("email", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="rf-label">Contraseña</label>
                            <input
                                className="rf-input"
                                type="password"
                                placeholder="••••••••"
                                value={login.password}
                                onChange={(e) => setL("password", e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                            />
                        </div>

                        {error && (
                            <div className="rf-error">
                                ⚠ {error.replace("__REGISTER__", "")}
                                {error.endsWith("__REGISTER__") && (
                                    <button
                                        className="auth-error-action"
                                        onClick={() => { setError(null); setMode("Registrar"); }}
                                    >
                                        Registrarme →
                                    </button>
                                )}
                            </div>
                        )}

                        <button
                            className="rf-submit"
                            onClick={handleLogin}
                            disabled={loading}
                        >
                            {loading ? "Iniciando..." : "Iniciar"}
                        </button>

                        <button
                            className="auth-forgot"
                            onClick={() => { }}
                        >
                            Olvidé mi contraseña
                        </button>

                        <div className="auth-social-row">
                            <button className="auth-social-btn auth-social-btn--fb" aria-label="Facebook">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </button>
                            <button className="auth-social-btn auth-social-btn--g" aria-label="Google">
                                <svg width="20" height="20" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                            </button>
                            <button className="auth-social-btn auth-social-btn--apple" aria-label="Apple">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <h2 className="rf-form-title">Regístrate</h2>
                            <p className="rf-form-sub">Comienza tu experiencia culinaria</p>
                        </div>

                        <div className="rf-divider" />

                        <div>
                            <label className="rf-label">Nombre</label>
                            <input
                                className="rf-input"
                                placeholder="Ej. María González"
                                value={register.name}
                                onChange={(e) => setR("name", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="rf-label">Email</label>
                            <input
                                className="rf-input"
                                type="email"
                                placeholder="tu@email.com"
                                value={register.email}
                                onChange={(e) => setR("email", e.target.value)}
                            />
                        </div>

                        <div className="rf-row-two">
                            <div>
                                <label className="rf-label">Número Celular</label>
                                <input
                                    className="rf-input"
                                    type="tel"
                                    placeholder="+52 449-0000-000"
                                    value={register.phone}
                                    onChange={(e) => setR("phone", e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="rf-label">Fecha de Nacimiento</label>
                                <input
                                    className="rf-input"
                                    type="date"
                                    value={register.birthDate}
                                    style={{ colorScheme: "dark" }}
                                    onChange={(e) => setR("birthDate", e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="rf-label">Contraseña</label>
                            <input
                                className="rf-input"
                                type="password"
                                placeholder="••••••••"
                                value={register.password}
                                onChange={(e) => setR("password", e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="rf-label">Confirmar Contraseña</label>
                            <input
                                className="rf-input"
                                type="password"
                                placeholder="••••••••"
                                value={register.confirmPassword}
                                onChange={(e) => setR("confirmPassword", e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                            />
                        </div>

                        {error && <div className="rf-error">⚠ {error}</div>}

                        <div className="auth-submit-row">
                            <button
                                className="rf-submit auth-submit-btn"
                                onClick={handleRegister}
                                disabled={loading}
                            >
                                {loading ? "Registrando..." : "Registrar"}
                            </button>
                            <div className="auth-social-row auth-social-row--inline">
                                <button className="auth-social-btn auth-social-btn--fb" aria-label="Facebook">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>
                                <button className="auth-social-btn auth-social-btn--g" aria-label="Google">
                                    <svg width="20" height="20" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </button>
                                <button className="auth-social-btn auth-social-btn--apple" aria-label="Apple">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
