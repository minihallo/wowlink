'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Site } from "@/types/site";
import { useState, useEffect } from "react";

interface HomeProps {
  initialSites: Site[];
}

const categoryMapping: { [key: string]: string } = {
  guide: '가이드',
  tool: '도구',
  addon: '애드온',
  community: '커뮤니티'
};

export default function FilteredSites({ initialSites }: HomeProps) {
  const [sites, setSites] = useState<Site[]>(initialSites || []);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);  // site.id들을 저장
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 즐겨찾기만 로드
    const savedFavorites = localStorage.getItem('siteFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  
    // initialSites가 있으면 카테고리만 설정
    if (initialSites && initialSites.length > 0) {
      const newCategories = Array.from(new Set(initialSites.map(site => site.category)));
      setCategories(newCategories);
    }
  }, [initialSites]);

  // 즐겨찾기 토글 함수
  const toggleFavorite = (siteId: number) => {
    const newFavorites = favorites.includes(siteId)
      ? favorites.filter(id => id !== siteId)
      : [...favorites, siteId];
    
    setFavorites(newFavorites);
    localStorage.setItem('siteFavorites', JSON.stringify(newFavorites));
  };


  // 사이트 필터링
  const filteredSites = sites.filter(site => {
    if (showFavorites) {
      return favorites.includes(site.id);
    }
    if (selectedCategory) {
      return site.category === selectedCategory;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 mt-6">
        <Button
          variant={!showFavorites && !selectedCategory ? "default" : "outline"}
          onClick={() => {
            setSelectedCategory(null);
            setShowFavorites(false);
          }}
        >
          전체
        </Button>
        <Button
          variant={showFavorites ? "default" : "outline"}
          onClick={() => {
            setShowFavorites(!showFavorites);
            setSelectedCategory(null);
          }}
          className="flex items-center gap-2"
        >
          <span className={showFavorites ? "text-yellow-400" : "text-gray-400"}>★</span>
          즐겨찾기
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => {
              setSelectedCategory(selectedCategory === category ? null : category);
              setShowFavorites(false);
            }}
          >
            {categoryMapping[category] || category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSites.map((site) => (
          <Card key={site.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 relative flex-shrink-0">
                <Image
                  src={site.icon}
                  alt={`${site.name} 아이콘`}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex-1">
                <CardTitle className="mb-2">{site.name}</CardTitle>
                <CardDescription className="h-9">{site.description}</CardDescription>
              </div>
            </CardHeader>
            <CardFooter className="mt-2">
              <Link 
                href={site.url}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-center"
                target="_blank"
              >
                방문하기
              </Link>
              <Button
                variant="outline"
                onClick={() => toggleFavorite(site.id)}
                className={`h-10 w-10 ${
                  favorites.includes(site.id) 
                    ? "text-yellow-400 border-yellow-400 hover:border-yellow-500 hover:text-yellow-500" 
                    : "text-gray-400 hover:text-gray-500 hover:border-gray-500"
                }`}
              >
                <span className="text-2xl">★</span>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}