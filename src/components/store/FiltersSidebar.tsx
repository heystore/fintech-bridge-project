import { useState } from 'react';
import Icon from '@/components/ui/icon';

export interface Filters {
  paymentMethods: {
    visa: boolean;
    mastercard: boolean;
    applePay: boolean;
    googlePay: boolean;
  };
  features: {
    cardReissue: boolean;
    highPaymentApproval: boolean;
    cryptoSupport: boolean;
  };
  accounts: {
    sepa: boolean;
    eurIban: boolean;
    swift: boolean;
    usdAch: boolean;
  };
  currencies: string[];
  billingRegions: string[];
  cardBillingCountries: string[];
}

interface FiltersSidebarProps {
  darkMode?: boolean;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  activeSection: string;
  countries: { code: string; name: string; flag: string }[];
}

const FiltersSidebar = ({ 
  darkMode = false,
  filters,
  setFilters,
  activeSection,
  countries
}: FiltersSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState({
    paymentMethods: true,
    features: true,
    accounts: true,
    countries: false
  });

  const togglePaymentMethod = (method: keyof Filters['paymentMethods']) => {
    setFilters({
      ...filters,
      paymentMethods: {
        ...filters.paymentMethods,
        [method]: !filters.paymentMethods[method],
      },
    });
  };

  const toggleFeature = (feature: keyof Filters['features']) => {
    setFilters({
      ...filters,
      features: {
        ...filters.features,
        [feature]: !filters.features[feature],
      },
    });
  };

  const toggleAccount = (account: keyof Filters['accounts']) => {
    setFilters({
      ...filters,
      accounts: {
        ...filters.accounts,
        [account]: !filters.accounts[account],
      },
    });
  };

  const toggleCountry = (countryCode: string) => {
    const newCountries = filters.cardBillingCountries.includes(countryCode)
      ? filters.cardBillingCountries.filter(c => c !== countryCode)
      : [...filters.cardBillingCountries, countryCode];
    
    setFilters({
      ...filters,
      cardBillingCountries: newCountries
    });
  };

  const resetFilters = () => {
    setFilters({
      paymentMethods: { visa: false, mastercard: false, applePay: false, googlePay: false },
      features: { cardReissue: false, highPaymentApproval: false, cryptoSupport: false },
      accounts: { sepa: false, eurIban: false, swift: false, usdAch: false },
      currencies: [],
      billingRegions: [],
      cardBillingCountries: [],
    });
  };

  const hasActiveFilters = 
    Object.values(filters.paymentMethods).some(v => v) ||
    Object.values(filters.features).some(v => v) ||
    Object.values(filters.accounts).some(v => v) ||
    filters.cardBillingCountries.length > 0;

  const isKycSection = activeSection.includes('kyc');

  if (!isKycSection) {
    return null;
  }

  return (
    <aside className="w-80 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Icon name="SlidersHorizontal" size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Фильтры
            </h2>
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <Icon name="RotateCcw" size={14} />
              Сбросить
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Найдите идеальное решение по параметрам
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <button
            onClick={() => setIsExpanded({...isExpanded, paymentMethods: !isExpanded.paymentMethods})}
            className="w-full flex items-center justify-between mb-3"
          >
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Icon name="CreditCard" size={16} className="text-blue-600 dark:text-blue-400" />
              Способы оплаты
            </h3>
            <Icon 
              name={isExpanded.paymentMethods ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-gray-400"
            />
          </button>
          {isExpanded.paymentMethods && (
            <div className="space-y-2">
              {[
                { key: 'visa', label: 'VISA', icon: 'CreditCard' },
                { key: 'mastercard', label: 'Mastercard', icon: 'CreditCard' },
                { key: 'applePay', label: 'Apple Pay', icon: 'Apple' },
                { key: 'googlePay', label: 'Google Pay', icon: 'Smartphone' }
              ].map(({ key, label, icon }) => (
                <label key={key} className="flex items-center gap-2.5 cursor-pointer group p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={filters.paymentMethods[key as keyof typeof filters.paymentMethods]}
                    onChange={() => togglePaymentMethod(key as keyof typeof filters.paymentMethods)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <Icon name={icon} size={14} className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <button
            onClick={() => setIsExpanded({...isExpanded, features: !isExpanded.features})}
            className="w-full flex items-center justify-between mb-3"
          >
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Icon name="Sparkles" size={16} className="text-purple-600 dark:text-purple-400" />
              Возможности
            </h3>
            <Icon 
              name={isExpanded.features ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-gray-400"
            />
          </button>
          {isExpanded.features && (
            <div className="space-y-2">
              {[
                { key: 'cardReissue', label: 'Перевыпуск карт', icon: 'RefreshCw' },
                { key: 'highPaymentApproval', label: 'Высокая проходимость', icon: 'TrendingUp' },
                { key: 'cryptoSupport', label: 'Поддержка крипты', icon: 'Coins' }
              ].map(({ key, label, icon }) => (
                <label key={key} className="flex items-center gap-2.5 cursor-pointer group p-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={filters.features[key as keyof typeof filters.features]}
                    onChange={() => toggleFeature(key as keyof typeof filters.features)}
                    className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                  />
                  <Icon name={icon} size={14} className="text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
          <button
            onClick={() => setIsExpanded({...isExpanded, accounts: !isExpanded.accounts})}
            className="w-full flex items-center justify-between mb-3"
          >
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Icon name="Building2" size={16} className="text-green-600 dark:text-green-400" />
              Типы счетов
            </h3>
            <Icon 
              name={isExpanded.accounts ? "ChevronUp" : "ChevronDown"} 
              size={16} 
              className="text-gray-400"
            />
          </button>
          {isExpanded.accounts && (
            <div className="space-y-2">
              {[
                { key: 'sepa', label: 'SEPA/IBAN', icon: 'Building' },
                { key: 'swift', label: 'SWIFT', icon: 'Globe' },
                { key: 'usdAch', label: 'ACH/USD', icon: 'DollarSign' }
              ].map(({ key, label, icon }) => (
                <label key={key} className="flex items-center gap-2.5 cursor-pointer group p-2 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors">
                  <input
                    type="checkbox"
                    checked={filters.accounts[key as keyof typeof filters.accounts]}
                    onChange={() => toggleAccount(key as keyof typeof filters.accounts)}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                  />
                  <Icon name={icon} size={14} className="text-gray-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {countries.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
            <button
              onClick={() => setIsExpanded({...isExpanded, countries: !isExpanded.countries})}
              className="w-full flex items-center justify-between mb-3"
            >
              <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Icon name="MapPin" size={16} className="text-orange-600 dark:text-orange-400" />
                Страны биллинга
              </h3>
              <Icon 
                name={isExpanded.countries ? "ChevronUp" : "ChevronDown"} 
                size={16} 
                className="text-gray-400"
              />
            </button>
            {isExpanded.countries && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {countries.map((country) => (
                  <label key={country.code} className="flex items-center gap-2.5 cursor-pointer group p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors">
                    <input
                      type="checkbox"
                      checked={filters.cardBillingCountries.includes(country.code)}
                      onChange={() => toggleCountry(country.code)}
                      className="w-4 h-4 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                    />
                    <span className="text-lg">{country.flag}</span>
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{country.name}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-blue-100 dark:border-blue-800/30">
          <div className="flex items-start gap-2">
            <Icon name="Info" size={16} className="text-blue-600 dark:text-blue-400 mt-0.5" />
            <p className="text-xs text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-gray-900 dark:text-white">Совет:</span> Комбинируйте фильтры для точного поиска решения под вашу задачу
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FiltersSidebar;
