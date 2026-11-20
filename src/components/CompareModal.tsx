import { useEffect } from 'react';
import { X } from 'lucide-react';
import { WatchModel } from '../data/watches';
import { WatchImage } from './WatchImage';

interface CompareModalProps {
  watches: WatchModel[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (id: string) => void;
  onSelectWatch: (watch: WatchModel) => void;
}

const COMPARE_ROWS: { label: string; getValue: (w: WatchModel) => string }[] = [
  { label: 'Reference', getValue: (w) => w.reference },
  { label: 'Category', getValue: (w) => w.category },
  { label: 'Calibre', getValue: (w) => w.specs.calibre },
  { label: 'Frequency', getValue: (w) => w.specs.frequency },
  { label: 'Power Reserve', getValue: (w) => w.specs.powerReserve },
  { label: 'Case Diameter', getValue: (w) => w.specs.diameter },
  { label: 'Thickness', getValue: (w) => w.specs.thickness },
  { label: 'Lug-to-Lug', getValue: (w) => w.specs.lugToLug },
  { label: 'Water Resistance', getValue: (w) => w.specs.waterResistance },
  { label: 'Precision', getValue: (w) => w.specs.accuracy },
  { label: 'Availability', getValue: (w) => w.availability },
];

export function CompareModal({
  watches,
  isOpen,
  onClose,
  onRemove,
  onSelectWatch,
}: CompareModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || watches.length === 0) return null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="compare-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-modal-title"
      >
        <div className="compare-header">
          <div>
            <h2 id="compare-modal-title" className="compare-title">
              Side-by-Side Specification Comparison
            </h2>
            <p className="compare-sub">
              Comparing {watches.length} selected {watches.length === 1 ? 'timepiece' : 'timepieces'} across calibre and case geometry.
            </p>
          </div>
          <button
            type="button"
            className="icon-btn"
            aria-label="Close comparison"
            onClick={onClose}
          >
            <X size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col" className="compare-attr-col">Specification</th>
                {watches.map((watch) => (
                  <th key={watch.id} scope="col" className="compare-watch-col">
                    <div className="compare-watch-head">
                      <div className="compare-thumb-wrap">
                        <WatchImage
                          src={watch.image}
                          alt={watch.imageAlt}
                          className="compare-thumb"
                          fallbackLabel={watch.name}
                        />
                      </div>
                      <div className="compare-watch-name">{watch.name}</div>
                      <div className="compare-watch-price tabular-nums">
                        ${watch.basePrice.toLocaleString()}
                      </div>
                      <div className="compare-head-actions">
                        <button
                          type="button"
                          className="text-link-btn"
                          onClick={() => {
                            onClose();
                            onSelectWatch(watch);
                          }}
                        >
                          Inspect
                        </button>
                        <button
                          type="button"
                          className="text-link-btn text-muted"
                          onClick={() => onRemove(watch.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row) => (
                <tr key={row.label}>
                  <th scope="row" className="compare-attr-cell">{row.label}</th>
                  {watches.map((watch) => (
                    <td key={watch.id} className="compare-val-cell tabular-nums">
                      {row.getValue(watch)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
