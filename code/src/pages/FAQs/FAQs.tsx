"use client";

import { useState } from "react";
import Seo from "../../components/Seo";
import styles from "./FAQs.module.css";

const data = [
	{
		id: "q1",
		question: "Comment passer une commande ?",
		answer: "Ajoutez des produits au panier, connectez-vous (ou créez un compte), indiquez votre adresse de livraison puis payez par carte sur la page sécurisée Stripe.",
	},
	{
		id: "q2",
		question: "Quels sont les délais de livraison ?",
		answer: "Les délais de livraison sont indiqués dans nos conditions générales de vente. Vous suivez l'état de chaque commande dans « Mes commandes ».",
	},
	{
		id: "q3",
		question: "Puis-je retourner un produit ?",
		answer: "Oui : vous disposez de 14 jours après réception pour exercer votre droit de rétractation, selon les modalités de nos CGV.",
	},
];

const FAQs = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<div className={`page ${styles.container}`}>
			<Seo title="Questions fréquentes" description="Commande, livraison, retours : les réponses aux questions fréquentes sur eMatériel." path="/faqs" />
			<h1>Questions fréquentes</h1>

			{data.map((item, index) => (
				<div key={item.id} className={styles.faqItem}>
					<button
						type="button"
						className={styles.question}
						onClick={() => setOpenIndex(index === openIndex ? null : index)}
						aria-expanded={openIndex === index}
						aria-controls={`faq-answer-${index}`}
					>
						{item.question}
					</button>

					{openIndex === index && (
						<div className={styles.answer} id={`faq-answer-${index}`}>{item.answer}</div>
					)}
				</div>
			))}
		</div>
	);
};

export default FAQs;
