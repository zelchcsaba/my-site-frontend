import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import CarList from './components/CarList';
import { fetchCars, setAuthToken } from './api/api';
import CarAdd from './components/CarAdd';

type Token = string | null;

function App() {
  const [token, setToken] = useState<Token>(localStorage.getItem('token'));
  const [cars, setCars] = useState<any[]>([]);
  const [showRegister, setShowRegister] = useState(false);



  useEffect(() => {
    if (token) {
      setAuthToken(token);
      loadCars();
    } else {
      setCars([]);
      setAuthToken(null);
    }
  }, [token]);

  const handleRefresh = () => {
    loadCars();
  };

  const loadCars = async () => {
    try {
      const res = await fetchCars();
      setCars(res.data);
    } catch (err) {
      console.error('Hiba az autók lekérésénél', err);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          {showRegister ? (
            <>
              <Register onRegister={() => setShowRegister(false)} />
              <p className="mt-4 text-center text-gray-600">
                Már van fiókod?{' '}
                <button
                  onClick={() => setShowRegister(false)}
                  className="text-blue-600 hover:underline"
                >
                  Bejelentkezés
                </button>
              </p>
            </>
          ) : (
            <>
              <Login onLogin={setToken} />
              <p className="mt-4 text-center text-gray-600">
                Nincs fiókod?{' '}
                <button
                  onClick={() => setShowRegister(true)}
                  className="text-blue-600 hover:underline"
                >
                  Regisztráció
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Saját autók</h1>
          <button
            onClick={() => {
              setToken(null);
              setAuthToken(null);
              localStorage.removeItem('token');
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors">Kijelentkezés
          </button>
        </div>

        <CarAdd onRefresh={handleRefresh} />

        <div>
          {cars?.map((car) =>  {
            return <CarList key={car.id} car={car} onRefresh={handleRefresh}/>;
          })}
        </div>

      </div>
    </div>
  );
}

export default App;
