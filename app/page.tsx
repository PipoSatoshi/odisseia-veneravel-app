'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { getCurrentRole, normalizePhone, ERROR_PROFILE_NOT_FOUND, ERROR_PROFILE_FETCH, ERROR_INVALID_PHONE } from '../lib/auth';
import i18n from '../i18n/pt-PT.json';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const supabase = createClientComponentClient();

  const isEmail = useMemo(() => identifier.includes('@'), [identifier]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const credentials = {
        password,
        ...(isEmail ? { email: identifier } : { phone: normalizePhone(identifier) }),
      };

      const { error: signInError } = await supabase.auth.signInWithPassword(credentials);

      if (signInError) {
        throw new Error(signInError.message);
      }
      
      // Se o login for bem-sucedido, obter o role para redirecionar diretamente
      const role = await getCurrentRole(supabase);
      router.push(`/${role}`);

    } catch (err) {
      if (err instanceof Error) {
        switch (err.message) {
          case ERROR_PROFILE_NOT_FOUND:
            setError(i18n.errorProfileNotFound);
            break;
          case ERROR_PROFILE_FETCH:
            setError(i18n.errorProfileFetch);
            break;
          case ERROR_INVALID_PHONE:
            setError(i18n.errorInvalidPhone);
            break;
          default:
            setError(i18n.errorInvalidCredentials);
            break;
        }
      } else {
        setError(i18n.errorInvalidCredentials);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#1D1D1B] p-24 text-white">
      <h1 className="text-6xl mb-8" style={{ fontFamily: '"Edwardian Script ITC", "Great Vibes", cursive' }}>
        Odisseia Venerável
      </h1>
      <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
        <div>
          <label htmlFor="identifier" className="block text-sm font-medium text-gray-300 font-poppins">
            Email ou Telemóvel
          </label>
          <input
            id="identifier"
            type="text"
            required
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 p-2 shadow-sm focus:border-[#9C9B9B] focus:ring focus:ring-[#9C9B9B] focus:ring-opacity-50"
            placeholder="ex: user@email.com ou 912345678"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300 font-poppins">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-800 p-2 shadow-sm focus:border-[#9C9B9B] focus:ring focus:ring-[#9C9B9B] focus:ring-opacity-50"
            disabled={isLoading}
          />
        </div>
        {error && <p className="text-red-400 text-sm" role="alert">{error}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full justify-center rounded-md bg-[#9C9B9B] py-2 px-4 text-sm font-semibold text-[#1D1D1B] hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50"
        >
          {isLoading ? 'A entrar...' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}