import { useEffect, useState } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
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
import { ConfiguredWatchStage } from './ConfiguredWatchStage';

export interface BagPayload {
  watchId: string;
  reference: string;
  name: string;
  image: string;
  caseMaterial: CaseMaterialId;
  dialTone: DialToneId;
  strapType: StrapTypeId;
  engraving: string;
  unitPrice: number;
}

interface WatchDetailModalProps {
  watch: WatchModel | null;
  onClose: () => void;
  onAddToBag: (payload: BagPayload) => void;
  onLoadInConfigurator: (watch: WatchModel) => void;
}

export function WatchDetailModal({
  watch,
  onClose,
  onAddToBag,
  onLoadInConfigurator,
}: WatchDetailModalProps) {
  const [caseMat, setCaseMat] = useState<CaseMaterialId>('steel');
  const [dialTone, setDialTone] = useState<DialToneId>('champagne');
  const [strapType, setStrapType] = useState<StrapTypeId>('calfskin');

  useEffect(() => {
    if (watch) {
      setCaseMat(watch.defaultCase);
      setDialTone(watch.defaultDial);
      setStrapType(watch.defaultStrap);
    }
  }, [watch]);

  useEffect(() => {
    if (!watch) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [watch, onClose]);

  if (!watch) return null;

  const computedPrice =
    watch.basePrice +
    CASE_MATERIALS[caseMat].delta +
    STRAP_OPTIONS[strapType].delta;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
      >
        <button
          type="button"
          className="modal-close-btn"
          aria-label="Close timepiece details"
          onClick={onClose}
        >
          <X size={18} strokeWidth={1.75} aria-hidden="true" />
        </button>

        <div className="detail-modal-grid">
          <div className="detail-media-col">
            <ConfiguredWatchStage
              watch={watch}
              caseMaterial={caseMat}
              dialTone={dialTone}
              strapType={strapType}
              compact
            />

            <div className="detail-highlights">
              <h4 className="detail-subhead">Horological Highlights</h4>
              <ul className="highlight-list">
                {watch.highlights.map((item) => (
                  <li key={item} className="highlight-item">
                    <Check size={15} strokeWidth={2} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="detail-info-col">
            <div className="meta-line">
              <span>{watch.category}</span>
              <span aria-hidden="true">·</span>
              <span className="mono">{watch.reference}</span>
              <span aria-hidden="true">·</span>
              <span>{watch.availability}</span>
            </div>

            <h2 id="detail-modal-title" className="detail-title">
              {watch.name}
            </h2>
            <p className="detail-subtitle">{watch.subtitle}</p>
            <p className="detail-price tabular-nums">
              ${computedPrice.toLocaleString()}
            </p>
            <p className="detail-description">{watch.description}</p>

            <div className="detail-selectors">
              <div className="config-group-compact">
                <span className="config-label">Case Alloy</span>
                <div className="option-row">
                  {(Object.keys(CASE_MATERIALS) as CaseMaterialId[]).map((id) => {
                    const item = CASE_MATERIALS[id];
                    return (
                      <button
                        key={id}
                        type="button"
                        className={`choice-btn${caseMat === id ? ' is-active' : ''}`}
                        onClick={() => setCaseMat(id)}
                      >
                        <span
                          className="metal-chip"
                          style={{ background: item.swatch }}
                          aria-hidden="true"
                        />
                        <span>{item.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="config-group-compact">
                <span className="config-label">Dial Finish</span>
                <div className="option-row">
                  {(Object.keys(DIAL_TONES) as DialToneId[]).map((id) => {
                    const item = DIAL_TONES[id];
                    return (
                      <button
                        key={id}
                        type="button"
                        className={`choice-btn${dialTone === id ? ' is-active' : ''}`}
                        onClick={() => setDialTone(id)}
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

              <div className="config-group-compact">
                <span className="config-label">Strap &amp; Bracelet</span>
                <div className="option-row">
                  {(Object.keys(STRAP_OPTIONS) as StrapTypeId[]).map((id) => {
                    const item = STRAP_OPTIONS[id];
                    return (
                      <button
                        key={id}
                        type="button"
                        className={`choice-btn${strapType === id ? ' is-active' : ''}`}
                        onClick={() => setStrapType(id)}
                      >
                        <span>{item.shortLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="spec-table">
              <div className="spec-row">
                <span className="spec-key">Calibre</span>
                <span className="spec-val">{watch.specs.calibre}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">Dimensions</span>
                <span className="spec-val tabular-nums">
                  {watch.specs.diameter} × {watch.specs.thickness}
                </span>
              </div>
              <div className="spec-row">
                <span className="spec-key">Power Reserve</span>
                <span className="spec-val tabular-nums">{watch.specs.powerReserve}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">Water Resistance</span>
                <span className="spec-val tabular-nums">{watch.specs.waterResistance}</span>
              </div>
              <div className="spec-row">
                <span className="spec-key">Accuracy</span>
                <span className="spec-val tabular-nums">{watch.specs.accuracy}</span>
              </div>
            </div>

            <div className="detail-actions">
              <button
                type="button"
                className="btn btn-primary btn-full"
                onClick={() => {
                  onAddToBag({
                    watchId: watch.id,
                    reference: watch.reference,
                    name: watch.name,
                    image: resolveConfiguredWatchImage(watch, caseMat, dialTone, strapType),
                    caseMaterial: caseMat,
                    dialTone,
                    strapType,
                    engraving: '',
                    unitPrice: computedPrice,
                  });
                  onClose();
                }}
              >
                Add to Bag — ${computedPrice.toLocaleString()}
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-full"
                onClick={() => {
                  onLoadInConfigurator(watch);
                  onClose();
                }}
              >
                Customize Engraving in Atelier
                <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
