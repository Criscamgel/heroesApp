import { Heart } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrums } from "@/components/custom/CustomBreadcrums"
import { useSearchParams } from "react-router"
import { useMemo } from "react"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"

export const HomePage = () => {

  const [ searchParams, setSearchParams ] = useSearchParams();

  const activeTab = searchParams.get('tab') ?? 'all';
  const page = searchParams.get('page') ?? '1';
  const limit = searchParams.get('limit') ?? '6';
  const category = searchParams.get('category') ?? 'aa';

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all'
  }, [activeTab])

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category);
  const { data: summary } = useHeroSummary();

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron 
          title="Universo de SuperHeroes"
          description="Descubre, explora y administra Heroes y Villanos"
        />

        <CustomBreadcrums currentPage="Super Heroes"/>

        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={ selectedTab } className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger 
              value="all"
              onClick={ () => 
                setSearchParams((prev) => {
                  //No se pierde el queryParam al aniadirle los demas
                  prev.set('tab', 'all');
                  prev.set('category', 'all');
                  prev.set('page', '1');
                  return prev;  
                })}
            >All Characters ({ summary?.totalHeroes })</TabsTrigger>
            <TabsTrigger 
              value="favorites" 
              className="flex items-center gap-2"
              onClick={ () => 
                setSearchParams((prev) => {
                  prev.set('tab', 'favorites');
                  return prev;  
                })}
              >
              <Heart className="h-4 w-4" />
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger 
              value="heroes"
              onClick={ () => 
                setSearchParams((prev) => {
                  prev.set('tab', 'heroes');
                  prev.set('category', 'hero');
                  prev.set('page', '1');
                  return prev;  
                })}
              >Heroes ({ summary?.heroCount })</TabsTrigger>
            <TabsTrigger 
              value="villains"
              onClick={ () => 
                setSearchParams((prev) => {
                  prev.set('tab', 'villains');
                  prev.set('category', 'villain');
                  prev.set('page', '1');
                  return prev;  
                })}
              >Villains ({ summary?.villainCount })</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            { /*Mostrat todos los personajes */ }
            <HeroGrid heroes={ heroesResponse?.heroes ?? [] }/>
          </TabsContent>
          <TabsContent value="favorites">
            { /*Mostrat todos los personajes favoritos */ }
            <HeroGrid heroes={[]}/>
          </TabsContent>
          <TabsContent value="heroes">
            { /*Mostrat todos los heroes */ }
            <HeroGrid heroes={ heroesResponse?.heroes ?? [] }/>
          </TabsContent>
          <TabsContent value="villains">
            { /*Mostrat todos los villanos */ }
            <HeroGrid heroes={ heroesResponse?.heroes ?? [] }/>
          </TabsContent>
        </Tabs>

        {/* Pagination */}
        <CustomPagination totalPages={ heroesResponse?.pages ?? 1 } />
      </>
    </>
  )
}