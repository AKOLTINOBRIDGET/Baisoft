import { memo } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ShoppingCart } from 'lucide-react';

export const ProductCard = memo(({ product, onClick }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Card 
      hoverable 
      padding="none" 
      className="overflow-hidden flex flex-col h-full cursor-pointer group bg-white border border-gray-100/70 rounded-2xl shadow-soft hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 relative"
    >
      {/* Product Image Area */}
      <div 
        className="aspect-[4/3] bg-surface-secondary relative overflow-hidden flex items-center justify-center w-full"
        onClick={() => onClick(product)}
      >
        <div className="w-full h-full transition-transform duration-700 group-hover:scale-105 flex items-center justify-center relative">
          <img 
            src={product.image || '/logo.png'} 
            alt={product.name} 
            className={`w-full h-full ${product.image ? 'object-cover' : 'object-contain opacity-30 grayscale p-8'}`}
            onError={(e) => {
              e.target.src = '/logo.png';
              e.target.className = 'w-full h-full object-contain opacity-30 grayscale p-8';
            }}
          />
          {/* Subtle dark tint overlay on hover */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </div>

        {product.featured && (
          <Badge variant="brand" className="absolute top-3 left-3 shadow-md bg-gradient-to-r from-brand-green to-emerald-600 text-white font-bold tracking-wider text-[9px] px-2.5 py-0.5 rounded-full uppercase border-0">
            Featured
          </Badge>
        )}

        {/* Etsy-style Free Shipping Badge */}
        {product.price >= 35 && (
          <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-brand-text font-black text-[8px] px-2 py-0.5 rounded-md border border-gray-100/60 uppercase tracking-widest shadow-xs">
            ⚡ Free Shipping
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2.5" onClick={() => onClick(product)}>
          <div className="w-full">
            <div className="flex items-center gap-1.5 mb-2">
              <p className="text-[9px] font-black text-brand-green uppercase tracking-widest">
                {product.business}
              </p>
              {product.rating >= 4.7 && (
                <span className="bg-amber-500/10 text-amber-700 border border-amber-500/20 text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                  ★ Star Seller
                </span>
              )}
            </div>
            <h3 className="font-extrabold text-brand-text text-sm sm:text-base line-clamp-2 leading-tight group-hover:text-brand-green transition-colors duration-200">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mb-3.5" onClick={() => onClick(product)}>
          <div className="flex text-yellow-400 text-xs">
            {'★'.repeat(Math.round(product.rating || 5))}
            {'☆'.repeat(5 - Math.round(product.rating || 5))}
          </div>
          <span className="text-xs font-bold text-brand-text">{product.rating || 'New'}</span>
          <span className="text-[10px] text-brand-muted font-medium">({product.reviews || 0})</span>
        </div>

        {/* Stock Alert Badge */}
        {product.stock > 0 && product.stock <= 5 && (
          <p className="text-[11px] font-bold text-amber-600 mb-4 animate-pulse">
            🚨 Only {product.stock} left in stock - order soon!
          </p>
        )}
        {product.stock === 0 && (
          <p className="text-[11px] font-bold text-red-500 mb-4">
            Out of Stock
          </p>
        )}

        {/* Bottom Price & CTA Area */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div onClick={() => onClick(product)} className="flex flex-col">
            {product.originalPrice && (
              <p className="text-[10px] text-brand-muted line-through font-semibold mb-0.5">
                ${product.originalPrice}
              </p>
            )}
            <p className="font-black text-lg text-brand-text leading-none bg-gradient-to-r from-brand-text to-gray-700 bg-clip-text text-transparent">
              ${product.price}
            </p>
          </div>
          
          <Button 
            variant={product.stock === 0 ? 'ghost' : 'primary'} 
            size="xs" 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="rounded-full px-4 py-2 text-[10px] tracking-widest uppercase font-black flex items-center gap-1.5 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {product.stock === 0 ? (
              'Out'
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5 text-white" /> Add
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';
