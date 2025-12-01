import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums";

export const SearchPage = () => {
  return (
    <>
      <CustomJumbotron 
        title="Busqueda de SuperHeroes"
        description="Descubre, explora y administra Heroes y Villanos"
      />

      <CustomBreadcrums currentPage="Buscador de heroes" breadcrumbs={[
        { label: 'Home1', to: '/' },
        { label: 'Home2', to: '/' },
        { label: 'Home3', to: '/' },
      ]} />

      { /* Stats Dashboard */ }
      <HeroStats />

      { /* Filter and search */ }
      <SearchControls />
    </>
  )
}

export default SearchPage;
