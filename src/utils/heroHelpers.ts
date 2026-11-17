export interface HeroSpotlight {
  id: 'image' | 'detail';
  tabLabel: string;
  captionTitle: string;
  captionSubtitle: string;
  quoteTopic: string;
}

export interface HeroValuePillar {
  index: string;
  title: string;
  description: string;
}

export const HERO_SPOTLIGHTS: HeroSpotlight[] = [
  {
    id: 'image',
    tabLabel: 'الإطلالة والهوية',
    captionTitle: 'حضور احترافي يعكس هوية مؤسستك',
    captionSubtitle: 'قصّات عصرية متناسقة للشركات والضيافة والقطاع الطبي',
    quoteTopic: 'تصميم وتنفيذ يونيفورم متكامل يعكس هوية الشركة',
  },
  {
    id: 'detail',
    tabLabel: 'جودة الخامة والتفاصيل',
    captionTitle: 'خياطة مزدوجة وخامات منتقاة بعناية',
    captionSubtitle: 'أقمشة قطن بيكيه وتويل متين مع تطريز شعار دقيق وأزرار مقاومة',
    quoteTopic: 'استفسار عن خامات التفصيل والتطريز وعينات الأقمشة',
  },
];

export const HERO_PILLARS: HeroValuePillar[] = [
  {
    index: '٠١',
    title: 'تعزيز الصورة المؤسسية',
    description: 'تصاميم موحدة ترتقي بمظهر فريقك وتترك انطباعاً احترافياً فورياً.',
  },
  {
    index: '٠٢',
    title: 'جودة خامات مضمونة',
    description: 'أقمشة عملية عالية التحمل تحافظ على ثبات اللون والشكل بعد الغسيل.',
  },
  {
    index: '٠٣',
    title: 'اهتمام بأدق التفاصيل',
    description: 'دقة في الياقات، التشطيب، الأزرار، وتطريز الهوية البصرية بدقة.',
  },
  {
    index: '٠٤',
    title: 'أسعار تنافسية مباشرة',
    description: 'تسعير اقتصادي مرن لطلبات الشركات والمؤسسات بدون وسطاء.',
  },
];

export const WHATSAPP_NUMBER = '201099490594';

export function buildWhatsAppQuoteUrl(topic?: string, phone: string = WHATSAPP_NUMBER): string {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const baseMessage = topic
    ? `مرحباً Ali-Bek، أرغب في طلب عرض سعر بخصوص: ${topic}`
    : 'مرحباً Ali-Bek، أرغب في طلب عرض سعر للزي الموحد';
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(baseMessage)}`;
}

export function getSpotlightById(id: HeroSpotlight['id']): HeroSpotlight {
  return HERO_SPOTLIGHTS.find((item) => item.id === id) ?? HERO_SPOTLIGHTS[0];
}
