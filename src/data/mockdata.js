// ============================================
// MOCK USERS - Admin/Vendor/Buyer Roles
// ============================================
export const MOCK_USERS = [
  { email: 'superadmin@mmplaza.com', password: 'admin123', role: 'super_admin', name: 'Alex Johnson', businessId: null },
  { email: 'business@mmplaza.com', password: 'business123', role: 'business_admin', name: 'Sarah Williams', businessId: 'biz-1', businessName: 'TechGear Pro' },
  { email: 'editor@mmplaza.com', password: 'editor123', role: 'editor', name: 'Michael Chen', businessId: 'biz-1', businessName: 'TechGear Pro' },
  { email: 'approver@mmplaza.com', password: 'approver123', role: 'approver', name: 'Emily Davis', businessId: 'biz-1', businessName: 'TechGear Pro' },
  { email: 'viewer@mmplaza.com', password: 'viewer123', role: 'viewer', name: 'James Wilson', businessId: 'biz-1', businessName: 'TechGear Pro' },
  { email: 'buyer@example.com', password: 'buyer123', role: 'buyer', name: 'Lisa Anderson', businessId: null },
];

// ============================================
// CATEGORIES
// ============================================
export const CATEGORIES = [
  { id: 'all', label: 'All Products', icon: '🛍️' },
  { id: 'electronics', label: 'Electronics', icon: '💻' },
  { id: 'fashion', label: 'Fashion', icon: '👗' },
  { id: 'food', label: 'Food & Beverages', icon: '☕' },
  { id: 'beauty', label: 'Beauty', icon: '✨' },
  { id: 'sports', label: 'Sports', icon: '🏃' },
  { id: 'home', label: 'Home & Garden', icon: '🏠' },
  { id: 'books', label: 'Books', icon: '📚' },
];

// ============================================
// MOCK PRODUCTS
// ============================================
export const MOCK_PRODUCTS = [
  { 
    id: 'p1', 
    name: 'MacBook Pro 14"', 
    category: 'electronics', 
    price: 1999, 
    originalPrice: 2299, 
    stock: 12, 
    businessId: 'biz-1', 
    business: 'TechGear Pro', 
    status: 'approved', 
    description: 'Powered by Apple M3 chip with up to 18 hours of battery life. Liquid Retina XDR display, 16GB unified memory, and 512GB SSD. Perfect for creative professionals and developers.', 
    rating: 4.8, 
    reviews: 124, 
    tags: ['laptop', 'apple', 'pro'], 
    featured: true,
    image: '/images/macbook.png',
    specs: {
      'Brand': 'Apple',
      'Processor': 'Apple M3 Pro',
      'RAM': '16GB Unified',
      'Storage': '512GB SSD',
      'Display': '14.2-inch Liquid Retina XDR',
      'Weight': '3.5 lbs (1.6 kg)',
      'Dimensions': '12.31 x 8.71 x 0.61 inches',
      'Warranty': '1-Year Limited Warranty'
    }
  },
  { 
    id: 'p2', 
    name: 'Sony WH-1000XM5', 
    category: 'electronics', 
    price: 349, 
    originalPrice: 399, 
    stock: 45, 
    businessId: 'biz-2', 
    business: 'AudioWorld', 
    status: 'approved', 
    description: 'Industry-leading noise canceling headphones with exceptional sound quality, crystal-clear hands-free calling, and 30-hour battery life for all-day listening.', 
    rating: 4.9, 
    reviews: 856, 
    tags: ['headphones', 'sony', 'wireless'], 
    featured: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    specs: {
      'Brand': 'Sony',
      'Type': 'Over-ear, Wireless',
      'Connectivity': 'Bluetooth 5.2',
      'Battery Life': 'Up to 30 Hours',
      'Charging': 'USB-C (Fast Charge)',
      'Weight': '0.55 lbs (250g)',
      'Noise Canceling': 'Industry-Leading ANC',
      'Warranty': '1-Year Limited Warranty'
    }
  },
  { 
    id: 'p3', 
    name: 'Premium Linen Blazer', 
    category: 'fashion', 
    price: 189, 
    originalPrice: 249, 
    stock: 28, 
    businessId: 'biz-3', 
    business: 'UrbanStyle Co', 
    status: 'approved', 
    description: 'Sophisticated single-breasted linen blazer crafted from lightweight, breathable linen. Perfect for summer weddings, office wear, or smart-casual outings.', 
    rating: 4.6, 
    reviews: 92, 
    tags: ['blazer', 'fashion', 'formal'], 
    featured: false,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    specs: {
      'Brand': 'UrbanStyle Co',
      'Material': '100% Belgian Linen',
      'Fit': 'Slim Fit',
      'Style': 'Single-Breasted, 2-Button',
      'Color': 'Oatmeal',
      'Care': 'Dry Clean Only',
      'Sizes': 'S, M, L, XL',
      'Warranty': '30-Day Return Guarantee'
    }
  },
  { 
    id: 'p4', 
    name: 'Ethiopian Single Origin Coffee', 
    category: 'food', 
    price: 28, 
    originalPrice: null, 
    stock: 200, 
    businessId: 'biz-4', 
    business: 'Brew Collective', 
    status: 'approved', 
    description: 'Naturally processed, light-medium roast single-origin heirloom coffee beans from Yirgacheffe, Ethiopia. Offers delicious tasting notes of wild blueberry, bergamot, and dark chocolate.', 
    rating: 4.7, 
    reviews: 234, 
    tags: ['coffee', 'organic', 'specialty'], 
    featured: true,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
    specs: {
      'Brand': 'Brew Collective',
      'Origin': 'Yirgacheffe, Ethiopia',
      'Roast': 'Light-Medium',
      'Process': 'Natural / Dry Processed',
      'Weight': '12 oz (340g)',
      'Flavor Profile': 'Blueberry, Lemon, Cocoa',
      'Altitude': '1,900 - 2,200m',
      'Warranty': 'Freshness Guaranteed'
    }
  },
  { 
    id: 'p5', 
    name: 'Vitamin C Serum', 
    category: 'beauty', 
    price: 45, 
    originalPrice: 65, 
    stock: 88, 
    businessId: 'biz-5', 
    business: 'GlowUp Beauty', 
    status: 'approved', 
    description: 'Clinical-strength 20% L-Ascorbic Acid Vitamin C serum enriched with hyaluronic acid and Vitamin E. Corrects dark spots, brightens skin tone, and reduces signs of aging.', 
    rating: 4.5, 
    reviews: 418, 
    tags: ['skincare', 'vitamin-c', 'serum'], 
    featured: false,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
    specs: {
      'Brand': 'GlowUp Beauty',
      'Volume': '1 fl oz (30ml)',
      'Ingredients': '20% Vitamin C, Ferulic Acid, Hyaluronic Acid',
      'Skin Type': 'All Skin Types',
      'Formulation': 'Lightweight Serum',
      'Benefits': 'Brightening, Anti-aging',
      'Cruelty-Free': 'Yes, Certified Vegan',
      'Warranty': '30-Day Satisfaction Guarantee'
    }
  },
  { 
    id: 'p6', 
    name: 'Yoga Mat Pro', 
    category: 'sports', 
    price: 79, 
    originalPrice: 99, 
    stock: 55, 
    businessId: 'biz-6', 
    business: 'FitLife Store', 
    status: 'approved', 
    description: 'Eco-friendly, 6mm thick non-slip yoga mat made from biodegradable natural tree rubber. Designed with alignment lines to help correct your poses during yoga and pilates sessions.', 
    rating: 4.4, 
    reviews: 167, 
    tags: ['yoga', 'fitness', 'eco'], 
    featured: false,
    image: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=600&q=80',
    specs: {
      'Brand': 'FitLife Store',
      'Material': 'Natural Tree Rubber',
      'Thickness': '6mm (Extra Cushioning)',
      'Dimensions': '71 x 26 inches',
      'Weight': '5.5 lbs (2.5 kg)',
      'Non-slip': 'Dual-sided textured grip',
      'Accessories': 'Includes carrying strap',
      'Warranty': 'Lifetime Warranty'
    }
  },
  { 
    id: 'p7', 
    name: 'Samsung 4K Smart TV 55"', 
    category: 'electronics', 
    price: 799, 
    originalPrice: 999, 
    stock: 3, 
    businessId: 'biz-1', 
    business: 'TechGear Pro', 
    status: 'approved', 
    description: 'Crystal UHD 4K smart television with multi-system smart home integration, HDR10+, PurColor technology, and Alexa built-in. Features high-framerate gameplay mode.', 
    rating: 4.6, 
    reviews: 89, 
    tags: ['tv', 'samsung', '4k'], 
    featured: false,
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&q=80',
    specs: {
      'Brand': 'Samsung',
      'Screen Size': '55 Inches',
      'Resolution': '4K UHD (3840 x 2160)',
      'Refresh Rate': '120Hz',
      'Smart Platform': 'Tizen OS',
      'HDMI Ports': '3 (HDMI 2.1 support)',
      'Dimensions': '48.4 x 27.8 x 1.0 inches',
      'Warranty': '1-Year Parts & Labor'
    }
  },
  { 
    id: 'p8', 
    name: 'Artisan Ceramic Mug Set', 
    category: 'home', 
    price: 42, 
    originalPrice: null, 
    stock: 120, 
    businessId: 'biz-4', 
    business: 'Brew Collective', 
    status: 'approved', 
    description: 'A set of 4 hand-thrown stoneware ceramic mugs in earthy neutral glazes. Microwave and dishwasher safe, featuring comfortable handles and a rustic, cozy aesthetic.', 
    rating: 4.8, 
    reviews: 63, 
    tags: ['mug', 'ceramic', 'home'], 
    featured: false,
    image: 'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?w=600&q=80',
    specs: {
      'Brand': 'Brew Collective',
      'Material': 'Stoneware Ceramic',
      'Quantity': 'Set of 4 Mugs',
      'Capacity': '14 oz (415ml)',
      'Finish': 'Hand-glazed speckled finish',
      'Safe': 'Microwave & Dishwasher Safe',
      'Dimensions': '3.8 x 3.2 inches',
      'Warranty': '30-Day Breakage Replacement'
    }
  },
  { 
    id: 'p9', 
    name: 'Atomic Habits (Hardcover)', 
    category: 'books', 
    price: 18, 
    originalPrice: 28, 
    stock: 300, 
    businessId: 'biz-7', 
    business: 'PageTurner Books', 
    status: 'approved', 
    description: 'The #1 New York Times bestseller by James Clear. Learn how tiny habits and incremental changes create remarkable, long-term personal and professional results.', 
    rating: 4.9, 
    reviews: 2347, 
    tags: ['book', 'self-help', 'bestseller'], 
    featured: true,
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80',
    specs: {
      'Author': 'James Clear',
      'Publisher': 'Avery',
      'Format': 'Hardcover',
      'Pages': '320 pages',
      'Language': 'English',
      'Weight': '1.0 lb (450g)',
      'Dimensions': '6.3 x 1.1 x 9.3 inches',
      'Warranty': '30-Day Return Guarantee'
    }
  },
  { 
    id: 'p10', 
    name: 'Designer Summer Dress', 
    category: 'fashion', 
    price: 89, 
    originalPrice: null, 
    stock: 0, 
    businessId: 'biz-3', 
    business: 'UrbanStyle Co', 
    status: 'pending_approval', 
    description: 'Lightweight, flowing floral print midi dress with adjustable straps and side slit details. Crafted from sustainable organic cotton, making it perfect for summer weather.', 
    rating: 0, 
    reviews: 0, 
    tags: ['dress', 'summer', 'floral'], 
    featured: false,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&q=80',
    specs: {
      'Brand': 'UrbanStyle Co',
      'Material': '100% Organic Cotton',
      'Fit': 'Regular Fit, Flowy',
      'Color': 'Teal Floral',
      'Care': 'Machine Wash Cold',
      'Sizes': 'XS, S, M, L',
      'Model Height': '5\'8" wearing size S',
      'Warranty': '30-Day Return Guarantee'
    }
  },
  { 
    id: 'p11', 
    name: 'Wireless Gaming Mouse', 
    category: 'electronics', 
    price: 129, 
    originalPrice: 159, 
    stock: 3, 
    businessId: 'biz-1', 
    business: 'TechGear Pro', 
    status: 'draft', 
    description: 'Ultra-lightweight 60g wireless gaming mouse with a 25K high-precision DPI optical sensor and 70-hour battery life. Optimized for competitive esports players.', 
    rating: 0, 
    reviews: 0, 
    tags: ['mouse', 'gaming', 'wireless'], 
    featured: false,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80',
    specs: {
      'Brand': 'TechGear Pro',
      'Sensor': '25K Optical Sensor',
      'Weight': '60g (Ultra-Light)',
      'Battery Life': 'Up to 70 Hours',
      'DPI Range': '100 - 25,600 DPI',
      'Connection': 'USB Wireless / Bluetooth',
      'Buttons': '6 Programmable Buttons',
      'Warranty': '2-Year Manufacturer Warranty'
    }
  },
  { 
    id: 'p12', 
    name: 'Leather Crossbody Bag', 
    category: 'fashion', 
    price: 149, 
    originalPrice: 199, 
    stock: 4, 
    businessId: 'biz-3', 
    business: 'UrbanStyle Co', 
    status: 'approved', 
    description: 'Full-grain Italian leather crossbody bag with adjustable shoulder strap, brass hardware, and multiple zippered storage compartments. Elegant, functional, and durable.', 
    rating: 4.7, 
    reviews: 55, 
    tags: ['bag', 'leather', 'fashion'], 
    featured: false,
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    specs: {
      'Brand': 'UrbanStyle Co',
      'Material': '100% Full-Grain Leather',
      'Lining': 'Organic Cotton Canvas',
      'Hardware': 'Solid Brass Hardware',
      'Strap Drop': '20 - 24 inches (Adjustable)',
      'Dimensions': '9.5 x 7.0 x 3.0 inches',
      'Weight': '1.2 lbs (540g)',
      'Warranty': '5-Year Leather Craft Warranty'
    }
  },
];

// ============================================
// MOCK BUSINESSES
// ============================================
export const MOCK_BUSINESSES = [
  { id: 'biz-1', name: 'TechGear Pro', category: 'Electronics', owner: 'Sarah Williams', products: 24, status: 'active', revenue: '$45,200', joined: '2024-01-15' },
  { id: 'biz-2', name: 'AudioWorld', category: 'Electronics', owner: 'Tom Harris', products: 12, status: 'active', revenue: '$18,900', joined: '2024-02-20' },
  { id: 'biz-3', name: 'UrbanStyle Co', category: 'Fashion', owner: 'Nina Patel', products: 67, status: 'active', revenue: '$32,100', joined: '2024-01-08' },
  { id: 'biz-4', name: 'Brew Collective', category: 'Food & Beverages', owner: 'Carlos Mendes', products: 18, status: 'active', revenue: '$9,800', joined: '2024-03-05' },
  { id: 'biz-5', name: 'GlowUp Beauty', category: 'Beauty', owner: 'Aisha Okonkwo', products: 45, status: 'pending', revenue: '$0', joined: '2024-05-01' },
  { id: 'biz-6', name: 'FitLife Store', category: 'Sports', owner: 'David Park', products: 33, status: 'active', revenue: '$21,600', joined: '2024-02-14' },
  { id: 'biz-7', name: 'PageTurner Books', category: 'Books', owner: 'Olivia Reed', products: 89, status: 'active', revenue: '$7,300', joined: '2023-11-20' },
];

// ============================================
// MOCK ORDERS
// ============================================
export const MOCK_ORDERS = [
  { id: 'ORD-001', customer: 'Lisa Anderson', items: [{ productId: 'p1', name: 'MacBook Pro 14"', qty: 1, price: 1999 }], total: 1999, status: 'delivered', date: '2026-05-10', paymentMethod: 'Visa Card' },
  { id: 'ORD-002', customer: 'John Smith', items: [{ productId: 'p2', name: 'Sony WH-1000XM5', qty: 1, price: 349 }, { productId: 'p4', name: 'Ethiopian Coffee', qty: 2, price: 56 }], total: 405, status: 'shipped', date: '2026-05-12', paymentMethod: 'Mobile Money' },
  { id: 'ORD-003', customer: 'Fatima Al-Zahra', items: [{ productId: 'p5', name: 'Vitamin C Serum', qty: 2, price: 90 }], total: 90, status: 'processing', date: '2026-05-13', paymentMethod: 'MasterCard' },
  { id: 'ORD-004', customer: 'Robert Kim', items: [{ productId: 'p9', name: 'Atomic Habits', qty: 3, price: 54 }], total: 54, status: 'pending', date: '2026-05-14', paymentMethod: 'Visa Card' },
  { id: 'ORD-005', customer: 'Sophie Turner', items: [{ productId: 'p7', name: 'Samsung 4K TV', qty: 1, price: 799 }], total: 799, status: 'delivered', date: '2026-05-08', paymentMethod: 'MasterCard' },
];
