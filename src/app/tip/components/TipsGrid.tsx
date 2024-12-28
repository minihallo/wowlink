'use client';

import React, { useState } from 'react';
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Tip } from '@/types/tip';

interface TipsGridProps {
  tips: Tip[];
}

const logoMapping: { [key: string]: string }  = {
  inven: '/images/sites/inven.png',
  potion: '/images/sites/potion.jpeg'
};

const TipsGrid = ({ tips }: TipsGridProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTag = selectedTag ? tip.tags?.includes(selectedTag) : true;

    return matchesSearch && matchesTag;
  });

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  return (
    <div className="space-y-6 min-w-[350px] max-w-[800px] w-full mx-auto px-4">
      <div className="flex flex-col gap-4 w-full">
        <Input 
          placeholder="제목이나 태그로 검색하세요..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredTips.map((tip) => (
          <Card key={tip.title} className="hover:bg-accent/50 transition-colors">
            <Link href={tip.url} target="_blank" className="block">
              <CardHeader className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={logoMapping[tip.platform] || '/images/assets/wowtoken.png'}
                      alt="Platform logo"
                      width={40}
                      height={40}
                      className="rounded"
                    />
                  </div>
                  <div className="flex-1 space-y-2 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium leading-none">{tip.title}</h3>
                      <ExternalLink className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                    </div>
                    {tip.tags && tip.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tip.tags.map((tag: string) => (
                          <Badge 
                            key={tag} 
                            variant={selectedTag === tag ? "default" : "secondary"}
                            className="text-xs cursor-pointer hover:opacity-80"
                            onClick={(e) => {
                              e.preventDefault(); // Link 클릭 방지
                              handleTagClick(tag);
                            }}
                          >
                            # {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TipsGrid;