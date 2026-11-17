import {
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type CSSProperties,
  type MouseEvent,
} from 'react';
import { ArrowDownLeft, Award, MessageCircle, Scissors } from 'lucide-react';
import heroEditorialImg from '../assets/images/hero_uniform_editorial_1794912583506.jpg';
import heroDetailImg from '../assets/images/hero_tailoring_detail_1794912584154.jpg';
import {
  HERO_PILLARS,
  HERO_SPOTLIGHTS,
  buildWhatsAppQuoteUrl,
  getSpotlightById,
  type HeroSpotlight,
} from '../utils/heroHelpers';

const HEADLINE = ['يونيفورم', 'يرتقي', 'بصورة', 'علامتك،', 'بتفاصيل', 'تُصنع', 'لتدوم'];
const AUTOPLAY_MS = 6500;

const toAr = (n: number) => n.toLocaleString('ar-EG');
const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties;

/* ------------------------------ hooks ------------------------------ */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

function useCountUp(target: number, duration: number, startDelay: number, enabled: boolean) {
  const [value, setValue] = useState(enabled ? 0 : target);
  useEffect(() => {
    if (!enabled) {
      setValue(target);
      return;
    }
    let raf = 0;
    let startedAt = 0;
    const timer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!startedAt) startedAt = now;
        const p = Math.min((now - startedAt) / duration, 1);
        setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, startDelay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, duration, startDelay, enabled]);
  return value;
}

/* ----------------------------- component ----------------------------- */

export default function Hero() {
  const [activeView, setActiveView] = useState<HeroSpotlight['id']>('image');
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);

  const currentSpotlight = getSpotlightById(activeView);
  const activeIndex = Math.max(
    0,
    HERO_SPOTLIGHTS.findIndex((s) => s.id === activeView),
  );
  const autoplay = !reducedMotion && HERO_SPOTLIGHTS.length > 1;
  const years = useCountUp(20, 1800, 1400, !reducedMotion);

  const handleBrowseProducts = () => {
    const productsEl = document.getElementById('products');
    if (productsEl) {
      productsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const whatsappHref = buildWhatsAppQuoteUrl(currentSpotlight.quoteTopic);

  // Autoplay: the progress bar's CSS animation ends -> go to the next spotlight.
  const goNext = (e: AnimationEvent<HTMLSpanElement>) => {
    if (e.target !== e.currentTarget) return;
    setActiveView(HERO_SPOTLIGHTS[(activeIndex + 1) % HERO_SPOTLIGHTS.length].id);
  };

  // Subtle mouse parallax (writes CSS vars directly, no re-renders).
  const setParallax = (x: number, y: number) => {
    const el = frameRef.current;
    if (!el) return;
    el.style.setProperty('--mx', x.toFixed(3));
    el.style.setProperty('--my', y.toFixed(3));
  };
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    setParallax((e.clientX - r.left) / r.width - 0.5, (e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    setPaused(false);
    setParallax(0, 0);
  };

  return (
    <section
      dir="rtl"
      aria-label="واجهة Ali-Bek للزي الموحد"
      className="ab-hero relative isolate overflow-hidden bg-[#FAFAFA] border-b border-gray-200 pt-24 pb-12 sm:pt-28 lg:pt-32 lg:pb-16"
    >
      <style>{STYLES}</style>

      {/* Fabric twill texture */}
      <div aria-hidden="true" className="ab-weave absolute inset-0 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* ---------- Copy & actions ---------- */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <div
                className="ab-fade inline-flex items-center gap-2.5 rounded-full bg-white border border-gray-200 ps-1.5 pe-4 py-1.5 mb-6 shadow-sm"
                style={delay(0)}
              >
                <span className="rounded-full bg-red-600 text-white text-xs font-black px-3 py-1">
                  Ali-Bek
                </span>
                <span className="text-xs sm:text-sm font-semibold text-gray-700">
                  الزي الموحد للشركات والمؤسسات
                </span>
              </div>

              <h1
                className="font-black text-gray-950 leading-[1.3] tracking-tight max-w-xl"
                style={{ fontSize: 'clamp(2rem, 3.4vw, 3.1rem)', textWrap: 'balance' }}
              >
                <span className="sr-only">{HEADLINE.join(' ')}</span>
                <span aria-hidden="true">
                  {HEADLINE.map((word, i) => (
                    <span
                      key={`${word}-${i}`}
                      className="inline-block overflow-hidden align-bottom py-[0.12em] -my-[0.12em] me-[0.28em]"
                    >
                      <span className="ab-word inline-block" style={delay(200 + i * 90)}>
                        {word}
                      </span>
                    </span>
                  ))}
                </span>
              </h1>

              {/* The seam: a stitched line drawn by a pair of scissors */}
              <div aria-hidden="true" className="relative mt-5 mb-6 h-5 max-w-md">
                <div
                  className="ab-seam absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2"
                  style={delay(950)}
                />
                <Scissors
                  className="ab-scissors absolute top-1/2 w-4 h-4 text-red-600 -translate-y-1/2 rotate-180"
                  style={delay(950)}
                />
              </div>

              <p
                className="ab-fade text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mb-8"
                style={delay(1100)}
              >
                نركز في Ali-Bek على تعزيز الهوية البصرية لفريقك عبر خامات عالية الجودة،
                دقة متناهية في التفصيل والتطريز، وأسعار تنافسية مباشرة للشركات والمطاعم
                والقطاع الطبي والمدارس.
              </p>
            </div>

            <div className="ab-fade space-y-5" style={delay(1250)}>
              {/* Spotlight switcher with sliding indicator */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap shrink-0">
                  استعرض التركيز:
                </span>
                <div
                  role="tablist"
                  aria-label="عرض إطلالة العلامة أو تفاصيل الخياطة"
                  className="relative grid p-1 bg-gray-100 rounded-xl border border-gray-200 w-full sm:w-auto sm:min-w-[300px]"
                  style={{ gridTemplateColumns: `repeat(${HERO_SPOTLIGHTS.length}, 1fr)` }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute top-1 bottom-1 rounded-lg bg-white shadow-sm"
                    style={{
                      width: `calc((100% - 0.5rem) / ${HERO_SPOTLIGHTS.length})`,
                      insetInlineStart: `calc(0.25rem + ${activeIndex} * (100% - 0.5rem) / ${HERO_SPOTLIGHTS.length})`,
                      transition: 'inset-inline-start .35s cubic-bezier(.4,0,.2,1)',
                    }}
                  />
                  {HERO_SPOTLIGHTS.map((item) => {
                    const isActive = activeView === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveView(item.id)}
                        className={`relative z-10 px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors duration-200 whitespace-nowrap min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 ${
                          isActive ? 'text-gray-950' : 'text-gray-600 hover:text-gray-950'
                        }`}
                      >
                        {item.tabLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleBrowseProducts}
                  className="ab-shine group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base px-7 py-3.5 min-h-[48px] rounded-xl shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/35 hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                >
                  <span className="relative z-10">تصفح المجموعات</span>
                  <ArrowDownLeft
                    className="relative z-10 w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5 group-hover:translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>

                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-900 text-gray-950 hover:text-white border border-gray-900 font-bold text-sm sm:text-base px-7 py-3.5 min-h-[48px] rounded-xl hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                >
                  <MessageCircle
                    className="w-4 h-4 text-red-600 transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span>اطلب عرض سعر للشركات</span>
                </a>
              </div>
            </div>
          </div>

          {/* ---------- Photography frame ---------- */}
          <div className="ab-frame-in lg:col-span-6" style={delay(150)}>
            <div
              ref={frameRef}
              onMouseMove={handleMove}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={handleLeave}
              className="relative h-full min-h-[340px] sm:min-h-[420px] lg:min-h-[520px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-200 shadow-2xl shadow-gray-900/15"
            >
              {/* Images (parallax wrapper + slow Ken Burns zoom) */}
              <div
                className="ab-parallax absolute -inset-4"
                style={{
                  transform: 'translate3d(calc(var(--mx,0) * -14px), calc(var(--my,0) * -10px), 0)',
                }}
              >
                {!imgError.image ? (
                  <img
                    src={heroEditorialImg}
                    alt="تشكيلة يونيفورم Ali-Bek للشركات والضيافة بتفصيل احترافي"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError((prev) => ({ ...prev, image: true }))}
                    className={`ab-kb absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
                      activeView === 'image' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  />
                ) : null}

                {!imgError.detail ? (
                  <img
                    src={heroDetailImg}
                    alt="لقطة مقربة توضح دقة الخياطة المزدوجة وجودة أقمشة Ali-Bek"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError((prev) => ({ ...prev, detail: true }))}
                    className={`ab-kb absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
                      activeView === 'detail' ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  />
                ) : null}
              </div>

              {/* Contrast scrim for the caption */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none"
              />

              {/* Stitched border, like a seam on fabric */}
              <div
                aria-hidden="true"
                className="absolute inset-3 rounded-xl border border-dashed border-white/40 pointer-events-none z-10"
              />

              {/* Story-style progress / switcher */}
              <div className="absolute top-6 inset-x-6 z-20 flex gap-2">
                {HERO_SPOTLIGHTS.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={item.tabLabel}
                    onClick={() => setActiveView(item.id)}
                    className="flex-1 py-2 -my-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
                  >
                    <span className="block h-[3px] rounded-full bg-white/30 overflow-hidden">
                      {i < activeIndex || (i === activeIndex && !autoplay) ? (
                        <span className="block h-full bg-white" />
                      ) : null}
                      {i === activeIndex && autoplay ? (
                        <span
                          key={item.id}
                          className="ab-progress block h-full bg-white"
                          onAnimationEnd={goNext}
                          style={{
                            animationDuration: `${AUTOPLAY_MS}ms`,
                            animationPlayState: paused ? 'paused' : 'running',
                          }}
                        />
                      ) : null}
                    </span>
                  </button>
                ))}
              </div>

              {/* Experience card */}
              <div
                className="absolute top-14 end-6 z-20"
                style={{
                  transform: 'translate3d(calc(var(--mx,0) * 16px), calc(var(--my,0) * 12px), 0)',
                  transition: 'transform .3s ease-out',
                }}
              >
                <div
                  className="ab-fade flex items-center gap-3 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 text-white ps-3 pe-5 py-2.5 shadow-lg"
                  style={delay(1500)}
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-600">
                    <Award className="w-4 h-4" aria-hidden="true" />
                  </span>
                  <div className="leading-tight">
                    <p className="text-[11px] text-gray-100">خبرة تتجاوز</p>
                    <p className="text-lg font-black">{toAr(years)} عاماً</p>
                  </div>
                </div>
              </div>

              {/* Caption (re-animates on each switch) */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-7 sm:p-9 text-white" aria-live="polite">
                <div key={activeView} className="ab-caption">
                  <p className="text-base sm:text-lg font-bold leading-snug mb-1">
                    {currentSpotlight.captionTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                    {currentSpotlight.captionSubtitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---------- Pillars ---------- */}
        <div className="mt-10 lg:mt-14 pt-8 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {HERO_PILLARS.map((pillar, i) => (
            <div key={pillar.index} className="ab-fade" style={delay(1600 + i * 120)}>
              <span aria-hidden="true" className="block h-0.5 w-8 bg-red-600 mb-3" />
              <h2 className="text-sm sm:text-base font-bold text-gray-950 mb-1.5">
                {pillar.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- styles ------------------------------- */

const STYLES = `
.ab-hero .ab-weave{
  background-image:repeating-linear-gradient(135deg,rgba(17,24,39,.04) 0 1px,transparent 1px 7px);
  -webkit-mask-image:radial-gradient(ellipse 80% 70% at 70% 40%,#000 15%,transparent 75%);
  mask-image:radial-gradient(ellipse 80% 70% at 70% 40%,#000 15%,transparent 75%);
}

/* Headline: each word rises out of a mask */
.ab-hero .ab-word{animation:ab-word .9s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d,0ms)}
@keyframes ab-word{from{transform:translateY(115%) rotate(3deg)}to{transform:none}}

/* The seam: drawn right -> left, scissors lead the way */
.ab-hero .ab-seam{
  background:repeating-linear-gradient(to left,#dc2626 0 9px,transparent 9px 16px);
  animation:ab-seam 1.6s cubic-bezier(.65,0,.35,1) both;animation-delay:var(--d,0ms);
}
@keyframes ab-seam{from{clip-path:inset(0 0 0 100%)}to{clip-path:inset(0 0 0 0)}}
.ab-hero .ab-scissors{
  right:0;
  animation:ab-scissors 1.6s cubic-bezier(.65,0,.35,1) both;animation-delay:var(--d,0ms);
}
@keyframes ab-scissors{
  0%{right:0;opacity:1}
  88%{right:calc(100% - 1rem);opacity:1}
  100%{right:calc(100% - 1rem);opacity:0}
}

/* Supporting content */
.ab-hero .ab-fade{animation:ab-fade .8s ease both;animation-delay:var(--d,0ms)}
@keyframes ab-fade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}

.ab-hero .ab-frame-in{animation:ab-frame-in 1.1s cubic-bezier(.2,.8,.2,1) both;animation-delay:var(--d,0ms)}
@keyframes ab-frame-in{from{opacity:0;transform:translateY(24px) scale(.97)}to{opacity:1;transform:none}}

/* Photography */
.ab-hero .ab-parallax{transition:transform .35s ease-out;will-change:transform}
.ab-hero .ab-kb{animation:ab-kb 18s ease-in-out infinite alternate;will-change:transform}
@keyframes ab-kb{from{transform:scale(1.03)}to{transform:scale(1.13) translate(-1.5%,-1%)}}

/* Caption + story progress */
.ab-hero .ab-caption{animation:ab-caption .6s cubic-bezier(.2,.7,.2,1) both}
@keyframes ab-caption{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.ab-hero .ab-progress{
  transform-origin:right;
  animation-name:ab-progress;animation-timing-function:linear;animation-fill-mode:both;
}
@keyframes ab-progress{from{transform:scaleX(0)}to{transform:scaleX(1)}}

/* Primary button shine on hover */
.ab-hero .ab-shine::after{
  content:'';position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(110deg,transparent 30%,rgba(255,255,255,.3) 50%,transparent 70%);
  transform:translateX(120%);transition:transform .7s ease;
}
.ab-hero .ab-shine:hover::after{transform:translateX(-120%)}

@media (prefers-reduced-motion:reduce){
  .ab-hero *,.ab-hero *::before,.ab-hero *::after{animation:none!important;transition-duration:.01ms!important}
  .ab-hero .ab-scissors{display:none}
}
`;