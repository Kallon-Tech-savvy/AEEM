import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, BookOpen, Newspaper, FileText, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '../services/supabase';

interface Resource {
  id: string;
  title: string;
  slug: string;
  type: 'blog' | 'download' | 'policy' | 'guide';
  description: string;
  category?: string;
}

const FALLBACK_RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: "Educational Equity Report 2025",
    type: "download",
    slug: "equity-report-2025",
    description: "An in-depth analysis of educational barriers in West Africa.",
    category: "Policy"
  },
  {
    id: 'r2',
    title: "The Power of Youth Mentorship",
    type: "blog",
    slug: "youth-mentorship-power",
    description: "How mentorship programs are changing the academic landscape.",
    category: "Education"
  },
  {
    id: 'r3',
    title: "Press Release: AEEM Expansion",
    type: "blog",
    slug: "aeem-expansion-2026",
    description: "AEEM announces new chapters in three additional regions.",
    category: "News"
  },
  {
    id: 'r4',
    title: "Advocacy Toolkit for Schools",
    type: "download",
    slug: "advocacy-toolkit",
    description: "A comprehensive guide for student-led advocacy.",
    category: "Guide"
  }
];

const getIcon = (type: string, category?: string) => {
  if (type === 'download') return FileText;
  if (category === 'News') return Newspaper;
  if (category === 'Education') return BookOpen;
  return BookOpen;
};

const Resources: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const { data: resources, isLoading } = useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data && data.length > 0) ? (data as Resource[]) : FALLBACK_RESOURCES;
    },
    initialData: FALLBACK_RESOURCES
  });

  const filteredResources = (resources || []).filter(res => {
    const matchesSearch = res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          res.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || res.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Helmet>
        <title>Resources & Blog | AEEM</title>
      </Helmet>

      <section className="pt-40 pb-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <span className="text-aeem-gold font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Knowledge Hub</span>
              <h1 className="text-5xl md:text-7xl font-black mb-0 leading-tight">Resources</h1>
            </div>
            <div className="relative w-full md:w-96">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
               <input
                 type="text"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
                 placeholder="Search articles & downloads..."
                 className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-aeem-gold transition-colors shadow-sm"
               />
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
             {['All', 'Policy', 'Education', 'News', 'Guide'].map((cat) => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-8 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-aeem-charcoal text-white' : 'bg-white text-gray-500 border border-gray-100 hover:border-aeem-gold'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white dark:bg-aeem-charcoal">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="animate-spin text-aeem-gold" size={48} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredResources.map((item) => {
                const Icon = getIcon(item.type, item.category);
                return (
                  <Link
                    to={`/resources/${item.slug}`}
                    key={item.slug}
                    className="group p-8 rounded-3xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 hover:border-aeem-gold hover:shadow-2xl transition-all flex flex-col h-full"
                  >
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-aeem-gold mb-8 group-hover:bg-aeem-gold group-hover:text-white transition-all">
                      <Icon size={28} />
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-aeem-gold mb-4">{item.category}</div>
                    <h3 className="text-xl font-bold mb-4 group-hover:text-aeem-gold transition-colors dark:text-aeem-white">{item.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8 line-clamp-3">{item.description}</p>
                    <div className="mt-auto flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-aeem-charcoal dark:text-aeem-white">
                       {item.type === 'download' ? 'Download PDF' : 'Read Article'}
                       <div className="w-6 h-[2px] bg-aeem-gold group-hover:w-10 transition-all" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Resources;
