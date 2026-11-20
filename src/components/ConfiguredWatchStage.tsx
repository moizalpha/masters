import { useState } from 'react';
import {
  CASE_MATERIALS,
  CaseMaterialId,
  DIAL_TONES,
  DialToneId,
  resolveConfiguredWatchImage,
  STRAP_OPTIONS,
  StrapTypeId,
  WatchModel,
} from '../data/watches';
import { WatchImage } from './WatchImage';

interface ConfiguredWatchStageProps {
  watch: WatchModel;
  caseMaterial: CaseMaterialId;
  dialTone: DialToneId;
  strapType: StrapTypeId;
  engraving?: string;
  compact?: boolean;
}

type StageMode = 'photo' | 'blueprint' | 'caseback';

const CASE_PALETTES: Record<
  CaseMaterialId,
  { outer: string; mid: string; highlight: string; dark: string; lugStroke: string }
> = {
  steel: {
    outer: '#9FA3A6',
    mid: '#D5D8DA',
    highlight: '#F3F4F5',
    dark: '#676B6F',
    lugStroke: '#4D5155',
  },
  titanium: {
    outer: '#6F7270',
    mid: '#979A96',
    highlight: '#C2C5C0',
    dark: '#474946',
    lugStroke: '#363836',
  },
  'rose-gold': {
    outer: '#B98759',
    mid: '#DFB387',
    highlight: '#F6DFC4',
    dark: '#7F5432',
    lugStroke: '#664123',
  },
};

const DIAL_PALETTES: Record<
  DialToneId,
  {
    bgStart: string;
    bgEnd: string;
    text: string;
    tick: string;
    subdialBg: string;
    subdialStroke: string;
    hand: string;
    secondHand: string;
  }
> = {
  champagne: {
    bgStart: '#EDE3CE',
    bgEnd: '#CDBE9E',
    text: '#2B2721',
    tick: '#3E3930',
    subdialBg: '#DFD2B7',
    subdialStroke: 'rgba(43, 39, 33, 0.25)',
    hand: '#2B2721',
    secondHand: '#8C6D3F',
  },
  obsidian: {
    bgStart: '#232220',
    bgEnd: '#111110',
    text: '#EDEAE2',
    tick: '#E2DDD2',
    subdialBg: '#191817',
    subdialStroke: 'rgba(237, 234, 226, 0.22)',
    hand: '#F5F2EB',
    secondHand: '#C2A26B',
  },
  forest: {
    bgStart: '#324839',
    bgEnd: '#1D2B22',
    text: '#EFECE3',
    tick: '#D8CEBA',
    subdialBg: '#25372B',
    subdialStroke: 'rgba(216, 206, 186, 0.25)',
    hand: '#EFECE3',
    secondHand: '#C8A76E',
  },
};

export function ConfiguredWatchStage({
  watch,
  caseMaterial,
  dialTone,
  strapType,
  engraving = '',
  compact = false,
}: ConfiguredWatchStageProps) {
  const [mode, setMode] = useState<StageMode>('photo');

  const caseColors = CASE_PALETTES[caseMaterial];
  const dialColors = DIAL_PALETTES[dialTone];
  const resolvedPhotoSrc = resolveConfiguredWatchImage(
    watch,
    caseMaterial,
    dialTone,
    strapType
  );

  const isChrono = watch.category === 'Chronograph';
  const isDiver = watch.category === 'Diver';
  const isDress = watch.category === 'Dress';
  const isGmt = watch.category === 'GMT';
  const isMoonphase = watch.id === 'lunaires-39';
  const isSkeleton = watch.id === 'squelette-41';

  const cleanEngraving = engraving.trim().toUpperCase();

  return (
    <div className={`configured-stage${compact ? ' is-compact' : ''}`}>
      <div className="configured-stage-topbar">
        <div className="stage-mode-tabs" role="tablist" aria-label="Timepiece view mode">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'photo'}
            className={`stage-mode-btn${mode === 'photo' ? ' is-active' : ''}`}
            onClick={() => setMode('photo')}
          >
            Studio Photo
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'blueprint'}
            className={`stage-mode-btn${mode === 'blueprint' ? ' is-active' : ''}`}
            onClick={() => setMode('blueprint')}
          >
            Dial Blueprint
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'caseback'}
            className={`stage-mode-btn${mode === 'caseback' ? ' is-active' : ''}`}
            onClick={() => setMode('caseback')}
          >
            Caseback
          </button>
        </div>

        <span className="stage-live-summary mono">
          {CASE_MATERIALS[caseMaterial].shortLabel} · {DIAL_TONES[dialTone].label} ·{' '}
          {STRAP_OPTIONS[strapType].shortLabel}
        </span>
      </div>

      {mode === 'photo' ? (
        <div className="configured-photo-wrap" data-case={caseMaterial} data-dial={dialTone} data-strap={strapType}>
          <WatchImage
            key={resolvedPhotoSrc}
            src={resolvedPhotoSrc}
            alt={`${watch.name} in ${CASE_MATERIALS[caseMaterial].label} with ${DIAL_TONES[dialTone].label} dial and ${STRAP_OPTIONS[strapType].label}`}
            className="configured-photo-img"
            fallbackLabel={watch.name}
            dataCase={caseMaterial}
          />
          <div className="configured-photo-tint" aria-hidden="true" />
        </div>
      ) : (
        <div className="configured-svg-wrap">
          <svg
            viewBox="0 0 360 440"
            className="configured-watch-svg"
            role="img"
            aria-label={`${watch.name} configured with ${CASE_MATERIALS[caseMaterial].label}, ${DIAL_TONES[dialTone].label}, and ${STRAP_OPTIONS[strapType].label}`}
          >
            <defs>
              <linearGradient id={`caseGrad-${watch.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={caseColors.highlight} />
                <stop offset="38%" stopColor={caseColors.mid} />
                <stop offset="72%" stopColor={caseColors.outer} />
                <stop offset="100%" stopColor={caseColors.dark} />
              </linearGradient>

              <linearGradient id={`bezelGrad-${watch.id}`} x1="15%" y1="0%" x2="85%" y2="100%">
                <stop offset="0%" stopColor={caseColors.highlight} />
                <stop offset="50%" stopColor={caseColors.outer} />
                <stop offset="100%" stopColor={caseColors.dark} />
              </linearGradient>

              <radialGradient id={`dialGrad-${watch.id}`} cx="42%" cy="38%" r="68%">
                <stop offset="0%" stopColor={dialColors.bgStart} />
                <stop offset="100%" stopColor={dialColors.bgEnd} />
              </radialGradient>

              <linearGradient id="calfskinGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2E2119" />
                <stop offset="50%" stopColor="#463327" />
                <stop offset="100%" stopColor="#261B14" />
              </linearGradient>

              <linearGradient id="alligatorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6A3B1E" />
                <stop offset="50%" stopColor="#94562E" />
                <stop offset="100%" stopColor="#5B3118" />
              </linearGradient>

              <linearGradient id={`chainOuter-${watch.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={caseColors.dark} />
                <stop offset="30%" stopColor={caseColors.mid} />
                <stop offset="70%" stopColor={caseColors.highlight} />
                <stop offset="100%" stopColor={caseColors.dark} />
              </linearGradient>

              <linearGradient id={`chainCenter-${watch.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={caseColors.outer} />
                <stop offset="50%" stopColor={caseColors.highlight} />
                <stop offset="100%" stopColor={caseColors.outer} />
              </linearGradient>

              <radialGradient id="caseShadow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(0,0,0,0.28)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>

            {/* Ground shadow */}
            <ellipse cx="180" cy="226" rx="118" ry="128" fill="url(#caseShadow)" />

            {/* STRAP / CHAIN RENDERING (TOP & BOTTOM) */}
            {strapType === 'bracelet' ? (
              <g aria-label="Integrated metal link bracelet">
                {[18, 42, 66, 90, 326, 350, 374, 398].map((yPos, idx) => (
                  <g key={yPos}>
                    <rect
                      x={136 + (idx < 4 ? (3 - idx) * 1.5 : (idx - 4) * 1.5)}
                      y={yPos}
                      width={88 - (idx < 4 ? (3 - idx) * 3 : (idx - 4) * 3)}
                      height="21"
                      rx="3"
                      fill={`url(#chainOuter-${watch.id})`}
                      stroke={caseColors.lugStroke}
                      strokeWidth="0.9"
                    />
                    <rect
                      x={162}
                      y={yPos + 1}
                      width="36"
                      height="19"
                      rx="2"
                      fill={`url(#chainCenter-${watch.id})`}
                      stroke={caseColors.lugStroke}
                      strokeWidth="0.7"
                    />
                  </g>
                ))}
              </g>
            ) : strapType === 'alligator' ? (
              <g aria-label="Hand-stitched alligator leather strap">
                <path
                  d="M142 20 L218 20 L224 125 L136 125 Z"
                  fill="url(#alligatorGrad)"
                  stroke="#3E200E"
                  strokeWidth="1.2"
                />
                <path
                  d="M136 315 L224 315 L218 420 L142 420 Z"
                  fill="url(#alligatorGrad)"
                  stroke="#3E200E"
                  strokeWidth="1.2"
                />
                {/* Alligator scale texture lines */}
                {[42, 64, 86, 108, 332, 354, 376, 398].map((yLine) => (
                  <path
                    key={yLine}
                    d={`M143 ${yLine} Q180 ${yLine + 4} 217 ${yLine}`}
                    stroke="rgba(45, 22, 10, 0.52)"
                    strokeWidth="1.4"
                    fill="none"
                  />
                ))}
                {/* Vertical scale dividers & ecru stitch */}
                <line x1="170" y1="24" x2="170" y2="118" stroke="rgba(45,22,10,0.4)" strokeWidth="1" />
                <line x1="190" y1="24" x2="190" y2="118" stroke="rgba(45,22,10,0.4)" strokeWidth="1" />
                <line x1="170" y1="322" x2="170" y2="416" stroke="rgba(45,22,10,0.4)" strokeWidth="1" />
                <line x1="190" y1="322" x2="190" y2="416" stroke="rgba(45,22,10,0.4)" strokeWidth="1" />
                <line
                  x1="148"
                  y1="26"
                  x2="144"
                  y2="118"
                  stroke="#E8DCC8"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <line
                  x1="212"
                  y1="26"
                  x2="216"
                  y2="118"
                  stroke="#E8DCC8"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <line
                  x1="144"
                  y1="322"
                  x2="148"
                  y2="414"
                  stroke="#E8DCC8"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <line
                  x1="216"
                  y1="322"
                  x2="212"
                  y2="414"
                  stroke="#E8DCC8"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
              </g>
            ) : (
              <g aria-label="Espresso calfskin leather strap">
                <path
                  d="M142 20 L218 20 L224 125 L136 125 Z"
                  fill="url(#calfskinGrad)"
                  stroke="#1C140F"
                  strokeWidth="1.2"
                />
                <path
                  d="M136 315 L224 315 L218 420 L142 420 Z"
                  fill="url(#calfskinGrad)"
                  stroke="#1C140F"
                  strokeWidth="1.2"
                />
                <line
                  x1="148"
                  y1="26"
                  x2="144"
                  y2="118"
                  stroke="#8C745D"
                  strokeWidth="1.1"
                  strokeDasharray="3 4"
                />
                <line
                  x1="212"
                  y1="26"
                  x2="216"
                  y2="118"
                  stroke="#8C745D"
                  strokeWidth="1.1"
                  strokeDasharray="3 4"
                />
                <line
                  x1="144"
                  y1="322"
                  x2="148"
                  y2="414"
                  stroke="#8C745D"
                  strokeWidth="1.1"
                  strokeDasharray="3 4"
                />
                <line
                  x1="216"
                  y1="322"
                  x2="212"
                  y2="414"
                  stroke="#8C745D"
                  strokeWidth="1.1"
                  strokeDasharray="3 4"
                />
              </g>
            )}

            {/* LUGS */}
            <path
              d="M126 105 L140 105 L144 148 L112 162 Z"
              fill={`url(#caseGrad-${watch.id})`}
              stroke={caseColors.lugStroke}
              strokeWidth="1"
            />
            <path
              d="M234 105 L220 105 L216 148 L248 162 Z"
              fill={`url(#caseGrad-${watch.id})`}
              stroke={caseColors.lugStroke}
              strokeWidth="1"
            />
            <path
              d="M112 278 L144 292 L140 335 L126 335 Z"
              fill={`url(#caseGrad-${watch.id})`}
              stroke={caseColors.lugStroke}
              strokeWidth="1"
            />
            <path
              d="M248 278 L216 292 L220 335 L234 335 Z"
              fill={`url(#caseGrad-${watch.id})`}
              stroke={caseColors.lugStroke}
              strokeWidth="1"
            />

            {/* CROWN & CHRONOGRAPH PUSHERS */}
            <rect
              x="281"
              y="207"
              width="14"
              height="26"
              rx="3"
              fill={`url(#caseGrad-${watch.id})`}
              stroke={caseColors.lugStroke}
              strokeWidth="1"
            />
            {[212, 217, 222, 227].map((ry) => (
              <line
                key={ry}
                x1="284"
                y1={ry}
                x2="294"
                y2={ry}
                stroke={caseColors.lugStroke}
                strokeWidth="0.9"
              />
            ))}
            {isChrono && (
              <>
                <rect
                  x="266"
                  y="153"
                  width="14"
                  height="11"
                  rx="2"
                  transform="rotate(-24 273 158)"
                  fill={`url(#caseGrad-${watch.id})`}
                  stroke={caseColors.lugStroke}
                  strokeWidth="1"
                />
                <rect
                  x="266"
                  y="276"
                  width="14"
                  height="11"
                  rx="2"
                  transform="rotate(24 273 281)"
                  fill={`url(#caseGrad-${watch.id})`}
                  stroke={caseColors.lugStroke}
                  strokeWidth="1"
                />
              </>
            )}

            {/* MAIN CASE & BEZEL */}
            <circle
              cx="180"
              cy="220"
              r="106"
              fill={`url(#caseGrad-${watch.id})`}
              stroke={caseColors.lugStroke}
              strokeWidth="1.4"
            />

            {mode === 'caseback' ? (
              /* EXHIBITION SAPPHIRE CASEBACK WITH CUSTOM ENGRAVING */
              <g aria-label="Sapphire exhibition caseback">
                <circle
                  cx="180"
                  cy="220"
                  r="95"
                  fill={`url(#bezelGrad-${watch.id})`}
                  stroke={caseColors.lugStroke}
                  strokeWidth="1"
                />
                <circle cx="180" cy="220" r="76" fill="#1C1C1B" stroke={caseColors.dark} strokeWidth="2" />
                {/* Geneva-striped movement plates */}
                <circle cx="180" cy="220" r="72" fill="#2A2B2D" />
                {[-48, -32, -16, 0, 16, 32, 48].map((offset) => (
                  <line
                    key={offset}
                    x1={115}
                    y1={220 + offset}
                    x2={245}
                    y2={220 + offset}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="6"
                  />
                ))}
                {/* Balance wheel */}
                <circle cx="152" cy="252" r="19" fill="none" stroke="#D5B278" strokeWidth="3" />
                <circle cx="152" cy="252" r="3" fill="#B22E4B" />
                {/* Gold oscillating rotor */}
                <path
                  d="M180 220 L248 205 A70 70 0 0 1 190 289 Z"
                  fill="rgba(205, 171, 108, 0.85)"
                  stroke="#7F5F2F"
                  strokeWidth="1"
                />
                <circle cx="180" cy="220" r="11" fill={caseColors.mid} stroke={caseColors.lugStroke} />
                <circle cx="180" cy="220" r="4" fill="#2B5EA8" />

                {/* Caseback Text & Custom Engraving */}
                <text
                  x="180"
                  y="137"
                  textAnchor="middle"
                  fill={caseColors.lugStroke}
                  fontSize="7.5"
                  fontFamily="DM Mono, monospace"
                  letterSpacing="1.6"
                >
                  MASTER GENEVE · {watch.specs.waterResistance.toUpperCase()}
                </text>
                <text
                  x="180"
                  y="309"
                  textAnchor="middle"
                  fill={cleanEngraving ? '#141413' : caseColors.lugStroke}
                  fontSize="8.5"
                  fontWeight="700"
                  fontFamily="DM Mono, monospace"
                  letterSpacing="2.2"
                >
                  {cleanEngraving ? `ENGRAVED: ${cleanEngraving}` : watch.reference.toUpperCase()}
                </text>
              </g>
            ) : (
              /* FRONT DIAL VIEW */
              <g>
                {/* Specialized Bezel for Diver or GMT */}
                {isDiver ? (
                  <g>
                    <circle
                      cx="180"
                      cy="220"
                      r="98"
                      fill="#20201F"
                      stroke={caseColors.lugStroke}
                      strokeWidth="1.2"
                    />
                    <polygon points="180,126 175,135 185,135" fill="#EDEAE2" />
                    <text x="229" y="148" fill="#EDEAE2" fontSize="9.5" fontFamily="DM Mono, monospace" textAnchor="middle">
                      10
                    </text>
                    <text x="266" y="223" fill="#EDEAE2" fontSize="9.5" fontFamily="DM Mono, monospace" textAnchor="middle">
                      20
                    </text>
                    <text x="180" y="313" fill="#EDEAE2" fontSize="9.5" fontFamily="DM Mono, monospace" textAnchor="middle">
                      30
                    </text>
                    <text x="94" y="223" fill="#EDEAE2" fontSize="9.5" fontFamily="DM Mono, monospace" textAnchor="middle">
                      40
                    </text>
                    <text x="131" y="148" fill="#EDEAE2" fontSize="9.5" fontFamily="DM Mono, monospace" textAnchor="middle">
                      50
                    </text>
                  </g>
                ) : isGmt ? (
                  <g>
                    <circle
                      cx="180"
                      cy="220"
                      r="98"
                      fill={`url(#bezelGrad-${watch.id})`}
                      stroke={caseColors.lugStroke}
                      strokeWidth="1.2"
                    />
                    {['24', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22'].map(
                      (hr, i) => {
                        const angle = (i * 30 - 90) * (Math.PI / 180);
                        const tx = 180 + Math.cos(angle) * 89;
                        const ty = 220 + Math.sin(angle) * 89 + 3;
                        return (
                          <text
                            key={hr}
                            x={tx}
                            y={ty}
                            textAnchor="middle"
                            fontSize="8"
                            fontFamily="DM Mono, monospace"
                            fill={caseColors.lugStroke}
                          >
                            {hr}
                          </text>
                        );
                      }
                    )}
                  </g>
                ) : (
                  <circle
                    cx="180"
                    cy="220"
                    r="96"
                    fill={`url(#bezelGrad-${watch.id})`}
                    stroke={caseColors.lugStroke}
                    strokeWidth="1"
                  />
                )}

                {/* DIAL FACE */}
                <circle
                  cx="180"
                  cy="220"
                  r="82"
                  fill={`url(#dialGrad-${watch.id})`}
                  stroke={caseColors.dark}
                  strokeWidth="1.4"
                />

                {/* Skeleton Bridges if Squelette */}
                {isSkeleton && (
                  <g opacity="0.82">
                    <circle cx="180" cy="220" r="68" fill="#1B1C1E" />
                    <circle cx="155" cy="198" r="22" fill="none" stroke="#C59A6B" strokeWidth="4" />
                    <circle cx="205" cy="240" r="18" fill="none" stroke="#C59A6B" strokeWidth="3.5" />
                    <line x1="120" y1="185" x2="240" y2="255" stroke="#6F7378" strokeWidth="7" strokeLinecap="round" />
                    <line x1="230" y1="175" x2="132" y2="262" stroke="#595D62" strokeWidth="6" strokeLinecap="round" />
                    <circle cx="155" cy="198" r="4" fill="#B22E4B" />
                    <circle cx="205" cy="240" r="3.5" fill="#B22E4B" />
                  </g>
                )}

                {/* Minute Track & Hour Indices */}
                {Array.from({ length: 60 }).map((_, i) => {
                  const angle = (i * 6 - 90) * (Math.PI / 180);
                  const isHour = i % 5 === 0;
                  const r1 = isHour ? 67 : 74;
                  const r2 = 77;
                  return (
                    <line
                      key={i}
                      x1={180 + Math.cos(angle) * r1}
                      y1={220 + Math.sin(angle) * r1}
                      x2={180 + Math.cos(angle) * r2}
                      y2={220 + Math.sin(angle) * r2}
                      stroke={isHour ? caseColors.highlight : dialColors.tick}
                      strokeWidth={isHour ? (isDress ? '2.2' : '3') : '0.8'}
                      strokeLinecap="round"
                    />
                  );
                })}

                {/* Brand Wordmark */}
                <text
                  x="180"
                  y="177"
                  textAnchor="middle"
                  fill={dialColors.text}
                  fontSize="9"
                  fontWeight="600"
                  fontFamily="Cormorant Garamond, Georgia, serif"
                  letterSpacing="2.2"
                >
                  MASTER
                </text>
                <text
                  x="180"
                  y="186"
                  textAnchor="middle"
                  fill={dialColors.text}
                  opacity="0.7"
                  fontSize="5.2"
                  fontFamily="DM Mono, monospace"
                  letterSpacing="1"
                >
                  GENEVE
                </text>

                {/* Complication Subdials */}
                {isChrono && (
                  <g>
                    <circle
                      cx="148"
                      cy="220"
                      r="17"
                      fill={dialColors.subdialBg}
                      stroke={dialColors.subdialStroke}
                      strokeWidth="1"
                    />
                    <line x1="148" y1="220" x2="148" y2="207" stroke={dialColors.hand} strokeWidth="1.2" />
                    <circle
                      cx="212"
                      cy="220"
                      r="17"
                      fill={dialColors.subdialBg}
                      stroke={dialColors.subdialStroke}
                      strokeWidth="1"
                    />
                    <line x1="212" y1="220" x2="220" y2="211" stroke={dialColors.hand} strokeWidth="1.2" />
                    <circle
                      cx="180"
                      cy="254"
                      r="16"
                      fill={dialColors.subdialBg}
                      stroke={dialColors.subdialStroke}
                      strokeWidth="1"
                    />
                    <line x1="180" y1="254" x2="180" y2="241" stroke={dialColors.secondHand} strokeWidth="1.2" />
                  </g>
                )}

                {isDress && (
                  <g>
                    <circle
                      cx="180"
                      cy="256"
                      r="16"
                      fill={dialColors.subdialBg}
                      stroke={dialColors.subdialStroke}
                      strokeWidth="1"
                    />
                    <line x1="180" y1="256" x2="186" y2="245" stroke={dialColors.hand} strokeWidth="1.2" />
                  </g>
                )}

                {isMoonphase && (
                  <g>
                    <circle
                      cx="180"
                      cy="255"
                      r="18"
                      fill="#1B2A49"
                      stroke={caseColors.highlight}
                      strokeWidth="1.2"
                    />
                    <circle cx="176" cy="252" r="6" fill="#DDBA6E" />
                    <circle cx="190" cy="249" r="1" fill="#F2EFE9" />
                    <circle cx="187" cy="259" r="0.9" fill="#F2EFE9" />
                  </g>
                )}

                {/* GMT Hand */}
                {isGmt && (
                  <g transform="rotate(215 180 220)">
                    <line x1="180" y1="220" x2="180" y2="155" stroke="#D1A963" strokeWidth="2" />
                    <polygon points="180,147 175,157 185,157" fill="#D1A963" />
                  </g>
                )}

                {/* Hour Hand (10:10 iconic horological pose) */}
                <g transform="rotate(-60 180 220)">
                  <polygon
                    points="177,225 178,174 180,168 182,174 183,225"
                    fill={dialColors.hand}
                  />
                </g>

                {/* Minute Hand */}
                <g transform="rotate(58 180 220)">
                  <polygon
                    points="177.5,225 178.5,156 180,149 181.5,156 182.5,225"
                    fill={dialColors.hand}
                  />
                </g>

                {/* Sweep Seconds Hand */}
                <line
                  x1="180"
                  y1="234"
                  x2="180"
                  y2="146"
                  stroke={dialColors.secondHand}
                  strokeWidth="1.3"
                  transform="rotate(142 180 220)"
                />

                {/* Center Cap */}
                <circle cx="180" cy="220" r="4.2" fill={caseColors.highlight} stroke={dialColors.hand} strokeWidth="1" />
              </g>
            )}
          </svg>
        </div>
      )}
    </div>
  );
}
