import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { AdminGroup, GroupStatus } from '../../types/admin.ts';
import {
  Search,
  Filter,
  PlusCircle,
  Eye,
  Edit2,
  Trash2,
  Star,
  Pin,
  ShieldCheck,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { GroupFormModal } from '../modals/GroupFormModal.tsx';
import { GroupDetailAdminModal } from '../modals/GroupDetailAdminModal.tsx';

interface GroupManagementProps {
  initialStatusFilter?: GroupStatus | 'all' | 'featured';
}

export const GroupManagement: React.FC<GroupManagementProps> = ({ initialStatusFilter = 'all' }) => {
  const {
    groups,
    deleteGroup,
    setGroupStatus,
    toggleFeatureGroup,
    togglePinGroup,
    toggleVerifyGroup,
    categories,
    countries
  } = useAdmin();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'views' | 'joins' | 'alpha'>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Modals state
  const [editingGroup, setEditingGroup] = useState<AdminGroup | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inspectingGroup, setInspectingGroup] = useState<AdminGroup | null>(null);
  const [deletingGroupId, setDeletingGroupId] = useState<string | null>(null);

  // Active filter logic
  const filteredGroups = useMemo(() => {
    return groups.filter((g) => {
      // Status filter
      if (statusFilter === 'featured') {
        if (!g.isFeatured) return false;
      } else if (statusFilter !== 'all') {
        if (g.status !== statusFilter) return false;
      }

      // Category filter
      if (categoryFilter !== 'all') {
        if (g.categorySlug !== categoryFilter) return false;
      }

      // Country filter
      if (countryFilter !== 'all') {
        if (g.country.toLowerCase() !== countryFilter.toLowerCase()) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesTitle = g.title.toLowerCase().includes(q);
        const matchesLink = g.inviteLink.toLowerCase().includes(q);
        const matchesCat = g.category.toLowerCase().includes(q);
        const matchesCountry = g.country.toLowerCase().includes(q);
        const matchesCity = g.city ? g.city.toLowerCase().includes(q) : false;
        const matchesTags = g.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesLink && !matchesCat && !matchesCountry && !matchesCity && !matchesTags) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'joins') return b.joinClicks - a.joinClicks;
      if (sortBy === 'alpha') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [groups, statusFilter, categoryFilter, countryFilter, searchQuery, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredGroups.length / itemsPerPage) || 1;
  const paginatedGroups = filteredGroups.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status: GroupStatus) => {
    switch (status) {
      case 'active':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">Active</span>;
      case 'pending':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/15 text-amber-400 border border-amber-500/30">Pending</span>;
      case 'reported':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500/15 text-rose-400 border border-rose-500/30">Reported</span>;
      case 'expired':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-gray-500/15 text-gray-400 border border-gray-500/30">Expired</span>;
      case 'suspended':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500/15 text-purple-400 border border-purple-500/30">Suspended</span>;
      case 'rejected':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-500/15 text-red-400 border border-red-500/30">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Group Directory Management</h1>
          <p className="text-xs text-gray-400 mt-1">
            Displaying {filteredGroups.length} of {groups.length} registered WhatsApp communities
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-[#25D366]/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Group</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          
          {/* Search Box */}
          <div className="lg:col-span-2 relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, link, city, tag..."
              className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Groups</option>
              <option value="pending">Pending Moderation</option>
              <option value="featured">Featured Groups</option>
              <option value="reported">Reported Groups</option>
              <option value="expired">Expired / Dead Links</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full bg-[#1b1f28] border border-white/10 focus:border-[#25D366] rounded-xl px-3 py-2 text-xs text-white outline-none cursor-pointer"
            >
              <option value="newest">Sort: Newest Added</option>
              <option value="oldest">Sort: Oldest</option>
              <option value="views">Sort: Most Viewed</option>
              <option value="joins">Sort: Most Joined</option>
              <option value="alpha">Sort: Alphabetical (A-Z)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Group Table */}
      <div className="bg-[#14171d] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Group Info</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Badges</th>
                <th className="py-3.5 px-4">Traffic (Views / Joins)</th>
                <th className="py-3.5 px-4">Added Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5 text-gray-300">
              {paginatedGroups.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-500">
                    No matching WhatsApp groups found for the selected criteria.
                  </td>
                </tr>
              ) : (
                paginatedGroups.map((g) => (
                  <tr key={g.id} className="hover:bg-white/[0.02] transition-colors">
                    
                    {/* Group info */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={g.image}
                          alt={g.title}
                          className="w-10 h-10 rounded-lg object-cover bg-black/40 flex-shrink-0"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1614680376593-902f749f7ffc?w=100&auto=format&fit=crop&q=80';
                          }}
                        />
                        <div className="min-w-0 max-w-[200px]">
                          <div className="font-bold text-white truncate" title={g.title}>
                            {g.title}
                          </div>
                          <div className="text-[11px] text-[#25D366] truncate font-mono">
                            {g.inviteLink}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-gray-200">{g.category}</span>
                    </td>

                    {/* Location */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {g.countryCode !== 'global' ? (
                          <img
                            src={`https://flagcdn.com/w40/${g.countryCode.toLowerCase()}.png`}
                            alt={g.country}
                            className="w-4 h-3 object-cover rounded shadow-sm"
                          />
                        ) : (
                          <span>🌍</span>
                        )}
                        <span>{g.country}</span>
                        {g.city && <span className="text-gray-500 font-normal">({g.city})</span>}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {getStatusBadge(g.status)}
                    </td>

                    {/* Badges (Featured / Pinned / Verified) */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => toggleFeatureGroup(g.id)}
                          className={`p-1 rounded-md cursor-pointer transition-colors ${
                            g.isFeatured ? 'text-yellow-400 bg-yellow-400/10' : 'text-gray-600 hover:text-gray-400'
                          }`}
                          title={g.isFeatured ? 'Featured on homepage' : 'Mark as featured'}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                        </button>

                        <button
                          onClick={() => togglePinGroup(g.id)}
                          className={`p-1 rounded-md cursor-pointer transition-colors ${
                            g.isPinned ? 'text-[#25D366] bg-[#25D366]/10' : 'text-gray-600 hover:text-gray-400'
                          }`}
                          title={g.isPinned ? 'Pinned group' : 'Pin to top'}
                        >
                          <Pin className="w-3.5 h-3.5 fill-current" />
                        </button>

                        <button
                          onClick={() => toggleVerifyGroup(g.id)}
                          className={`p-1 rounded-md cursor-pointer transition-colors ${
                            g.isVerified ? 'text-sky-400 bg-sky-400/10' : 'text-gray-600 hover:text-gray-400'
                          }`}
                          title={g.isVerified ? 'Verified link' : 'Verify link'}
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    {/* Views & Joins */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="font-mono text-gray-200">
                        <span className="text-white font-bold">{g.views.toLocaleString()}</span> views &middot;{' '}
                        <span className="text-[#25D366] font-bold">{g.joinClicks.toLocaleString()}</span> joins
                      </div>
                    </td>

                    {/* Date added */}
                    <td className="py-3 px-4 whitespace-nowrap text-gray-400 font-mono text-[11px]">
                      {g.createdAt}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        
                        {/* View Details */}
                        <button
                          onClick={() => setInspectingGroup(g)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
                          title="View group inspect card"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => setEditingGroup(g)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-[#25D366] hover:bg-white/5 cursor-pointer"
                          title="Edit group"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        {/* Quick Approve / Suspend */}
                        {g.status === 'pending' ? (
                          <button
                            onClick={() => setGroupStatus(g.id, 'active')}
                            className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                            title="Approve Group"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                        ) : g.status === 'active' ? (
                          <button
                            onClick={() => setGroupStatus(g.id, 'suspended')}
                            className="p-1.5 rounded-lg text-purple-400 hover:bg-purple-500/10 cursor-pointer"
                            title="Suspend Group"
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => setGroupStatus(g.id, 'active')}
                            className="p-1.5 rounded-lg text-emerald-400 hover:bg-emerald-500/10 cursor-pointer"
                            title="Restore to Active"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          onClick={() => setDeletingGroupId(g.id)}
                          className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                          title="Delete Group"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, filteredGroups.length)} of {filteredGroups.length} entries
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-bold text-white px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white/10 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Add / Edit Modal */}
      {(isAddModalOpen || editingGroup) && (
        <GroupFormModal
          group={editingGroup}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingGroup(null);
          }}
        />
      )}

      {/* Inspect Group Modal */}
      {inspectingGroup && (
        <GroupDetailAdminModal
          group={inspectingGroup}
          onClose={() => setInspectingGroup(null)}
          onEdit={() => {
            const grp = inspectingGroup;
            setInspectingGroup(null);
            setEditingGroup(grp);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deletingGroupId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#181818] border border-white/15 rounded-2xl max-w-sm w-full p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-3">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Group Permanently?</h3>
            <p className="text-xs text-gray-400 mb-6">
              This action cannot be undone. This WhatsApp group listing will be permanently eradicated from the directory.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeletingGroupId(null)}
                className="flex-1 py-2 rounded-xl bg-white/10 text-xs font-bold text-gray-300 hover:bg-white/15 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteGroup(deletingGroupId);
                  setDeletingGroupId(null);
                }}
                className="flex-1 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold cursor-pointer"
              >
                Delete Group
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
