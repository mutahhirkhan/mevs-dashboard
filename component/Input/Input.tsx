import React from "react";
//import input from antd
import styles from "./../../styles/Input.module.css";
import { Input as AntInput } from "antd";

const Input = ({ ph, ...restProps }: any) => {
	const { Search } = AntInput;

	return (
		<>
			<Search
				className={styles.input}
				placeholder={`${ph ? ph : "input user address"}`}
				onSearch={restProps.onSearch ?? restProps.onSearch}
				{...restProps}
			/>

			{/* <AntInput className={styles.input} placeholder={`${ph ? ph : "input user address"}`} {...restProps}/> */}
		</>
	);
};

export default Input;
