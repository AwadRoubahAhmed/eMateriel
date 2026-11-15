"use client";

import { useState } from "react";
import type { Contact } from "../../../../models/contact";
import { api, errorMessage } from "../../../services/api";
import { formatDate } from "../../../utils/format";
import { useAdminData } from "../useAdminData";

export default function AdminMessages() {
	const { data: messages, error, setError, reload } = useAdminData<Contact[]>("/api/contact");
	const [notice, setNotice] = useState("");

	const markRead = async (message: Contact, is_read: boolean) => {
		const result = await api(`/api/contact/${message.id}`, { method: "PATCH", body: { is_read } });
		if (result.status !== 200) return setError(errorMessage(result));
		reload();
	};

	const remove = async (message: Contact) => {
		if (!window.confirm(`Supprimer définitivement le message de ${message.email} ?`)) return;
		const result = await api(`/api/contact/${message.id}`, { method: "DELETE" });
		if (result.status !== 200) return setError(errorMessage(result));
		setNotice("Message supprimé");
		reload();
	};

	return (
		<>
			<h1>Messages de contact</h1>
			<div role="status" aria-live="polite">
				{notice && <p className="form-message success">{notice}</p>}
			</div>
			{error && <p className="form-message error" role="alert">{error}</p>}
			{!messages ? (
				<p>Chargement…</p>
			) : messages.length === 0 ? (
				<p>Aucun message.</p>
			) : (
				<div style={{ display: "grid", gap: "1rem" }}>
					{messages.map((message) => (
						<article key={message.id} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "1rem", background: message.is_read ? "#fff" : "#eff6ff" }}>
							<h2 style={{ fontSize: "1.05rem", marginBottom: "0.25rem" }}>
								{message.subject} {!message.is_read && <span className="badge badge-expediee">Non lu</span>}
							</h2>
							<p style={{ color: "var(--muted)", marginBottom: "0.5rem" }}>
								{message.name} · <a href={`mailto:${message.email}`} style={{ color: "var(--primary)" }}>{message.email}</a> ·{" "}
								{formatDate(message.created_at)}
							</p>
							<p style={{ whiteSpace: "pre-wrap", lineHeight: 1.5, marginBottom: "0.75rem" }}>{message.message}</p>
							<div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
								<button type="button" className="btn btn-secondary btn-small" onClick={() => markRead(message, !message.is_read)}>
									{message.is_read ? "Marquer non lu" : "Marquer comme lu"}
								</button>
								<button type="button" className="btn btn-danger btn-small" onClick={() => remove(message)}>
									Supprimer
								</button>
							</div>
						</article>
					))}
				</div>
			)}
		</>
	);
}
