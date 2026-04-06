import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Article } from '../data';
import { getNewsPage } from '../lib/api';

const PAGE_SIZE = 10;

function mergeArticles(previous: Article[], incoming: Article[]): Article[] {
  const seen = new Set(previous.map((article) => article.id));
  const merged = [...previous];

  for (const article of incoming) {
    if (!seen.has(article.id)) {
      merged.push(article);
      seen.add(article.id);
    }
  }

  return merged;
}

export function Home() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [loadMoreError, setLoadMoreError] = useState('');
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadArticles = useCallback(async (nextPage: number, mode: 'replace' | 'append', signal?: AbortSignal) => {
    const response = await getNewsPage(nextPage, PAGE_SIZE, signal);
    setArticles((previous) => (mode === 'append' ? mergeArticles(previous, response.items) : response.items));
    setPage(response.pagination.page);
    setHasMore(response.pagination.page < response.pagination.total_pages);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    setLoadMoreError('');

    loadArticles(1, 'replace', controller.signal)
      .catch((fetchError: Error) => {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Failed to load news.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [loadArticles]);

  const handleLoadMore = useCallback(() => {
    if (loading || loadingMore || !hasMore) {
      return;
    }

    setLoadingMore(true);
    setLoadMoreError('');

    loadArticles(page + 1, 'append')
      .catch((fetchError: Error) => {
        setLoadMoreError(fetchError.message || 'Failed to load more news.');
      })
      .finally(() => {
        setLoadingMore(false);
      });
  }, [hasMore, loadArticles, loading, loadingMore, page]);

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || loading || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          handleLoadMore();
        }
      },
      {
        rootMargin: '240px 0px',
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [handleLoadMore, hasMore, loading]);

  const featured = articles[0];
  const latest = articles.slice(1);
  const latestCountLabel = useMemo(() => `${articles.length} loaded`, [articles.length]);

  if (loading) {
    return (
      <div className="pb-24">
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="animate-pulse space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-8 h-[420px] rounded-xl bg-surface-container-low" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="space-y-3">
                  <div className="aspect-[4/3] rounded-2xl bg-surface-container-low" />
                  <div className="h-4 w-24 rounded bg-surface-container-low" />
                  <div className="h-6 rounded bg-surface-container-low" />
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pb-24">
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="rounded-3xl bg-red-50 text-red-700 px-6 py-5">
            <h2 className="text-xl font-bold mb-2">Unable to load latest news</h2>
            <p className="text-sm leading-6 break-words">{error}</p>
          </div>
        </main>
      </div>
    );
  }

  if (!featured) {
    return (
      <div className="pb-24">
        <main className="max-w-7xl mx-auto px-6 py-8">
          <div className="rounded-3xl bg-surface-container-low px-6 py-10 text-center">
            <h2 className="text-2xl font-bold mb-2">No news available</h2>
            <p className="text-on-surface-variant">The Flask API is reachable, but it did not return any news items.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          <Link to={`/article/${featured.id}`} className="md:col-span-8 group relative overflow-hidden bg-surface-container-lowest rounded-xl shadow-sm">
            <div className="aspect-video relative overflow-hidden">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={featured.image}
                alt={featured.title}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute top-4 left-4">
                <span className="heritage-gradient text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">Live Updates</span>
              </div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-primary-fixed text-sm font-bold mb-2">{featured.category} • {featured.readTime}</p>
                <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-tight tracking-tight mb-4">
                  {featured.title}
                </h2>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-white/15 flex items-center justify-center text-white text-xs font-bold">
                    {featured.author.slice(0, 1).toUpperCase()}
                  </div>
                  <span className="text-zinc-300 text-sm font-medium">By {featured.author} • {featured.date}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        <div className="mb-8 flex items-center gap-4">
          <h3 className="text-xl font-black uppercase tracking-widest text-secondary">
            Latest Stories
          </h3>
          <span className="h-[2px] flex-grow bg-surface-container-high"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-outline">{latestCountLabel}</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {latest.map((article) => (
            <Link key={article.id} to={`/article/${article.id}`} className="flex flex-col group">
              <div className="asymmetric-crop overflow-hidden mb-4 aspect-[4/3]">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  src={article.image}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-tertiary font-bold text-xs uppercase tracking-wider">{article.category}</span>
                <h4 className="text-base md:text-lg font-extrabold leading-snug group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
                <p className="text-xs md:text-sm leading-5 md:leading-6 text-on-surface-variant line-clamp-2">{article.excerpt}</p>
                <div className="flex flex-wrap items-center gap-2 mt-2 text-outline text-xs">
                  <span>{article.author}</span>
                  <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                  <span>{article.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div ref={loadMoreRef} className="h-8" />

        <div className="pt-8 pb-4 text-center">
          {loadingMore && (
            <div className="inline-flex items-center gap-3 rounded-full bg-surface-container-low px-4 py-2 text-sm font-medium text-on-surface-variant">
              <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-primary"></span>
              Loading 10 more stories…
            </div>
          )}

          {!loadingMore && loadMoreError && (
            <div className="space-y-3">
              <p className="text-sm text-red-600 break-words">{loadMoreError}</p>
              <button
                onClick={handleLoadMore}
                className="rounded-full bg-surface-container-low px-4 py-2 text-sm font-bold text-primary hover:bg-surface-container"
              >
                Retry loading more
              </button>
            </div>
          )}

          {!loadingMore && !loadMoreError && !hasMore && (
            <p className="text-sm text-on-surface-variant">You&apos;ve reached the end of the latest stories.</p>
          )}
        </div>
      </main>
    </div>
  );
}
