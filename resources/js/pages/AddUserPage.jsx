import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardShell from '../components/DashboardShell.jsx';

export default function AddUserPage({ user, onLogout }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullname: '',
        name: '',
        username: '',
        email: '',
        role: 'user',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const onChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setErrors({});
        try {
            await window.axios.post('/users', form);
            navigate('/users/list');
        } catch (error) {
            setErrors(error?.response?.data?.errors ?? {});
        } finally {
            setSaving(false);
        }
    };

    return (
        <DashboardShell
            user={user}
            onLogout={onLogout}
            onOpenAccountSettings={() => navigate('/account-settings')}
            activeNav="user-add"
            headerTitle="Add User"
        >
            <div className="w-full">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-brand-navy dark:text-slate-100">Add New User</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Create a new non-admin user account.</p>
                </div>

                <div className="w-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#081a37]">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Full name</label>
                            <input value={form.fullname} onChange={onChange('fullname')} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-sky dark:border-slate-700 dark:bg-[#0b1f42] dark:text-slate-100" />
                            {errors.fullname ? <p className="mt-1 text-xs text-red-500">{errors.fullname[0]}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Display name</label>
                            <input value={form.name} onChange={onChange('name')} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-sky dark:border-slate-700 dark:bg-[#0b1f42] dark:text-slate-100" />
                            {errors.name ? <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Username</label>
                            <input value={form.username} onChange={onChange('username')} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-sky dark:border-slate-700 dark:bg-[#0b1f42] dark:text-slate-100" />
                            {errors.username ? <p className="mt-1 text-xs text-red-500">{errors.username[0]}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
                            <input type="email" value={form.email} onChange={onChange('email')} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-sky dark:border-slate-700 dark:bg-[#0b1f42] dark:text-slate-100" />
                            {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Role</label>
                            <select value={form.role} onChange={onChange('role')} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-sky dark:border-slate-700 dark:bg-[#0b1f42] dark:text-slate-100">
                                <option value="user">User</option>
                                <option value="staff">Staff</option>
                                <option value="manager">Manager</option>
                            </select>
                            {errors.role ? <p className="mt-1 text-xs text-red-500">{errors.role[0]}</p> : null}
                        </div>
                        <div>
                            <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
                            <input type="password" value={form.password} onChange={onChange('password')} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-sky dark:border-slate-700 dark:bg-[#0b1f42] dark:text-slate-100" />
                            {errors.password ? <p className="mt-1 text-xs text-red-500">{errors.password[0]}</p> : null}
                        </div>

                        <div className="sm:col-span-2 flex justify-end">
                            <button type="submit" disabled={saving} className="rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-navy/20 transition hover:bg-brand-navy-dark disabled:cursor-not-allowed disabled:opacity-60">
                                {saving ? 'Saving...' : 'Create User'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardShell>
    );
}
