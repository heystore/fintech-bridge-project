import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header = ({ darkMode, onToggleDarkMode }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4">
      <div className="flex items-center pl-6">
        <div className="flex items-center gap-3">
          <img 
            src="https://cdn.poehali.dev/files/arnold_250.png" 
            alt="HEY, STORE!" 
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              HEY, STORE!
            </h1>
            <p className="text-xs text-red-500 dark:text-red-400 font-medium">
              финансы без санкций
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 pl-72">
          <nav className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => window.open('https://t.me/hey_store_official', '_blank')}
            >
              <Icon name="Send" size={18} />
              <span className="text-sm">Канал</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => window.open('https://t.me/hey_store_bot', '_blank')}
            >
              <Icon name="MessageCircle" size={18} />
              <span className="text-sm">Поддержка</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => window.open('https://blog.heystore.net', '_blank')}
            >
              <Icon name="FileText" size={18} />
              <span className="text-sm">Блог</span>
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleDarkMode}
          >
            <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;