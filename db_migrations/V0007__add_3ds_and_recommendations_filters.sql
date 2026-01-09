-- Добавляем новые поля для фильтрации сервисов
ALTER TABLE t_p34950019_fintech_bridge_proje.services
ADD COLUMN supports_3ds boolean DEFAULT false,
ADD COLUMN recommended_for_digital boolean DEFAULT false,
ADD COLUMN recommended_for_travel boolean DEFAULT false,
ADD COLUMN recommended_for_banking boolean DEFAULT false;

-- Комментарии для понимания
COMMENT ON COLUMN t_p34950019_fintech_bridge_proje.services.supports_3ds IS 'Поддержка 3D Secure';
COMMENT ON COLUMN t_p34950019_fintech_bridge_proje.services.recommended_for_digital IS 'Рекомендуется для цифровых товаров';
COMMENT ON COLUMN t_p34950019_fintech_bridge_proje.services.recommended_for_travel IS 'Рекомендуется для путешествий';
COMMENT ON COLUMN t_p34950019_fintech_bridge_proje.services.recommended_for_banking IS 'Рекомендуется для банковских операций';