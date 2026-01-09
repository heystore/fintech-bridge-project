import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Header from '@/components/store/Header';
import FilterSidebar, { Filters } from '@/components/store/FilterSidebar';
import ServiceCard from '@/components/store/ServiceCard';

interface Service {
  id: string;
  name: string;
  type: string;
  category: string;
  icon: string;
  description: string;
  price: string;
  cta: string;
  backgroundImage?: string;
  logoSvg?: string;
  acceptsVisa?: boolean;
  acceptsMastercard?: boolean;
  acceptsApplePay?: boolean;
  acceptsGooglePay?: boolean;
  cardReissue?: boolean;
  highPaymentApproval?: boolean;
  cryptoSupport?: boolean;
  sepaIban?: boolean;
  achUsd?: boolean;
  supportedCurrencies?: string[];
  swift?: boolean;
  billingRegions?: string[];
  cardBillingCountries?: string[];
  priority?: number;
}

interface Country {
  code: string;
  name: string;
  flag: string;
}

const API_URL = 'https://functions.poehali.dev/692cf256-c3fb-49b8-9844-ae94296d195a';

const defaultServices: Service[] = [
  { id: 'wise', name: 'Wise', type: 'Финтех', category: 'kyc-fintech', icon: 'CreditCard', description: 'Мультивалютный банк с IBAN', price: '120 USDT', cta: 'Подключить' },
  { id: 'revolut', name: 'Revolut', type: 'Финтех', category: 'kyc-fintech', icon: 'Wallet', description: 'Швейцарский нож финансов', price: '350 USDT', cta: 'Подключить' },
  { id: 'payoneer', name: 'Payoneer', type: 'Финтех', category: 'kyc-fintech', icon: 'Briefcase', description: 'Платежи для фрилансеров', price: '100 USDT', cta: 'Подключить' },
  { id: 'grey', name: 'Grey', type: 'Финтех', category: 'kyc-fintech', icon: 'Building2', description: 'Аналог Wise с USD-картой', price: '120 USDT', cta: 'Подключить' },
  { id: 'neteller', name: 'Neteller', type: 'Финтех', category: 'kyc-fintech', icon: 'DollarSign', description: 'Электронный кошелёк', price: '120 USDT', cta: 'Подключить' },
  { id: 'skrill', name: 'Skrill', type: 'Финтех', category: 'kyc-fintech', icon: 'Wallet2', description: 'Платёжная система', price: '120 USDT', cta: 'Подключить' },
  { id: 'bybit', name: 'Bybit', type: 'Криптобиржа', category: 'kyc-crypto', icon: 'Bitcoin', description: 'Виртуальная карта с V2', price: '45 USDT', cta: 'Подключить' },
  { id: 'bitget', name: 'Bitget', type: 'Криптобиржа', category: 'kyc-crypto', icon: 'Coins', description: 'Биржа с IBAN FR/DE', price: '120 USDT', cta: 'Подключить' },
  { id: 'kraken', name: 'Kraken', type: 'Криптобиржа', category: 'kyc-crypto', icon: 'TrendingUp', description: 'Торговля криптовалютой', price: '100 USDT', cta: 'Подключить' },
  { id: 'redotpay', name: 'RedotPay', type: 'Крипто-карта', category: 'kyc-crypto', icon: 'CreditCard', description: 'Крипто → фиат карта', price: '40 USDT', cta: 'Подключить' },
  { id: 'etherfi', name: 'Ether.fi', type: 'Крипто-карта', category: 'kyc-crypto', icon: 'Sparkles', description: 'Стейкинг + карта в Apple Pay', price: '100 USDT', cta: 'Подключить' },
  { id: 'tuyo', name: 'TUYO', type: 'Крипто-карта', category: 'kyc-crypto', icon: 'Zap', description: 'Шлюз фиат ⇄ крипта без комиссий', price: '150 USDT', cta: 'Подключить' },
  { id: 'paypal', name: 'PayPal', type: 'Платформа', category: 'kyc-platforms', icon: 'ShoppingBag', description: 'Онлайн платежи + Perplexity Pro', price: '120 USDT', cta: 'Подключить' },
  { id: 'spenda', name: 'Spenda', type: 'Платформа', category: 'kyc-platforms', icon: 'CreditCard', description: 'USD/NGN карта для подписок', price: '90 USDT', cta: 'Подключить' },
  { id: 'hexacard', name: 'HexaCard', type: 'Платформа', category: 'kyc-platforms', icon: 'Sparkle', description: 'Турецкие цены на подписки', price: '150 USDT', cta: 'Подключить' }
];

const Cards = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [filters, setFilters] = useState<Filters>({
    paymentMethods: { visa: false, mastercard: false, applePay: false, googlePay: false },
    features: { cardReissue: false, highPaymentApproval: false, cryptoSupport: false },
    accounts: { sepa: false, eurIban: false, swift: false, usdAch: false },
    currencies: [],
    billingRegions: [],
    cardBillingCountries: [],
  });
  const [countries, setCountries] = useState<Country[]>([]);
  const [loadError, setLoadError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setLoadError('');
      try {
        const [servicesRes, countriesRes] = await Promise.all([
          fetch(API_URL),
          fetch(`${API_URL}?resource=countries`)
        ]);

        if (servicesRes.ok) {
          const data = await servicesRes.json();
          if (data.length === 0) {
            setServices(defaultServices);
          } else {
            setServices(data);
          }
        } else {
          setLoadError(`Ошибка загрузки товаров: ${servicesRes.status}`);
          setServices(defaultServices);
        }

        if (countriesRes.ok) {
          const countriesData = await countriesRes.json();
          setCountries(countriesData);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        setLoadError('Не удалось подключиться к серверу');
        setServices(defaultServices);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getFilteredServices = () => {
    let filtered = services.filter(s => 
      s.category === 'kyc-fintech' || s.category === 'kyc-crypto' || s.category === 'kyc-platforms'
    );

    if (filters.paymentMethods.visa) {
      filtered = filtered.filter(s => s.acceptsVisa);
    }
    if (filters.paymentMethods.mastercard) {
      filtered = filtered.filter(s => s.acceptsMastercard);
    }
    if (filters.paymentMethods.applePay) {
      filtered = filtered.filter(s => s.acceptsApplePay);
    }
    if (filters.paymentMethods.googlePay) {
      filtered = filtered.filter(s => s.acceptsGooglePay);
    }

    if (filters.features.cardReissue) {
      filtered = filtered.filter(s => s.cardReissue);
    }
    if (filters.features.highPaymentApproval) {
      filtered = filtered.filter(s => s.highPaymentApproval);
    }
    if (filters.features.cryptoSupport) {
      filtered = filtered.filter(s => s.cryptoSupport);
    }

    if (filters.accounts.sepa) {
      filtered = filtered.filter(s => s.sepaIban);
    }
    if (filters.accounts.swift) {
      filtered = filtered.filter(s => s.swift);
    }
    if (filters.accounts.usdAch) {
      filtered = filtered.filter(s => s.achUsd);
    }

    if (filters.cardBillingCountries.length > 0) {
      filtered = filtered.filter(s => 
        s.cardBillingCountries && 
        filters.cardBillingCountries.some(country => s.cardBillingCountries?.includes(country))
      );
    }

    return filtered;
  };

  const filteredServices = getFilteredServices();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      <div className="flex flex-col min-h-screen">
        <Header 
          darkMode={darkMode} 
          toggleDarkMode={toggleDarkMode}
        />
        
        <div className="flex flex-1 pt-16">
          <FilterSidebar 
            onFiltersChange={setFilters}
            availableCountries={countries}
          />

          <main className="flex-1 p-8 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto">
              {loadError && (
                <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon name="AlertTriangle" size={20} className="text-yellow-600 dark:text-yellow-400" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">Проблема с загрузкой</p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">{loadError}. Показаны данные по умолчанию.</p>
                    </div>
                  </div>
                </div>
              )}

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Icon name="Loader2" size={32} className="animate-spin text-gray-400" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredServices.map(service => (
                    <ServiceCard 
                      key={service.id}
                      service={service}
                      isSelected={selectedService === service.id}
                      onClick={() => setSelectedService(service.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Cards;