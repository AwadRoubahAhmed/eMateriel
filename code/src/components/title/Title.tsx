import styles from "./Title.module.css";

type TitleProps = {
	title: string;
	// un seul h1 par page ; les sections utilisent h2
	as?: "h1" | "h2";
	id?: string;
};

export default function Title({ title, as: Tag = "h2", id }: TitleProps) {
	return (
		<Tag className={styles.title} id={id}>
			{title}
		</Tag>
	);
}
