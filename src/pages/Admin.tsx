import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const ADMIN_PASSWORD = 'HeyStore2025!Secure#Admin';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setError('');
    } else {
      setError('Неверный пароль');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    setPassword('');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
        <div className="w-full max-w-md p-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Админ-панель
              </h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full"
              >
                <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} />
              </Button>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Пароль
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white"
                  placeholder="Введите пароль"
                  autoFocus
                />
                {error && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                )}
              </div>
              
              <Button type="submit" className="w-full">
                Войти
              </Button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${darkMode ? 'dark' : ''}`}>
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <Icon name="ArrowLeft" size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              HEY, STORE! — Админ
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} />
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                <Icon name="Users" size={20} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Пользователи
              </h2>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              247
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              +12 за последние 24 часа
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                <Icon name="ShoppingCart" size={20} className="text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Заказы
              </h2>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              156
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              8 активных заказов
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                <Icon name="DollarSign" size={20} className="text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Выручка
              </h2>
            </div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              18,240 USDT
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              За текущий месяц
            </p>
          </div>
        </div>

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Последние заказы
          </h2>
          <div className="space-y-3">
            {[
              { id: '1', service: 'Wise', price: '120 USDT', status: 'completed', time: '2 часа назад' },
              { id: '2', service: 'Revolut', price: '350 USDT', status: 'pending', time: '4 часа назад' },
              { id: '3', service: 'PayPal', price: '120 USDT', status: 'completed', time: '6 часов назад' },
              { id: '4', service: 'Ether.fi', price: '100 USDT', status: 'completed', time: '1 день назад' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {order.service}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {order.time}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-gray-900 dark:text-white">
                    {order.price}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'completed' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {order.status === 'completed' ? 'Выполнен' : 'В обработке'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
