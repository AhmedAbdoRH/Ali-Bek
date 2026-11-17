import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function makeSvgImage(label: string, bg1: string, bg2: string, accent = '#ffffff'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}"/>
        <stop offset="100%" stop-color="${bg2}"/>
      </linearGradient>
    </defs>
    <rect width="600" height="800" fill="url(#g)"/>
    <circle cx="300" cy="330" r="110" fill="${accent}" fill-opacity="0.12"/>
    <path d="M230 270 L270 250 C285 270 315 270 330 250 L370 270 L395 320 L360 335 L350 305 L350 430 L250 430 L250 305 L240 335 L205 320 Z" fill="none" stroke="${accent}" stroke-width="8" stroke-linejoin="round" stroke-opacity="0.85"/>
    <text x="300" y="540" font-family="Cairo, Arial, sans-serif" font-size="34" font-weight="bold" fill="${accent}" text-anchor="middle">${label}</text>
    <text x="300" y="590" font-family="Cairo, Arial, sans-serif" font-size="20" fill="${accent}" fill-opacity="0.75" text-anchor="middle">AliBek Uniforms</text>
  </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function createMockSupabaseClient(): SupabaseClient {
  console.warn(
    '[AI Studio] Supabase unavailable — using in-memory demo store.'
  );

  const now = new Date().toISOString();

  const db: Record<string, any[]> = {
    store_settings: [
      {
        id: '00000000-0000-0000-0000-000000000001',
        store_name: 'AliBek',
        store_description:
          'بخبرة تمتد لأكثر من 20 عاماً في سوق الزي الموحد، نفخر بكوننا الشريك الاستراتيجي لأكبر الشركات في السوق المصري.',
        logo_url: '/logo.png',
        favicon_url: '/logo.png',
        og_image_url: '/logo.png',
        meta_title: 'AliBek | الزي الموحد والملابس الاحترافية',
        meta_description: 'أفضل ملابس الزي الموحد للشركات والمطاعم والمدارس في مصر',
        keywords: ['زي موحد', 'يونيفورم', 'ملابس شركات', 'AliBek'],
        facebook_url: '',
        instagram_url: '',
        twitter_url: '',
        snapchat_url: '',
        tiktok_url: '',
        show_testimonials: false,
        theme_settings: {
          primaryColor: '#c7a17a',
          secondaryColor: '#111827',
          fontFamily: 'Cairo, sans-serif',
          backgroundColor: '#ffffff',
          backgroundGradient: '',
        },
        updated_at: now,
      },
    ],
    categories: [
      {
        id: 'cat-corporate',
        name: 'ملابس الشركات',
        description: 'بدل وقمصان وبولو شيرت بأعلى جودة للشركات والمؤسسات',
        image_url: makeSvgImage('ملابس الشركات', '#1e293b', '#0f172a'),
        created_at: now,
      },
      {
        id: 'cat-hospitality',
        name: 'يونيفورم المطاعم والفنادق',
        description: 'أطقم شيف ومريلات وملابس ضيافة عملية وأنيقة',
        image_url: makeSvgImage('المطاعم والفنادق', '#7f1d1d', '#450a0a'),
        created_at: now,
      },
      {
        id: 'cat-medical',
        name: 'الزي الطبي',
        description: 'سكراب طبي وبالطو أطباء من أجود الخامات القطنية',
        image_url: makeSvgImage('الزي الطبي', '#0f766e', '#134e4a'),
        created_at: now,
      },
      {
        id: 'cat-school',
        name: 'الزي المدرسي',
        description: 'تصميمات مريحة ومتينة تناسب جميع المراحل الدراسية',
        image_url: makeSvgImage('الزي المدرسي', '#1d4ed8', '#1e3a8a'),
        created_at: now,
      },
    ],
    services: [
      {
        id: 1,
        category_id: 'cat-corporate',
        title: 'بولو شيرت بيكيه للشركات',
        description: 'بولو شيرت قطن 100% عالي الجودة مع إمكانية تطريز شعار الشركة بدقة احترافية.',
        image_url: makeSvgImage('بولو شيرت شركات', '#1e293b', '#334155'),
        price: '380',
        sale_price: '320',
        is_featured: true,
        is_best_seller: true,
        created_at: now,
      },
      {
        id: 2,
        category_id: 'cat-hospitality',
        title: 'طقم شيف احترافي مزدوج الصدر',
        description: 'خامة مقاومة للحرارة والبقع مع تهوية مريحة لساعات العمل الطويلة في المطبخ.',
        image_url: makeSvgImage('طقم شيف احترافي', '#991b1b', '#450a0a'),
        price: '550',
        sale_price: null,
        is_featured: true,
        is_best_seller: false,
        created_at: now,
      },
      {
        id: 3,
        category_id: 'cat-medical',
        title: 'سكراب طبي قطن مريح',
        description: 'تصميم عملي بجيوب متعددة وخامة مضادة للتجعد تناسب الأطباء وهيئة التمريض.',
        image_url: makeSvgImage('سكراب طبي', '#0d9488', '#115e59'),
        price: '490',
        sale_price: '425',
        is_featured: false,
        is_best_seller: true,
        created_at: now,
      },
      {
        id: 4,
        category_id: 'cat-corporate',
        title: 'قميص عمل كلاسيك أوكسفورد',
        description: 'قميص رسمي أنيق مناسب لفرق المبيعات والاستقبال بألوان متعددة.',
        image_url: makeSvgImage('قميص أوكسفورد', '#334155', '#0f172a'),
        price: '460',
        sale_price: null,
        is_featured: false,
        is_best_seller: true,
        created_at: now,
      },
      {
        id: 5,
        category_id: 'cat-hospitality',
        title: 'مريلة باريستا وويتر جلد وقماش',
        description: 'مريلة عصرية متينة بتفاصيل جلدية وأحزمة قابلة للتعديل للمطاعم والكافيهات.',
        image_url: makeSvgImage('مريلة ضيافة', '#78350f', '#451a03'),
        price: '290',
        sale_price: null,
        is_featured: true,
        is_best_seller: false,
        created_at: now,
      },
      {
        id: 6,
        category_id: 'cat-school',
        title: 'طقم زي مدرسي متكامل',
        description: 'قماش متين يتحمل الغسيل المتكرر مع ألوان ثابتة وتفصيل مريح للطلاب.',
        image_url: makeSvgImage('زي مدرسي متكامل', '#1e40af', '#1e3a8a'),
        price: '410',
        sale_price: '360',
        is_featured: false,
        is_best_seller: false,
        created_at: now,
      },
    ],
    banners: [
      {
        id: 'banner-1',
        type: 'text',
        title: 'AliBek للزي الموحد',
        description: 'عشرون عاماً من الخبرة في تصميم وتنفيذ الزي الموحد للشركات والمطاعم والمدارس',
        image_url: null,
        is_active: true,
        created_at: now,
      },
    ],
    testimonials: [],
  };

  const uploadedUrls = new Map<string, string>();
  let currentSession: any = null;
  const authListeners = new Set<(event: string, session: any) => void>();

  const notifyAuth = (event: string, session: any) => {
    authListeners.forEach((cb) => {
      try {
        cb(event, session);
      } catch {
        // ignore listener errors
      }
    });
  };

  const createQueryBuilder = (table: string) => {
    const state: {
      op: 'select' | 'insert' | 'update' | 'delete' | 'upsert';
      selectCols: string;
      payload: any;
      filters: Array<(row: any) => boolean>;
      orderBy: { col: string; ascending: boolean } | null;
      limitCount: number | null;
      singleRow: boolean;
    } = {
      op: 'select',
      selectCols: '*',
      payload: null,
      filters: [],
      orderBy: null,
      limitCount: null,
      singleRow: false,
    };

    const hydrateRow = (row: any) => {
      const copy = { ...row };
      if (table === 'services' && state.selectCols.includes('categories')) {
        copy.category = db.categories.find((c) => c.id === row.category_id) || null;
      }
      if (table === 'services' && state.selectCols.includes('product_images')) {
        copy.product_images = [];
      }
      return copy;
    };

    const execute = async (): Promise<{ data: any; error: null }> => {
      const rows = db[table] || (db[table] = []);

      if (state.op === 'insert') {
        const toInsert = (Array.isArray(state.payload) ? state.payload : [state.payload]).map(
          (item, i) => ({
            id: item.id ?? (table === 'services' ? Date.now() + i : `mock-${Date.now()}-${i}`),
            created_at: item.created_at ?? new Date().toISOString(),
            ...item,
          })
        );
        rows.unshift(...toInsert);
        return { data: state.singleRow ? toInsert[0] : toInsert, error: null };
      }

      if (state.op === 'upsert') {
        const items = Array.isArray(state.payload) ? state.payload : [state.payload];
        for (const item of items) {
          const idx = rows.findIndex((r) => r.id === item.id);
          if (idx >= 0) {
            rows[idx] = { ...rows[idx], ...item, updated_at: new Date().toISOString() };
          } else {
            rows.push({
              id: item.id ?? `mock-${Date.now()}`,
              created_at: new Date().toISOString(),
              ...item,
            });
          }
        }
        return { data: state.singleRow ? items[0] : items, error: null };
      }

      if (state.op === 'update') {
        const updated: any[] = [];
        for (let i = 0; i < rows.length; i++) {
          if (state.filters.every((fn) => fn(rows[i]))) {
            rows[i] = { ...rows[i], ...state.payload, updated_at: new Date().toISOString() };
            updated.push(rows[i]);
          }
        }
        return { data: state.singleRow ? updated[0] ?? null : updated, error: null };
      }

      if (state.op === 'delete') {
        const remaining: any[] = [];
        const deleted: any[] = [];
        for (const row of rows) {
          if (state.filters.every((fn) => fn(row))) {
            deleted.push(row);
          } else {
            remaining.push(row);
          }
        }
        db[table] = remaining;
        return { data: deleted, error: null };
      }

      let result = rows.filter((row) => state.filters.every((fn) => fn(row))).map(hydrateRow);
      if (state.orderBy) {
        const { col, ascending } = state.orderBy;
        result.sort((a, b) => {
          const av = a[col] ?? '';
          const bv = b[col] ?? '';
          if (av < bv) return ascending ? -1 : 1;
          if (av > bv) return ascending ? 1 : -1;
          return 0;
        });
      }
      if (state.limitCount !== null) {
        result = result.slice(0, state.limitCount);
      }
      if (state.singleRow) {
        return { data: result[0] ?? null, error: null };
      }
      return { data: result, error: null };
    };

    const builder: any = {
      select(cols = '*') {
        if (state.op === 'select') {
          state.selectCols = cols;
        }
        return builder;
      },
      insert(payload: any) {
        state.op = 'insert';
        state.payload = payload;
        return builder;
      },
      update(payload: any) {
        state.op = 'update';
        state.payload = payload;
        return builder;
      },
      upsert(payload: any) {
        state.op = 'upsert';
        state.payload = payload;
        return builder;
      },
      delete() {
        state.op = 'delete';
        return builder;
      },
      eq(col: string, val: any) {
        state.filters.push((row) => String(row[col]) === String(val));
        return builder;
      },
      neq(col: string, val: any) {
        state.filters.push((row) => String(row[col]) !== String(val));
        return builder;
      },
      or(expr: string) {
        const clauses = expr.split(',').map((part) => part.trim());
        state.filters.push((row) =>
          clauses.some((clause) => {
            const match = clause.match(/^([^.]+)\.ilike\.%(.*)%$/i);
            if (!match) return false;
            const [, col, needle] = match;
            const val = String(row[col] ?? '').toLowerCase();
            return val.includes(needle.toLowerCase());
          })
        );
        return builder;
      },
      order(col: string, opts?: { ascending?: boolean }) {
        state.orderBy = { col, ascending: opts?.ascending ?? true };
        return builder;
      },
      limit(n: number) {
        state.limitCount = n;
        return builder;
      },
      single() {
        state.singleRow = true;
        return builder;
      },
      maybeSingle() {
        state.singleRow = true;
        return builder;
      },
      then(onFulfilled: any, onRejected: any) {
        return execute().then(onFulfilled, onRejected);
      },
    };

    return builder;
  };

  return {
    from: (table: string) => createQueryBuilder(table),
    auth: {
      getSession: async () => ({ data: { session: currentSession }, error: null }),
      onAuthStateChange: (callback: (event: string, session: any) => void) => {
        authListeners.add(callback);
        return {
          data: {
            subscription: {
              unsubscribe: () => {
                authListeners.delete(callback);
              },
            },
          },
        };
      },
      signInWithPassword: async ({ email }: { email: string; password: string }) => {
        currentSession = {
          access_token: 'mock-token',
          user: { id: 'mock-admin', email },
        };
        notifyAuth('SIGNED_IN', currentSession);
        return { data: { session: currentSession, user: currentSession.user }, error: null };
      },
      signOut: async () => {
        currentSession = null;
        notifyAuth('SIGNED_OUT', null);
        return { error: null };
      },
    },
    storage: {
      from: (_bucket: string) => ({
        upload: async (path: string, file: Blob | File) => {
          const url = typeof URL !== 'undefined' && file ? URL.createObjectURL(file) : '/logo.png';
          uploadedUrls.set(path, url);
          return { data: { path }, error: null };
        },
        getPublicUrl: (path: string) => ({
          data: { publicUrl: uploadedUrls.get(path) || '/logo.png' },
        }),
      }),
    },
  } as unknown as SupabaseClient;
}

const isDecommissionedDemoUrl =
  typeof supabaseUrl === 'string' && supabaseUrl.includes('sfwcmaoeoreuwhxcjlxe.supabase.co');

export const supabase: SupabaseClient =
  supabaseUrl && supabaseAnonKey && !isDecommissionedDemoUrl
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createMockSupabaseClient();