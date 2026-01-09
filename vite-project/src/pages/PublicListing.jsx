import { COLORS } from '../components/colors';

export const PublicListing = ({ products }) => {
  const approvedProducts = products.filter(p => p.status === 'approved');

  return (
    <div className="min-h-screen bg-white">
      <nav className="p-6 border-b flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: COLORS.secondary }}>ProductHub Shop</h1>
        <button className="text-gray-600 font-medium">Login to Manage</button>
      </nav>
      
      <div className="max-w-7xl mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {approvedProducts.map(product => (
            <div key={product.id} className="group cursor-pointer">
              <div className="aspect-square bg-gray-100 rounded-2xl mb-4 overflow-hidden flex items-center justify-center text-4xl">
                📦
              </div>
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{product.business}</p>
              <p className="font-bold text-xl" style={{ color: COLORS.secondary }}>
                ${product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};