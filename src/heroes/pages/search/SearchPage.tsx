import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useSearchParams } from "react-router";
import { useSearchHero } from "@/heroes/hooks/useSearchHero";

export const SearchPage = () => {
  const [ searchParams ] = useSearchParams();

  const name = searchParams.get('name') ?? undefined;
  const strength = searchParams.get('strength') ?? undefined;

  const { data: dataSearch = [] } = useSearchHero(name!, strength!);

  return (
    <>
      <CustomJumbotron 
        title="Busqueda de SuperHeroes"
        description="Descubre, explora y administra Heroes y Villanos"
      />

      <CustomBreadcrums currentPage="Buscador de heroes" breadcrumbs={[]} />

      { /* Stats Dashboard */ }
      <HeroStats />

      { /* Filter and search */ }
      <SearchControls />

      {/* Grid Results */}
      <HeroGrid heroes={ dataSearch ?? [] }/>
    </>
  )
}

export default SearchPage;
