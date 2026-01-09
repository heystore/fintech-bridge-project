interface BasicServiceFieldsProps {
  formData: {
    name: string;
    category: string;
    icon: string;
    priority?: number;
  };
  onChange: (updates: Partial<BasicServiceFieldsProps['formData']>) => void;
}

const BasicServiceFields = ({ formData, onChange }: BasicServiceFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Название
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange({ name: e.target.value })}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Категория
        </label>
        <select
          value={formData.category}
          onChange={(e) => onChange({ category: e.target.value })}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
        >
          <option value="kyc-fintech">Финтехи и банки</option>
          <option value="kyc-crypto">Криптобиржи</option>
          <option value="kyc-platforms">Платформы</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Иконка
        </label>
        <input
          type="text"
          value={formData.icon}
          onChange={(e) => onChange({ icon: e.target.value })}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
          placeholder="CreditCard"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Приоритет (чем выше, тем выше в списке)
        </label>
        <input
          type="number"
          value={formData.priority || 0}
          onChange={(e) => onChange({ priority: parseInt(e.target.value) || 0 })}
          className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
          placeholder="0"
        />
      </div>
    </div>
  );
};

export default BasicServiceFields;
