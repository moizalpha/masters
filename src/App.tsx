import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Scale,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sun,
  Moon,
} from 'lucide-react';
import {
  ATELIER_PILLARS,
  CASE_MATERIALS,
  CaseMaterialId,
  CRAFT_MOVEMENT_IMAGE,
  DIAL_TONES,
  DialToneId,
  HERO_BENCHMARKS,
  HERO_CAMPAIGN_IMAGE,
  resolveConfiguredWatchImage,
  STRAP_OPTIONS,
  StrapTypeId,
  WATCH_COLLECTION,
  WatchCategory,
  WatchModel,
} from './data/watches';
import { WatchImage } from './components/WatchImage';
import { BagPayload, WatchDetailModal } from './components/WatchDetailModal';
import { CompareModal } from './components/CompareModal';
import { BagDrawer, BagLineItem } from './components/BagDrawer';
import { MovementVideoPlaceholder } from './components/MovementVideoPlaceholder';
import { ConfiguredWatchStage } from './components/ConfiguredWatchStage';

const CATEGORIES: WatchCategory[] = [
  'All',
  'Chronograph',
  'Diver',
  'Dress',
  'GMT',
  'Complications',
];

type SortOrder = 'featured' | 'price-asc' | 'price-desc';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedCategory, setSelectedCategory] = useState<WatchCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('featured');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [inspectedWatch, setInspectedWatch] = useState<WatchModel | null>(null);

  // Bespoke Atelier Configurator State
  const [configWatchId, setConfigWatchId] = useState<string>(WATCH_COLLECTION[0].id);
  const [configCase, setConfigCase] = useState<CaseMaterialId>(WATCH_COLLECTION[0].defaultCase);
  const [configDial, setConfigDial] = useState<DialToneId>(WATCH_COLLECTION[0].defaultDial);
  const [configStrap, setConfigStrap] = useState<StrapTypeId>(WATCH_COLLECTION[0].defaultStrap);
  const [engraving, setEngraving] = useState('');

  // Acquisition Bag State
  const [bagItems, setBagItems] = useState<BagLineItem[]>([]);
  const [isBagOpen, setIsBagOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const activeConfigWatch = useMemo(
    () => WATCH_COLLECTION.find((w) => w.id === configWatchId) ?? WATCH_COLLECTION[0],
    [configWatchId]
  );

  const configuredPrice =
    activeConfigWatch.basePrice +
    CASE_MATERIALS[configCase].delta +
    STRAP_OPTIONS[configStrap].delta;

  const filteredWatches = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const list = WATCH_COLLECTION.filter((watch) => {
      if (selectedCategory !== 'All' && watch.category !== selectedCategory) {
        return false;
      }
      if (showSavedOnly && !savedIds.includes(watch.id)) {
        return false;
      }
      if (!query) return true;
      return (
        watch.name.toLowerCase().includes(query) ||
        watch.reference.toLowerCase().includes(query) ||
        watch.category.toLowerCase().includes(query) ||
        watch.specs.calibre.toLowerCase().includes(query) ||
        watch.subtitle.toLowerCase().includes(query)
      );
    });

    if (sortOrder === 'price-asc') {
      return [...list].sort((a, b) => a.basePrice - b.basePrice);
    }
    if (sortOrder === 'price-desc') {
      return [...list].sort((a, b) => b.basePrice - a.basePrice);
    }
    return list;
  }, [selectedCategory, searchQuery, sortOrder, showSavedOnly, savedIds]);

  const compareWatches = useMemo(
    () => WATCH_COLLECTION.filter((w) => compareIds.includes(w.id)),
    [compareIds]
  );

  const totalBagCount = bagItems.reduce((sum, item) => sum + item.qty, 0);

  const toggleSaved = (id: string) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 3) {
        return [...prev.slice(1), id];
      }
      return [...prev, id];
    });
  };

  const loadWatchInConfigurator = (watch: WatchModel) => {
    setConfigWatchId(watch.id);
    setConfigCase(watch.defaultCase);
    setConfigDial(watch.defaultDial);
    setConfigStrap(watch.defaultStrap);
    const el = document.getElementById('configurator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToBag = (payload: BagPayload) => {
    const cleanEngraving = payload.engraving.trim().toUpperCase().slice(0, 8);
    const key = [
      payload.watchId,
      payload.caseMaterial,
      payload.dialTone,
      payload.strapType,
      cleanEngraving,
    ].join('|');

    setBagItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [
        ...prev,
        {
          key,
          watchId: payload.watchId,
          reference: payload.reference,
          name: payload.name,
          image: payload.image,
          caseMaterial: payload.caseMaterial,
          dialTone: payload.dialTone,
          strapType: payload.strapType,
          engraving: cleanEngraving,
          unitPrice: payload.unitPrice,
          qty: 1,
        },
      ];
    });
    setIsBagOpen(true);
  };

  const handleUpdateBagQty = (key: string, delta: number) => {
    setBagItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, qty: item.qty + delta } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemoveBagItem = (key: string) => {
    setBagItems((prev) => prev.filter((item) => item.key !== key));
  };

  return (
    <>
      {/* TOP BAR CONTRACT: Strictly 3 zones separated by gap-8 */}
      <header className="site-header">
        <div className="container header-inner">
          <a href="#hero" className="brand-wordmark">
            Master
          </a>

          <nav className="header-nav" aria-label="Primary navigation">
            <a href="#collection" className="nav-link">
              Collection
            </a>
            <a href="#configurator" className="nav-link">
              Configurator
            </a>
            <a href="#atelier" className="nav-link">
              Atelier
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
          </nav>

          <div className="header-action-zone">
            <button
              type="button"
              className="header-bag-btn"
              aria-label={`Open acquisition bag (${totalBagCount} items)`}
              onClick={() => setIsBagOpen(true)}
            >
              <ShoppingBag size={16} strokeWidth={1.75} aria-hidden="true" />
              <span>Bag</span>
              <span className="mono tabular-nums">({totalBagCount})</span>
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* SECTION 1: STOREFRONT HERO SPLIT + 4-COLUMN HOROLOGICAL BENCHMARK STRIP */}
        <section id="hero" className="hero-section">
          <div className="container">
            <div className="hero-split">
              <div className="hero-copy-col">
                <div>
                  <p className="hero-kicker">Geneva · Mechanical Horology</p>
                  <h1 className="hero-title">
                    Time, Distilled to Steel and Brass.
                  </h1>
                  <p className="hero-lead">
                    Independent mechanical watches assembled in small numbered batches. Engineered with twin-barrel 72-hour calibres, hand-chamfered bridges, and architectural dials proportioned for lifelong wear.
                  </p>

                  <div className="hero-actions">
                    <a href="#collection" className="btn btn-primary">
                      Explore Collection
                      <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
                    </a>
                    <a href="#configurator" className="btn btn-ghost">
                      Configure a Piece
                    </a>
                  </div>
                </div>

                <div className="hero-utility-row">
                  <span className="hero-utility-note">
                    Six signature references · Insured armored delivery
                  </span>
                  <button
                    type="button"
                    className="theme-switch-btn"
                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                    aria-label="Switch atelier lighting theme"
                  >
                    {theme === 'light' ? (
                      <>
                        <Moon size={14} strokeWidth={1.75} aria-hidden="true" />
                        <span>Night Dial View</span>
                      </>
                    ) : (
                      <>
                        <Sun size={14} strokeWidth={1.75} aria-hidden="true" />
                        <span>Daylight View</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="hero-media-col">
                <WatchImage
                  src={HERO_CAMPAIGN_IMAGE.src}
                  alt={HERO_CAMPAIGN_IMAGE.alt}
                  className="hero-media-img"
                  fallbackLabel="Master Chronographe 01"
                />
                <div className="hero-media-caption">
                  <div>
                    <div className="hero-caption-title">Master Chronographe 01</div>
                    <div className="hero-caption-meta">
                      Ref. M01.40 · Calibre M-01 · 40 mm Brushed Steel
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => setInspectedWatch(WATCH_COLLECTION[0])}
                  >
                    Inspect
                  </button>
                </div>
              </div>
            </div>

            <div className="hero-benchmark-strip" aria-label="Horological specifications">
              {HERO_BENCHMARKS.map((item) => (
                <div key={item.label} className="benchmark-item">
                  <span className="benchmark-value tabular-nums">{item.value}</span>
                  <span className="benchmark-label">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: FILTERABLE WATCH COLLECTION GRID */}
        <section id="collection" className="section-block">
          <div className="container">
            <div className="section-header-row">
              <div>
                <p className="section-kicker">Current Manufacture Lineup</p>
                <h2 className="section-title">The Watch Collection</h2>
                <p className="section-lead">
                  Filter by complication, search by calibre or case size, bookmark favourites, or select up to three references to compare specifications side by side.
                </p>
              </div>
            </div>

            <div className="collection-toolbar">
              <div className="category-tabs" role="tablist" aria-label="Filter watches by category">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={selectedCategory === category}
                    className={`category-tab${selectedCategory === category ? ' is-active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category === 'All' ? 'All Pieces' : category}
                  </button>
                ))}
              </div>

              <div className="toolbar-controls">
                <div className="search-box">
                  <Search size={15} strokeWidth={1.75} className="search-icon" aria-hidden="true" />
                  <input
                    type="search"
                    className="search-input"
                    placeholder="Search model, ref, calibre..."
                    aria-label="Search watches"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <select
                  className="sort-select"
                  aria-label="Sort watches"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>

                <button
                  type="button"
                  className={`saved-filter-btn${showSavedOnly ? ' is-active' : ''}`}
                  aria-pressed={showSavedOnly}
                  onClick={() => setShowSavedOnly((prev) => !prev)}
                >
                  <Bookmark size={14} strokeWidth={1.75} aria-hidden="true" />
                  <span>Saved</span>
                  <span className="mono tabular-nums">({savedIds.length})</span>
                </button>
              </div>
            </div>

            {filteredWatches.length === 0 ? (
              <div className="empty-catalog-state">
                <p>
                  No timepieces match the current filter criteria. Clear your search or category selection to view all six Master references.
                </p>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setShowSavedOnly(false);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="watch-grid">
                {filteredWatches.map((watch) => {
                  const isSaved = savedIds.includes(watch.id);
                  const isCompared = compareIds.includes(watch.id);
                  return (
                    <article key={watch.id} className="watch-card">
                      <div
                        className="watch-card-media"
                        onClick={() => setInspectedWatch(watch)}
                      >
                        <WatchImage
                          src={watch.image}
                          alt={watch.imageAlt}
                          className="watch-card-img"
                          fallbackLabel={watch.name}
                        />
                      </div>

                      <div className="watch-card-body">
                        <div className="meta-line">
                          <span>{watch.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{watch.specs.diameter}</span>
                          <span aria-hidden="true">·</span>
                          <span>{CASE_MATERIALS[watch.defaultCase].shortLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{watch.availability}</span>
                        </div>

                        <div className="watch-card-title-row">
                          <h3
                            className="watch-card-name"
                            onClick={() => setInspectedWatch(watch)}
                          >
                            {watch.name}
                          </h3>
                          <span className="watch-card-price tabular-nums">
                            ${watch.basePrice.toLocaleString()}
                          </span>
                        </div>

                        <p className="watch-card-subtitle">{watch.subtitle}</p>

                        <div className="watch-card-specs-line">
                          <span className="mono">{watch.reference}</span>
                          <span aria-hidden="true">·</span>
                          <span>{watch.specs.calibre}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{watch.specs.powerReserve}</span>
                        </div>

                        <div className="watch-card-actions">
                          <div className="card-primary-actions">
                            <button
                              type="button"
                              className="btn btn-primary btn-sm"
                              onClick={() => setInspectedWatch(watch)}
                            >
                              Inspect
                            </button>
                            <button
                              type="button"
                              className="btn btn-ghost btn-sm"
                              onClick={() => loadWatchInConfigurator(watch)}
                            >
                              <SlidersHorizontal size={14} strokeWidth={1.75} aria-hidden="true" />
                              <span>Configure</span>
                            </button>
                          </div>

                          <div className="card-utility-actions">
                            <button
                              type="button"
                              className={`card-icon-toggle${isCompared ? ' is-active' : ''}`}
                              aria-label={
                                isCompared
                                  ? `Remove ${watch.name} from comparison`
                                  : `Compare ${watch.name}`
                              }
                              title="Compare specifications"
                              aria-pressed={isCompared}
                              onClick={() => toggleCompare(watch.id)}
                            >
                              <Scale size={16} strokeWidth={1.75} aria-hidden="true" />
                            </button>

                            <button
                              type="button"
                              className={`card-icon-toggle${isSaved ? ' is-active' : ''}`}
                              aria-label={
                                isSaved
                                  ? `Remove ${watch.name} from saved`
                                  : `Save ${watch.name}`
                              }
                              title="Save timepiece"
                              aria-pressed={isSaved}
                              onClick={() => toggleSaved(watch.id)}
                            >
                              <Bookmark
                                size={16}
                                strokeWidth={1.75}
                                fill={isSaved ? 'currentColor' : 'none'}
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* SECTION 3: BESPOKE ATELIER CONFIGURATOR */}
        <section id="configurator" className="section-block configurator-section">
          <div className="container">
            <div className="section-header-row">
              <div>
                <p className="section-kicker">Bespoke Commissioning</p>
                <h2 className="section-title">Atelier Timepiece Configurator</h2>
                <p className="section-lead">
                  Select a reference, pair your preferred case alloy and strap architecture, and add complimentary caseback initials before dispatch.
                </p>
              </div>
            </div>

            <div className="configurator-model-strip" role="tablist" aria-label="Choose watch reference to configure">
              {WATCH_COLLECTION.map((watch) => (
                <button
                  key={watch.id}
                  type="button"
                  role="tab"
                  aria-selected={configWatchId === watch.id}
                  className={`model-select-tab${configWatchId === watch.id ? ' is-active' : ''}`}
                  onClick={() => loadWatchInConfigurator(watch)}
                >
                  {watch.name}
                </button>
              ))}
            </div>

            <div className="configurator-split">
              <div className="configurator-preview-col">
                <ConfiguredWatchStage
                  watch={activeConfigWatch}
                  caseMaterial={configCase}
                  dialTone={configDial}
                  strapType={configStrap}
                  engraving={engraving}
                />
                <div className="configurator-caption-bar">
                  <span>{CASE_MATERIALS[configCase].finishNote}</span>
                  <span className="mono tabular-nums">{activeConfigWatch.specs.diameter}</span>
                </div>
              </div>

              <div className="configurator-panel">
                <div className="meta-line">
                  <span>{activeConfigWatch.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="mono">{activeConfigWatch.reference}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeConfigWatch.availability}</span>
                </div>

                <div className="configurator-title-row">
                  <h3 className="configurator-title">{activeConfigWatch.name}</h3>
                  <span className="configurator-price tabular-nums">
                    ${configuredPrice.toLocaleString()}
                  </span>
                </div>

                <div className="config-group">
                  <div className="config-label">
                    <span>Case Material</span>
                    <span>{CASE_MATERIALS[configCase].label}</span>
                  </div>
                  <div className="option-row">
                    {(Object.keys(CASE_MATERIALS) as CaseMaterialId[]).map((id) => {
                      const item = CASE_MATERIALS[id];
                      return (
                        <button
                          key={id}
                          type="button"
                          className={`choice-btn${configCase === id ? ' is-active' : ''}`}
                          onClick={() => setConfigCase(id)}
                        >
                          <span
                            className="metal-chip"
                            style={{ background: item.swatch }}
                            aria-hidden="true"
                          />
                          <span>
                            {item.shortLabel}
                            {item.delta > 0 ? ` (+$${item.delta.toLocaleString()})` : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="config-group">
                  <div className="config-label">
                    <span>Dial Finish</span>
                    <span>{DIAL_TONES[configDial].label}</span>
                  </div>
                  <div className="option-row">
                    {(Object.keys(DIAL_TONES) as DialToneId[]).map((id) => {
                      const item = DIAL_TONES[id];
                      return (
                        <button
                          key={id}
                          type="button"
                          className={`choice-btn${configDial === id ? ' is-active' : ''}`}
                          onClick={() => setConfigDial(id)}
                        >
                          <span
                            className="metal-chip"
                            style={{ background: item.swatch }}
                            aria-hidden="true"
                          />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="config-group">
                  <div className="config-label">
                    <span>Strap &amp; Bracelet</span>
                    <span>{STRAP_OPTIONS[configStrap].label}</span>
                  </div>
                  <div className="option-row">
                    {(Object.keys(STRAP_OPTIONS) as StrapTypeId[]).map((id) => {
                      const item = STRAP_OPTIONS[id];
                      return (
                        <button
                          key={id}
                          type="button"
                          className={`choice-btn${configStrap === id ? ' is-active' : ''}`}
                          onClick={() => setConfigStrap(id)}
                        >
                          <span>
                            {item.shortLabel}
                            {item.delta > 0 ? ` (+$${item.delta})` : ''}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="config-group">
                  <label htmlFor="caseback-engraving" className="config-label">
                    <span>Complimentary Caseback Engraving</span>
                    <span className="mono tabular-nums">{engraving.length}/8 chars</span>
                  </label>
                  <input
                    id="caseback-engraving"
                    type="text"
                    maxLength={8}
                    className="engraving-input"
                    placeholder="OPTIONAL INITIALS (E.G. M.V. 26)"
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value)}
                  />
                </div>

                <div className="spec-table">
                  <div className="spec-row">
                    <span className="spec-key">Movement</span>
                    <span className="spec-val">{activeConfigWatch.specs.calibre}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Power Reserve</span>
                    <span className="spec-val tabular-nums">
                      {activeConfigWatch.specs.powerReserve}
                    </span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Water Resistance</span>
                    <span className="spec-val tabular-nums">
                      {activeConfigWatch.specs.waterResistance}
                    </span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-key">Crystal</span>
                    <span className="spec-val">{activeConfigWatch.specs.crystal}</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-full"
                  onClick={() =>
                    handleAddToBag({
                      watchId: activeConfigWatch.id,
                      reference: activeConfigWatch.reference,
                      name: activeConfigWatch.name,
                      image: resolveConfiguredWatchImage(
                        activeConfigWatch,
                        configCase,
                        configDial,
                        configStrap
                      ),
                      caseMaterial: configCase,
                      dialTone: configDial,
                      strapType: configStrap,
                      engraving,
                      unitPrice: configuredPrice,
                    })
                  }
                >
                  Add Configured Piece to Bag — ${configuredPrice.toLocaleString()}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: MANUFACTURE & CALIBRE CRAFTSMANSHIP */}
        <section id="atelier" className="section-block">
          <div className="container">
            <div className="atelier-split">
              <div className="atelier-media-col">
                <WatchImage
                  src={CRAFT_MOVEMENT_IMAGE.src}
                  alt={CRAFT_MOVEMENT_IMAGE.alt}
                  className="atelier-img"
                  fallbackLabel="Master Calibre M-01 Movement"
                />
              </div>

              <div className="atelier-copy-col">
                <p className="section-kicker">Manufacture Philosophy</p>
                <h2 className="section-title">
                  Built for Generations, Regulated to the Second.
                </h2>
                <p className="section-lead">
                  Behind every Master dial sits an in-house mechanical movement finished by hand in Geneva and pressure-tested prior to dispatch.
                </p>

                <div className="pillar-list">
                  {ATELIER_PILLARS.map((pillar) => (
                    <div key={pillar.index} className="pillar-item">
                      <h3 className="pillar-heading">
                        <span className="pillar-index">{pillar.index}</span>
                        {pillar.title}
                      </h3>
                      <p className="pillar-detail">{pillar.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="atelier-video-showcase">
              <div className="atelier-video-header">
                <div>
                  <p className="section-kicker">Atelier Film</p>
                  <h3 className="atelier-video-heading">
                    Hand-Assembly &amp; High-Finish Process
                  </h3>
                </div>
                <p className="atelier-video-caption">
                  Inside the Geneva bench: watchmakers seating Geneva-striped bridges, mirror-polishing bevels with boxwood, aligning chronograph hands, and sealing each finished calibre in steel.
                </p>
              </div>

              <MovementVideoPlaceholder />
            </div>
          </div>
        </section>
      </main>

      <footer id="contact" className="site-footer">
        <div className="container footer-inner">
          <span className="footer-brand">Master</span>
          <span>Geneva · Independent Mechanical Horology</span>
          <a
            href="https://www.linkedin.com/in/moiz-ahmed-82a507279/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-link"
          >
            <span>Contact · LinkedIn</span>
            <ArrowUpRight size={14} strokeWidth={1.75} aria-hidden="true" />
          </a>
          <span>© 2026 Master</span>
        </div>
      </footer>

      {/* FLOATING COMPARE TRAY (ONLY VISIBLE WHEN USER SELECTS WATCHES TO COMPARE) */}
      {compareWatches.length > 0 && (
        <div className="compare-bar" role="region" aria-label="Watch comparison selection">
          <span className="compare-bar-info tabular-nums">
            {compareWatches.length} {compareWatches.length === 1 ? 'watch' : 'watches'} selected for comparison
          </span>
          <div className="compare-bar-actions">
            <button
              type="button"
              className="compare-bar-btn"
              onClick={() => setIsCompareOpen(true)}
            >
              Compare Specs
            </button>
            <button
              type="button"
              className="compare-bar-clear"
              onClick={() => setCompareIds([])}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* TIMEPIECE DETAIL MODAL (PDP) */}
      <WatchDetailModal
        watch={inspectedWatch}
        onClose={() => setInspectedWatch(null)}
        onAddToBag={handleAddToBag}
        onLoadInConfigurator={loadWatchInConfigurator}
      />

      {/* SIDE-BY-SIDE COMPARISON MODAL */}
      <CompareModal
        watches={compareWatches}
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        onRemove={(id) => {
          setCompareIds((prev) => prev.filter((item) => item !== id));
          if (compareIds.length <= 1) {
            setIsCompareOpen(false);
          }
        }}
        onSelectWatch={(watch) => setInspectedWatch(watch)}
      />

      {/* SLIDE-OVER ACQUISITION BAG & CHECKOUT DRAWER */}
      <BagDrawer
        isOpen={isBagOpen}
        items={bagItems}
        onClose={() => setIsBagOpen(false)}
        onUpdateQty={handleUpdateBagQty}
        onRemoveItem={handleRemoveBagItem}
        onClearBag={() => setBagItems([])}
      />
    </>
  );
}
