import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const services = [
    {
      id: 'vpn',
      title: 'VPN',
      subtitle: 'Операционная безопасность',
      description: 'Чистые IP-адреса и защищённые каналы связи для работы в любой точке мира',
      icon: 'Shield',
      color: 'from-blue-500 to-cyan-500',
      features: ['Защита трафика', 'Стабильное соединение', 'Без логов активности']
    },
    {
      id: 'kyc',
      title: 'KYC',
      subtitle: 'Верификация',
      description: 'Быстрая верификация личности и доступ к финансовым сервисам без барьеров',
      icon: 'UserCheck',
      color: 'from-cyan-500 to-blue-600',
      features: ['Быстрый старт', 'Полная верификация', 'Поддержка 24/7']
    },
    {
      id: 'esim',
      title: 'eSIM',
      subtitle: 'Цифровая мобильность',
      description: 'Зарубежные номера телефонов для регистрации в международных сервисах',
      icon: 'Smartphone',
      color: 'from-blue-600 to-indigo-600',
      features: ['Моментальная активация', 'Покрытие 190+ стран', 'Гибкие тарифы']
    },
    {
      id: 'business',
      title: 'IT для бизнеса',
      subtitle: 'B2B инфраструктура',
      description: 'Корпоративные решения для масштабирования бизнеса в глобальной экосистеме',
      icon: 'Briefcase',
      color: 'from-indigo-600 to-purple-600',
      features: ['Корпоративные решения', 'API интеграция', 'Техническая поддержка']
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
      <div className="bg-background text-foreground">
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">HS</span>
              </div>
              <span className="font-bold text-xl">HEY, STORE!</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} />
            </Button>
          </div>
        </header>

        <main className="pt-20">
          <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5"></div>
            
            <div className="container mx-auto px-4 py-16 relative z-10">
              <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  HEY, STORE!
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Цифровой мост для пользователей и предпринимателей из СНГ<br/>в глобальную финансовую экосистему
                </p>
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-muted rounded-full text-sm font-medium">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Resource Center
                </div>
              </div>

              <div className="relative max-w-6xl mx-auto">
                <div className="flex items-center justify-center mb-16">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <img 
                      src="https://cdn.poehali.dev/projects/c6c74c83-4d6c-4ed3-9c55-400bcb992293/files/1424658f-8fe0-4231-8f2f-8d205d768a42.jpg"
                      alt="Arnold Mascot"
                      className="relative w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {services.map((service, index) => (
                    <Card 
                      key={service.id}
                      className="group relative overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                      
                      <CardContent className="p-6 relative z-10">
                        <div className="mb-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon name={service.icon} size={28} className="text-white" />
                          </div>
                          <h3 className="text-2xl font-bold mb-1">{service.title}</h3>
                          <p className="text-sm text-muted-foreground font-medium">{service.subtitle}</p>
                        </div>

                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {service.description}
                        </p>

                        <div className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs">
                              <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color}`}></div>
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Button 
                          className="w-full mt-6 group-hover:shadow-lg transition-shadow"
                          variant="outline"
                        >
                          Подробнее
                          <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>

                      <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                        <line x1="50%" y1="0" x2="50%" y2="-100" stroke="currentColor" strokeWidth="2" className="text-primary" strokeDasharray="4 4">
                          <animate attributeName="y2" from="-100" to="0" dur="1s" fill="freeze" />
                        </line>
                      </svg>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Один интерфейс для B2C и B2B</h2>
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                  Мы создаём инфраструктуру для доступа к глобальным финансовым сервисам.<br/>
                  Спокойный, технический, экспертный подход к цифровой мобильности.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon name="Zap" size={32} className="text-primary" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Быстрый старт</h3>
                    <p className="text-sm text-muted-foreground">Моментальная активация всех сервисов</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon name="Lock" size={32} className="text-secondary" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Безопасность</h3>
                    <p className="text-sm text-muted-foreground">Защита данных на уровне банков</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon name="Globe" size={32} className="text-accent" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">Глобальный доступ</h3>
                    <p className="text-sm text-muted-foreground">Работа в любой точке мира</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="py-12 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">HS</span>
                </div>
                <span className="font-bold">HEY, STORE!</span>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="https://blog.heystore.net" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Блог
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Документация
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  Поддержка
                </a>
              </div>
              
              <p className="text-sm text-muted-foreground">
                © 2024 HEY, STORE! Resource Center
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
