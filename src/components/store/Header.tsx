import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header = ({ darkMode, onToggleDarkMode }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="flex items-center justify-end gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleDarkMode}
        >
          <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={() => window.open('https://t.me/hey_store_official', '_blank')}
        >
          <Icon name="Radio" size={20} />
          <span>Канал</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={() => window.open('https://t.me/hey_store_bot', '_blank')}
        >
          <Icon name="MessageCircle" size={20} />
          <span>Поддержка</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          onClick={() => window.open('https://blog.heystore.net', '_blank')}
        >
          <Icon name="FileText" size={20} />
          <span>Блог</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;