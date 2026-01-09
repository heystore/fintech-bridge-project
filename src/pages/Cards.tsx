import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import Sidebar from '@/components/store/Sidebar';
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
  const [activeSection, setActiveSection] = useState('kyc');
  const [expandedSections, setExpandedSections] = useState<string[]>(['kyc']);
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

  const menuItems = [
    {
      id: 'kyc',
      title: 'Активация сервисов',
      icon: 'UserCheck',
      hasSubmenu: true,
      submenu: [
        { id: 'kyc-fintech', title: 'Финтехи и банки', icon: 'Building' },
        { id: 'kyc-crypto', title: 'Криптобиржи', icon: 'Bitcoin' },
        { id: 'kyc-platforms', title: 'Платформы', icon: 'Globe' }
      ]
    }
  ];

  const toggleSection = (id: string) => {
    if (expandedSections.includes(id)) {
      setExpandedSections(expandedSections.filter(s => s !== id));
    } else {
      setExpandedSections([...expandedSections, id]);
    }
  };

  const getFilteredServices = () => {
    let filtered = services;

    if (activeSection === 'kyc-fintech' || activeSection === 'kyc-crypto' || activeSection === 'kyc-platforms') {
      filtered = filtered.filter(s => s.category === activeSection);
    } else if (activeSection === 'kyc') {
      filtered = filtered.filter(s => 
        s.category === 'kyc-fintech' || s.category === 'kyc-crypto' || s.category === 'kyc-platforms'
      );
    }

    const hasActiveFilters = 
      Object.values(filters.paymentMethods).some(v => v) ||
      Object.values(filters.features).some(v => v) ||
      Object.values(filters.accounts).some(v => v) ||
      filters.currencies.length > 0 ||
      filters.billingRegions.length > 0 ||
      filters.cardBillingCountries.length > 0;

    if (!hasActiveFilters) {
      return filtered;
    }

    return filtered.filter(service => {
      const matchesPaymentMethods = 
        (!filters.paymentMethods.visa || service.acceptsVisa) &&
        (!filters.paymentMethods.mastercard || service.acceptsMastercard) &&
        (!filters.paymentMethods.applePay || service.acceptsApplePay) &&
        (!filters.paymentMethods.googlePay || service.acceptsGooglePay);

      const matchesFeatures = 
        (!filters.features.cardReissue || service.cardReissue) &&
        (!filters.features.highPaymentApproval || service.highPaymentApproval) &&
        (!filters.features.cryptoSupport || service.cryptoSupport);

      const matchesAccounts = 
        (!filters.accounts.sepa || service.sepaIban) &&
        (!filters.accounts.swift || service.swift) &&
        (!filters.accounts.usdAch || service.achUsd);

      const matchesCurrencies = filters.currencies.length === 0 || 
        (service.supportedCurrencies && filters.currencies.every(c => service.supportedCurrencies?.includes(c)));

      const matchesBillingRegions = filters.billingRegions.length === 0 || 
        (service.billingRegions && filters.billingRegions.some(r => service.billingRegions?.includes(r)));

      const matchesCardBillingCountries = filters.cardBillingCountries.length === 0 || 
        (service.cardBillingCountries && filters.cardBillingCountries.some(c => service.cardBillingCountries?.includes(c)));

      return matchesPaymentMethods && matchesFeatures && matchesAccounts && matchesCurrencies && matchesBillingRegions && matchesCardBillingCountries;
    });
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
          <Sidebar 
            darkMode={darkMode}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
            menuItems={menuItems}
          />

          <FilterSidebar 
            darkMode={darkMode}
            filters={filters}
            setFilters={setFilters}
            activeSection={activeSection}
            countries={countries}
          />

          <main className="flex-1 ml-64 lg:ml-80 p-8 overflow-y-auto">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Активация сервисов
                </h1>
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Профессиональная активация банковских и платёжных сервисов под ключ
                </p>
              </div>

              {loadError && (
                <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 rounded-lg">
                  {loadError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <div className={`col-span-full text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Загрузка...
                  </div>
                ) : filteredServices.length === 0 ? (
                  <div className={`col-span-full text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Ничего не найдено. Попробуйте изменить фильтры.
                  </div>
                ) : (
                  filteredServices
                    .sort((a, b) => (b.priority || 0) - (a.priority || 0))
                    .map(service => (
                      <ServiceCard 
                        key={service.id}
                        service={service}
                        darkMode={darkMode}
                        isSelected={selectedService === service.id}
                        onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                      />
                    ))
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Cards;
