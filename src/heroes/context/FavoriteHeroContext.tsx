import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
    favorites: Hero[],
    favoriteCount: number

    //Methods
    isFavorite: (hero:Hero) => boolean,
    toogleFavorite: (hero:Hero) => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse('favorites') : [];
}

export const FavoriteHeroProvider = ({ children }:PropsWithChildren) => {
  
  const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

  const toogleFavorite = (hero: Hero) => {
    const heroExist = favorites.find( (h:Hero) => h.id === hero.id );
    if( heroExist ) {
        const newFavorites = favorites.filter( (h:Hero) => h.id !== hero.id );
        setFavorites( newFavorites );
        return;
    }

    setFavorites([...favorites, hero]);
  }

  const isFavorite = (hero: Hero) => {
    return favorites.some((h:Hero) => h.id === hero.id);
  }

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites])

  return (
    <FavoriteHeroContext
        value={{
            favoriteCount: favorites.length,
            favorites: favorites,

            isFavorite: isFavorite,
            toogleFavorite: toogleFavorite
        }}
    >
        { children }
    </FavoriteHeroContext>
  )
}
