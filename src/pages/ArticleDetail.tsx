import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Heart, MessageCircle, Bookmark } from 'lucide-react';
import { type ArticleDetailData, type ArticleLanguage, getNewsDetail } from '../lib/api';

const LANGUAGE_OPTIONS: ArticleLanguage[] = ['EN', 'ZH', 'BL'];

function estimateReadTime(text: string): string {
  const whitespaceWordCount = text.split(/\s+/).filter(Boolean).length;
  const cjkCharacterCount = (text.match(/[\u3400-\u9FFF]/g) || []).length;
  const effectiveWords = Math.max(whitespaceWordCount, Math.ceil(cjkCharacterCount / 2));
  const minutes = Math.max(1, Math.ceil(effectiveWords / 220));
  return `${minutes} min read`;
}

export function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [language, setLanguage] = useState<ArticleLanguage>('EN');

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('Missing article id.');
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError('');

    getNewsDetail(id, controller.signal)
      .then((response) => {
        setArticle(response);
        setLanguage('EN');
      })
      .catch((fetchError: Error) => {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message || 'Failed to load article.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [id]);

  const activeTitle = useMemo(() => article?.titles[language] || article?.titles.EN || '', [article, language]);
  const activeContent = useMemo(() => article?.contents[language] || article?.contents.EN || '', [article, language]);
  const activeExcerpt = useMemo(() => article?.excerpts[language] || article?.excerpts.EN || '', [article, language]);
  const activeReadTime = useMemo(() => estimateReadTime(activeContent || activeExcerpt), [activeContent, activeExcerpt]);

  if (loading) {
    return (
      <div className="bg-surface min-h-screen pb-32">
        <main className="pt-20 max-w-screen-md mx-auto px-6">
          <div className="animate-pulse space-y-6">
            <div className="aspect-[16/10] rounded-3xl bg-surface-container-low" />
            <div className="h-4 w-40 rounded bg-surface-container-low" />
            <div className="h-14 rounded bg-surface-container-low" />
            <div className="h-20 rounded-xl bg-surface-container-low" />
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-6 rounded bg-surface-container-low" />
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="bg-surface min-h-screen pb-32">
        <main className="pt-20 max-w-screen-md mx-auto px-6">
          <div className="rounded-3xl bg-red-50 text-red-700 px-6 py-5">
            <h2 className="text-xl font-bold mb-2">Article not found</h2>
            <p className="text-sm leading-6 break-words">{error || 'The requested article does not exist.'}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen pb-32">
      <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-surface-container-low transition-colors rounded-full active:scale-95">
            <ArrowLeft className="w-6 h-6 text-primary" />
          </button>
          <h1 className="text-lg font-black text-primary tracking-tight">Ghana Life & News</h1>
        </div>
        <button className="text-sm font-bold text-primary px-3 py-1.5 hover:bg-surface-container-low transition-colors rounded-lg">Share</button>
      </header>

      <main className="pt-16 max-w-screen-md mx-auto">
        <section className="relative w-full aspect-[16/10] overflow-hidden md:rounded-b-xl">
          <img
            className="w-full h-full object-cover"
            src={article.image}
            alt={activeTitle}
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 right-4 flex gap-1 bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-sm">
            {LANGUAGE_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => setLanguage(option)}
                className={`px-3 py-1 text-[10px] font-bold rounded-full transition-colors ${
                  language === option
                    ? 'bg-primary text-white'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </section>

        <article className="px-6 py-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">{article.category}</span>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <time className="text-secondary text-xs font-semibold">{article.date}</time>
            <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
            <span className="text-secondary text-xs font-semibold">{activeReadTime}</span>
          </div>

          <h2 className="text-4xl font-extrabold text-on-surface leading-tight tracking-tight mb-6 whitespace-pre-line">
            {activeTitle}
          </h2>

          <div className="flex items-center gap-3 mb-8 p-4 bg-surface-container-low rounded-xl">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 text-primary flex items-center justify-center font-bold">
              {article.author.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-on-surface">{article.author}</p>
              <p className="text-[11px] text-on-surface-variant font-medium">Editorial Contributor</p>
            </div>
          </div>

          <div className="space-y-6 text-on-surface-variant leading-[1.8] text-lg">
            {activeContent ? (
              activeContent.split('\n\n').filter(Boolean).map((para, i) => (
                para.startsWith('"') ? (
                  <div key={i} className="relative py-10 my-8">
                    <div className="absolute left-0 top-0 w-12 h-1 bg-secondary-container"></div>
                    <blockquote className="text-3xl font-bold text-primary italic leading-tight">
                      {para}
                    </blockquote>
                    <div className="absolute right-0 bottom-0 w-12 h-1 bg-secondary-container"></div>
                  </div>
                ) : (
                  <p key={i}>{para}</p>
                )
              ))
            ) : (
              <p>{activeExcerpt}</p>
            )}
          </div>

          <div className="mt-12 flex items-center justify-between py-6 border-t border-outline-variant/15">
            <div className="flex gap-4">
              <button className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors">
                <Heart className="w-6 h-6" />
                <span className="text-sm font-bold">1.2k</span>
              </button>
              <button className="flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors">
                <MessageCircle className="w-6 h-6" />
                <span className="text-sm font-bold">84</span>
              </button>
            </div>
            <div className="flex gap-2">
              <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
                <Bookmark className="w-6 h-6 text-on-surface-variant" />
              </button>
              <button className="p-2 rounded-full hover:bg-surface-container-high transition-colors">
                <Share2 className="w-6 h-6 text-on-surface-variant" />
              </button>
            </div>
          </div>

          <section className="mt-12">
            <h3 className="text-xl font-extrabold mb-8 flex items-center gap-2">
              Insights <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">84</span>
            </h3>

            <div className="mb-10 bg-surface-container-low p-4 rounded-xl">
              <textarea
                className="w-full bg-transparent border-none focus:ring-0 text-sm placeholder:text-outline-variant resize-none min-h-[80px] outline-none"
                placeholder="Share your perspective..."
              ></textarea>
              <div className="flex justify-end mt-2">
                <button className="heritage-gradient text-white px-6 py-2 rounded-full text-xs font-bold shadow-sm active:scale-95 transition-transform">Post Comment</button>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
