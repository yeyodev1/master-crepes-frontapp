// Single source of truth for per-page SEO. Used by the router (client-side meta)
// and by the build plugin in vite.config.ts (static <head> per route + sitemap).
// Positioning: neighborhood / family crêpe restaurant in Doral + catering, bilingual EN/ES.

export const SITE_ORIGIN = 'https://www.themastercrepes.com';

export type Lang = 'en' | 'es';

export interface PageSeo {
  path: string;
  name: string;
  title: Record<Lang, string>;
  description: Record<Lang, string>;
  noindex?: boolean;
  /** Spanish copy of the route is not generated (e.g. embeds) */
  enOnly?: boolean;
  priority?: number;
  changefreq?: 'weekly' | 'monthly' | 'yearly';
  images?: { loc: string; title: string }[];
}

export const PAGES: PageSeo[] = [
  {
    path: '/',
    name: 'home',
    title: {
      en: 'Crepes in Doral | Family Restaurant & Catering | Master Crepes',
      es: 'Crepería en Doral | Crepes, Brunch y Catering | Master Crepes',
    },
    description: {
      en: 'Family-friendly crepe restaurant in Doral, FL. Sweet & savory crepes, brunch, kids menu, coffee and event catering. Se habla español. Order online.',
      es: 'Crepería familiar en Doral, FL: crepes dulces y salados, brunch, menú infantil, café y catering para fiestas y eventos en Miami. Ordena en línea.',
    },
    priority: 1.0,
    changefreq: 'weekly',
    images: [
      { loc: 'https://res.cloudinary.com/dz6qozi9i/image/upload/master-crepes/crepes/389A5347.jpg', title: 'Sweet crepe with strawberries at Master Crepes in Doral, FL' },
      { loc: 'https://res.cloudinary.com/dz6qozi9i/image/upload/master-crepes/crepes/389A5292.jpg', title: 'Crepes made fresh at Master Crepes, a family restaurant in Doral' },
      { loc: 'https://res.cloudinary.com/dz6qozi9i/image/upload/master-crepes/crepes/389A5366.jpg', title: 'Savory and sweet crepes near you in Doral, FL' },
    ],
  },
  {
    path: '/menu',
    name: 'menu',
    title: {
      en: 'Menu | Crepes, Brunch & Kids Menu in Doral | Master Crepes',
      es: 'Menú | Crepes, Brunch y Menú Infantil en Doral | Master Crepes',
    },
    description: {
      en: 'Full menu: savory & sweet crepes, breakfast, brunch, kids menu, açaí bowls, gelato and coffee. Order online in Doral for pickup or delivery.',
      es: 'Menú completo: crepes salados y dulces, desayunos, brunch, menú infantil, açaí bowls, gelato y café. Ordena en Doral para recoger o a domicilio.',
    },
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/catering',
    name: 'catering',
    title: {
      en: 'Crepe Catering in Miami & Doral | Live Stations | Master Crepes',
      es: 'Catering de Crepes en Miami y Doral | Master Crepes',
    },
    description: {
      en: 'Live crepe station catering for weddings, quinceañeras, birthdays, schools and corporate events in Miami & South Florida. Request a quote today.',
      es: 'Estación de crepes en vivo para bodas, quinceañeras, cumpleaños, colegios y eventos de empresa en Miami y el sur de Florida. Pide tu cotización.',
    },
    priority: 0.9,
    changefreq: 'monthly',
    images: [
      { loc: 'https://res.cloudinary.com/dpjzfua3n/image/upload/v1775230304/master-crepes/yir8fptysnwpvibysetj.jpg', title: 'Live crepe station catering at an event in Miami' },
    ],
  },
  {
    path: '/restaurante',
    name: 'restaurante',
    title: {
      en: 'Coffee, Lattes & Drinks in Doral | Master Crepes',
      es: 'Café, Lattes y Bebidas en Doral | Master Crepes',
    },
    description: {
      en: 'Specialty coffee, lattes, lemonades and smoothies in Doral, FL. The perfect pair for your crepe. Dine in, pickup or delivery near you.',
      es: 'Café de especialidad, lattes, limonadas y smoothies en Doral, FL. El acompañante perfecto para tu crepe. Visítanos, recoge o pide a domicilio.',
    },
    priority: 0.8,
    changefreq: 'monthly',
    images: [
      { loc: 'https://res.cloudinary.com/dz6qozi9i/image/upload/master-crepes/cafe/389A5197.jpg', title: 'Specialty coffee and latte at Master Crepes Doral' },
      { loc: 'https://res.cloudinary.com/dz6qozi9i/image/upload/master-crepes/bebidas/389A5260.jpg', title: 'Lemonades and drinks at Master Crepes Doral' },
    ],
  },
  {
    path: '/gallery',
    name: 'gallery',
    title: {
      en: 'Photo Gallery | Crepes & Events in Doral | Master Crepes',
      es: 'Galería de Fotos | Crepes y Eventos en Doral | Master Crepes',
    },
    description: {
      en: 'Photos of our sweet and savory crepes, coffee, our Doral restaurant and live crepe stations at events across Miami and South Florida.',
      es: 'Fotos de nuestros crepes dulces y salados, café, el restaurante en Doral y estaciones de crepes en eventos de Miami y el sur de Florida.',
    },
    priority: 0.7,
    changefreq: 'weekly',
    images: [
      { loc: 'https://res.cloudinary.com/dz6qozi9i/image/upload/master-crepes/crepes/389A5343.jpg', title: 'Master Crepes photo gallery' },
    ],
  },
  {
    path: '/franchises',
    name: 'franchises',
    title: {
      en: 'Crepe Franchise Opportunities | Master Crepes',
      es: 'Franquicias de Crepes | Master Crepes',
    },
    description: {
      en: 'Own a Master Crepes franchise: a family-friendly crepe brand from Doral, FL with training, marketing and operations support. Join the waiting list.',
      es: 'Ten tu franquicia Master Crepes: una marca familiar de crepes nacida en Doral, FL, con capacitación, marketing y soporte operativo. Únete a la lista.',
    },
    priority: 0.6,
    changefreq: 'monthly',
  },
  {
    path: '/contact',
    name: 'contact',
    title: {
      en: 'Contact & Location in Doral, FL | Master Crepes',
      es: 'Contacto y Ubicación en Doral, FL | Master Crepes',
    },
    description: {
      en: 'Visit Master Crepes at 3905 NW 107th Ave Suite 106, Doral, FL 33178. Call (786) 478-2727 for orders, catering quotes or questions. Se habla español.',
      es: 'Visítanos en 3905 NW 107th Ave Suite 106, Doral, FL 33178. Llama al (786) 478-2727 para pedidos, cotizaciones de catering o preguntas.',
    },
    priority: 0.7,
    changefreq: 'yearly',
  },
  {
    path: '/giveaway',
    name: 'giveaway',
    title: {
      en: '2nd Anniversary Giveaway - Win Free Crepes for a Year - Master Crepes Doral',
      es: 'Sorteo 2º Aniversario - Gana Crepes Gratis por un Año - Master Crepes Doral',
    },
    description: {
      en: "Master Crepes Doral 2nd Anniversary Giveaway: win free crepes for a year — that's 1 free crepe every month for a whole year. Enter in 30 seconds.",
      es: 'Sorteo del 2º aniversario de Master Crepes Doral: gana crepes gratis por un año, 1 crepe gratis cada mes durante todo un año. Participa en 30 segundos.',
    },
    priority: 0.5,
    changefreq: 'weekly',
  },
  {
    path: '/bio',
    name: 'bio',
    title: {
      en: 'Links - Master Crepes',
      es: 'Enlaces - Master Crepes',
    },
    description: {
      en: 'Connect with Master Crepes in Doral. Order online, book catering, or view our latest menu.',
      es: 'Conecta con Master Crepes en Doral. Ordena en línea, reserva catering o mira nuestro menú.',
    },
    priority: 0.3,
    changefreq: 'monthly',
  },
  {
    path: '/embed/catering',
    name: 'embed-catering',
    title: {
      en: 'Catering Quote - Master Crepes',
      es: 'Cotización de Catering - Master Crepes',
    },
    description: {
      en: 'Request a quote for a Master Crepes live crêpe station.',
      es: 'Solicita una cotización para una estación de crepes en vivo de Master Crepes.',
    },
    noindex: true,
    enOnly: true,
  },
];

/** '/menu' + 'es' → '/es/menu'; '/' + 'es' → '/es' */
export const localizedPath = (path: string, lang: Lang): string => {
  if (lang === 'en') return path;
  return path === '/' ? '/es' : `/es${path}`;
};

/** '/es/menu' → '/menu' */
export const basePath = (path: string): string => {
  if (path === '/es' || path === '/es/') return '/';
  return path.startsWith('/es/') ? path.slice(3) : path;
};

export const absoluteUrl = (path: string): string =>
  SITE_ORIGIN + (path === '/' ? '/' : path);
