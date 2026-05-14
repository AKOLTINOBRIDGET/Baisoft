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
      className="overflow-hidden flex flex-col h-full cursor-pointer group"
    >
      <div 
        className="aspect-[4/3] bg-surface-secondary relative overflow-hidden flex items-center justify-center"
        onClick={() => onClick(product)}
      >
        <div className="text-6xl transition-transform duration-500 group-hover:scale-110">
          📦
        </div>
        {product.featured && (
          <Badge variant="brand" className="absolute top-3 left-3 shadow-sm">
            Featured
          </Badge>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start gap-2 mb-2" onClick={() => onClick(product)}>
          <div>
            <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-1">
              {product.business}
            </p>
            <h3 className="font-bold text-brand-text line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-4" onClick={() => onClick(product)}>
          <span className="text-yellow-400 text-sm">★</span>
          <span className="text-sm font-semibold">{product.rating}</span>
          <span className="text-xs text-brand-muted">({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div onClick={() => onClick(product)}>
            {product.originalPrice && (
              <p className="text-xs text-brand-muted line-through mb-0.5">
                ${product.originalPrice}
              </p>
            )}
            <p className="font-bold text-lg text-brand-text leading-none">
              ${product.price}
            </p>
          </div>
          
          <Button 
            variant="primary" 
            size="sm" 
            onClick={handleAddToCart}
            className="rounded-full px-4"
          >
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
});

ProductCard.displayName = 'ProductCard';
