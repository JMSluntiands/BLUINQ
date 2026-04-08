import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardShell from '../components/DashboardShell.jsx';

export default function AccountSettingsPage({ user, onLogout, onUserUpdated }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        fullname: user.fullname ?? '',
        name: user.name ?? '',
        username: user.username ?? '',
        email: user.email ?? '',
        image: null,
    });
    const [previewUrl, setPreviewUrl] = useState(user.image_url ?? null);
    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const avatarInitials = useMemo(() => {
        const source = (form.fullname || form.name || form.email || 'U').trim();
        const parts = source.split(/\s+/).filter(Boolean);
        if (parts.length === 0) return 'U';
        if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
        return `${parts[0][0] || ''}${parts[1][0] || ''}`.toUpperCase();
    }, [form.email, form.fullname, form.name]);

    const handleInputChange = (field) => (event) => {
        setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0] ?? null;
        setForm((prev) => ({ ...prev, image: file }));
        setErrors((prev) => ({ ...prev, image: undefined }));
        setSuccessMessage('');

        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
            return;
        }

        setPreviewUrl(user.image_url ?? null);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setErrors({});
        setSuccessMessage('');

        const payload = new FormData();
        payload.append('fullname', form.fullname ?? '');
        payload.append('name', form.name ?? '');
        payload.append('username', form.username ?? '');
        payload.append('email', form.email ?? '');
        if (form.image) payload.append('image', form.image);

        try {
            const { data } = await window.axios.post('/account/settings', payload, {
                headers: { 'Content-Type': 'multipart/form-data' },
                params: { _method: 'PUT' },
            });
            onUserUpdated?.(data.user);
            setSuccessMessage('Account settings updated successfully.');
            setForm((prev) => ({ ...prev, image: null }));
            setPreviewUrl(data.user?.image_url ?? null);
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
            activeNav="settings"
            headerTitle="Account Settings"
        >
            <div className="w-full px-0">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold text-brand-navy dark:text-slate-100">Update User Information</h2>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Update your profile image and account information.
                    </p>
                </div>

                <div className="w-full rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#081a37]">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-slate-100 text-xl font-semibold text-brand-navy dark:bg-slate-800 dark:text-brand-sky">
                                {previewUrl ? (
                                    <img src={previewUrl} alt="Profile preview" className="h-full w-full object-cover" />
                                ) : (
                                    avatarInitials
                                )}
                            </div>
                            <div className="space-y-1">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                                    Profile image
                                </label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="block text-xs text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-brand-navy file:px-3 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-brand-navy-dark dark:text-slate-300"
                                />
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Saved to <code>storage/img/user_id/filename.jpg</code>.
                                </p>
                                {errors.image ? <p className="text-xs text-red-500">{errors.image[0]}</p> : null}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Full name</label>
                                <input
                                    type="text"
                                    value={form.fullname}
                                    onChange={handleInputChange('fullname')}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-sky dark:border-slate-700 dark:bg-[#0b1f42] dark:text-slate-100"
                                />
                                {errors.fullname ? <p className="mt-1 text-xs text-red-500">{errors.fullname[0]}</p> : null}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Display name</label>
                                <input
                                    type="text"
                                    value={form.name}
                                    onChange={handleInputChange('name')}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-sky dark:border-slate-700 dark:bg-[#0b1f42] dark:text-slate-100"
                                />
                                {errors.name ? <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p> : null}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Username</label>
                                <input
                                    type="text"
                                    value={form.username}
                                    onChange={handleInputChange('username')}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-sky dark:border-slate-700 dark:bg-[#0b1f42] dark:text-slate-100"
                                />
                                {errors.username ? <p className="mt-1 text-xs text-red-500">{errors.username[0]}</p> : null}
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-200">Email</label>
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={handleInputChange('email')}
                                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-brand-sky dark:border-slate-700 dark:bg-[#0b1f42] dark:text-slate-100"
                                />
                                {errors.email ? <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p> : null}
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-3">
                            <p className="text-sm text-emerald-600 dark:text-emerald-400">{successMessage}</p>
                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-brand-navy/20 transition hover:bg-brand-navy-dark disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {saving ? 'Saving...' : 'Save changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardShell>
    );
}
