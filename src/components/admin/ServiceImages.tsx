import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ServiceImagesProps {
  backgroundImage?: string;
  logoSvg?: string;
  backgroundPreview?: string;
  logoPreview?: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, type: 'background' | 'logo') => void;
  onRemoveImage: (type: 'background' | 'logo') => void;
}

const ServiceImages = ({
  backgroundImage,
  logoSvg,
  backgroundPreview,
  logoPreview,
  onImageUpload,
  onRemoveImage
}: ServiceImagesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Фоновое изображение
        </label>
        <div className="space-y-2">
          {backgroundPreview && (
            <div className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
              <img
                src={backgroundPreview}
                alt="Background preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => onRemoveImage('background')}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onImageUpload(e, 'background')}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Или вставьте URL:
          </p>
          <input
            type="text"
            value={backgroundImage || ''}
            onChange={(e) => {
              const event = {
                target: {
                  value: e.target.value
                }
              } as any;
              onImageUpload(event, 'background');
            }}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Логотип (SVG или изображение)
        </label>
        <div className="space-y-2">
          {logoPreview && (
            <div className="relative w-32 h-32 mx-auto rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-2">
              <img
                src={logoPreview}
                alt="Logo preview"
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => onRemoveImage('logo')}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onImageUpload(e, 'logo')}
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Или вставьте URL:
          </p>
          <input
            type="text"
            value={logoSvg || ''}
            onChange={(e) => {
              const event = {
                target: {
                  value: e.target.value
                }
              } as any;
              onImageUpload(event, 'logo');
            }}
            placeholder="https://example.com/logo.svg"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceImages;
