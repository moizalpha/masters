import { useState } from 'react';
import { X, Plus, Minus, Trash2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import {
  CASE_MATERIALS,
  CaseMaterialId,
  DIAL_TONES,
  DialToneId,
  STRAP_OPTIONS,
  StrapTypeId,
} from '../data/watches';
import { WatchImage } from './WatchImage';

export interface BagLineItem {
  key: string;
  watchId: string;
  reference: string;
  name: string;
  image: string;
  caseMaterial: CaseMaterialId;
  dialTone: DialToneId;
  strapType: StrapTypeId;
  engraving: string;
  unitPrice: number;
  qty: number;
}

interface BagDrawerProps {
  isOpen: boolean;
  items: BagLineItem[];
  onClose: () => void;
  onUpdateQty: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearBag: () => void;
}

type PaymentMethod = 'card' | 'wire' | 'cod';

export function BagDrawer({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onClearBag,
}: BagDrawerProps) {
  const [step, setStep] = useState<'bag' | 'checkout' | 'confirmed'>('bag');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [orderNumber, setOrderNumber] = useState('MST-1048');
  const [confirmedTotal, setConfirmedTotal] = useState(0);
  const [confirmedCount, setConfirmedCount] = useState(0);
  const [formError, setFormError] = useState('');

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  const handleClose = () => {
    if (step === 'confirmed') {
      setStep('bag');
    }
    onClose();
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !address.trim() || !postalCode.trim()) {
      setFormError('Please complete your name, email, delivery address, and postal code.');
      return;
    }
    setFormError('');
    const nextOrderNum = `MST-${1040 + Math.floor(Math.random() * 890)}`;
    setOrderNumber(nextOrderNum);
    setConfirmedTotal(subtotal);
    setConfirmedCount(itemCount);
    onClearBag();
    setStep('confirmed');
  };

  return (
    <>
      <div
        className="drawer-backdrop"
        hidden={!isOpen}
        onClick={handleClose}
        aria-hidden="true"
      />
      <aside
        className="bag-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-drawer-title"
        hidden={!isOpen}
      >
        <div className="drawer-header">
          <h2 id="bag-drawer-title" className="drawer-title">
            {step === 'bag' && 'Acquisition Bag'}
            {step === 'checkout' && 'Insured Dispatch Details'}
            {step === 'confirmed' && 'Order Confirmed'}
          </h2>
          <button
            type="button"
            className="icon-btn"
            aria-label="Close bag"
            onClick={handleClose}
          >
            <X size={18} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>

        <div className="drawer-body">
          {step === 'confirmed' ? (
            <div className="order-confirmed-state">
              <CheckCircle2 size={36} strokeWidth={1.5} className="confirmed-icon" aria-hidden="true" />
              <h3 className="confirmed-heading">
                Order #{orderNumber} Confirmed — Preparing Shipment
              </h3>
              <p className="confirmed-copy">
                Your {confirmedCount === 1 ? 'timepiece' : `${confirmedCount} timepieces`} will be inspected, pressure-tested, and dispatched via insured armored courier to {address}.
              </p>
              <div className="confirmed-receipt">
                <div className="spec-row">
                  <span className="spec-key">Recipient</span>
                  <span className="spec-val">{fullName}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Settlement</span>
                  <span className="spec-val">
                    {paymentMethod === 'card'
                      ? 'Credit / Debit Card'
                      : paymentMethod === 'wire'
                      ? 'Swiss Bank Wire'
                      : 'Insured Courier COD'}
                  </span>
                </div>
                <div className="spec-row">
                  <span className="spec-key">Total Settled</span>
                  <span className="spec-val tabular-nums">
                    ${confirmedTotal.toLocaleString()}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary btn-full"
                onClick={() => {
                  setStep('bag');
                  onClose();
                }}
              >
                Return to Collection
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="drawer-empty">
              <p>Your acquisition bag is currently empty.</p>
              <a
                href="#collection"
                className="btn btn-primary btn-sm"
                onClick={handleClose}
              >
                Explore Collection
              </a>
            </div>
          ) : step === 'checkout' ? (
            <form id="checkout-form" className="checkout-form" onSubmit={handleConfirmOrder} noValidate>
              <div className="checkout-summary-bar">
                <span>
                  {itemCount} {itemCount === 1 ? 'timepiece' : 'timepieces'} · Complimentary Insured Delivery
                </span>
                <span className="mono tabular-nums">${subtotal.toLocaleString()}</span>
              </div>

              <div className="form-field">
                <label htmlFor="checkout-name" className="form-label">
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  className="form-input"
                  placeholder="Elena Vance"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="checkout-email" className="form-label">
                  Email Address
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  className="form-input"
                  placeholder="elena@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="checkout-address" className="form-label">
                  Delivery Street &amp; City
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  className="form-input"
                  placeholder="Rue du Rhône 42, Geneva"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <label htmlFor="checkout-postal" className="form-label">
                  Postal Code
                </label>
                <input
                  id="checkout-postal"
                  type="text"
                  className="form-input"
                  placeholder="1204"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>

              <div className="form-field">
                <span className="form-label">Payment Method</span>
                <div className="payment-methods">
                  {(
                    [
                      { id: 'card', label: 'Card' },
                      { id: 'wire', label: 'Bank Wire' },
                      { id: 'cod', label: 'Courier COD' },
                    ] as { id: PaymentMethod; label: string }[]
                  ).map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      className={`choice-btn${paymentMethod === method.id ? ' is-active' : ''}`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {formError && <p className="form-error" role="alert">{formError}</p>}

              <div className="checkout-form-actions">
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    setFormError('');
                    setStep('bag');
                  }}
                >
                  Back to Bag
                </button>
                <button type="submit" className="btn btn-primary btn-full">
                  Confirm Order — ${subtotal.toLocaleString()}
                </button>
              </div>
            </form>
          ) : (
            <div className="drawer-items">
              {items.map((item) => (
                <div key={item.key} className="bag-item">
                  <WatchImage
                    src={item.image}
                    alt={item.name}
                    className="bag-item-thumb"
                    fallbackLabel={item.name}
                  />
                  <div className="bag-item-info">
                    <div className="bag-item-top">
                      <div>
                        <div className="bag-item-name">{item.name}</div>
                        <div className="bag-item-ref mono">{item.reference}</div>
                      </div>
                      <button
                        type="button"
                        className="remove-item-btn"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => onRemoveItem(item.key)}
                      >
                        <Trash2 size={15} strokeWidth={1.75} aria-hidden="true" />
                      </button>
                    </div>
                    <div className="bag-item-meta">
                      {CASE_MATERIALS[item.caseMaterial].shortLabel} · {DIAL_TONES[item.dialTone].label} · {STRAP_OPTIONS[item.strapType].shortLabel}
                    </div>
                    {item.engraving && (
                      <div className="bag-item-engraving">
                        Engraving: “{item.engraving}”
                      </div>
                    )}
                    <div className="bag-item-bottom">
                      <div className="bag-qty-row">
                        <button
                          type="button"
                          className="qty-btn"
                          aria-label="Decrease quantity"
                          onClick={() => onUpdateQty(item.key, -1)}
                        >
                          <Minus size={13} strokeWidth={2} aria-hidden="true" />
                        </button>
                        <span className="bag-qty tabular-nums">{item.qty}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          aria-label="Increase quantity"
                          onClick={() => onUpdateQty(item.key, 1)}
                        >
                          <Plus size={13} strokeWidth={2} aria-hidden="true" />
                        </button>
                      </div>
                      <span className="bag-line-price tabular-nums">
                        ${(item.unitPrice * item.qty).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && step === 'bag' && (
          <div className="drawer-footer">
            <div className="courier-note">
              <ShieldCheck size={16} strokeWidth={1.75} aria-hidden="true" />
              <span>Complimentary insured courier &amp; 5-year warranty included</span>
            </div>
            <div className="drawer-total-row">
              <span>Subtotal</span>
              <span className="drawer-total tabular-nums">
                ${subtotal.toLocaleString()}
              </span>
            </div>
            <button
              type="button"
              className="btn btn-primary btn-full"
              onClick={() => setStep('checkout')}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
