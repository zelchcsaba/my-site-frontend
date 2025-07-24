import React, { useState } from 'react';
import { register } from '../api/api';

type Props = {
  readonly onRegister: () => void;
};

export default function Register({ onRegister }: Props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(email, password, name);
      onRegister();
    } catch (err) {
      console.error('Registration error:', err);
      setError('Hiba a regisztráció során');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Regisztráció</h2>
      {error && <p className="mb-4 text-red-600 text-center font-semibold">{error}</p>}
      <input
        type="text"
        placeholder="Név"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-200">Regisztráció</button>
    </form>
  );
}
