"use client";

import { useState } from "react";
import styles from "./FAQs.module.css";

const data = [
	{
		id: "q1",
		question: "Comment passer une commande ?",
		answer: "Ajoutez des produits au panier puis validez votre commande.",
	},
	{
		id: "q2",
		question: "Quels sont les délais de livraison ?",
		answer: "Entre 2 et 5 jours ouvrés.",
	},
	{
		id: "q3",
		question: "Puis-je retourner un produit ?",
		answer: "Oui, sous 14 jours après réception.",
	},
];

const FAQs = () => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<div className={styles.container}>
			<h1>FAQs</h1>

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
						<div className={styles.answer}>{item.answer}</div>
					)}
				</div>
			))}
		</div>
	);
};

export default FAQs;
