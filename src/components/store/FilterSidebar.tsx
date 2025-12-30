import Icon from '@/components/ui/icon';

const FilterSidebar = () => {
  return (
    <aside className="w-72 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
          Фильтры
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Подбор по признакам
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Icon name="SlidersHorizontal" size={48} className="mx-auto mb-3 text-gray-300 dark:text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Фильтры в разработке
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[200px]">
              Скоро здесь появятся фильтры по признакам:
            </p>
          </div>
        </div>

        <div className="space-y-3 px-2">
          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <Icon name="Smartphone" size={14} />
            <span>Apple Pay</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <Icon name="RefreshCw" size={14} />
            <span>Перевыпуск карт</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <Icon name="TrendingUp" size={14} />
            <span>Высокая проходимость</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <Icon name="Coins" size={14} />
            <span>Пополнение криптой</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
