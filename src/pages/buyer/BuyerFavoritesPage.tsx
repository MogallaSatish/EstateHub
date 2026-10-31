import React, { useState } from 'react';
import { DashboardLayout } from '../../components/common/DashboardLayout';
import { PropertyCard } from '../../components/common/PropertyCard';
import { mockProperties } from '../../data/mockData';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BuyerFavoritesPage: React.FC = () => {
  const [favoriteList, setFavoriteList] = useState(mockProperties.slice(0, 3));

  const handleRemove = (id: string) => {
    setFavoriteList(favoriteList.filter(p => p.id !== id));
  };

  return (
    <DashboardLayout
      portalRole="BUYER"
      title="Saved Favorite Properties"
      subtitle="Compare your bookmarked residences, villas, and open plot investments in Vijayawada."
    >
      <div className="space-y-6">
        {favoriteList.length > 0 ? (
          <>
            <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-200">
              <span>{favoriteList.length} Properties Saved</span>
              <button
                onClick={() => setFavoriteList([])}
                className="text-rose-600 hover:underline font-semibold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Clear All Favorites
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteList.map((property) => (
                <div key={property.id} className="relative">
                  <PropertyCard property={property} isBookmarked />
                  <button
                    onClick={() => handleRemove(property.id)}
                    className="absolute top-2 right-12 z-20 bg-white/90 hover:bg-white text-rose-600 p-1.5 rounded-full shadow border border-slate-200 text-xs transition"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto space-y-3">
            <Heart className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-[#001637]">Your Favorites List is Empty</h3>
            <p className="text-xs text-slate-500">
              Browse verified ventures and click the heart icon on any listing card to save it for quick review.
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#2563eb] text-white text-xs font-bold shadow transition mt-2"
            >
              <span>Explore Verified Properties</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

