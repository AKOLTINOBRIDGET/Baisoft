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
  { id: 'p1', name: 'MacBook Pro 14"', category: 'electronics', price: 1999, originalPrice: 2299, stock: 12, businessId: 'biz-1', business: 'TechGear Pro', status: 'approved', description: 'Powered by Apple M3 chip with up to 18 hours of battery life. Perfect for professionals.', rating: 4.8, reviews: 124, tags: ['laptop', 'apple', 'pro'], featured: true },
  { id: 'p2', name: 'Sony WH-1000XM5', category: 'electronics', price: 349, originalPrice: 399, stock: 45, businessId: 'biz-2', business: 'AudioWorld', status: 'approved', description: 'Industry-leading noise canceling headphones with exceptional sound quality and 30-hour battery.', rating: 4.9, reviews: 856, tags: ['headphones', 'sony', 'wireless'], featured: true },
  { id: 'p3', name: 'Premium Linen Blazer', category: 'fashion', price: 189, originalPrice: 249, stock: 28, businessId: 'biz-3', business: 'UrbanStyle Co', status: 'approved', description: 'Sophisticated linen blazer for a polished look. Available in multiple colors.', rating: 4.6, reviews: 92, tags: ['blazer', 'fashion', 'formal'], featured: false },
  { id: 'p4', name: 'Ethiopian Single Origin Coffee', category: 'food', price: 28, originalPrice: null, stock: 200, businessId: 'biz-4', business: 'Brew Collective', status: 'approved', description: 'Naturally processed single-origin coffee beans with notes of blueberry and dark chocolate.', rating: 4.7, reviews: 234, tags: ['coffee', 'organic', 'specialty'], featured: true },
  { id: 'p5', name: 'Vitamin C Serum', category: 'beauty', price: 45, originalPrice: 65, stock: 88, businessId: 'biz-5', business: 'GlowUp Beauty', status: 'approved', description: 'Clinical-strength 20% Vitamin C serum with hyaluronic acid and Vitamin E for radiant skin.', rating: 4.5, reviews: 418, tags: ['skincare', 'vitamin-c', 'serum'], featured: false },
  { id: 'p6', name: 'Yoga Mat Pro', category: 'sports', price: 79, originalPrice: 99, stock: 55, businessId: 'biz-6', business: 'FitLife Store', status: 'approved', description: 'Eco-friendly 6mm thick non-slip yoga mat with alignment lines and carrying strap.', rating: 4.4, reviews: 167, tags: ['yoga', 'fitness', 'eco'], featured: false },
  { id: 'p7', name: 'Samsung 4K Smart TV 55"', category: 'electronics', price: 799, originalPrice: 999, stock: 8, businessId: 'biz-1', business: 'TechGear Pro', status: 'approved', description: 'Crystal UHD 4K display with smart home integration, HDR10+, and built-in Alexa.', rating: 4.6, reviews: 89, tags: ['tv', 'samsung', '4k'], featured: false },
  { id: 'p8', name: 'Artisan Ceramic Mug Set', category: 'home', price: 42, originalPrice: null, stock: 120, businessId: 'biz-4', business: 'Brew Collective', status: 'approved', description: 'Hand-thrown stoneware mug set of 4 in earthy tones. Microwave and dishwasher safe.', rating: 4.8, reviews: 63, tags: ['mug', 'ceramic', 'home'], featured: false },
  { id: 'p9', name: 'Atomic Habits (Hardcover)', category: 'books', price: 18, originalPrice: 28, stock: 300, businessId: 'biz-7', business: 'PageTurner Books', status: 'approved', description: 'The #1 New York Times bestseller. Learn how tiny changes create remarkable results.', rating: 4.9, reviews: 2347, tags: ['book', 'self-help', 'bestseller'], featured: true },
  { id: 'p10', name: 'Designer Summer Dress', category: 'fashion', price: 89, originalPrice: null, stock: 0, businessId: 'biz-3', business: 'UrbanStyle Co', status: 'pending_approval', description: 'Lightweight floral print midi dress with adjustable straps. Perfect for summer.', rating: 0, reviews: 0, tags: ['dress', 'summer', 'floral'], featured: false },
  { id: 'p11', name: 'Wireless Gaming Mouse', category: 'electronics', price: 129, originalPrice: 159, stock: 34, businessId: 'biz-1', business: 'TechGear Pro', status: 'draft', description: 'Ultra-light 60g wireless mouse with 25K DPI sensor and 70-hour battery life.', rating: 0, reviews: 0, tags: ['mouse', 'gaming', 'wireless'], featured: false },
  { id: 'p12', name: 'Leather Crossbody Bag', category: 'fashion', price: 149, originalPrice: 199, stock: 22, businessId: 'biz-3', business: 'UrbanStyle Co', status: 'approved', description: 'Full-grain leather crossbody with adjustable strap and multiple compartments.', rating: 4.7, reviews: 55, tags: ['bag', 'leather', 'fashion'], featured: false },
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
