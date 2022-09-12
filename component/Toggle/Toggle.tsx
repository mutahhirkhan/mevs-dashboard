import { Switch } from "antd";
import React from "react";

interface Props {
	chainId: number;
}

const Toggle = ({ chainId }: Props) => {
	return (
			chainId === 1 ?
		<Switch
			defaultChecked
			checkedChildren={ "Ethereum"}
			unCheckedChildren={"Polygon"}
		/> : chainId === 137 ?
		<Switch
			defaultChecked
			checkedChildren={"Polygon"}
			unCheckedChildren={"Ethereum"}
		/> : <></>
	);
};
export default Toggle;
