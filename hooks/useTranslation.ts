import { useI18nContext } from '@/contexts/I18nContext';

export function useTranslation() {
  const i18nContext = useI18nContext();
  return i18nContext;
}