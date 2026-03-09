import React, { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    // Vturb: mostra ofertas após delaySeconds
    const delaySeconds = 3654;
    const player = document.querySelector('vturb-smartplayer');
    if (player) {
      const onReady = () => {
        if (typeof player.displayHiddenElements === 'function') {
          player.displayHiddenElements(delaySeconds, ['.esconder'], {
            persist: true,
          });
        }
      };
      player.addEventListener('player:ready', onReady);
    }

    // Tracking (UTMify + Meta Pixels), igual página original
    let trackingLoaded = false;
    const loadTracking = () => {
      if (trackingLoaded) return;
      trackingLoaded = true;

      // UTMify
      const utmScript = document.createElement('script');
      utmScript.src = 'https://cdn.utmify.com.br/scripts/utms/latest.js';
      utmScript.setAttribute('data-utmify-prevent-subids', '');
      utmScript.async = true;
      document.body.appendChild(utmScript);

      // Meta Pixels
      (function (f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      const pixelIds = [
        '901335525837933',
        '1435316934639038',
        '2157661164979333',
        '1930652510882312',
        '1304063911565424',
        '797801516088163',
        '885506097636747',
        '1910035972952167',
      ];
      pixelIds.forEach((id) => window.fbq && window.fbq('init', id));
      window.fbq && window.fbq('track', 'PageView');
    };

    const interactions = ['scroll', 'mousemove', 'touchstart', 'click'];
    interactions.forEach((event) => {
      window.addEventListener(event, loadTracking, { once: true, passive: true });
    });
    const trackingTimeout = setTimeout(loadTracking, 3000);

    // Vturb: carrega player.js após 2s
    let vturbLoaded = false;
    const VTURB_SRC =
      'https://scripts.converteai.net/6e3ae2f6-ad64-483b-9bc5-bafc50ec8005/players/699de0a8f5e86dda40b4cdcc/v4/player.js';

    const loadVturb = () => {
      if (vturbLoaded) return;
      vturbLoaded = true;
      const s = document.createElement('script');
      s.src = VTURB_SRC;
      s.async = true;
      document.body.appendChild(s);
    };

    const vturbTimeout = setTimeout(loadVturb, 2000);

    return () => {
      clearTimeout(trackingTimeout);
      clearTimeout(vturbTimeout);
    };
  }, []);

  return (
    <main className="w-full max-w-5xl mx-auto bg-white shadow-xl min-h-screen pb-12">
      <header className="bg-black px-4 py-4 w-full shadow-md relative z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button className="text-white" aria-label="Menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
          <h1 className="text-white text-2xl font-semibold tracking-wide">
            Health<span className="text-[#FD4C31]">News</span>
          </h1>
          <button className="text-white" aria-label="Search">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </div>
      </header>

      <div className="bg-[#FD4C31] py-2 overflow-hidden w-full relative z-10">
        <div className="animate-scroll">
          <span className="text-white font-bold text-xs tracking-[0.15em] uppercase">
            LIVE UPDATES • BREAKING NEWS • LIVE UPDATES • BREAKING NEWS • LIVE UPDATES • BREAKING NEWS • LIVE UPDATES • BREAKING NEWS •
          </span>
          <span className="text-white font-bold text-xs tracking-[0.15em] uppercase">
            LIVE UPDATES • BREAKING NEWS • LIVE UPDATES • BREAKING NEWS • LIVE UPDATES • BREAKING NEWS • LIVE UPDATES • BREAKING NEWS
          </span>
        </div>
      </div>

      <div className="relative w-full bg-black aspect-video shadow-md">
        <vturb-smartplayer
          id="vid-699de0a8f5e86dda40b4cdcc"
          style={{ display: 'block', margin: '0 auto', width: '100%' }}
        ></vturb-smartplayer>
      </div>

      <div className="bg-white py-3 px-4 border-b border-gray-100 flex items-center justify-center gap-2 relative z-10">
        <span className="flex h-2.5 w-2.5 relative mt-0.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FD4C31]"></span>
        </span>
        <span className="text-gray-700 font-bold text-sm">
          <span id="viewer-count" className="tabular-nums">
            8.613
          </span>{' '}
          people watching now
        </span>
      </div>

      <div className="bg-white py-6 px-4">
        <div className="flex items-center justify-center gap-8">
          <img
            src="images/abc_logo.webp"
            alt="ABC"
            loading="lazy"
            className="h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
          />
          <img
            src="images/cnn_logo.webp"
            alt="CNN"
            loading="lazy"
            className="h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
          />
          <img
            src="images/nbc_logo.webp"
            alt="NBC"
            loading="lazy"
            className="h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
          />
          <img
            src="images/cbs_logo.svg"
            alt="CBS"
            loading="lazy"
            className="h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
          />
        </div>
      </div>

      <section id="secao_pitch" className="esconder bg-[#f9f9f9] px-4 py-12 border-b border-gray-200 relative">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-gray-900 mb-2 uppercase tracking-tight">Special Offer</h2>
            <p className="text-gray-600 font-medium">Choose your package</p>
          </div>

          <div className="ofertas-container">
            <div className="pr-card pr-card--highlight">
              <div className="pr-badge pr-badge--highlight">BEST VALUE!</div>
              <h3 className="pr-title">6 BOTTLES</h3>
              <div className="pr-subtitle">180 Day Supply</div>

              <img className="pr-img" src="images/6.png" alt="6 bottles" loading="lazy" />

              <div className="pr-pricing">
                <div className="pr-was">$799</div>
                <div className="pr-now-wrapper">
                  <span className="pr-currency">$</span>
                  <span className="pr-now">294</span>
                </div>
                <div className="pr-shipping">FREE SHIPPING</div>
              </div>

              <ul className="pr-list">
                <li className="highlight-bullet">
                  <i className="fa-solid fa-star"></i> YOU SAVE $505
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i> 63% DISCOUNT
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i> 3 FREE BOTTLES
                </li>
                <li style={{ color: '#60a5fa' }}>
                  <i className="fa-solid fa-gift" style={{ color: '#60a5fa' }}></i> + SURPRISE 🎁
                </li>
              </ul>

              <a
                className="pr-btn smartplayer-click-event"
                href="https://enduroxprime.mycartpanda.com/checkout/205297694:1?afid=MWT2LwT537"
              >
                BUY NOW <i className="fa-solid fa-arrow-right"></i>
              </a>
              <div className="pr-guarantee-btn-text">
                <i className="fa-solid fa-shield-halved"></i> 90 DAYS GUARANTEE
              </div>

              <div className="pr-total">Billed as one payment</div>
            </div>

            <div className="pr-card">
              <div className="pr-badge">Most Popular</div>
              <h3 className="pr-title">3 BOTTLES</h3>
              <div className="pr-subtitle">90 Day Supply</div>

              <img className="pr-img" src="images/3.png" alt="3 bottles" loading="lazy" />

              <div className="pr-pricing">
                <div className="pr-was">$347</div>
                <div className="pr-now-wrapper">
                  <span className="pr-currency">$</span>
                  <span className="pr-now">217</span>
                </div>
                <div className="pr-shipping">FREE SHIPPING</div>
              </div>

              <ul className="pr-list">
                <li className="highlight-bullet">
                  <i className="fa-solid fa-circle-check"></i> YOU SAVE $130!
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> 1 FREE BOTTLE
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> 37% DISCOUNT
                </li>
              </ul>

              <a
                className="pr-btn smartplayer-click-event"
                href="https://enduroxprime.mycartpanda.com/checkout/205297693:1?afid=MWT2LwT537"
              >
                BUY NOW <i className="fa-solid fa-arrow-right"></i>
              </a>
              <div className="pr-guarantee-btn-text">
                <i className="fa-solid fa-shield-halved"></i> 90 DAYS GUARANTEE
              </div>
              <div className="pr-total">
                Total: <s>$347</s> <strong>$217</strong>
              </div>
            </div>

            <div className="pr-card">
              <div className="pr-badge">Basic</div>
              <h3 className="pr-title">2 BOTTLES</h3>
              <div className="pr-subtitle">60 Day Supply</div>

              <img className="pr-img" src="images/2.png" alt="2 bottles" loading="lazy" />

              <div className="pr-pricing">
                <div className="pr-was">$217</div>
                <div className="pr-now-wrapper">
                  <span className="pr-currency">$</span>
                  <span className="pr-now">177</span>
                </div>
                <div className="pr-shipping" style={{ color: '#64748b', background: '#f1f5f9' }}>
                  + $9.99 SHIPPING
                </div>
              </div>

              <ul className="pr-list">
                <li className="highlight-bullet">
                  <i className="fa-solid fa-circle-check"></i> YOU SAVE $28!
                </li>
                <li>
                  <i className="fa-solid fa-check"></i> 15% DISCOUNT
                </li>
              </ul>

              <a
                className="pr-btn smartplayer-click-event"
                href="https://enduroxprime.mycartpanda.com/checkout/205297692:1?afid=MWT2LwT537"
              >
                BUY NOW <i className="fa-solid fa-arrow-right"></i>
              </a>
              <div className="pr-guarantee-btn-text">
                <i className="fa-solid fa-shield-halved"></i> 90 DAYS GUARANTEE
              </div>
              <div className="pr-total">
                Total: <s>$217</s> <strong>$168</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comentários Facebook fake - mesmo layout do HTML original */}
      <section className="bg-white px-4 py-10 md:px-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
          <span className="font-bold text-gray-900 text-lg tracking-tight">3,158 Comments</span>
          <span className="text-gray-400 font-normal ml-auto text-sm">Sort by </span>
          <span className="text-[#1877f2] font-semibold text-sm cursor-pointer hover:underline">Top</span>
        </div>

        <div className="space-y-6">
          {/* Bloco 1 */}
          <div>
            <div className="flex gap-2">
              <img
                src="https://i.pravatar.cc/150?img=10"
                alt="Avatar"
                loading="lazy"
                className="w-9 h-9 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Abigail Walker</div>
                  <div className="fb-text">
                    I swear I thought this was just another one of those long, boring scam videos… But hearing Jillian Michaels explain the
                    true gelatin trick actually made me stay and watch. This finally feels different.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">42</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">2h</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-11 mt-3">
              <img
                src="https://i.pravatar.cc/150?img=5"
                alt="Avatar"
                loading="lazy"
                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Katherine Lewis</div>
                  <div className="fb-text">
                    Same here. When she said most gelatin recipes were taught wrong on purpose, it clicked instantly.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">28</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">1h</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-11 mt-3">
              <img
                src="https://i.pravatar.cc/150?img=9"
                alt="Avatar"
                loading="lazy"
                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Amanda Miller</div>
                  <div className="fb-text">
                    Exactly. I've wasted hours on fake videos before. This one felt like Jillian was calling out the scams directly.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">23</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">45m</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 2 */}
          <div>
            <div className="flex gap-2">
              <img
                src="https://i.pravatar.cc/150?img=24"
                alt="Avatar"
                loading="lazy"
                className="w-9 h-9 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Suzy Green</div>
                  <div className="fb-text">Honest question… is this legit or just another marketing hype?</div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">45</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">3h</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-11 mt-3">
              <img
                src="https://i.pravatar.cc/150?img=20"
                alt="Avatar"
                loading="lazy"
                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Alyssa Stewart</div>
                  <div className="fb-text">
                    I asked myself the same thing. I stayed skeptical until Jillian explained why the fake gelatin tricks never worked.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">31</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">2h</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-11 mt-3">
              <img
                src="https://i.pravatar.cc/150?img=23"
                alt="Avatar"
                loading="lazy"
                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Jordan Baker</div>
                  <div className="fb-text">
                    The part about losing 14 pounds in 10 days with the correct gelatin recipe is what made me keep watching.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">38</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">2h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 3 */}
          <div>
            <div className="flex gap-2">
              <img
                src="https://i.pravatar.cc/150?img=16"
                alt="Avatar"
                loading="lazy"
                className="w-9 h-9 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Victoria Clark</div>
                  <div className="fb-text">
                    It&apos;s not even about the scale for me. After watching Jillian explain the real gelatin trick, I finally understood
                    why nothing worked before.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">48</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">4h</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-11 mt-3">
              <img
                src="https://i.pravatar.cc/150?img=25"
                alt="Avatar"
                loading="lazy"
                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Sarah Smith</div>
                  <div className="fb-text">Yes! My appetite dropped so fast it honestly scared me at first.</div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">33</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">3h</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 4 */}
          <div>
            <div className="flex gap-2">
              <img
                src="https://i.pravatar.cc/150?img=27"
                alt="Avatar"
                loading="lazy"
                className="w-9 h-9 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Rachel Thomas</div>
                  <div className="fb-text">
                    I&apos;ve tried diets, workouts, fasting… everything. Nothing made sense until Jillian Michaels broke down the true
                    gelatin method and why scammers remove key ingredients.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">48</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">1d</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-11 mt-3">
              <img
                src="https://i.pravatar.cc/150?img=28"
                alt="Avatar"
                loading="lazy"
                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Lisa Walker</div>
                  <div className="fb-text">
                    Same. I thought gelatin was just dessert. Didn&apos;t expect this explanation at all.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">29</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">1d</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 5 */}
          <div>
            <div className="flex gap-2">
              <img
                src="https://i.pravatar.cc/150?img=29"
                alt="Avatar"
                loading="lazy"
                className="w-9 h-9 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Donna Clark</div>
                  <div className="fb-text">Has anyone actually seen real weight loss from this? Or is it just talk?</div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">45</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">1d</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-11 mt-3">
              <img
                src="https://i.pravatar.cc/150?img=31"
                alt="Avatar"
                loading="lazy"
                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Veronica Escher</div>
                  <div className="fb-text">
                    I&apos;m on day 10 after following the real gelatin trick Jillian explains. Down 14 pounds already, and I didn&apos;t
                    change what I eat.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">50</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">1d</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-11 mt-3">
              <img
                src="https://i.pravatar.cc/150?img=32"
                alt="Avatar"
                loading="lazy"
                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Savannah Perry</div>
                  <div className="fb-text">
                    I&apos;m further in. About 27 pounds in 15 days. What shocked me most was how full I feel all day.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">48</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">1d</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 6 */}
          <div>
            <div className="flex gap-2">
              <img
                src="https://i.pravatar.cc/150?img=38"
                alt="Avatar"
                loading="lazy"
                className="w-9 h-9 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Melissa Richardson</div>
                  <div className="fb-text">
                    I almost closed the video when I saw how long it was. Glad I didn&apos;t. Jillian exposing the fake gelatin recipes
                    hooked me instantly.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">46</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">1d</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-11 mt-3">
              <img
                src="https://i.pravatar.cc/150?img=41"
                alt="Avatar"
                loading="lazy"
                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Hailey Foster</div>
                  <div className="fb-text">
                    Same. Once she said scammers were selling flour capsules, I knew she was serious.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">35</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">1d</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 7 */}
          <div>
            <div className="flex gap-2">
              <img
                src="https://i.pravatar.cc/150?img=44"
                alt="Avatar"
                loading="lazy"
                className="w-9 h-9 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Nicole Patterson</div>
                  <div className="fb-text">
                    The craziest part is realizing the gelatin trick itself wasn&apos;t the scam — the distorted versions were.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">45</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">2d</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-11 mt-3">
              <img
                src="https://i.pravatar.cc/150?img=10"
                alt="Avatar"
                loading="lazy"
                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Abigail Walker</div>
                  <div className="fb-text">Exactly. Jillian being the original creator changes everything.</div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">27</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">2d</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 8 */}
          <div>
            <div className="flex gap-2">
              <img
                src="https://i.pravatar.cc/150?img=47"
                alt="Avatar"
                loading="lazy"
                className="w-9 h-9 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Emily Rodriguez</div>
                  <div className="fb-text">
                    I stayed because Jillian mentioned women losing 50+ pounds once the hormones activate naturally. That&apos;s when I
                    grabbed my notebook.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">48</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">2d</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-11 mt-3">
              <img
                src="https://i.pravatar.cc/150?img=48"
                alt="Avatar"
                loading="lazy"
                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Sophia Martinez</div>
                  <div className="fb-text">Same. She explains it in a way that finally makes sense.</div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">24</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">2d</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 9 */}
          <div>
            <div className="flex gap-2">
              <img
                src="https://i.pravatar.cc/150?img=49"
                alt="Avatar"
                loading="lazy"
                className="w-9 h-9 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Hailey Foster</div>
                  <div className="fb-text">
                    Honestly, after hearing Jillian Michaels explain why GLP-1 and GIP matter, I realized no diet ever fixed the real
                    problem.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">45</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">2d</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-11 mt-3">
              <img
                src="https://i.pravatar.cc/150?img=16"
                alt="Avatar"
                loading="lazy"
                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Victoria Clark</div>
                  <div className="fb-text">That explanation alone was worth watching the whole video.</div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">30</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">2d</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bloco 10 */}
          <div>
            <div className="flex gap-2">
              <img
                src="https://i.pravatar.cc/150?img=26"
                alt="Avatar"
                loading="lazy"
                className="w-9 h-9 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Amanda Miller</div>
                  <div className="fb-text">
                    With so many scams online, it&apos;s rare to see someone openly calling them out. Jillian didn&apos;t just sell hope — she
                    explained why we were all misled.
                  </div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">49</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">2d</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 ml-11 mt-3">
              <img
                src="https://i.pravatar.cc/150?img=43"
                alt="Avatar"
                loading="lazy"
                className="w-8 h-8 rounded-full flex-shrink-0 cursor-pointer"
              />
              <div className="flex-1 min-w-0">
                <div className="fb-comment-bubble w-fit">
                  <div className="fb-author">Rachel Thomas</div>
                  <div className="fb-text">Exactly. This finally feels like the true gelatin trick, not another trap.</div>
                  <div className="fb-like-count-box">
                    <div className="w-3.5 h-3.5 fb-like-icon"></div>
                    <span className="fb-like-count-text">32</span>
                  </div>
                </div>
                <div className="fb-actions">
                  <button>Like</button> · <button>Reply</button> · <span className="font-normal">2d</span>
                </div>
              </div>
            </div>
          </div>

          {/* Aviso final */}
          <div className="pt-6 mt-2 border-t border-gray-100 text-center">
            <p className="text-[13px] text-gray-500 font-semibold bg-gray-50 inline-block px-3 py-1 rounded-full">
              This post is no longer receiving comments.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-10 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-gray-500 text-[11px] mb-6 leading-relaxed">
            *This product is not intended to diagnose, treat, cure, or prevent any disease. Results may vary. This is an advertorial and
            not a news article. Images used for illustrative purposes only.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-[13px] text-gray-400 font-bold mb-6 tracking-wide">
            <a href="#" className="hover:text-white transition-colors hover:underline">
              Terms &amp; Conditions
            </a>
            <a href="#" className="hover:text-white transition-colors hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors hover:underline">
              Contact Us
            </a>
          </div>
          <p className="text-[11px] text-gray-600 font-medium tracking-wider uppercase">
            © 2026 Health News. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
};

export default App;

