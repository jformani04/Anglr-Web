'use client';

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, XCircle, ShieldAlert, ArrowLeft, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import AnglrLogo from '@/components/AnglrLogo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';

type PageState = 'verifying' | 'ready' | 'submitting' | 'success' | 'error' | 'no-token';

interface FormErrors {
  password?: string;
  confirm?: string;
}

function PasswordStrengthBar({ password }: { password: string }) {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const strength = checks.filter(Boolean).length;

  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i < strength ? colors[strength - 1] : 'bg-anglr-border'
            }`}
          />
        ))}
      </div>
      <p className="text-xs text-anglr-text-muted">
        Strength:{' '}
        <span
          className={
            strength <= 1
              ? 'text-red-400'
              : strength === 2
              ? 'text-orange-400'
              : strength === 3
              ? 'text-yellow-400'
              : 'text-green-400'
          }
        >
          {labels[strength - 1] ?? '—'}
        </span>
      </p>
    </div>
  );
}

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const [state, setState] = useState<PageState>('verifying');
  const [errorMessage, setErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const verifyToken = useCallback(async () => {
    const code = searchParams.get('code');
    const tokenHash = searchParams.get('token_hash');
    const type = searchParams.get('type');

    // PKCE flow: ?code=xxx
    if (code) {
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) {
        setErrorMessage(error.message);
        setState('error');
      } else {
        setState('ready');
      }
      return;
    }

    // OTP / email link flow: ?token_hash=xxx&type=recovery
    if (tokenHash && type === 'recovery') {
      const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'recovery' });
      if (error) {
        setErrorMessage(error.message);
        setState('error');
      } else {
        setState('ready');
      }
      return;
    }

    // Hash-based implicit flow: #access_token=xxx
    if (typeof window !== 'undefined' && window.location.hash.includes('access_token')) {
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const accessToken = hash.get('access_token');
      const refreshToken = hash.get('refresh_token');
      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
        if (error) {
          setErrorMessage(error.message);
          setState('error');
        } else {
          setState('ready');
        }
        return;
      }
    }

    // No token found
    setState('no-token');
  }, [searchParams]);

  useEffect(() => {
    verifyToken();
  }, [verifyToken]);

  function validate(): boolean {
    const errors: FormErrors = {};

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    }

    if (!confirm) {
      errors.confirm = 'Please confirm your password.';
    } else if (password !== confirm) {
      errors.confirm = 'Passwords do not match.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setState('submitting');
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMessage(error.message);
      setState('error');
    } else {
      setState('success');
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Header logo */}
      <div className="mb-10 animate-fade-in">
        <AnglrLogo size="lg" />
      </div>

      <div className="w-full max-w-md animate-slide-up">
        {/* ── Verifying state ── */}
        {state === 'verifying' && (
          <Card className="text-center py-14">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-anglr-surface-2 mb-5 mx-auto">
              <div className="w-6 h-6 rounded-full border-2 border-anglr-blue border-t-transparent animate-spin" />
            </div>
            <h1 className="text-lg font-semibold text-anglr-text-primary mb-1">Verifying link</h1>
            <p className="text-sm text-anglr-text-muted">Just a moment…</p>
          </Card>
        )}

        {/* ── No token state ── */}
        {state === 'no-token' && (
          <Card className="text-center py-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-orange-500/10 mb-5 mx-auto">
              <ShieldAlert size={26} className="text-orange-400" />
            </div>
            <h1 className="text-xl font-bold text-anglr-text-primary mb-2">Invalid Link</h1>
            <p className="text-sm text-anglr-text-secondary mb-8 max-w-xs mx-auto">
              This page requires a valid password reset link. Request a new one from the ANGLR app.
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-xs text-anglr-text-muted">
                Open the ANGLR app → Profile → Forgot Password
              </p>
            </div>
          </Card>
        )}

        {/* ── Token error state ── */}
        {state === 'error' && (
          <Card className="text-center py-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-500/10 mb-5 mx-auto">
              <XCircle size={28} className="text-red-400" />
            </div>
            <h1 className="text-xl font-bold text-anglr-text-primary mb-2">
              {errorMessage.toLowerCase().includes('expired') ? 'Link Expired' : 'Something went wrong'}
            </h1>
            <p className="text-sm text-anglr-text-secondary mb-2 max-w-xs mx-auto">
              {errorMessage.toLowerCase().includes('expired')
                ? 'This password reset link has expired. Reset links are valid for 1 hour.'
                : errorMessage || 'An unexpected error occurred. Please try again.'}
            </p>
            {errorMessage.toLowerCase().includes('expired') && (
              <p className="text-xs text-anglr-text-muted mt-4 mb-6">
                Open the ANGLR app and request a new reset link.
              </p>
            )}
            <div className="mt-6 p-3 rounded-xl bg-red-500/8 border border-red-500/15 text-left">
              <p className="text-xs text-red-400 font-mono break-all">{errorMessage}</p>
            </div>
          </Card>
        )}

        {/* ── Password form ── */}
        {(state === 'ready' || state === 'submitting') && (
          <Card>
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-anglr-blue/10 border border-anglr-blue/20">
                <Lock size={24} className="text-anglr-blue" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-anglr-text-primary mb-1.5">Reset your password</h1>
              <p className="text-sm text-anglr-text-secondary">
                Choose a strong, unique password for your ANGLR account.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <Input
                  label="New Password"
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (formErrors.password) setFormErrors((p) => ({ ...p, password: undefined }));
                  }}
                  error={formErrors.password}
                  autoComplete="new-password"
                  disabled={state === 'submitting'}
                />
                <PasswordStrengthBar password={password} />
              </div>

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter your password"
                value={confirm}
                onChange={(e) => {
                  setConfirm(e.target.value);
                  if (formErrors.confirm) setFormErrors((p) => ({ ...p, confirm: undefined }));
                }}
                error={formErrors.confirm}
                autoComplete="new-password"
                disabled={state === 'submitting'}
              />

              {/* Requirements hint */}
              <div className="p-3.5 rounded-xl bg-anglr-surface-2/50 border border-anglr-border space-y-1.5">
                <p className="text-xs font-semibold text-anglr-text-muted uppercase tracking-wider mb-1">
                  Requirements
                </p>
                {[
                  ['At least 8 characters', password.length >= 8],
                  ['One uppercase letter', /[A-Z]/.test(password)],
                  ['One number', /[0-9]/.test(password)],
                  ['One special character', /[^A-Za-z0-9]/.test(password)],
                ].map(([label, met]) => (
                  <div key={label as string} className="flex items-center gap-2">
                    <div
                      className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors duration-200 ${
                        met ? 'bg-anglr-green' : 'bg-anglr-text-muted'
                      }`}
                    />
                    <span
                      className={`text-xs transition-colors duration-200 ${
                        met ? 'text-anglr-text-secondary' : 'text-anglr-text-muted'
                      }`}
                    >
                      {label as string}
                    </span>
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                fullWidth
                loading={state === 'submitting'}
                size="lg"
                className="mt-2"
              >
                {state === 'submitting' ? 'Updating password…' : 'Update Password'}
              </Button>
            </form>
          </Card>
        )}

        {/* ── Success state ── */}
        {state === 'success' && (
          <Card className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-6 mx-auto">
              <CheckCircle2 size={32} className="text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-anglr-text-primary mb-2">Password updated!</h1>
            <p className="text-sm text-anglr-text-secondary mb-8 max-w-xs mx-auto">
              Your ANGLR password has been changed successfully. You can now log in with your new password.
            </p>
            <div className="p-4 rounded-2xl bg-green-500/8 border border-green-500/15 mb-6">
              <p className="text-xs text-green-400">
                Return to the ANGLR app and sign in with your new password.
              </p>
            </div>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link
            href="/privacy"
            className="text-xs text-anglr-text-muted hover:text-anglr-text-secondary transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="mx-2 text-anglr-text-muted text-xs">·</span>
          <span className="text-xs text-anglr-text-muted">© {new Date().getFullYear()} ANGLR</span>
        </div>
      </div>

      {/* Back to top subtle link */}
      <div className="fixed bottom-6 left-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-anglr-text-muted hover:text-anglr-text-secondary transition-colors"
        >
          <ArrowLeft size={12} />
          Back
        </Link>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <AnglrLogo size="lg" className="mb-10" />
      <div className="w-full max-w-md">
        <Card className="text-center py-14">
          <div className="w-8 h-8 rounded-full border-2 border-anglr-blue border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-sm text-anglr-text-muted">Loading…</p>
        </Card>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ResetPasswordContent />
    </Suspense>
  );
}
