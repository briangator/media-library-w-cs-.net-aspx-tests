/**
 * Written by Brian McCarthy
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Terminal, Book as BookIcon, Disc, Music, Search, PlusCircle, FileText, Settings, Database, Shield, Zap, Activity, Users, ShoppingCart, Play, ExternalLink, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- TS REPRESENTATIONS FOR FRONTEND SIMULATION (CORE LOGIC IS IN .CS FILES) ---
abstract class MediaItem {
  static nextId = 1;
  id: number;
  mediaId: number; // Added to match .cs and some UI usages
  constructor(
    public title: string,
    public year: number,
    public thumbnail: string = "",
    public reviewScore: number = 0
  ) {
    this.id = MediaItem.nextId++;
    this.mediaId = this.id;
  }
  matchesSearch(term: string): boolean {
    const search = term.toLowerCase();
    return this.title.toLowerCase().includes(search) || 
           this.getShortDescription().toLowerCase().includes(search);
  }
  virtualGetEstimatedValue(): number {
    return Math.max(5.0, 25.0 - ((new Date().getFullYear() - this.year) * 2.0));
  }
  abstract getCategoryInfo(): string;
  abstract getShortDescription(): string;
}

class Book extends MediaItem {
  constructor(title: string, year: number, public author: string, public pageCount: number, thumbnail: string = "", reviewScore: number = 0) {
    super(title, year, thumbnail, reviewScore);
  }
  getCategoryInfo() { return "Literature"; }
  getShortDescription() { return `${this.title} by ${this.author}`; }
  virtualGetEstimatedValue() {
    return super.virtualGetEstimatedValue() + (this.pageCount > 300 ? 5.0 : 0.0);
  }
}

class DVD extends MediaItem {
  constructor(title: string, year: number, public director: string, public runtimeMinutes: number, thumbnail: string = "", reviewScore: number = 0, public trailerUrl: string = "") {
    super(title, year, thumbnail, reviewScore);
  }
  getCategoryInfo() { return "Film"; }
  getShortDescription() { return `${this.title} directed by ${this.director}`; }
  virtualGetEstimatedValue() {
    return super.virtualGetEstimatedValue() + (this.runtimeMinutes > 120 ? 3.0 : 0.0);
  }
}

class MusicAlbum extends MediaItem {
  runtimeMinutes: number; // Map tracks to runtime for UI simplicity in this simulation
  constructor(title: string, year: number, public artist: string, public tracks: number, thumbnail: string = "", reviewScore: number = 0, public sampleUrl: string = "") {
    super(title, year, thumbnail, reviewScore);
    this.runtimeMinutes = tracks * 4; // Simulated runtime
  }
  getCategoryInfo() { return "Music"; }
  getShortDescription() { return `${this.title} by ${this.artist}`; }
  virtualGetEstimatedValue() {
    return super.virtualGetEstimatedValue() + (this.tracks > 12 ? 4.0 : 0.0);
  }
}

class MediaLibrary {
  items: MediaItem[] = [];
  addItem(item: MediaItem) { this.items.push(item); }
  getDetailedReport(): string[] {
    const report = ["=== Detailed Library Report ==="];
    let totalValue = 0;
    this.items.forEach(item => {
      const val = item.virtualGetEstimatedValue();
      report.push(`${item.title} | Value: $${val.toFixed(2)}`);
      totalValue += val;
    });
    report.push(`Total Library Value: $${totalValue.toFixed(2)}`);
    return report;
  }
}

export default function App() {
  const [library] = useState(new MediaLibrary());
  const [logs, setLogs] = useState<string[]>([]);
  const [view, setView] = useState<'terminal' | 'dashboard' | 'about' | 'contact' | 'checkout'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<MediaItem[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // --- 15 TECH BOOKS ---
      const books = [
        new Book("Programming C# 12", 2023, "Ian Griffiths", 850, "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400", 4.8),
        new Book("The C# Player's Guide", 2021, "RB Whitaker", 500, "https://images.unsplash.com/photo-1544648156-5388451882c5?w=400", 4.9),
        new Book("Pro ASP.NET Core 7", 2023, "Adam Freeman", 1200, "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400", 4.7),
        new Book("Python Crash Course", 2019, "Eric Matthes", 544, "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400", 4.9),
        new Book("Fluent Python", 2022, "Luciano Ramalho", 1000, "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400", 4.8),
        new Book("Eloquent JavaScript", 2018, "Marijn Haverbeke", 472, "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400", 4.7),
        new Book("You Don't Know JS Yet", 2020, "Kyle Simpson", 200, "https://images.unsplash.com/photo-1523289333742-be1143f6b766?w=400", 4.9),
        new Book("Clean Code", 2008, "Robert C. Martin", 464, "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=400", 4.8),
        new Book("Code Complete", 2004, "Steve McConnell", 960, "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400", 4.7),
        new Book("The Pragmatic Programmer", 2019, "Andy Hunt", 352, "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400", 4.9),
        new Book("Refactoring", 2018, "Martin Fowler", 448, "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400", 4.8),
        new Book("JavaScript: The Good Parts", 2008, "Douglas Crockford", 176, "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=400", 4.5),
        new Book("Domain-Driven Design", 2003, "Eric Evans", 560, "https://images.unsplash.com/photo-1533709752250-7117565451e0?w=400", 4.6),
        new Book("Patterns of Enterprise Application Architecture", 2002, "Martin Fowler", 560, "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", 4.7),
        new Book("C# in Depth", 2019, "Jon Skeet", 528, "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400", 4.9)
      ];

      // --- 15 TECH DVDS ---
      const dvds = [
        new DVD("The Matrix", 1999, "Lana & Lilly Wachowski", 136, "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400", 4.9, "https://www.youtube.com/watch?v=vKQi3bBA1y8"),
        new DVD("The Social Network", 2010, "David Fincher", 120, "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400", 4.7, "https://www.youtube.com/watch?v=lB95KLmpLR4"),
        new DVD("Ex Machina", 2014, "Alex Garland", 108, "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400", 4.8, "https://www.youtube.com/watch?v=bggUmgeMCdc"),
        new DVD("Pirates of Silicon Valley", 1999, "Martyn Burke", 95, "https://images.unsplash.com/photo-1525547718571-03964923793e?w=400", 4.6, "https://www.youtube.com/watch?v=lEyQiTmWnsc"),
        new DVD("WarGames", 1983, "John Badham", 114, "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400", 4.5, "https://www.youtube.com/watch?v=hbqMuvnx5MU"),
        new DVD("Her", 2013, "Spike Jonze", 126, "https://images.unsplash.com/photo-1484417856246-447f3ca954e7?w=400", 4.7, "https://www.youtube.com/watch?v=6QRvTv_tpw0"),
        new DVD("Minority Report", 2002, "Steven Spielberg", 145, "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400", 4.6, "https://www.youtube.com/watch?v=lG7DGMgfM8g"),
        new DVD("Ready Player One", 2018, "Steven Spielberg", 140, "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?w=400", 4.4, "https://www.youtube.com/watch?v=cSp1dM2Vj48"),
        new DVD("The Imitation Game", 2014, "Morten Tyldum", 114, "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400", 4.8, "https://www.youtube.com/watch?v=nuPZUUED5uk"),
        new DVD("TRON", 1982, "Steven Lisberger", 96, "https://images.unsplash.com/photo-1510511459019-5dee211c18d9?w=400", 4.3, "https://www.youtube.com/watch?v=3efV2qt9fzU"),
        new DVD("Hackers", 1995, "Iain Softley", 107, "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400", 4.2, "https://www.youtube.com/watch?v=Rn2cf_wJ4f4"),
        new DVD("Silicon Valley", 2014, "Mike Judge", 30, "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400", 4.9, "https://www.youtube.com/watch?v=69V__a49xtw"),
        new DVD("Upgrade", 2018, "Leigh Whannell", 100, "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400", 4.5, "https://www.youtube.com/watch?v=36PDeNHeLXY"),
        new DVD("Searching", 2018, "Aneesh Chaganty", 102, "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400", 4.6, "https://www.youtube.com/watch?v=3Ro9ebASx96"),
        new DVD("The Creator", 2023, "Gareth Edwards", 133, "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400", 4.4, "https://www.youtube.com/watch?v=ex3C1bbDkgU")
      ];

      // --- 15 CLASSIC ALBUMS ---
      const albums = [
        new MusicAlbum("The Marshall Mathers LP", 2000, "Eminem", 18, "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400", 4.9),
        new MusicAlbum("Come Away With Me", 2002, "Norah Jones", 14, "https://images.unsplash.com/photo-1453090927415-5f45085b65c0?w=400", 4.8),
        new MusicAlbum("Stankonia", 2000, "OutKast", 24, "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400", 4.7),
        new MusicAlbum("A Rush of Blood to the Head", 2002, "Coldplay", 11, "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400", 4.8),
        new MusicAlbum("The Eminem Show", 2002, "Eminem", 20, "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=400", 4.9),
        new MusicAlbum("Hybrid Theory", 2000, "Linkin Park", 12, "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=400", 4.8),
        new MusicAlbum("Get Rich or Die Tryin'", 2003, "50 Cent", 16, "https://images.unsplash.com/photo-1514525253344-99a42d7443c5?w=400", 4.6),
        new MusicAlbum("Back to Black", 2006, "Amy Winehouse", 11, "https://images.unsplash.com/photo-1459749411177-0421800673d6?w=400", 4.9),
        new MusicAlbum("The Blueprint", 2001, "Jay-Z", 13, "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400", 4.9),
        new MusicAlbum("Elephant", 2003, "The White Stripes", 14, "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?w=400", 4.7),
        new MusicAlbum("The College Dropout", 2004, "Kanye West", 21, "https://images.unsplash.com/photo-1520529277867-dbf8c5e0b340?w=400", 4.8),
        new MusicAlbum("Oops!... I Did It Again", 2000, "Britney Spears", 12, "https://images.unsplash.com/photo-1514705139594-7f15d95183b1?w=400", 4.5),
        new MusicAlbum("All That You Can't Leave Behind", 2000, "U2", 11, "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400", 4.6),
        new MusicAlbum("The Fame", 2008, "Lady Gaga", 14, "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400", 4.7),
        new MusicAlbum("American Idiot", 2004, "Green Day", 13, "https://images.unsplash.com/photo-1521337583939-81fb41294221?w=400", 4.8)
      ];
      
      [...books, ...dvds, ...albums].forEach(item => library.addItem(item));

      log("Media Library Pro v2.0 Initialized.");
      log("Written by Brian McCarthy");
      log(`Total items in core memory: ${library.items.length}`);
    } catch (e) {
      log(`Initialization Error: ${(e as Error).message}`);
    }
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const log = (msg: string) => {
    setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const addToCart = (item: MediaItem) => {
    setCart(prev => [...prev, item]);
    log(`Added to cart: ${item.title} ($${item.virtualGetEstimatedValue().toFixed(2)})`);
  };

  const filteredItems = library.items.filter(item => 
    item.matchesSearch(searchTerm)
  );

  const topRated = useMemo(() => {
    const getUniqueTop = (items: MediaItem[]) => {
      const unique = new Map<string, MediaItem>();
      [...items]
        .sort((a, b) => b.reviewScore - a.reviewScore)
        .forEach(item => {
          if (!unique.has(item.title)) {
            unique.set(item.title, item);
          }
        });
      return Array.from(unique.values()).slice(0, 5);
    };

    return {
      books: getUniqueTop(library.items.filter(i => i instanceof Book)),
      movies: getUniqueTop(library.items.filter(i => i instanceof DVD)),
      music: getUniqueTop(library.items.filter(i => i instanceof MusicAlbum))
    };
  }, [library.items.length]);

  const cartTotal = cart.reduce((sum, item) => sum + item.virtualGetEstimatedValue(), 0);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 font-sans selection:bg-blue-500 selection:text-white pb-20">
      {/* Navigation */}
      <header className="border-b border-neutral-800 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg shadow-lg shadow-blue-900/20">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">C# MediaLibrary <span className="text-blue-500">Pro</span> <span className="text-base ml-1">📚🎬🎵</span></h1>
              <p className="text-[10px] text-neutral-500 font-mono">Written by Brian McCarthy</p>
            </div>
          </div>
          
          <div className="flex items-center gap-1 bg-neutral-900 p-1 rounded-xl">
            <button onClick={() => setView('dashboard')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${view === 'dashboard' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}>
              Dashboard
            </button>
            <button onClick={() => setView('about')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${view === 'about' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}>
              About
            </button>
            <button onClick={() => setView('contact')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${view === 'contact' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}>
              Contact
            </button>
            <button onClick={() => setView('terminal')} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${view === 'terminal' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-400 hover:text-white'}`}>
              Terminal
            </button>
          </div>

          <div className="flex items-center gap-4">
             <div className="relative cursor-pointer group" title="Shopping Cart" onClick={() => setView('checkout')}>
                <ShoppingCart className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
             </div>
             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-xs ring-2 ring-blue-500/20">BM</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {view === 'dashboard' ? (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-12">
              
              {/* Top 5 Panels */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <TopFivePanel title="Top Technical Books" items={topRated.books} icon={<BookIcon className="text-emerald-500" />} />
                <TopFivePanel title="Top Tech Movie DVDs 🎬" items={topRated.movies} icon={<Disc className="text-amber-500" />} />
                <TopFivePanel title="Top Music Albums" items={topRated.music} icon={<Music className="text-rose-500" />} />
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-end md:items-center bg-neutral-900/30 p-6 rounded-3xl border border-neutral-800/50">
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold">Catalog Explorer</h2>
                  <p className="text-sm text-neutral-500">Displaying {filteredItems.length} curated assets</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input 
                      type="text" 
                      placeholder="Search title, author, artist..." 
                      className="w-full md:w-80 bg-neutral-900 border border-neutral-800 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all font-mono"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item, idx) => (
                  <ItemCard key={`${item.mediaId}-${idx}`} item={item} onAddToCart={addToCart} />
                ))}
              </div>
            </motion.div>
          ) : view === 'terminal' ? (
            <motion.div key="terminal" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="bg-black rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden h-[75vh] flex flex-col">
              <div className="bg-neutral-900 px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-rose-500/50" /><div className="w-3 h-3 rounded-full bg-amber-500/50" /><div className="w-3 h-3 rounded-full bg-emerald-500/50" /></div>
                  <span className="text-xs font-mono text-neutral-500 ml-4">media@library-system: ~ Written by Brian McCarthy</span>
                </div>
                <button onClick={() => { log("--- GENERATING REPORT ---"); library.getDetailedReport().forEach(l => log(l)); }} className="text-xs bg-blue-600/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded hover:bg-blue-600/30">
                  Generate Report
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-1">
                {logs.map((log, i) => (
                  <div key={i} className={log.includes('Error') ? 'text-rose-500' : log.includes('---') ? 'text-blue-400 font-bold mt-4' : 'text-neutral-300'}>
                    <span className="text-neutral-600 mr-2 opacity-50">#</span> {log}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </motion.div>
          ) : view === 'about' ? (
            <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl mx-auto space-y-8 py-12">
               <h2 className="text-4xl font-bold tracking-tight">About MediaLibrary Pro</h2>
               <div className="prose prose-invert">
                 <p className="text-lg text-neutral-400">This system was designed as a showcase of modern C# .NET engineering integrated with cutting-edge frontend visualizers.</p>
                 <div className="grid grid-cols-2 gap-8 mt-12">
                    <div className="p-6 bg-neutral-900 rounded-3xl border border-neutral-800">
                       <Shield className="w-8 h-8 text-blue-500 mb-4" />
                       <h4 className="font-bold mb-2">Secure Encapsulation</h4>
                       <p className="text-xs text-neutral-500">Strict validation gates for all media metadata and financial valuations.</p>
                    </div>
                    <div className="p-6 bg-neutral-900 rounded-3xl border border-neutral-800">
                       <Zap className="w-8 h-8 text-amber-500 mb-4" />
                       <h4 className="font-bold mb-2">High-Speed Search</h4>
                       <p className="text-xs text-neutral-500">Polymorphic interface implementation allowing global catalog traversal.</p>
                    </div>
                 </div>
               </div>
            </motion.div>
          ) : view === 'contact' ? (
            <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto py-12">
               <div className="bg-neutral-900 p-8 rounded-[2.5rem] border border-neutral-800 space-y-6">
                 <h2 className="text-3xl font-bold">Contact Support</h2>
                 <p className="text-sm text-neutral-500">Reach out to Brian McCarthy's engineering team.</p>
                 <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); log("Message Sent: We will get back to you soon."); setView('dashboard'); }}>
                    <div className="space-y-2">
                       <label className="text-xs font-mono text-neutral-600 uppercase">Your Name</label>
                       <input type="text" className="w-full bg-black border border-neutral-800 p-3 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none" required />
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-mono text-neutral-600 uppercase">Query</label>
                       <textarea className="w-full bg-black border border-neutral-800 p-3 rounded-xl h-32 focus:ring-2 focus:ring-blue-500/50 outline-none" required></textarea>
                    </div>
                    <button className="w-full bg-blue-600 py-4 rounded-xl font-bold hover:bg-blue-500 transition-all">Submit Support Ticket</button>
                 </form>
               </div>
            </motion.div>
          ) : (
            <motion.div key="checkout" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto py-12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="space-y-6">
                    <h2 className="text-3xl font-bold">Final Review</h2>
                    <div className="space-y-3">
                       {cart.map((item, i) => (
                         <div key={i} className="flex justify-between items-center p-3 bg-neutral-900 rounded-xl border border-neutral-800">
                            <span className="text-sm font-medium">{item.title}</span>
                            <span className="font-mono text-emerald-400">${item.virtualGetEstimatedValue().toFixed(2)}</span>
                         </div>
                       ))}
                       <div className="pt-4 border-t border-neutral-800 flex justify-between items-center">
                          <span className="text-xl font-bold">Total Due</span>
                          <span className="text-2xl font-mono text-white">${cartTotal.toFixed(2)}</span>
                       </div>
                    </div>
                 </div>
                 <div className="bg-neutral-900 p-8 rounded-[2.5rem] border border-neutral-800 space-y-6">
                    <h3 className="text-xl font-bold">Secure Payment</h3>
                    <div className="space-y-4">
                       <button className="w-full bg-indigo-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                          <img src="https://img.icons8.com/color/48/visa.png" className="w-6 h-6" /> Pay with Visa
                       </button>
                       <button className="w-full bg-blue-500 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                          <img src="https://img.icons8.com/color/48/paypal.png" className="w-6 h-6" /> Pay with PayPal
                       </button>
                       <button onClick={() => { log("Order Dispatched!"); setCart([]); setView('dashboard'); }} className="w-full border border-neutral-700 py-4 rounded-xl font-bold hover:bg-neutral-800 transition-all">Confirm Order</button>
                    </div>
                 </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Cart Summary Fixed Bottom */}
      {cart.length > 0 && view !== 'checkout' && (
        <motion.div initial={{ y: 100 }} animate={{ y: 0 }} className="fixed bottom-0 left-0 right-0 bg-blue-600 p-4 z-[60] shadow-2xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="bg-white/20 p-2 rounded-lg"><ShoppingCart className="w-5 h-5" /></div>
               <div>
                 <div className="font-bold">Cart: {cart.length} items</div>
                 <div className="text-xs opacity-80">Total Value: ${cartTotal.toFixed(2)}</div>
               </div>
            </div>
            <button onClick={() => { log("PURCHASE COMPLETE: Thank you!"); setCart([]); }} className="bg-white text-blue-600 px-6 py-2 rounded-xl font-bold hover:bg-blue-50 transition-colors">Checkout Now</button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

function TopFivePanel({ title, items, icon }: { title: string, items: MediaItem[], icon: React.ReactNode }) {
  return (
    <div className="bg-neutral-900/50 rounded-3xl border border-neutral-800 p-6 space-y-4">
      <div className="flex items-center gap-3">
        {icon}
        <h3 className="font-bold text-sm tracking-wide uppercase">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-neutral-800/50 p-1.5 rounded-xl transition-all">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 border border-neutral-800">
                <img src={item.thumbnail} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
              </div>
              <div>
                <div className="text-xs font-bold line-clamp-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">{item.title}</div>
                <div className="text-[9px] text-neutral-500 font-mono">
                  {item instanceof Book ? `${(item as any).pageCount} pgs` : `${(item as any).runtimeMinutes} mins`}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-amber-500 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded-md">
              <Star className="w-2.5 h-2.5 fill-current" /> {item.reviewScore.toFixed(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ItemCard({ item, onAddToCart }: { item: MediaItem, onAddToCart: (i: MediaItem) => void }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const Icon = item instanceof Book ? BookIcon : item instanceof DVD ? Disc : Music;
  const color = item instanceof Book ? 'emerald' : item instanceof DVD ? 'amber' : 'rose';
  
  return (
    <motion.div layout className="group relative bg-neutral-900/50 rounded-[2rem] border border-neutral-800 overflow-hidden flex flex-col hover:border-blue-500/50 transition-colors">
      {/* Thumbnail Area */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={item.thumbnail} 
          alt={item.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-60" />
        
        {/* Play/Interact Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          {item instanceof DVD ? (
            <a href={(item as any).trailerUrl} target="_blank" rel="noopener noreferrer" className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:scale-110 transition-transform">
              <Play className="w-8 h-8 text-white fill-current" />
            </a>
          ) : item instanceof MusicAlbum ? (
            <button onClick={() => setIsPlaying(!isPlaying)} className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:scale-110 transition-transform">
              <Play className={`w-8 h-8 text-white ${isPlaying ? 'animate-pulse fill-current' : 'fill-current'}`} />
            </button>
          ) : (
            <div className="p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20"><BookIcon className="w-8 h-8" /></div>
          )}
        </div>

        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
           <span className="bg-neutral-950/80 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-mono font-bold border border-neutral-800">{item.year}</span>
           <span className={`bg-${color}-500/20 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-mono font-bold border border-${color}-500/30 text-${color}-400`}>{item.getCategoryInfo().split(' ')[0]}</span>
        </div>
        <div className="absolute top-4 right-4 bg-amber-500/20 backdrop-blur px-2 py-1 rounded-lg text-[10px] font-bold border border-amber-500/30 text-amber-500 flex items-center gap-1">
          <Star className="w-2.5 h-2.5 fill-current" /> {item.reviewScore.toFixed(1)}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold line-clamp-1 mb-1 tracking-tight">{item.title}</h3>
          <p className="text-xs text-neutral-500 italic mb-4">{item.getShortDescription()}</p>
          
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-neutral-800/50">
             <div>
               <div className="text-[10px] text-neutral-600 uppercase font-bold tracking-widest mb-1">{item instanceof Book ? 'Pages' : 'Runtime'}</div>
               <div className="text-sm font-mono">{item instanceof Book ? (item as any).pageCount : (item as any).runtimeMinutes} {item instanceof DVD || item instanceof MusicAlbum ? 'min' : ''}</div>
             </div>
             <div>
               <div className="text-[10px] text-neutral-600 uppercase font-bold tracking-widest mb-1">Value</div>
               <div className="text-sm font-mono text-emerald-400 font-bold">${item.virtualGetEstimatedValue().toFixed(2)}</div>
             </div>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
           <button onClick={() => onAddToCart(item)} className="flex-1 bg-blue-600 hover:bg-blue-500 py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2">
              <PlusCircle className="w-4 h-4" /> Add to Cart
           </button>
           <button className="p-3 bg-neutral-800 rounded-2xl hover:bg-neutral-700 transition-colors">
              <ExternalLink className="w-4 h-4 text-neutral-400" />
           </button>
        </div>
      </div>
    </motion.div>
  );
}
