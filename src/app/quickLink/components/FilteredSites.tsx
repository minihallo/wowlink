'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Site } from "@/types/site";
import { useState, useEffect, CSSProperties } from "react";

import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

interface HomeProps {
  initialSites: Site[];
}

interface SortableCardProps {
  site: Site;
  favorites: number[];
  toggleFavorite: (siteId: number) => void;
}

const categoryMapping: { [key: string]: string } = {
  guide: '가이드',
  tool: '도구',
  addon: '애드온',
  community: '커뮤니티'
};

function SortableCard({ site, favorites, toggleFavorite }: SortableCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: site.id });

  const transformStyle: CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  };

  const handleStyle: CSSProperties = {
    cursor: 'grab',
    touchAction: 'none',
    userSelect: 'none'
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 중지
    toggleFavorite(site.id);
  };

  return (
    <div ref={setNodeRef} style={transformStyle} >
      <Card key={site.id}>
        <CardHeader className="flex flex-row items-center gap-4 pt-2">
          <div className="w-12 h-12 relative flex-shrink-0">
            <Image
              src={site.icon}
              alt={`${site.name} 아이콘`}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-xl">{site.name}</CardTitle>
              <div {...attributes} {...listeners} style={handleStyle} className="touch-none cursor-grab p-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="text-gray-400">
                  <path d="M2 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-12 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm-12 6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>
              </div>
            </div>
            <CardDescription className="h-9 text-base">{site.description}</CardDescription>
          </div>
        </CardHeader>
        <CardFooter className="pb-4">
            <Link 
              href={site.url}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md text-center"
              target="_blank"
              onClick={e => e.stopPropagation()}
            >
              방문하기
            </Link>
            <div draggable={false}>
              <Button
                variant="outline"
                onClick={handleFavoriteClick}
                className={`h-10 w-10 ${
                  favorites.includes(site.id) 
                    ? "text-yellow-400 border-yellow-400 hover:border-yellow-500 hover:text-yellow-500" 
                    : "text-gray-400 hover:text-gray-500 hover:border-gray-500"
                }`}
              >
                <span className="text-2xl">★</span>
              </Button>
            </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function FilteredSites({ initialSites }: HomeProps) {
  const [sites, setSites] = useState<Site[]>(initialSites || []);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);  // site.id들을 저장
  const [isLoading, setIsLoading] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // 드래그 시작을 위한 최소 이동 거리 (픽셀)
      activationConstraint: {
        distance: 8, // 8px 이상 움직여야 드래그 시작
      },
    }),
    // 키보드 지원 추가
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const savedFavorites = localStorage.getItem('siteFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    // 저장된 순서 불러오기
    const savedOrder = localStorage.getItem('siteOrder');
    if (savedOrder && initialSites) {
      const orderIds = JSON.parse(savedOrder);
      const orderedSites = orderIds
        .map((id: number) => initialSites.find(site => site.id === id))
        .filter(Boolean);
      
      const newSites = initialSites.filter(
        site => !orderIds.includes(site.id)
      );
      
      setSites([...orderedSites, ...newSites]);
    }
  
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

  function handleDragEnd(event: any) {
    const {active, over} = event;
    
    if (active.id !== over.id) {
      setSites((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // 순서 저장
        const orderIds = newItems.map(item => item.id);
        localStorage.setItem('siteOrder', JSON.stringify(orderIds));
        
        return newItems;
      });
    }
  }

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

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={filteredSites.map(site => site.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSites.map((site) => (
              <SortableCard 
                key={site.id} 
                site={site} 
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}