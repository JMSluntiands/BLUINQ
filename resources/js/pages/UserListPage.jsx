import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardShell from '../components/DashboardShell.jsx';

export default function UserListPage({ user, onLogout }) {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: null,
        to: null,
    });
    const [errors, setErrors] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [saving, setSaving] = useState(false);
    const [editForm, setEditForm] = useState({
        fullname: '',
        name: '',
        username: '',
        email: '',
        role: 'user',
        password: '',
    });

    const loadUsers = async (targetPage = page, query = search) => {
        setLoading(true);
        try {
            const { data } = await window.axios.get('/users', {
                params: {
                    page: targetPage,
                    q: query,
                    per_page: pagination.per_page,
                },
            });
            setUsers(data.users ?? []);
            setPagination((prev) => ({
                ...prev,
                ...(data.meta ?? {}),
            }));
            setPage(data?.meta?.current_page ?? targetPage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = window.setTimeout(() => {
            loadUsers(1, search);
        }, 300);

        return () => window.clearTimeout(timer);
    }, [search]);

    const startEdit = (row) => {
        setEditingId(row.id);
        setErrors({});
        setEditForm({
            fullname: row.fullname ?? '',
            name: row.name ?? '',
            username: row.username ?? '',
            email: row.email ?? '',
            role: row.role ?? 'user',
            password: '',
        });
    };

    const onEditChange = (field) => (event) => {
        setEditForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const saveEdit = async (id) => {
        setSaving(true);
        setErrors({});
        try {
            await window.axios.put(`/users/${id}`, editForm);
            setEditingId(null);
            await loadUsers(page, search);
        } catch (error) {
            setErrors(error?.response?.data?.errors ?? {});
        } finally {
            setSaving(false);
        }
    };

    const archiveUser = async (id) => {
        await window.axios.delete(`/users/${id}/archive`);
        await loadUsers(page, search);
    };

    return (
        <DashboardShell
            user={user}
            onLogout={onLogout}
            onOpenAccountSettings={() => navigate('/account-settings')}
            activeNav="user-list"
            headerTitle="Users List"
        >
            <div className="w-full">
                <div className="mb-4 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-brand-navy dark:text-slate-100">Users</h2>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Non-admin users with update and archive actions.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <input
                            value={search}
                            onChange={(event) => {
                                setSearch(event.target.value);
                                setPage(1);
                            }}
                            placeholder="Search users..."
                            className="w-52 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-sky dark:border-slate-700 dark:bg-[#0b1f42] dark:text-slate-100"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/users/add')}
                            className="rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-navy-dark"
                        >
                            Add User
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-slate-700 dark:bg-[#081a37]">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-slate-50 text-slate-600 dark:bg-slate-800/40 dark:text-slate-300">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Full name</th>
                                    <th className="px-4 py-3 text-left font-semibold">Username</th>
                                    <th className="px-4 py-3 text-left font-semibold">Email</th>
                                    <th className="px-4 py-3 text-left font-semibold">Role</th>
                                    <th className="px-4 py-3 text-right font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {loading ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-6 text-center text-slate-500 dark:text-slate-400">Loading users...</td>
                                    </tr>
                                ) : users.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-4 py-6 text-center text-slate-500 dark:text-slate-400">No users found.</td>
                                    </tr>
                                ) : (
                                    users.map((row) => (
                                        <tr key={row.id} className="text-slate-700 dark:text-slate-200">
                                            <td className="px-4 py-3">{row.fullname || row.name}</td>
                                            <td className="px-4 py-3">{row.username}</td>
                                            <td className="px-4 py-3">{row.email}</td>
                                            <td className="px-4 py-3 capitalize">{row.role}</td>
                                            <td className="px-4 py-3 text-right space-x-2">
                                                <button type="button" onClick={() => startEdit(row)} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold transition hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800">Update</button>
                                                <button type="button" onClick={() => archiveUser(row.id)} className="rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-50 dark:border-red-800 dark:text-red-300 dark:hover:bg-red-950/25">Archive</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        {pagination.total > 0
                            ? `Showing ${pagination.from}-${pagination.to} of ${pagination.total} users`
                            : 'No users to show'}
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => loadUsers(Math.max(1, page - 1), search)}
                            disabled={page <= 1 || loading}
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-600 dark:hover:bg-slate-800"
                        >
                            Prev
                        </button>
                        <span className="text-xs text-slate-600 dark:text-slate-300">
                            Page {pagination.current_page} of {pagination.last_page}
                        </span>
                        <button
                            type="button"
                            onClick={() => loadUsers(Math.min(pagination.last_page, page + 1), search)}
                            disabled={page >= pagination.last_page || loading}
                            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold transition hover:bg-slate-100 disabled:opacity-50 dark:border-slate-600 dark:hover:bg-slate-800"
                        >
                            Next
                        </button>
                    </div>
                </div>

                {editingId ? (
                    <div className="mt-4 rounded-2xl border border-slate-200/90 bg-white p-4 dark:border-slate-700 dark:bg-[#081a37]">
                        <h3 className="mb-3 text-sm font-semibold text-brand-navy dark:text-slate-100">Update user</h3>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <input value={editForm.fullname} onChange={onEditChange('fullname')} placeholder="Full name" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-[#0b1f42]" />
                            <input value={editForm.name} onChange={onEditChange('name')} placeholder="Display name" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-[#0b1f42]" />
                            <input value={editForm.username} onChange={onEditChange('username')} placeholder="Username" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-[#0b1f42]" />
                            <input value={editForm.email} onChange={onEditChange('email')} placeholder="Email" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-[#0b1f42]" />
                            <select value={editForm.role} onChange={onEditChange('role')} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-[#0b1f42]">
                                <option value="user">User</option>
                                <option value="staff">Staff</option>
                                <option value="manager">Manager</option>
                            </select>
                            <input value={editForm.password} onChange={onEditChange('password')} placeholder="New password (optional)" type="password" className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-[#0b1f42]" />
                        </div>
                        {Object.keys(errors).length ? <p className="mt-2 text-xs text-red-500">Please check the form fields.</p> : null}
                        <div className="mt-3 flex justify-end gap-2">
                            <button type="button" onClick={() => setEditingId(null)} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold dark:border-slate-600">Cancel</button>
                            <button type="button" disabled={saving} onClick={() => saveEdit(editingId)} className="rounded-lg bg-brand-navy px-3 py-2 text-xs font-semibold text-white disabled:opacity-60">
                                {saving ? 'Saving...' : 'Save update'}
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </DashboardShell>
    );
}
