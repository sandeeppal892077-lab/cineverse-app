'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, Film, Users, MessageSquare, BarChart3,
  Plus, Edit, Trash2, Eye, TrendingUp, Star, Clock,
  Settings, Shield, Search,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { mockTitles } from '@/data/mockData';
import { cn } from '@/lib/utils';

const TABS = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'content', label: 'Content', icon: Film },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'comments', label: 'Comments', icon: MessageSquare },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const MOCK_USERS = [
  { id: '1', name: 'Alex Morgan', email: 'alex@cineverse.com', role: 'Admin', joined: '2024-01-15', status: 'Active' },
  { id: '2', name: 'Sarah Chen', email: 'sarah@email.com', role: 'User', joined: '2024-02-20', status: 'Active' },
  { id: '3', name: 'Mike Johnson', email: 'mike@email.com', role: 'User', joined: '2024-03-10', status: 'Active' },
  { id: '4', name: 'Emma Wilson', email: 'emma@email.com', role: 'Moderator', joined: '2024-01-25', status: 'Active' },
  { id: '5', name: 'James Lee', email: 'james@email.com', role: 'User', joined: '2024-04-05', status: 'Suspended' },
];

const MOCK_COMMENTS = [
  { id: '1', user: 'Sarah Chen', content: 'Amazing movie! The visuals were incredible.', title: 'Dune: Part Two', time: '2 hours ago', status: 'Approved' },
  { id: '2', user: 'Mike Johnson', content: 'Best anime of the year hands down.', title: 'Demon Slayer', time: '5 hours ago', status: 'Approved' },
  { id: '3', user: 'James Lee', content: 'This comment violates our guidelines.', title: 'Breaking Bad', time: '1 day ago', status: 'Flagged' },
];

export default function AdminPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <Shield className="w-12 h-12 text-cv-muted mx-auto mb-4" />
          <h1 className="text-3xl font-display font-bold text-white mb-2">Access Denied</h1>
          <p className="text-cv-muted">You don&apos;t have admin privileges</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Content', value: mockTitles.length, icon: Film, color: 'text-cv-blue', bg: 'bg-cv-blue/10' },
    { label: 'Active Users', value: '2.4K', icon: Users, color: 'text-cv-teal', bg: 'bg-cv-teal/10' },
    { label: 'Comments', value: '1.2K', icon: MessageSquare, color: 'text-cv-purple', bg: 'bg-cv-purple/10' },
    { label: 'Page Views', value: '156K', icon: Eye, color: 'text-cv-gold', bg: 'bg-cv-gold/10' },
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-display font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-cv-muted">Manage your content and users</p>
          </div>
          <button className="flex items-center gap-2 btn-primary text-sm">
            <Plus className="w-4 h-4" /> Add Content
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-cv-surface rounded-xl p-1 mb-8 overflow-x-auto scrollbar-hide border border-cv-border">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap',
                activeTab === tab.id ? 'bg-cv-primary text-white' : 'text-cv-text-dim hover:text-white hover:bg-white/5'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass-card p-5">
                  <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center mb-3', stat.bg)}>
                    <stat.icon className={cn('w-5 h-5', stat.color)} />
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-cv-muted mt-0.5">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Charts placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="glass-card p-6">
                <h3 className="font-display font-bold text-white mb-4">Views This Week</h3>
                <div className="flex items-end gap-2 h-40">
                  {[35, 65, 45, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full bg-cv-primary/20 rounded-t-lg relative" style={{ height: `${h}%` }}>
                        <div className="absolute bottom-0 w-full bg-cv-primary rounded-t-lg transition-all" style={{ height: `${h}%` }} />
                      </div>
                      <span className="text-[10px] text-cv-muted">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h3 className="font-display font-bold text-white mb-4">Top Content</h3>
                <div className="space-y-3">
                  {mockTitles.slice(0, 5).map((t, i) => (
                    <div key={t.id} className="flex items-center gap-3">
                      <span className="text-sm font-bold text-cv-muted w-5">{i + 1}</span>
                      <div className="w-8 h-12 rounded overflow-hidden flex-shrink-0">
                        <img src={t.poster} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{t.name}</p>
                        <p className="text-xs text-cv-muted">{Math.floor(Math.random() * 50000) + 10000} views</p>
                      </div>
                      <Star className="w-3.5 h-3.5 text-cv-gold fill-cv-gold" />
                      <span className="text-sm text-white">{t.imdbRating}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Content Management */}
        {activeTab === 'content' && (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cv-muted" />
                <input placeholder="Search content..." className="input-field pl-10 text-sm" />
              </div>
            </div>
            <div className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cv-border">
                      <th className="text-left p-4 text-xs font-medium text-cv-muted uppercase">Title</th>
                      <th className="text-left p-4 text-xs font-medium text-cv-muted uppercase">Type</th>
                      <th className="text-left p-4 text-xs font-medium text-cv-muted uppercase">Rating</th>
                      <th className="text-left p-4 text-xs font-medium text-cv-muted uppercase">Year</th>
                      <th className="text-right p-4 text-xs font-medium text-cv-muted uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockTitles.map(t => (
                      <tr key={t.id} className="border-b border-cv-border/50 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-14 rounded overflow-hidden flex-shrink-0">
                              <img src={t.poster} alt={t.name} className="w-full h-full object-cover" />
                            </div>
                            <span className="text-sm font-medium text-white truncate max-w-[200px]">{t.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-cv-text-dim capitalize">{t.type.replace(/-/g, ' ')}</td>
                        <td className="p-4 text-sm text-cv-gold font-bold">{t.imdbRating}</td>
                        <td className="p-4 text-sm text-cv-text-dim">{t.year}</td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-white/10 text-cv-muted hover:text-white transition-all">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-white/10 text-cv-muted hover:text-cv-blue transition-all">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 rounded-lg hover:bg-white/10 text-cv-muted hover:text-red-400 transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Users */}
        {activeTab === 'users' && (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cv-border">
                    <th className="text-left p-4 text-xs font-medium text-cv-muted uppercase">User</th>
                    <th className="text-left p-4 text-xs font-medium text-cv-muted uppercase">Role</th>
                    <th className="text-left p-4 text-xs font-medium text-cv-muted uppercase">Joined</th>
                    <th className="text-left p-4 text-xs font-medium text-cv-muted uppercase">Status</th>
                    <th className="text-right p-4 text-xs font-medium text-cv-muted uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_USERS.map(u => (
                    <tr key={u.id} className="border-b border-cv-border/50 hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cv-primary to-cv-purple flex items-center justify-center text-white text-xs font-bold">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{u.name}</p>
                            <p className="text-xs text-cv-muted">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={cn('badge', u.role === 'Admin' ? 'bg-cv-primary/20 text-cv-primary' : u.role === 'Moderator' ? 'bg-cv-purple/20 text-cv-purple' : 'bg-cv-border/50 text-cv-text-dim')}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-cv-text-dim">{u.joined}</td>
                      <td className="p-4">
                        <span className={cn('badge', u.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400')}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button className="p-1.5 rounded-lg hover:bg-white/10 text-cv-muted hover:text-white transition-all">
                          <Edit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Comments */}
        {activeTab === 'comments' && (
          <div className="space-y-3">
            {MOCK_COMMENTS.map(c => (
              <div key={c.id} className="glass-card p-4 flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cv-card flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {c.user.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white">{c.user}</span>
                    <span className="text-xs text-cv-muted">{c.time}</span>
                    <span className={cn('badge text-[10px]', c.status === 'Approved' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400')}>
                      {c.status}
                    </span>
                  </div>
                  <p className="text-sm text-cv-text-dim">{c.content}</p>
                  <p className="text-xs text-cv-muted mt-1">On: {c.title}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-green-500/10 text-cv-muted hover:text-green-400 transition-all">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-cv-muted hover:text-red-400 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Analytics */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="glass-card p-6">
              <h3 className="font-display font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cv-teal" /> Monthly Views
              </h3>
              <div className="flex items-end gap-1.5 h-48">
                {[40, 55, 45, 70, 60, 85, 75, 90, 80, 95, 88, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-cv-teal/20 rounded-t relative" style={{ height: `${h}%` }}>
                      <div className="absolute bottom-0 w-full bg-cv-teal rounded-t transition-all" style={{ height: `${h}%` }} />
                    </div>
                    <span className="text-[9px] text-cv-muted">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-display font-bold text-white mb-4">Content Distribution</h3>
              <div className="space-y-3">
                {[
                  { label: 'Movies', pct: 35, color: 'bg-cv-primary' },
                  { label: 'TV Shows', pct: 25, color: 'bg-cv-blue' },
                  { label: 'Anime', pct: 20, color: 'bg-cv-purple' },
                  { label: 'Comics', pct: 10, color: 'bg-cv-teal' },
                  { label: 'Other', pct: 10, color: 'bg-cv-gold' },
                ].map(item => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-white">{item.label}</span>
                      <span className="text-sm text-cv-muted">{item.pct}%</span>
                    </div>
                    <div className="w-full bg-cv-border rounded-full h-2">
                      <div className={cn('h-2 rounded-full transition-all', item.color)} style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
