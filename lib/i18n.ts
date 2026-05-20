const DEFAULT_LOCALE = (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_LOCALE) || 'ru'

function getLocale(): string {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('locale') || DEFAULT_LOCALE
  }
  return DEFAULT_LOCALE
}

const translations: Record<string, Record<string, string>> = {
  ru: {
    'site.name': 'Маркет активов',
    'header.search_placeholder': 'Поиск ассетов...',
    'nav.browse': 'Каталог',
    'nav.publishers': 'Издатели',
    'nav.sales': 'Акции',
    'nav.sign_in': 'Войти',
    'account.buyer': 'Покупатель',
    'account.seller': 'Продавец',
    'admin.sign_in': 'Вход администратора',
    'admin.enter_credentials': 'Введите пароль администратора',
    'admin.password': 'Пароль',
    'admin.demo_password': 'Демо-пароль администратора: {password}',
    'admin.back_to_store': 'Вернуться в магазин',
    'admin.sign_in_button': 'Войти',
    'admin.dashboard': 'Панель администратора',
    'admin.refresh': 'Обновить данные',
    'admin.logout': 'Выйти',
    'admin.orders': 'Заказы',
    'admin.wrong_password': 'Неверный пароль, попробуйте ещё раз.'
  },
  en: {
    'site.name': 'Asset Marketplace',
    'header.search_placeholder': 'Search assets...',
    'nav.browse': 'Browse',
    'nav.publishers': 'Publishers',
    'nav.sales': 'Sales',
    'nav.sign_in': 'Sign In',
    'account.buyer': 'Buyer',
    'account.seller': 'Seller',
    'admin.sign_in': 'Admin sign in',
    'admin.enter_credentials': 'Enter admin credentials',
    'admin.password': 'Password',
    'admin.demo_password': 'Demo admin password: {password}',
    'admin.back_to_store': 'Back to store',
    'admin.sign_in_button': 'Sign in',
    'admin.dashboard': 'Admin Dashboard',
    'admin.refresh': 'Refresh data',
    'admin.logout': 'Log out',
    'admin.orders': 'Orders',
    'admin.wrong_password': 'Wrong password, try again.'
  }
}

export function t(key: string) {
  const locale = getLocale()
  return translations[locale]?.[key] ?? translations['en']?.[key] ?? key
}

export function tReplace(key: string, vars: Record<string, string>) {
  let txt = t(key)
  Object.keys(vars).forEach((k) => {
    txt = txt.replace(`{${k}}`, vars[k])
  })
  return txt
}

export default { t, tReplace }
