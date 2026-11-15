"use client";

import { useState } from "react";
import type { User } from "../../../../models/user";
import { useAuth } from "../../../context/AuthContext";
import { api, errorMessage } from "../../../services/api";
import { formatDate } from "../../../utils/format";
import { useAdminData } from "../useAdminData";

export default function AdminUsers() {
	const { session } = useAuth();
	const { data: users, error, setError, reload } = useAdminData<User[]>("/api/user");
	const [notice, setNotice] = useState("");

	const changeRole = async (user: User, role_id: number) => {
		const label = role_id === 1 ? "administrateur" : "client";
		if (!window.confirm(`Passer ${user.email} en ${label} ?`)) return;
		const result = await api(`/api/user/${user.id}/role`, { method: "PATCH", body: { role_id } });
		if (result.status !== 200) return setError(errorMessage(result));
		setNotice(`${user.email} est maintenant ${label}`);
		reload();
	};

	return (
		<>
			<h1>Utilisateurs</h1>
			<div role="status" aria-live="polite">
				{notice && <p className="form-message success">{notice}</p>}
			</div>
			{error && <p className="form-message error" role="alert">{error}</p>}
			{!users ? (
				<p>Chargement…</p>
			) : (
				<div className="table-wrap">
					<table className="table">
						<thead>
							<tr>
								<th scope="col">Email</th>
								<th scope="col">Nom</th>
								<th scope="col">Inscription</th>
								<th scope="col">Rôle</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id}>
									<td>{user.email}</td>
									<td>{[user.firstname, user.lastname].filter(Boolean).join(" ") || "–"}</td>
									<td>{user.created_at ? formatDate(user.created_at) : "–"}</td>
									<td>
										<label className="sr-only" htmlFor={`role-${user.id}`}>
											Rôle de {user.email}
										</label>
										<select
											id={`role-${user.id}`}
											value={user.role_id}
											// on ne peut pas se retirer soi-même les droits d'administration
											disabled={user.id === session?.user.id}
											onChange={(e) => changeRole(user, Number(e.target.value))}
											style={{ minHeight: "36px", borderRadius: "6px", border: "1px solid #6b7280", padding: "0 0.4rem" }}
										>
											<option value={2}>Client</option>
											<option value={1}>Administrateur</option>
										</select>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</>
	);
}
