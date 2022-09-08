export const fetchResponse = async (url: string, address?: string): Promise<any> => {
	try {
		// console.log('user address',address);
		//this response has to be object returned by service running in the background
		const response = await fetch(
			process.env.NEXT_PUBLIC_BASE_URL + url + `${address ? "?user=" + address : ""}`
			// ,{
			// 	body: JSON.stringify(address)
			// }
		);
		// console.log('alchemy api',process.env.NEXT_PUBLIC_ALCHEMY_ACCESS_TOKEN)
		// console.log('====================================');
        // console.log(response);
        // console.log('====================================');
		const data = await response.json();
		return data;
	} catch (error: any) {
		console.log(error);
		return {
			error: error.message,
		};
	}
};
