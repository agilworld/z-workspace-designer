/**
 * Product data sourced from monis.rent.
 * Prices are estimates — final pricing at monis.rent checkout.
 */

import { type Product, type ProductCategory } from '@/types';

// ---------------------------------------------------------------------------
// Product catalog — 21 items
// ---------------------------------------------------------------------------

export const products: Product[] = [
  // ═════════════════════════════════════════════════════════════════════════
  // DESKS
  // ═════════════════════════════════════════════════════════════════════════
  {
    id: 'electrical-adjustable-desk',
    name: 'Electrical Adjustable Desk',
    category: 'desks',
    brand: 'Fantech',
    description:
      'Electric height-adjustable desk available in 120×60cm, 140×60cm, or 140×70cm. Height range 70–118cm with 80kg load capacity.',
    image:
      'https://strapi.monis.rent/uploads/desk_titel_new_3db151d44c.jpg',
    estimatedPriceWeekly: 15,
    estimatedPriceMonthly: 60,
    monisUrl: 'https://www.monis.rent/categories/furniture/bali',
    defaultPosition: { x: 100, y: 280 },
    dimensions: { width: 600, height: 150 },
    zIndex: 1,
    tags: ['popular', 'ergonomic'],
  },
  {
    id: 'mechanical-adjustable-desk',
    name: 'Mechanical Adjustable Desk',
    category: 'desks',
    brand: 'Ikea (Trotten)',
    description:
      'Manually height-adjustable desk available in 120×70cm or 160×80cm. Height range 70–120cm.',
    image:
      'https://strapi.monis.rent/uploads/Mechanical_Adjustable_Desk_front_new_a83b8077b0.jpg',
    estimatedPriceWeekly: 10,
    estimatedPriceMonthly: 40,
    monisUrl: 'https://www.monis.rent/categories/furniture/bali',
    defaultPosition: { x: 100, y: 280 },
    dimensions: { width: 600, height: 150 },
    zIndex: 1,
    tags: ['ergonomic'],
  },

  // ═════════════════════════════════════════════════════════════════════════
  // CHAIRS
  // ═════════════════════════════════════════════════════════════════════════
  {
    id: 'ergonomic-office-chair',
    name: 'Ergonomic Office Chair',
    category: 'chairs',
    brand: 'Fantech',
    description:
      'OCA259PRO ergonomic mesh-back chair with 4D armrests, adjustable headrest, lumbar support, reclining function, and leg rest.',
    image:
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
    estimatedPriceWeekly: 15,
    estimatedPriceMonthly: 60,
    monisUrl: 'https://www.monis.rent/categories/furniture/bali',
    defaultPosition: { x: 340, y: 390 },
    dimensions: { width: 120, height: 140 },
    zIndex: 2,
    tags: ['popular', 'ergonomic'],
  },
  {
    id: 'standard-office-chair',
    name: 'Standard Office Chair',
    category: 'chairs',
    brand: 'Generic',
    description:
      'Affordable office chair with fixed armrests, basic lumbar support, and fabric seat cushion.',
    image:
      'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400',
    estimatedPriceWeekly: 8,
    estimatedPriceMonthly: 32,
    monisUrl: 'https://www.monis.rent/categories/furniture/bali',
    defaultPosition: { x: 340, y: 390 },
    dimensions: { width: 120, height: 140 },
    zIndex: 2,
    tags: ['budget'],
  },

  // ═════════════════════════════════════════════════════════════════════════
  // MONITORS
  // ═════════════════════════════════════════════════════════════════════════
  {
    id: '27-4k-multimedia-monitor',
    name: "27\" 4K Multimedia Monitor",
    category: 'monitors',
    brand: 'Redmi / Xiaomi',
    description:
      '27\" 4K (3840×2160) monitor with USB-C 90W power delivery and 100% sRGB coverage — ideal for productivity.',
    image:
      'https://strapi.monis.rent/uploads/27_4_K_A27_U_Multitasking_Monitor_1_ce29d15357.jpg',
    estimatedPriceWeekly: 15,
    estimatedPriceMonthly: 60,
    monisUrl: 'https://www.monis.rent/categories/monitors/bali',
    defaultPosition: { x: 220, y: 215 },
    dimensions: { width: 180, height: 120 },
    zIndex: 4,
    tags: ['popular', '4k'],
  },
  {
    id: '34-4k-gaming-monitor',
    name: "34\" 4K Gaming Monitor",
    category: 'monitors',
    brand: 'Xiaomi',
    description:
      '34\" curved WQHD (3440×1440) gaming monitor with 180Hz refresh rate and 1ms response time.',
    image:
      'https://strapi.monis.rent/uploads/34_4_K_Gaming_Monitor_7_3f6b2ba627.jpg',
    estimatedPriceWeekly: 20,
    estimatedPriceMonthly: 80,
    monisUrl: 'https://www.monis.rent/categories/monitors/bali',
    defaultPosition: { x: 310, y: 200 },
    dimensions: { width: 220, height: 130 },
    zIndex: 4,
    tags: ['gaming', 'ultrawide'],
  },
  {
    id: '27-5k-studio-display',
    name: "27\" 5K Apple Studio Display",
    category: 'monitors',
    brand: 'Apple',
    description:
      '27\" 5K (5120×2880) display with 600 nits brightness, P3 wide color, Thunderbolt 3, built-in camera, and six-speaker sound system.',
    image:
      'https://strapi.monis.rent/uploads/Apple_Studio_Display_6_94c6329a05.jpg',
    estimatedPriceWeekly: 30,
    estimatedPriceMonthly: 120,
    monisUrl: 'https://www.monis.rent/categories/monitors/bali',
    defaultPosition: { x: 200, y: 220 },
    dimensions: { width: 180, height: 120 },
    zIndex: 4,
    tags: ['premium', 'apple'],
  },
  {
    id: '24-fhd-office-monitor-a24i',
    name: "24\" Full HD Office Monitor A24i",
    category: 'monitors',
    brand: 'Xiaomi',
    description:
      '24\" Full HD (1920×1080) office monitor with 100Hz refresh rate and 99% sRGB color accuracy.',
    image:
      'https://strapi.monis.rent/uploads/24_Full_HD_Office_Monitor_A24i_1_7f987306af.jpg',
    estimatedPriceWeekly: 5,
    estimatedPriceMonthly: 20,
    monisUrl: 'https://www.monis.rent/categories/monitors/bali',
    defaultPosition: { x: 320, y: 225 },
    dimensions: { width: 160, height: 110 },
    zIndex: 4,
    tags: ['budget'],
  },

  // ═════════════════════════════════════════════════════════════════════════
  // COMPUTERS
  // ═════════════════════════════════════════════════════════════════════════
  {
    id: 'mac-mini-m4',
    name: 'Apple Mac Mini M4',
    category: 'computers',
    brand: 'Apple',
    description:
      'Mac Mini with M4 chip, 10-core CPU, 10-core GPU, 16GB unified memory, and 256GB SSD storage.',
    image:
      'https://strapi.monis.rent/uploads/Mac_mini_M4_front_b152d10743.jpg',
    estimatedPriceWeekly: 25,
    estimatedPriceMonthly: 100,
    monisUrl: 'https://www.monis.rent/categories/computer/bali',
    defaultPosition: { x: 450, y: 290 },
    dimensions: { width: 60, height: 60 },
    zIndex: 3,
    tags: ['popular', 'apple', 'high-performance'],
  },
  {
    id: 'mac-mini-m2',
    name: 'Apple Mac Mini M2',
    category: 'computers',
    brand: 'Apple',
    description:
      'Mac Mini with M2 chip, 8-core CPU, 10-core GPU, and configurable 8/16GB memory with 256/512GB storage.',
    image:
      'https://strapi.monis.rent/uploads/Apple_Mac_Mini_M2_6_1d4fce6808.jpg',
    estimatedPriceWeekly: 16,
    estimatedPriceMonthly: 64,
    monisUrl: 'https://www.monis.rent/categories/computer/bali',
    defaultPosition: { x: 450, y: 290 },
    dimensions: { width: 60, height: 60 },
    zIndex: 3,
    tags: ['apple', 'high-performance'],
  },

  // ═════════════════════════════════════════════════════════════════════════
  // KEYBOARDS
  // ═════════════════════════════════════════════════════════════════════════
  {
    id: 'logitech-mx-keyboard',
    name: 'Logitech MX Keyboard',
    category: 'keyboards',
    brand: 'Logitech',
    description:
      'Wireless keyboard with Easy-Switch technology for up to 3 devices and 5-month battery life.',
    image:
      'https://strapi.monis.rent/uploads/Logitech_MX_keys_1_9977480ae1.jpg',
    estimatedPriceWeekly: 4,
    estimatedPriceMonthly: 16,
    monisUrl: 'https://www.monis.rent/categories/office-accessories/bali',
    defaultPosition: { x: 280, y: 330 },
    dimensions: { width: 120, height: 40 },
    zIndex: 5,
    tags: ['popular', 'wireless'],
  },
  {
    id: 'apple-magic-keyboard',
    name: 'Apple Magic Keyboard',
    category: 'keyboards',
    brand: 'Apple',
    description:
      'Wireless Magic Keyboard with Touch ID, numeric keypad, and rechargeable battery.',
    image:
      'https://strapi.monis.rent/uploads/magic_keyboard_with_touch_id_1_7124075f1d.jpg',
    estimatedPriceWeekly: 5,
    estimatedPriceMonthly: 20,
    monisUrl: 'https://www.monis.rent/categories/office-accessories/bali',
    defaultPosition: { x: 280, y: 330 },
    dimensions: { width: 120, height: 35 },
    zIndex: 5,
    tags: ['apple', 'wireless'],
  },

  // ═════════════════════════════════════════════════════════════════════════
  // MICE
  // ═════════════════════════════════════════════════════════════════════════
  {
    id: 'logitech-mx-master-s3',
    name: 'Logitech MX Master Mouse S3',
    category: 'mice',
    brand: 'Logitech',
    description:
      'Premium wireless mouse with 8000 DPI Darkfield tracking, ergonomic design, and 70-day battery life.',
    image:
      'https://strapi.monis.rent/uploads/Logitech_S3_6_4cf1e523b8.jpg',
    estimatedPriceWeekly: 3,
    estimatedPriceMonthly: 12,
    monisUrl: 'https://www.monis.rent/categories/office-accessories/bali',
    defaultPosition: { x: 420, y: 335 },
    dimensions: { width: 30, height: 40 },
    zIndex: 5,
    tags: ['popular', 'wireless', 'ergonomic'],
  },
  {
    id: 'apple-magic-mouse',
    name: 'Apple Magic Mouse',
    category: 'mice',
    brand: 'Apple',
    description:
      'Wireless mouse with multi-touch surface and rechargeable battery.',
    image:
      'https://strapi.monis.rent/uploads/Apple_Magic_Mouse_4_022f966524.jpg',
    estimatedPriceWeekly: 4,
    estimatedPriceMonthly: 16,
    monisUrl: 'https://www.monis.rent/categories/office-accessories/bali',
    defaultPosition: { x: 420, y: 335 },
    dimensions: { width: 30, height: 35 },
    zIndex: 5,
    tags: ['apple', 'wireless'],
  },

  // ═════════════════════════════════════════════════════════════════════════
  // LAMPS
  // ═════════════════════════════════════════════════════════════════════════
  {
    id: 'smart-led-desk-lamp-1s',
    name: 'Smart LED Desk Lamp 1S',
    category: 'lamps',
    brand: 'Xiaomi',
    description:
      'Smart LED desk lamp with 520 lumens, Ra90 color rendering, 2600–5000K adjustable color temperature, and Wi-Fi connectivity.',
    image:
      'https://strapi.monis.rent/uploads/Xiaomi_Mi_Led_Desk_Lamp_1_S_10_3777ddd163.jpg',
    estimatedPriceWeekly: 4,
    estimatedPriceMonthly: 16,
    monisUrl: 'https://www.monis.rent/categories/office-accessories/bali',
    defaultPosition: { x: 480, y: 230 },
    dimensions: { width: 50, height: 100 },
    zIndex: 6,
    tags: ['smart', 'led'],
  },
  {
    id: 'monitor-light-bar',
    name: 'Monitor Light Bar',
    category: 'lamps',
    brand: 'Mijia',
    description:
      'Monitor-mounted light bar with 2700–6500K adjustable color temperature, Ra95 color rendering, and magnetic mount.',
    image:
      'https://strapi.monis.rent/uploads/Monitor_Light_Bar_1_8e97972171.jpg',
    estimatedPriceWeekly: 3,
    estimatedPriceMonthly: 12,
    monisUrl: 'https://www.monis.rent/categories/office-accessories/bali',
    defaultPosition: { x: 340, y: 170 },
    dimensions: { width: 100, height: 15 },
    zIndex: 6,
    tags: ['led', 'minimal'],
  },

  // ═════════════════════════════════════════════════════════════════════════
  // ACCESSORIES
  // ═════════════════════════════════════════════════════════════════════════
  {
    id: 'mouse-pad',
    name: 'Mouse Pad',
    category: 'accessories',
    brand: 'Generic',
    description:
      'Smooth fabric mouse pad with anti-slip rubber base for precise tracking.',
    image:
      'https://strapi.monis.rent/uploads/Mouse_pad_1_e6684ebc31.jpg',
    estimatedPriceWeekly: 1,
    estimatedPriceMonthly: 4,
    monisUrl: 'https://www.monis.rent/categories/office-accessories/bali',
    defaultPosition: { x: 300, y: 340 },
    dimensions: { width: 100, height: 50 },
    zIndex: 5,
    tags: ['budget', 'essential'],
  },
  {
    id: 'ergonomic-laptop-stand',
    name: 'Ergonomic Laptop Stand',
    category: 'accessories',
    brand: 'Generic',
    description:
      'Adjustable laptop stand compatible with 10–17\" laptops, raises screen to eye level and improves airflow.',
    image:
      'https://strapi.monis.rent/uploads/Laptop_stand_back_new2_91df29c3c8.jpg',
    estimatedPriceWeekly: 3,
    estimatedPriceMonthly: 12,
    monisUrl: 'https://www.monis.rent/categories/office-accessories/bali',
    defaultPosition: { x: 380, y: 240 },
    dimensions: { width: 80, height: 70 },
    zIndex: 4,
    tags: ['ergonomic', 'essential'],
  },
  {
    id: '6-in-1-converter-hub',
    name: '6-in-1 Converter Hub',
    category: 'accessories',
    brand: 'Generic',
    description:
      'USB-C hub with USB 3.0 ports, 4K HDMI output, and SD card reader.',
    image:
      'https://strapi.monis.rent/uploads/mac_dongle_product_photo_0316bc4b50.jpg',
    estimatedPriceWeekly: 2,
    estimatedPriceMonthly: 8,
    monisUrl: 'https://www.monis.rent/categories/office-accessories/bali',
    defaultPosition: { x: 460, y: 340 },
    dimensions: { width: 30, height: 15 },
    zIndex: 7,
    tags: ['essential', 'usb-c'],
  },

  // ═════════════════════════════════════════════════════════════════════════
  // PLANTS (decorative, not rentable)
  // ═════════════════════════════════════════════════════════════════════════
  {
    id: 'desk-plant',
    name: 'Desk Plant',
    category: 'plants',
    brand: 'Decorative',
    description: 'Decorative greenery to bring life to your workspace.',
    image:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=200',
    estimatedPriceWeekly: 0,
    estimatedPriceMonthly: 0,
    monisUrl: 'https://www.monis.rent',
    defaultPosition: { x: 150, y: 230 },
    dimensions: { width: 45, height: 55 },
    zIndex: 6,
    tags: ['decorative'],
  },
  {
    id: 'small-desk-plant',
    name: 'Small Desk Plant',
    category: 'plants',
    brand: 'Decorative',
    description: 'Mini succulent perfect for your desk corner.',
    image:
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=200',
    estimatedPriceWeekly: 0,
    estimatedPriceMonthly: 0,
    monisUrl: 'https://www.monis.rent',
    defaultPosition: { x: 160, y: 245 },
    dimensions: { width: 30, height: 35 },
    zIndex: 6,
    tags: ['decorative'],
  },
];

// ---------------------------------------------------------------------------
// Convenience lookups
// ---------------------------------------------------------------------------

/** Products grouped by category. */
export const productsByCategory: Record<ProductCategory, Product[]> = {
  desks: [],
  chairs: [],
  monitors: [],
  computers: [],
  keyboards: [],
  mice: [],
  lamps: [],
  accessories: [],
  plants: [],
};

for (const product of products) {
  productsByCategory[product.category].push(product);
}

/**
 * Look up a product by its unique id.
 *
 * @param id - The kebab-case product identifier.
 * @returns The matching Product, or `undefined` if not found.
 */
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
