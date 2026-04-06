import type { Article, Business } from '../data';

export type ArticleLanguage = 'EN' | 'ZH' | 'BL';

export type PagedArticles = {
  items: Article[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
};

export type ArticleDetailData = {
  id: string;
  category: string;
  author: string;
  authorImage: string;
  date: string;
  image: string;
  titles: Record<ArticleLanguage, string>;
  contents: Record<ArticleLanguage, string>;
  excerpts: Record<ArticleLanguage, string>;
};

type NewsListResponse = {
  items: NewsSummary[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
};

type PlacesListResponse = {
  items: PlaceSummary[];
  pagination: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
};

type NewsSummary = {
  id: number;
  site: string;
  title: string;
  chinese_title: string;
  news_date: string | null;
  category: number;
  category_label: string;
  thumbnail_url: string | null;
};

type NewsImage = {
  image_url: string | null;
  is_cover: boolean;
};

type NewsDetail = {
  id: number;
  site: string;
  creator: string;
  title: string;
  chinese_title: string;
  summary: string;
  chinese_summary: string;
  content: string;
  chinese_content: string;
  bilingual_content: string;
  news_date: string | null;
  category_label: string;
  cover_image: NewsImage | null;
  images: NewsImage[];
};

type PlaceSummary = {
  place_hash: string;
  name: string;
  category: string;
  search_keyword: string;
  opening_text: string;
  closing_time: string;
  cover_image_url: string | null;
  rating: string;
  review_count: string;
};

type PlaceDetail = {
  place_hash: string;
  name: string;
  category: string;
  search_keyword: string;
  address: string;
  website: string;
  detail_url: string;
  rating: string;
  review_count: string;
  opening_text: string;
  closing_time: string;
  raw_text: string;
  cover_image_url: string | null;
  image_urls: string[];
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:5000').replace(/\/$/, '');
const FALLBACK_ARTICLE_IMAGE = 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80';
const FALLBACK_BUSINESS_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80';

async function fetchJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(buildApiUrl(path), {
    headers: {
      Accept: 'application/json',
    },
    signal,
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function buildApiUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  return `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function resolveMediaUrl(path?: string | null): string {
  if (!path) {
    return '';
  }
  return buildApiUrl(path);
}

function startCase(value: string): string {
  return value
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatDateLabel(value?: string | null): string {
  if (!value) {
    return 'Unknown date';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function buildAuthor(site: string, creator?: string): string {
  if (creator?.trim()) {
    return creator.trim();
  }
  return startCase(site || 'News Desk');
}

function truncate(text: string, maxLength: number): string {
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

function buildPlaceDescription(place: Pick<PlaceDetail, 'category' | 'search_keyword' | 'address' | 'raw_text'>): string {
  const rawSummary = truncate(place.raw_text || '', 160);
  if (rawSummary) {
    return rawSummary;
  }
  const segments = [place.category, place.address, startCase(place.search_keyword || '')].filter(Boolean);
  return segments.join(' • ') || 'Verified local listing';
}

function buildHours(openingText: string, closingTime: string): string {
  const normalizedOpeningText = openingText.replace(/\s+/g, ' ').trim();
  if (closingTime) {
    return `Closes ${closingTime}`;
  }
  if (normalizedOpeningText) {
    return truncate(normalizedOpeningText, 48);
  }
  return 'Hours unavailable';
}

function toArticleSummary(item: NewsSummary): Article {
  return {
    id: String(item.id),
    title: item.title,
    category: startCase(item.category_label || 'general'),
    author: buildAuthor(item.site),
    authorImage: '',
    date: formatDateLabel(item.news_date),
    readTime: '2 min read',
    image: resolveMediaUrl(item.thumbnail_url) || FALLBACK_ARTICLE_IMAGE,
    excerpt: item.chinese_title || item.title,
  };
}

function buildBilingualTitle(title: string, chineseTitle: string): string {
  const normalizedTitle = title.trim();
  const normalizedChineseTitle = chineseTitle.trim();

  if (normalizedTitle && normalizedChineseTitle && normalizedTitle !== normalizedChineseTitle) {
    return `${normalizedTitle}\n${normalizedChineseTitle}`;
  }

  return normalizedTitle || normalizedChineseTitle || 'Untitled';
}

function buildBilingualContent(item: NewsDetail): string {
  if (item.bilingual_content.trim()) {
    return item.bilingual_content.trim();
  }

  const englishParts = [item.summary, item.content].filter((value) => value.trim());
  const chineseParts = [item.chinese_summary, item.chinese_content].filter((value) => value.trim());

  if (englishParts.length && chineseParts.length) {
    return `${englishParts.join('\n\n')}\n\n${chineseParts.join('\n\n')}`;
  }

  return englishParts.join('\n\n') || chineseParts.join('\n\n') || item.title;
}

function toArticleDetailData(item: NewsDetail): ArticleDetailData {
  const englishTitle = item.title.trim() || item.chinese_title.trim() || 'Untitled';
  const chineseTitle = item.chinese_title.trim() || englishTitle;
  const englishContent = (item.content || item.summary || item.bilingual_content || item.chinese_content || item.chinese_summary || englishTitle).trim();
  const chineseContent = (item.chinese_content || item.chinese_summary || item.bilingual_content || item.content || item.summary || chineseTitle).trim();
  const bilingualTitle = buildBilingualTitle(englishTitle, chineseTitle);
  const bilingualContent = buildBilingualContent(item);
  const coverImage = item.cover_image?.image_url || item.images.find((image) => image.image_url)?.image_url || '';

  return {
    id: String(item.id),
    category: startCase(item.category_label || 'general'),
    author: buildAuthor(item.site, item.creator),
    authorImage: '',
    date: formatDateLabel(item.news_date),
    image: resolveMediaUrl(coverImage) || FALLBACK_ARTICLE_IMAGE,
    titles: {
      EN: englishTitle,
      ZH: chineseTitle,
      BL: bilingualTitle,
    },
    contents: {
      EN: englishContent,
      ZH: chineseContent,
      BL: bilingualContent,
    },
    excerpts: {
      EN: (item.summary || englishTitle).trim(),
      ZH: (item.chinese_summary || chineseTitle).trim(),
      BL: (item.bilingual_content || item.summary || item.chinese_summary || bilingualTitle).trim(),
    },
  };
}

function toBusinessSummary(item: PlaceSummary): Business {
  return {
    id: item.place_hash,
    name: item.name,
    category: item.category || startCase(item.search_keyword || 'service'),
    rating: Number.parseFloat(item.rating || '0') || 0,
    reviews: Number.parseInt(item.review_count || '0', 10) || 0,
    priceRange: startCase(item.search_keyword || 'local listing'),
    distance: 'Accra',
    hours: buildHours(item.opening_text, item.closing_time),
    description: [item.category, startCase(item.search_keyword || '')].filter(Boolean).join(' • ') || 'Verified local service',
    address: '',
    website: '',
    menuLink: '',
    image: resolveMediaUrl(item.cover_image_url) || FALLBACK_BUSINESS_IMAGE,
    gallery: [],
    featuredDishes: [],
  };
}

function toBusinessDetail(item: PlaceDetail): Business {
  return {
    id: item.place_hash,
    name: item.name,
    category: item.category || startCase(item.search_keyword || 'service'),
    rating: Number.parseFloat(item.rating || '0') || 0,
    reviews: Number.parseInt(item.review_count || '0', 10) || 0,
    priceRange: startCase(item.search_keyword || 'local listing'),
    distance: item.address || 'Accra',
    hours: buildHours(item.opening_text, item.closing_time),
    description: buildPlaceDescription(item),
    address: item.address || 'Address unavailable',
    website: item.website || item.detail_url || '',
    menuLink: item.detail_url || '',
    image: resolveMediaUrl(item.cover_image_url) || resolveMediaUrl(item.image_urls[0]) || FALLBACK_BUSINESS_IMAGE,
    gallery: item.image_urls.map(resolveMediaUrl).filter(Boolean),
    featuredDishes: [],
  };
}

export async function getNewsPage(page = 1, pageSize = 10, signal?: AbortSignal): Promise<PagedArticles> {
  const response = await fetchJson<NewsListResponse>(`/api/news?page=${page}&page_size=${pageSize}`, signal);
  return {
    items: response.items.map(toArticleSummary),
    pagination: response.pagination,
  };
}

export async function getNewsList(signal?: AbortSignal): Promise<Article[]> {
  const response = await getNewsPage(1, 10, signal);
  return response.items;
}

export async function getNewsDetail(id: string, signal?: AbortSignal): Promise<ArticleDetailData> {
  const response = await fetchJson<NewsDetail>(`/api/news/${id}`, signal);
  return toArticleDetailData(response);
}

export async function getPlaces(signal?: AbortSignal): Promise<Business[]> {
  const response = await fetchJson<PlacesListResponse>('/api/places?page=1&page_size=12', signal);
  return response.items.map(toBusinessSummary);
}

export async function getPlaceDetail(id: string, signal?: AbortSignal): Promise<Business> {
  const response = await fetchJson<PlaceDetail>(`/api/places/${id}`, signal);
  return toBusinessDetail(response);
}
