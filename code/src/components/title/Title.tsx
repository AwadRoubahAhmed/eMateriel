import styles from "./Title.module.css";

type TitleProps = {
	title: string;
};

export default function Title({ title }: TitleProps) {
	return <div className={styles.title}> {title}</div>;
}
