import heroChronoImg from '../assets/images/watch_hero_chronograph_1795029776677.jpg';
import cardChronoImg from '../assets/images/watch_card_chronograph_1795029777005.jpg';
import cardDiverImg from '../assets/images/watch_card_diver_1795029777246.jpg';
import cardDressImg from '../assets/images/watch_card_dress_1795029777664.jpg';
import cardGmtImg from '../assets/images/watch_card_gmt_1795029779005.jpg';
import cardMoonphaseImg from '../assets/images/watch_card_moonphase_1795029778832.jpg';
import cardSkeletonImg from '../assets/images/watch_card_skeleton_1795029779027.jpg';
import craftMovementImg from '../assets/images/watch_craft_movement_1795029780939.jpg';
import processBridgesImg from '../assets/images/atelier_process_bridges_1795030265933.jpg';
import processPolishingImg from '../assets/images/atelier_process_polishing_1795030266957.jpg';
import processDialHandsImg from '../assets/images/atelier_process_dial_hands_1795030267026.jpg';
import processCasingImg from '../assets/images/atelier_process_casing_1795030267415.jpg';
import chronoSteelChainImg from '../assets/images/watch_chrono_steel_chain_1795030815410.jpg';
import chronoObsidianChainImg from '../assets/images/watch_chrono_obsidian_chain_1795030815411.jpg';
import chronoForestStrapImg from '../assets/images/watch_chrono_forest_strap_1795030816033.jpg';
import chronoRoseGoldAlligatorImg from '../assets/images/watch_chrono_rosegold_alligator_1795030816940.jpg';

export type WatchCategory = 'All' | 'Chronograph' | 'Diver' | 'Dress' | 'GMT' | 'Complications';

export type CaseMaterialId = 'steel' | 'titanium' | 'rose-gold';
export type DialToneId = 'champagne' | 'obsidian' | 'forest';
export type StrapTypeId = 'calfskin' | 'bracelet' | 'alligator';

export interface WatchSpecs {
  calibre: string;
  frequency: string;
  powerReserve: string;
  diameter: string;
  thickness: string;
  lugToLug: string;
  waterResistance: string;
  crystal: string;
  accuracy: string;
}

export interface WatchModel {
  id: string;
  reference: string;
  name: string;
  category: Exclude<WatchCategory, 'All'>;
  subtitle: string;
  description: string;
  basePrice: number;
  availability: 'In Stock' | 'Limited Run';
  defaultCase: CaseMaterialId;
  defaultDial: DialToneId;
  defaultStrap: StrapTypeId;
  image: string;
  imageAlt: string;
  specs: WatchSpecs;
  highlights: string[];
}

export const HERO_CAMPAIGN_IMAGE = {
  src: heroChronoImg,
  alt: 'Master Chronographe 01 brushed stainless steel mechanical wristwatch with champagne-silver dial on travertine stone',
};

export const CRAFT_MOVEMENT_IMAGE = {
  src: craftMovementImg,
  alt: 'Macro view of Master Calibre M-01 through sapphire exhibition caseback showing Geneva stripes and gold oscillating rotor',
};

export const CASE_MATERIALS: Record<
  CaseMaterialId,
  { label: string; shortLabel: string; swatch: string; delta: number; finishNote: string }
> = {
  steel: {
    label: '316L Brushed Steel',
    shortLabel: '316L Steel',
    swatch: '#B9B7B2',
    delta: 0,
    finishNote: 'Satin-brushed flanks with mirror-beveled lugs',
  },
  titanium: {
    label: 'Grade 5 Titanium',
    shortLabel: 'Titanium',
    swatch: '#7F7D78',
    delta: 450,
    finishNote: 'Micro-blasted lightweight alloy, 42% lighter than steel',
  },
  'rose-gold': {
    label: '18k Rose Gold',
    shortLabel: '18k Rose Gold',
    swatch: '#C59A6B',
    delta: 2900,
    finishNote: 'Hand-polished solid 18k 5N rose gold case architecture',
  },
};

export const DIAL_TONES: Record<
  DialToneId,
  { label: string; swatch: string; finishNote: string }
> = {
  champagne: {
    label: 'Champagne Sunray',
    swatch: '#D8CDB8',
    finishNote: 'Radial sunray brushing with rhodium-plated applied indices',
  },
  obsidian: {
    label: 'Obsidian Matte',
    swatch: '#1E1D1B',
    finishNote: 'Micro-textured dark dial with Super-LumiNova markers',
  },
  forest: {
    label: 'Forest Olive',
    swatch: '#394D3E',
    finishNote: 'Deep alpine sunray lacquer with warm gilt chapter ring',
  },
};

export const STRAP_OPTIONS: Record<
  StrapTypeId,
  { label: string; shortLabel: string; delta: number }
> = {
  calfskin: {
    label: 'Espresso Calfskin',
    shortLabel: 'Calfskin',
    delta: 0,
  },
  bracelet: {
    label: 'Integrated Metal Bracelet',
    shortLabel: 'Metal Bracelet',
    delta: 320,
  },
  alligator: {
    label: 'Hand-Stitched Alligator',
    shortLabel: 'Alligator',
    delta: 240,
  },
};

export const WATCH_COLLECTION: WatchModel[] = [
  {
    id: 'chronographe-01',
    reference: 'Ref. M01.40',
    name: 'Master Chronographe 01',
    category: 'Chronograph',
    subtitle: 'Column-wheel tri-compax mechanical chronograph',
    description:
      'Built around an integrated column-wheel calibre with vertical clutch engagement, delivering crisp pusher actuation and a warm champagne sunray dial balanced for legibility.',
    basePrice: 4850,
    availability: 'In Stock',
    defaultCase: 'steel',
    defaultDial: 'champagne',
    defaultStrap: 'calfskin',
    image: cardChronoImg,
    imageAlt: 'Master Chronographe 01 stainless steel watch with champagne dial and espresso leather strap',
    specs: {
      calibre: 'Calibre M-01 Automatic',
      frequency: '28,800 vph (4 Hz)',
      powerReserve: '72 hours',
      diameter: '40.0 mm',
      thickness: '11.4 mm',
      lugToLug: '47.2 mm',
      waterResistance: '100 m (10 ATM)',
      crystal: 'Box-domed sapphire, dual AR',
      accuracy: '-2 / +3 sec/day (COSC)',
    },
    highlights: [
      'Column-wheel & vertical clutch chronograph mechanism',
      'Blued steel central chronograph seconds hand',
      'Sapphire exhibition caseback with tungsten-gold rotor',
    ],
  },
  {
    id: 'abyssal-300',
    reference: 'Ref. M02.41',
    name: 'Master Abyssal 300',
    category: 'Diver',
    subtitle: 'Saturation-grade titanium instrument diver',
    description:
      'Engineered in Grade 5 titanium with a 120-click matte ceramic bezel and screw-down crown guards, combining deep-water resilience with effortless daily proportions.',
    basePrice: 5200,
    availability: 'In Stock',
    defaultCase: 'titanium',
    defaultDial: 'obsidian',
    defaultStrap: 'bracelet',
    image: cardDiverImg,
    imageAlt: 'Master Abyssal 300 brushed titanium dive watch with black dial and ceramic bezel',
    specs: {
      calibre: 'Calibre M-02 Automatic',
      frequency: '28,800 vph (4 Hz)',
      powerReserve: '70 hours',
      diameter: '41.0 mm',
      thickness: '12.1 mm',
      lugToLug: '48.0 mm',
      waterResistance: '300 m (30 ATM)',
      crystal: 'Flat 3.2 mm sapphire, inner AR',
      accuracy: '-2 / +3 sec/day (COSC)',
    },
    highlights: [
      '120-click unidirectional zirconia ceramic bezel',
      'Micro-adjustable folding clasp with 8 mm tool-free extension',
      'BGW9 Swiss Super-LumiNova across hands and indices',
    ],
  },
  {
    id: 'classique-38',
    reference: 'Ref. M03.38',
    name: 'Master Classique 38',
    category: 'Dress',
    subtitle: 'Ultra-thin enamel dial with small seconds',
    description:
      'Inspired by mid-century Geneva observatory trials, the Classique 38 pairs an ivory grand-feu inspired enamel dial with hand-chamfered dauphine hands and a slender 7.8 mm profile.',
    basePrice: 8400,
    availability: 'Limited Run',
    defaultCase: 'rose-gold',
    defaultDial: 'champagne',
    defaultStrap: 'alligator',
    image: cardDressImg,
    imageAlt: 'Master Classique 38 18k rose gold dress watch with ivory dial and cognac alligator strap',
    specs: {
      calibre: 'Calibre M-03 Hand-Wound',
      frequency: '21,600 vph (3 Hz)',
      powerReserve: '68 hours',
      diameter: '38.0 mm',
      thickness: '7.8 mm',
      lugToLug: '44.5 mm',
      waterResistance: '50 m (5 ATM)',
      crystal: 'Domed sapphire front & back',
      accuracy: '-1 / +3 sec/day (Observatory)',
    },
    highlights: [
      'Manual-wind architecture with twin mainspring barrels',
      'Solid 18k rose gold applied baton hour markers',
      'Hand-stitched matte cognac alligator strap with pin buckle',
    ],
  },
  {
    id: 'meridien-gmt',
    reference: 'Ref. M04.40',
    name: 'Master Méridien GMT',
    category: 'GMT',
    subtitle: 'True flyer dual-time traveller with 24h bezel',
    description:
      'Designed for transcontinental travel with an independently jumping local hour hand, fixed brushed 24-hour bezel, and deep midnight-slate sunray dial.',
    basePrice: 4450,
    availability: 'In Stock',
    defaultCase: 'steel',
    defaultDial: 'obsidian',
    defaultStrap: 'bracelet',
    image: cardGmtImg,
    imageAlt: 'Master Méridien GMT stainless steel watch with midnight dial and 24-hour bezel',
    specs: {
      calibre: 'Calibre M-04 True GMT',
      frequency: '28,800 vph (4 Hz)',
      powerReserve: '72 hours',
      diameter: '40.0 mm',
      thickness: '11.2 mm',
      lugToLug: '47.0 mm',
      waterResistance: '150 m (15 ATM)',
      crystal: 'Flat sapphire, dual AR',
      accuracy: '-2 / +3 sec/day (COSC)',
    },
    highlights: [
      'Independent jumping local hour hand forward and backward',
      'Radial-brushed fixed 24-hour steel bezel',
      'Anti-magnetic silicon hairspring rated to 15,000 Gauss',
    ],
  },
  {
    id: 'lunaires-39',
    reference: 'Ref. M05.39',
    name: 'Master Lunaires 39',
    category: 'Complications',
    subtitle: 'Astronomical moonphase & radial date pointer',
    description:
      'Combining a deep forest-olive sunray dial with an astronomical moonphase disc accurate to one day every 122 years, framed inside a refined 39 mm steel case.',
    basePrice: 5900,
    availability: 'In Stock',
    defaultCase: 'steel',
    defaultDial: 'forest',
    defaultStrap: 'calfskin',
    image: cardMoonphaseImg,
    imageAlt: 'Master Lunaires 39 forest green dial moonphase watch on olive leather strap',
    specs: {
      calibre: 'Calibre M-05 Moonphase',
      frequency: '28,800 vph (4 Hz)',
      powerReserve: '66 hours',
      diameter: '39.0 mm',
      thickness: '10.6 mm',
      lugToLug: '46.2 mm',
      waterResistance: '50 m (5 ATM)',
      crystal: 'Box-domed sapphire crystal',
      accuracy: '-2 / +4 sec/day',
    },
    highlights: [
      '122-year precision lunar cycle aperture at 6 o’clock',
      'Integrated coaxial radial pointer date ring',
      'Quick-release spring bars for tool-free strap changes',
    ],
  },
  {
    id: 'squelette-41',
    reference: 'Ref. M06.41',
    name: 'Master Squelette 41',
    category: 'Complications',
    subtitle: 'Architectural openworked bridges & exposed balance',
    description:
      'Every non-essential millimeter of brass is milled away and hand-beveled to reveal the barrel, going train, and free-sprung balance beating directly beneath the sapphire.',
    basePrice: 7650,
    availability: 'Limited Run',
    defaultCase: 'titanium',
    defaultDial: 'obsidian',
    defaultStrap: 'alligator',
    image: cardSkeletonImg,
    imageAlt: 'Master Squelette 41 openworked skeleton watch revealing anthracite bridges and brass gears',
    specs: {
      calibre: 'Calibre M-06 Openworked',
      frequency: '28,800 vph (4 Hz)',
      powerReserve: '64 hours',
      diameter: '41.0 mm',
      thickness: '10.4 mm',
      lugToLug: '47.8 mm',
      waterResistance: '50 m (5 ATM)',
      crystal: 'Sapphire front & exhibition back',
      accuracy: '-2 / +3 sec/day (COSC)',
    },
    highlights: [
      'NAC-coated anthracite bridges with 48 hand-chamfered angles',
      'Free-sprung balance wheel with variable inertia weights',
      'Numbered annual production limited to 150 pieces',
    ],
  },
];

export const HERO_BENCHMARKS = [
  { value: '28,800 vph', label: 'Oscillation Frequency' },
  { value: '72 Hours', label: 'Twin-Barrel Reserve' },
  { value: '-2 / +3s', label: 'Daily Chronometer Spec' },
  { value: '5 Years', label: 'Manufacture Warranty' },
];

export const ATELIER_PILLARS = [
  {
    index: '01.',
    title: 'Hand-Beveled Bridges & Geneva Stripes',
    detail:
      'Every rhodium-plated bridge undergoes traditional boxwood anglage and Côtes de Genève finishing before assembly, paired with flame-blued steel screws and gold chaton jewel mounts.',
  },
  {
    index: '02.',
    title: 'Six-Position Chronometer Regulation',
    detail:
      'Each cased movement is regulated across six orientations and three thermal chambers over 15 days to maintain -2/+3 seconds per day—surpassing standard COSC certification.',
  },
  {
    index: '03.',
    title: 'Twin-Barrel 72-Hour Architecture',
    detail:
      'Series-coupled mainspring barrels deliver linear torque from full wind through the third day of reserve, ensuring stable balance amplitude even after a weekend off the wrist.',
  },
];

export interface AssemblyScene {
  id: string;
  chapter: string;
  title: string;
  detail: string;
  image: string;
  alt: string;
}

export const ASSEMBLY_PROCESS_SCENES: AssemblyScene[] = [
  {
    id: 'bridges',
    chapter: '01',
    title: 'Bridge & Train Assembly',
    detail: 'Rhodium-plated Geneva-striped bridges seated onto the mainplate using brass tweezers',
    image: processBridgesImg,
    alt: 'Master watchmaker seating a Geneva-striped bridge onto a mechanical watch movement with brass tweezers',
  },
  {
    id: 'polishing',
    chapter: '02',
    title: 'Boxwood Anglage & Mirror Polishing',
    detail: 'Case chamfers and lug bevels finished by hand with boxwood pegwood and diamond paste',
    image: processPolishingImg,
    alt: 'Hand-beveling and mirror-polishing watch case lugs on a traditional watchmaking bench',
  },
  {
    id: 'dial-hands',
    chapter: '03',
    title: 'Dial & Blued Hands Fitting',
    detail: 'Chronograph hands aligned to sub-millimeter tolerances over the sunray champagne dial',
    image: processDialHandsImg,
    alt: 'Watchmaker fitting blued steel hands onto a champagne sunray chronograph dial',
  },
  {
    id: 'casing',
    chapter: '04',
    title: 'Final Casing & Sapphire Seal',
    detail: 'Regulated calibre cased in brushed 316L stainless steel with exhibition sapphire back',
    image: processCasingImg,
    alt: 'Completed mechanical movement lowered into a brushed stainless steel case on a suede mat',
  },
];

export function resolveConfiguredWatchImage(
  watch: WatchModel,
  caseMaterial: CaseMaterialId,
  dialTone: DialToneId,
  strapType: StrapTypeId
): string {
  // Keep exact model studio shot when on its signature factory configuration
  if (
    caseMaterial === watch.defaultCase &&
    dialTone === watch.defaultDial &&
    strapType === watch.defaultStrap
  ) {
    return watch.image;
  }

  // 1. Metal Bracelet (Chain) configurations
  if (strapType === 'bracelet') {
    if (dialTone === 'obsidian') {
      if (watch.category === 'Diver') return cardDiverImg;
      if (watch.category === 'GMT') return cardGmtImg;
      return chronoObsidianChainImg;
    }
    if (watch.category === 'GMT') return cardGmtImg;
    return chronoSteelChainImg;
  }

  // 2. Hand-Stitched Alligator configurations
  if (strapType === 'alligator') {
    if (caseMaterial === 'rose-gold') {
      return watch.category === 'Dress' ? cardDressImg : chronoRoseGoldAlligatorImg;
    }
    if (dialTone === 'obsidian') {
      return cardSkeletonImg;
    }
    if (dialTone === 'forest') {
      return chronoForestStrapImg;
    }
    return watch.category === 'Dress' ? cardDressImg : chronoRoseGoldAlligatorImg;
  }

  // 3. Espresso Calfskin Strap configurations
  if (dialTone === 'forest') {
    return watch.id === 'lunaires-39' ? cardMoonphaseImg : chronoForestStrapImg;
  }
  if (dialTone === 'obsidian') {
    return cardSkeletonImg;
  }
  if (caseMaterial === 'rose-gold') {
    return chronoRoseGoldAlligatorImg;
  }
  return cardChronoImg;
}
