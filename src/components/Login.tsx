import React, { useState } from 'react';
import { login, setAuthToken } from '../api/api';

type Props = {
  readonly onLogin: (token: string) => void;
};

export default function Login({ onLogin }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await login(email, password);
      const token = res.data.access_token;
      setAuthToken(token);
      onLogin(token);
    } catch (err) {
      console.error('Login error:', err);
      setError('Hibás email vagy jelszó');
    }
  };

  return (
    <form className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-center">Bejelentkezés</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Jelszó"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-200" type="submit">Bejelentkezés</button>
    </form>
  );
}
