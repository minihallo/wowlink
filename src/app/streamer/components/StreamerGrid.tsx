import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

const categoryMapping = {
  korean: '한국',
  global: '해외'
};

const StreamerGrid = ({ streamers }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = Array.from(new Set(streamers.map(streamer => streamer.category)));

  const filteredStreamers = streamers.filter(streamer => 
    !selectedCategory || streamer.category === selectedCategory
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
          className="text-sm"
        >
          전체
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            className="text-sm"
          >
            {categoryMapping[category] || category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredStreamers.map((streamer) => (
          <Card key={streamer.name} className="hover:bg-accent">
            <Link href={streamer.url} target="_blank" className="block h-full">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{streamer.name}</CardTitle>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
              </CardHeader>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StreamerGrid;