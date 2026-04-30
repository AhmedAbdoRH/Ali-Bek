import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface ProductCardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  salePrice?: string | null;
  id: string | number;
}

export default function ProductCard({ title, description, imageUrl, price, salePrice, id }: ProductCardProps) {
  /**
   * Handles the click event for the "Contact Now" button.
   * Prevents the default link behavior and opens a WhatsApp chat
   * with a pre-filled message including product details.
   * @param e - The mouse event.
   */
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent the default link behavior
    // Construct the URL for the specific product page
    const productUrl = `${window.location.origin}/product/${id}`;;
    // Create the pre-filled message for WhatsApp
    const message = `استفسار عن المنتج: ${title}
رابط المنتج: ${productUrl}`;
    // Open the WhatsApp chat link in a new tab
    window.open(`https://wa.me/201099490594?text=${encodeURIComponent(message)}`, '_blank');
  };

  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAdding(true);
    
    // Add to cart
    addToCart({
      id,
      title,
      price: salePrice || price, // Use sale price if available
      imageUrl,
    });
    
    // Show added feedback
    setIsAdded(true);
    
    // Reset button state after animation
    setTimeout(() => {
      setIsAdding(false);
      setTimeout(() => setIsAdded(false), 2000);
    }, 1000);
  };

  return (
    <div className="group relative bg-white border border-gray-200 overflow-hidden transition-all duration-150 hover:scale-105 hover:shadow-lg">
      <Link to={`/product/${id}`} className="block">
        <div className="relative aspect-[3/4] w-full">
          <img
            src={imageUrl}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
            <h3 className="text-base font-bold text-white text-center">
              {title}
            </h3>
          </div>
        </div>
        <div className="px-4 py-3">
          <p className="text-gray-600 text-sm">
            {description.split(/\r?\n/)[0]}
          </p>
        </div>
      </Link>
      
      <div className="px-4 py-4 bg-gray-900">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-end">
            {salePrice ? (
              <>
                <span className="font-bold text-lg text-white">{salePrice} ج</span>
                <span className="text-sm text-gray-400 line-through">{price} ج</span>
              </>
            ) : (
              <span className="font-bold text-lg text-white">{price} ج</span>
            )}
          </div>
          
          <div className="flex gap-2">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isAdding || isAdded}
              className={`flex items-center justify-center p-2 transition-all duration-300 ${
                isAdded 
                  ? 'bg-green-500 text-white' 
                  : `bg-[#c1121f] hover:bg-red-600 text-yellow-400`
              } ${isAdding ? 'opacity-75' : ''}`}
              title={isAdded ? 'تمت الإضافة' : 'أضف إلى السلة'}
            >
              {isAdding ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isAdded ? (
                <Check className="h-5 w-5" />
              ) : (
                <ShoppingCart className="h-5 w-5" />
              )}
            </button>
            
            {/* Contact Button */}
            <button
              onClick={handleContactClick}
              className="bg-[#c1121f] hover:bg-red-600 text-yellow-400 px-4 py-2 transition-colors duration-300 flex items-center gap-2"
            >
              <MessageCircle className="h-5 w-5 text-white" />
              <span className="hidden sm:inline text-white">اطلب الآن</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}