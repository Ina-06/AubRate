// Language: TSX (React + TypeScript)
"use client";

import { useState } from "react";
import { registerSchema } from "@/lib/validators";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setError(null);
    setSuccess(null);

    // 1) Validate inputs using Zod
    const parsed = registerSchema.safeParse({ email, password });
    if (!parsed.success) {
      // get the first error message
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }

    try {
      setLoading(true);

      // 2) Create Firebase user (temporary step — later backend controls OTP + disabled user)
      await createUserWithEmailAndPassword(auth, email, password);

      setSuccess("Account created ✅ (Next step: OTP verification flow)");
    } catch (e: any) {
      setError(e?.message ?? "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "60px auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Register</h1>

      <label>Email (AUB only)</label>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="ina06@mail.aub.edu"
        style={{ width: "100%", padding: 10, marginTop: 6, marginBottom: 14 }}
      />

      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="min 8 chars"
        style={{ width: "100%", padding: 10, marginTop: 6, marginBottom: 14 }}
      />

      <button
        onClick={handleRegister}
        disabled={loading}
        style={{ width: "100%", padding: 10 }}
      >
        {loading ? "Creating..." : "Create account"}
      </button>

      {error && <p style={{ marginTop: 12, color: "crimson" }}>{error}</p>}
      {success && <p style={{ marginTop: 12, color: "green" }}>{success}</p>}
    </main>
  );
}
