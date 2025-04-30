import { Site } from '@/types/site';
import fs from 'fs';
import path from 'path';

interface DB {
sites: Site[];
// ... 다른 컬렉션들
}
  
export default class DBManager {
    private dbPath: string;
    private data: DB;

    constructor() {
        this.dbPath = path.join(process.cwd(), 'db.json');
        this.data = this.readDB();
    }

    private readDB(): DB {
        const rawData = fs.readFileSync(this.dbPath, 'utf-8');
        return JSON.parse(rawData);
    }

    private writeDB() {
        fs.writeFileSync(this.dbPath, JSON.stringify(this.data, null, 2));
    }

    addSite(site: Omit<Site, 'id'>) {
        const maxId = Math.max(...this.data.sites.map(site => site.id));
        const newSite = {
            ...site,
            id: maxId + 1
        };
        
        this.data.sites.push(newSite);
        this.writeDB();
        return newSite;
    }
}