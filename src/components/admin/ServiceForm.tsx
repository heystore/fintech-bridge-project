import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import BasicServiceFields from './BasicServiceFields';
import ServiceImages from './ServiceImages';
import ServiceFeatures from './ServiceFeatures';

interface Service {
  id: string;
  name: string;
  type: string;
  category: string;
  icon: string;
  description: string;
  line1?: string;
  line2?: string;
  line3?: string;
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
  supports3DS?: boolean;
  recommendedForDigital?: boolean;
  recommendedForTravel?: boolean;
  recommendedForBanking?: boolean;
}

interface ServiceFormProps {
  service: Service;
  onSave: (service: Service) => void;
  onCancel: () => void;
  darkMode: boolean;
}

const API_URL = 'https://functions.poehali.dev/692cf256-c3fb-49b8-9844-ae94296d195a';

interface Country {
  code: string;
  name: string;
  flag: string;
}

const ServiceForm = ({ service, onSave, onCancel, darkMode }: ServiceFormProps) => {
  const [formData, setFormData] = useState<Service>(service);
  const [backgroundPreview, setBackgroundPreview] = useState<string | undefined>(service.backgroundImage);
  const [logoPreview, setLogoPreview] = useState<string | undefined>(service.logoSvg);
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    setFormData(service);
    setBackgroundPreview(service.backgroundImage);
    setLogoPreview(service.logoSvg);
  }, [service]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(`${API_URL}?resource=countries`);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Failed to fetch countries:', error);
      }
    };
    fetchCountries();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'background' | 'logo') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (type === 'background') {
          setBackgroundPreview(result);
          setFormData({ ...formData, backgroundImage: result });
        } else {
          setLogoPreview(result);
          setFormData({ ...formData, logoSvg: result });
        }
      };
      reader.readAsDataURL(file);
    } else if ((e.target as any).value) {
      const url = (e.target as any).value;
      if (type === 'background') {
        setBackgroundPreview(url);
        setFormData({ ...formData, backgroundImage: url });
      } else {
        setLogoPreview(url);
        setFormData({ ...formData, logoSvg: url });
      }
    }
  };

  const handleRemoveImage = (type: 'background' | 'logo') => {
    if (type === 'background') {
      setBackgroundPreview(undefined);
      setFormData({ ...formData, backgroundImage: undefined });
    } else {
      setLogoPreview(undefined);
      setFormData({ ...formData, logoSvg: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {service.name ? 'Редактировать товар' : 'Добавить товар'}
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <BasicServiceFields
            formData={{
              name: formData.name,
              category: formData.category,
              icon: formData.icon,
              priority: formData.priority
            }}
            onChange={(updates) => setFormData({ ...formData, ...updates })}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Описание (общее, используется если строки не заполнены)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
              rows={3}
              placeholder="Краткое описание сервиса"
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Строка 1 (первая строка описания на карточке)
              </label>
              <input
                type="text"
                value={formData.line1 || ''}
                onChange={(e) => setFormData({ ...formData, line1: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                placeholder="Например: Мультивалютный счёт"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Строка 2 (вторая строка описания на карточке)
              </label>
              <input
                type="text"
                value={formData.line2 || ''}
                onChange={(e) => setFormData({ ...formData, line2: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                placeholder="Например: Поддержка 50+ валют"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Строка 3 (третья строка описания на карточке)
              </label>
              <input
                type="text"
                value={formData.line3 || ''}
                onChange={(e) => setFormData({ ...formData, line3: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                placeholder="Например: IBAN для SEPA переводов"
              />
            </div>
          </div>

          <ServiceImages
            backgroundImage={formData.backgroundImage}
            logoSvg={formData.logoSvg}
            backgroundPreview={backgroundPreview}
            logoPreview={logoPreview}
            onImageUpload={handleImageUpload}
            onRemoveImage={handleRemoveImage}
          />

          <ServiceFeatures
            formData={{
              recommendedForDigital: formData.recommendedForDigital,
              recommendedForTravel: formData.recommendedForTravel,
              recommendedForBanking: formData.recommendedForBanking,
              acceptsVisa: formData.acceptsVisa,
              acceptsMastercard: formData.acceptsMastercard,
              acceptsApplePay: formData.acceptsApplePay,
              acceptsGooglePay: formData.acceptsGooglePay,
              cardReissue: formData.cardReissue,
              highPaymentApproval: formData.highPaymentApproval,
              cryptoSupport: formData.cryptoSupport,
              supports3DS: formData.supports3DS,
              sepaIban: formData.sepaIban,
              achUsd: formData.achUsd,
              swift: formData.swift,
              cardBillingCountries: formData.cardBillingCountries
            }}
            countries={countries}
            onChange={(updates) => setFormData({ ...formData, ...updates })}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Цена
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                placeholder="120 USDT"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Текст кнопки
              </label>
              <input
                type="text"
                value={formData.cta}
                onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
                placeholder="Подключить"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Отмена
            </Button>
            <Button type="submit">
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;
