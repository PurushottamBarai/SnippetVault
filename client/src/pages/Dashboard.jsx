import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Plus,
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Code2,
  X,
  FileCode2
} from 'lucide-react';
import api from '../api/client';
import SnippetCard from '../components/SnippetCard';
import ConfirmDialog from '../components/ConfirmDialog';
import { useToast } from '../context/ToastContext';
import { getLanguageInfo } from '../lib/constants';

export default function Dashboard({ searchQuery, onClearSearch }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { showToast } = useToast();

  const selectedLanguage = searchParams.get('language') || 'all';
  const sortBy = searchParams.get('sort') || 'newest';

  const [snippets, setSnippets] = useState([]);
  const [stats, setStats] = useState({ totalAll: 0, languages: {}, tags: {} });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchSnippets = useCallback(
    async (targetPage = 1, append = false) => {
      try {
        if (targetPage === 1) setLoading(true);
        else setLoadingMore(true);

        const params = {
          page: targetPage,
          limit: 20,
          q: searchQuery || undefined,
          language: selectedLanguage !== 'all' ? selectedLanguage : undefined,
          tag: (searchParams.get('tag') || 'all') !== 'all' ? searchParams.get('tag') || 'all' : undefined
        };

        const res = await api.get('/snippets', { params });
        if (append) {
          setSnippets((prev) => [...prev, ...res.data.items]);
        } else {
          setSnippets(res.data.items);
        }
        setTotal(res.data.total);
        setPage(res.data.page);
        setTotalPages(res.data.totalPages);
        if (res.data.stats) {
          setStats(res.data.stats);
        }
      } catch (err) {
        showToast('Failed to load snippets', 'error');
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [searchQuery, selectedLanguage, (searchParams.get('tag') || 'all'), showToast]
  );

  useEffect(() => {
    setPage(1);
    fetchSnippets(1, false);
  }, [fetchSnippets]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value === 'all' || !value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next);
  };

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams());
    if (onClearSearch) onClearSearch();
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await api.delete(`/snippets/${deleteTarget._id}`);
      showToast('Snippet deleted');
      setSnippets((prev) => prev.filter((s) => s._id !== deleteTarget._id));
      setTotal((prev) => Math.max(0, prev - 1));
      setDeleteTarget(null);
    } catch {
      showToast('Could not delete snippet', 'error');
    }
  };

  const sortedSnippets = [...snippets].sort((a, b) => {
    if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (sortBy === 'alpha') {
      return a.title.localeCompare(b.title);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <div className="max-w-300 mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-56px)]">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="hidden lg:block w-60 shrink-0 space-y-6 pr-6 border-r border-border">
          <div>
            <div className="text-[11px] font-mono uppercase text-muted tracking-wider font-semibold mb-2">
              Languages
            </div>
            <div className="space-y-0.5">
              <button
                type="button"
                onClick={() => updateParam('language', 'all')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[13px] transition-colors ${
                  selectedLanguage === 'all'
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <span>All</span>
                <span className="text-[12px] font-mono text-muted">{stats.totalAll || 0}</span>
              </button>

              {Object.entries(stats.languages || {}).map(([lang, count]) => {
                const info = getLanguageInfo(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => updateParam('language', lang)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[13px] transition-colors ${
                      selectedLanguage.toLowerCase() === lang.toLowerCase()
                        ? 'bg-accent text-accent-foreground font-medium'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span
                        className="w-2 h-2 rounded-full inline-block shrink-0"
                        style={{ backgroundColor: info.color }}
                      />
                      <span className="truncate">{info.label}</span>
                    </div>
                    <span className="text-[12px] font-mono text-muted">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-mono uppercase text-muted tracking-wider font-semibold mb-2">
              Tags
            </div>
            {Object.keys(stats.tags || {}).length === 0 ? (
              <p className="text-[12px] text-muted">No tags yet</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(stats.tags).map(([tag, count]) => {
                  const isActive = (searchParams.get('tag') || 'all').toLowerCase() === tag.toLowerCase();
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => updateParam('tag', isActive ? 'all' : tag)}
                      className={`inline-flex items-center gap-1 h-5.5 px-2 text-[12px] font-mono rounded-sm transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground font-medium'
                          : 'bg-muted text-muted hover:text-foreground hover:bg-neutral-200 dark:hover:bg-neutral-800'
                      }`}
                    >
                      <span>#{tag}</span>
                      <span className="text-[10px] opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </aside>

        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden bg-black/50">
            <div className="w-70 bg-card h-full p-6 space-y-6 overflow-y-auto border-r border-border">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[15px]">Filters</span>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-muted hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <p className="text-[11px] font-mono uppercase text-muted tracking-wider font-semibold mb-2">
                  Languages
                </p>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      updateParam('language', 'all');
                      setMobileFilterOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 text-[13px] rounded-md hover:bg-muted"
                  >
                    All ({stats.totalAll || 0})
                  </button>
                  {Object.entries(stats.languages || {}).map(([lang, count]) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => {
                        updateParam('language', lang);
                        setMobileFilterOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 text-[13px] rounded-md hover:bg-muted flex items-center justify-between"
                    >
                      <span>{getLanguageInfo(lang).label}</span>
                      <span className="font-mono text-[12px] text-muted">{count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border mb-6">
            <div>
              <h1 className="text-[20px] font-bold text-foreground tracking-tight">
                Snippets
              </h1>
              <p className="text-[13px] text-muted">
                {total} {total === 1 ? 'snippet' : 'snippets'}
                {(selectedLanguage !== 'all' || (searchParams.get('tag') || 'all') !== 'all' || searchQuery) && (
                  <span> • filtered</span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden h-9 px-3 border border-border rounded-md text-[13px] flex items-center gap-1.5 text-foreground bg-card"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="h-9 px-2.5 text-[13px] bg-card border border-strong rounded-md text-foreground focus:outline-none focus:border-primary"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="alpha">Title A-Z</option>
              </select>

              <div className="hidden sm:flex items-center border border-strong rounded-md overflow-hidden">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${
                    viewMode === 'grid' ? 'bg-muted text-foreground' : 'text-muted hover:text-foreground'
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${
                    viewMode === 'list' ? 'bg-muted text-foreground' : 'text-muted hover:text-foreground'
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <Link
                to="/snippets/new"
                className="h-9 px-3.5 inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-[13px] font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                <Plus className="w-4 h-4" />
                <span>New snippet</span>
              </Link>
            </div>
          </div>

          {(selectedLanguage !== 'all' || (searchParams.get('tag') || 'all') !== 'all' || searchQuery) && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-[12px] text-muted">Active filters:</span>
              {selectedLanguage !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-muted text-[12px]">
                  lang: {selectedLanguage}
                  <button type="button" onClick={() => updateParam('language', 'all')}>
                    <X className="w-3 h-3 text-muted hover:text-foreground" />
                  </button>
                </span>
              )}
              {(searchParams.get('tag') || 'all') !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-muted text-[12px]">
                  #{searchParams.get('tag') || 'all'}
                  <button type="button" onClick={() => updateParam('tag', 'all')}>
                    <X className="w-3 h-3 text-muted hover:text-foreground" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-muted text-[12px]">
                  q: {searchQuery}
                  <button
                    type="button"
                    onClick={() => onClearSearch && onClearSearch()}
                    aria-label="Clear search"
                  >
                    <X className="w-3 h-3 text-muted hover:text-foreground" />
                  </button>
                </span>
              )}
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-[12px] text-primary hover:underline ml-2"
              >
                Clear filters
              </button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div
                  key={n}
                  className="h-48 border border-border rounded-lg bg-card p-4 animate-pulse space-y-3"
                >
                  <div className="h-4 bg-muted rounded w-2/3" />
                  <div className="h-3 bg-muted rounded w-1/3" />
                  <div className="h-20 bg-muted rounded" />
                </div>
              ))}
            </div>
          ) : sortedSnippets.length === 0 ? (
            <div className="text-center py-16 border border-dashed border-border rounded-[10px] bg-surface p-8">
              <div className="w-10 h-10 mx-auto rounded-lg border border-border flex items-center justify-center text-muted mb-3">
                <FileCode2 className="w-5 h-5" />
              </div>
              {stats.totalAll === 0 ? (
                <>
                  <h3 className="text-[16px] font-semibold text-foreground mb-1">
                    No snippets yet
                  </h3>
                  <p className="text-[14px] text-muted mb-5">
                    Save your first snippet and we will tag it for you automatically.
                  </p>
                  <Link
                    to="/snippets/new"
                    className="inline-flex items-center gap-1.5 h-9 px-4 bg-primary text-primary-foreground text-[13px] font-medium rounded-md"
                  >
                    <Plus className="w-4 h-4" />
                    New snippet
                  </Link>
                </>
              ) : (
                <>
                  <h3 className="text-[16px] font-semibold text-foreground mb-1">
                    Nothing matches this search
                  </h3>
                  <p className="text-[14px] text-muted mb-4">
                    Try adjusting your keyword, language filter, or active tags.
                  </p>
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="text-[13px] text-primary hover:underline font-medium"
                  >
                    Clear all filters
                  </button>
                </>
              )}
            </div>
          ) : (
            <>
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'
                    : 'flex flex-col gap-3'
                }
              >
                {sortedSnippets.map((snippet) => (
                  <SnippetCard
                    key={snippet._id}
                    snippet={snippet}
                    onDelete={(s) => setDeleteTarget(s)}
                    onTagClick={(tag) => updateParam('tag', tag)}
                  />
                ))}
              </div>

              {page < totalPages && (
                <div className="mt-8 text-center">
                  <button
                    type="button"
                    onClick={() => fetchSnippets(page + 1, true)}
                    disabled={loadingMore}
                    className="h-[36px] px-5 border border-strong bg-card text-foreground text-[13px] font-medium rounded-[6px] hover:bg-muted transition-colors disabled:opacity-50"
                  >
                    {loadingMore ? 'Loading more...' : 'Load more snippets'}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        title="Delete this snippet?"
        description="This action cannot be undone. The snippet and its metadata will be permanently removed."
        confirmText="Delete"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
