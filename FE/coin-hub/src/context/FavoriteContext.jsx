import { createContext, useState } from "react";

const FavoriteContext = createContext();

function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const updatedFavorites = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

      return updatedFavorites;
    });
  };

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}

export { FavoriteContext, FavoriteProvider };
