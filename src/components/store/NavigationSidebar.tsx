import Icon from '@/components/ui/icon';

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  badge?: string;
  hasSubmenu: boolean;
  isSubitem?: boolean;
  submenu?: { id: string; title: string; icon: string }[];
}

interface NavigationSidebarProps {
  menuItems: MenuItem[];
  activeSection: string;
  expandedSections: string[];
  onSectionChange: (id: string) => void;
  onToggleSection: (id: string) => void;
  darkMode?: boolean;
}

const NavigationSidebar = ({
  menuItems,
  activeSection,
  expandedSections,
  onSectionChange,
  onToggleSection,
  darkMode = false
}: NavigationSidebarProps) => {
  return (
    <aside className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col overflow-y-auto">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
          Разделы каталога
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Выберите категорию услуг
        </p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full flex items-center justify-between px-4 py-3 rounded-lg 
                transition-all duration-200 text-left
                ${item.isSubitem ? 'pl-8 text-sm' : ''}
                ${activeSection === item.id
                  ? 'bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-700 dark:text-blue-400 shadow-sm'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  activeSection === item.id 
                    ? 'bg-blue-100 dark:bg-blue-800/30' 
                    : 'bg-gray-100 dark:bg-gray-700'
                }`}>
                  <Icon name={item.icon} size={18} />
                </div>
                <span className="font-medium">{item.title}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <span className="text-xs px-2.5 py-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-400 rounded-full font-bold shadow-sm">
                    {item.badge}
                  </span>
                )}
                {item.hasSubmenu && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSection(item.id);
                    }}
                    className="p-1 hover:bg-blue-100 dark:hover:bg-blue-800/30 rounded transition-colors cursor-pointer"
                  >
                    <Icon
                      name={expandedSections.includes(item.id) ? 'ChevronDown' : 'ChevronRight'}
                      size={16}
                    />
                  </div>
                )}
              </div>
            </button>

            {item.hasSubmenu && item.submenu && expandedSections.includes(item.id) && (
              <div className="ml-4 mt-1 space-y-1 pl-4 border-l-2 border-blue-100 dark:border-blue-800/30">
                {item.submenu.map((subitem) => (
                  <button
                    key={subitem.id}
                    onClick={() => onSectionChange(subitem.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-2.5 rounded-lg 
                      transition-all duration-200 text-left text-sm
                      ${activeSection === subitem.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }
                    `}
                  >
                    <Icon name={subitem.icon} size={16} />
                    <span>{subitem.title}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
            <Icon name="Headphones" size={20} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
              Нужна помощь?
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
              Поможем подобрать решение для вашей задачи
            </p>
            <a 
              href="https://t.me/heystore_support" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <Icon name="Send" size={14} />
              Написать в Telegram
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default NavigationSidebar;
