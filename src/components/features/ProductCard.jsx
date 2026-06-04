import { memo } from 'react';
import { useCart } from '../../contexts/CartContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

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
      className="overflow-hidden flex flex-col h-full cursor-pointer group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative"
    >
      {/* Product Image Area */}
      <div 
        className="aspect-[4/3] bg-surface-secondary relative overflow-hidden flex items-center justify-center"
        onClick={() => onClick(product)}
      >
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-brand-green/5 to-brand-teal/20 flex items-center justify-center text-5xl">
            📦
          </div>
        )}

        {/* Featured Badge */}
        {product.featured && (
          <Badge variant="brand" className="absolute top-3 left-3 shadow-md bg-brand-green text-white font-bold tracking-wider text-[10px] px-2.5 py-0.5 rounded-full uppercase">
            Featured
          </Badge>
        )}

        {/* Etsy-style Free Shipping Badge */}
        {product.price >= 35 && (
          <span className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs text-brand-text font-bold text-[9px] px-2 py-0.5 rounded-md border border-gray-100 uppercase tracking-wider">
            ⚡ Free Shipping
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2" onClick={() => onClick(product)}>
          <div className="w-full">
            <div className="flex items-center gap-1.5 mb-1.5">
              <p className="text-[10px] font-bold text-brand-green uppercase tracking-widest">
                {product.business}
              </p>
              {product.rating >= 4.7 && (
                <span className="bg-amber-100 text-amber-800 text-[8px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                  ★ Star Seller
                </span>
              )}
            </div>
            <h3 className="font-bold text-brand-text text-sm sm:text-base line-clamp-2 leading-tight group-hover:text-brand-green transition-colors duration-200">
              {product.name}
            </h3>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 mb-3" onClick={() => onClick(product)}>
          <div className="flex text-yellow-400 text-sm">
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
        <div className="mt-auto pt-3 border-t border-gray-50 flex items-end justify-between">
          <div onClick={() => onClick(product)}>
            {product.originalPrice && (
              <p className="text-[10px] text-brand-muted line-through font-medium mb-0.5">
                ${product.originalPrice}
              </p>
            )}
            <p className="font-extrabold text-base sm:text-lg text-brand-text leading-none">
              ${product.price}
            </p>
          </div>
          
          <Button 
            variant={product.stock === 0 ? 'ghost' : 'primary'} 
            size="xs" 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="rounded-full px-3.5 py-1.5 text-xs tracking-wider uppercase font-bold"
          >
            {product.stock === 0 ? 'Out' : 'Add'}
          </Button>
        </div>
      </div>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';
