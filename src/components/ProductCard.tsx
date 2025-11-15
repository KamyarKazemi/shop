import { useSelector } from "react-redux";
import type { Product } from "../redux/slices/fetchAllProducts";
import { useState, useContext } from "react";
import type { RootState } from "../redux/store";
import { CartContext } from "../contexts/cartContext";

function ProductCard() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const { handleCart, cartItems, updateCartItem } = useContext(CartContext)!;

  const { products, productsStatus, productsError } = useSelector(
    (state: RootState) => state.fetchAllProductsState
  );

  if (productsStatus === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h3 className="text-2xl font-semibold text-gray-600">
          Loading products...
        </h3>
      </div>
    );
  }

  if (productsStatus === "failed") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h3 className="text-2xl font-semibold text-red-600">
          Error: {productsError}
        </h3>
      </div>
    );
  }

  return (
    <div className=" z-0 min-h-screen bg-gradient-to-br from-gray-50 to-gray-150 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products?.map((product: Product) => {
          const isHovered = hoveredId === product.id;

          //

          return (
            <div
              key={product.id}
              className="relative xl:max-w-[85%] md:max-w-[100%] group"
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div
                className={`
                  relative bg-white rounded-2xl overflow-hidden shadow-lg
                  transition-all duration-300 ease-out
                  ${isHovered ? "scale-105 shadow-2xl" : "scale-100"}
                `}
              >
                <div className="relative overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.title}
                    className={`
                      w-full h-full object-cover transition-transform duration-500
                      ${isHovered ? "scale-110" : "scale-100"}
                    `}
                  />

                  <div
                    className={`
                      absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent
                      transition-opacity duration-300
                      ${isHovered ? "opacity-100" : "opacity-0"}
                    `}
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <h3>{product.stock}</h3>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-1 sm:gap-0">
                    <span className="text-base font-bold text-blue-600">
                      ${product.price}
                    </span>
                    {!isHovered && (
                      <span className="text-sm text-gray-500">
                        {product.caption}
                      </span>
                    )}
                  </div>

                  <div
                    className={`
                      transition-all duration-300 ease-out overflow-hidden
                      ${
                        isHovered ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                      }
                    `}
                  >
                    <div className="pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-4">
                        {product.details}
                      </p>

                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                          <button
                            className="flex-1 w-full bg-gradient-to-r from-blue-500 to-blue-600 
                                       text-white font-semibold py-2.5 rounded-lg
                                       cursor-pointer
                                       hover:from-blue-600 hover:to-blue-700
                                       transform hover:scale-[1.02] active:scale-[0.98]
                                       transition-all duration-200 shadow-md"
                            onClick={() => handleCart(product.id)}
                            disabled={product.stock <= 0}
                            aria-disabled={product.stock <= 0}
                          >
                            {product.stock > 0 ? "Add to Cart" : "Out of stock"}
                          </button>

                          {/* inline quantity controls shown when item exists in cart */}
                          {product.stock > 0 &&
                          (cartItems[product.id] ?? 0) > 0 ? (
                            <div className="inline-flex items-center gap-2 bg-white/5 rounded px-2 py-1">
                              <button
                                aria-label="Decrease quantity"
                                onClick={() =>
                                  updateCartItem(
                                    product.id,
                                    (cartItems[product.id] ?? 0) - 1
                                  )
                                }
                                className="px-2 py-1 bg-white/10 rounded hover:bg-white/20"
                              >
                                −
                              </button>
                              <div className="px-2 font-semibold">
                                {cartItems[product.id]}
                              </div>
                              <button
                                aria-label="Increase quantity"
                                onClick={() =>
                                  updateCartItem(
                                    product.id,
                                    (cartItems[product.id] ?? 0) + 1
                                  )
                                }
                                className="px-2 py-1 bg-white/10 rounded hover:bg-white/20"
                              >
                                +
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductCard;
