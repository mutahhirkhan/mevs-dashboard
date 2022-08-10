import React from "react";
import { PageHeader } from "antd";
import styles from "./../../styles/Heading.module.css";

const Header = ({ children, size, weight, color }: any) => {
	return (
		<>
			<PageHeader
				className={`
				${styles.commonFontStyle}
				${color ?? styles[color]} 
				${size ? styles[size] : styles.medium}  
				${weight ? styles[weight] : styles.regular}`}>
				{children}
			</PageHeader>
		</>
	);
};

export default Header;
