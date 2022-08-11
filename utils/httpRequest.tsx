export const fetchResponse = async (url: string): Promise<any> => {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + url);
		console.log('alchemy api',process.env.NEXT_PUBLIC_ALCHEMY_ACCESS_TOKEN)
		const data = await response.json();
		return data;
	} catch (error: any) {
		console.log(error);
		return {
			error: error.message,
		};
	}
};
