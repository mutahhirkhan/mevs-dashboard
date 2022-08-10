export const fetchResponse = async (url: string): Promise<any> => {
	try {
		const response = await fetch(process.env.BASE_URL + url);
		const data = await response.json();
		return data;
	} catch (error: any) {
		console.log(error);
		return {
			error: error.message,
		};
	}
};
