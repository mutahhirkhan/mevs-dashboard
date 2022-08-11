import { Switch } from "antd";
import React from "react";

interface Props {
	chainId: number;
}

const Toggle = ({ chainId }: Props) => {
	return (
		<Switch
			defaultChecked
			checkedChildren={`${chainId == 1 ? "Ethereum" : "Polygon"}`}
			unCheckedChildren={`${chainId == 137 ? "Polygon" : "Ethereum"}`}
		/>
	);
};

export default Toggle;
