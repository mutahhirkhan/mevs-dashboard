const axios = require("axios");

// to get function signatures
//https://sig.eth.samczsun.com/api/v1/signatures?function=0x827481ea
export const getFunctionNameBySignature = async (sig: string) => {
	try {
		//0x827481ea
		if (!sig) throw new Error("Signature not provided");
		//you can try this api is postman as well
		const data = await axios.get(`https://sig.eth.samczsun.com/api/v1/signatures?function=${sig}`);
		// console.log('==============');
		// console.log(data);
		
		// console.log('==============');
		// const data = await res.json();
		//optional chaining is not required here becuase api response is consistent either found or not
		return {
			data: data.data.result.function,
		};
	} catch (error) {
		return {
			error,
		};
	}
};
export const getFunctionNameBySignatureArray = (signaturesArray: string[]) => {
	let signatures = [];
	signaturesArray.forEach((sig) => {
		const res = axios.get(`https://sig.eth.samczsun.com/api/v1/signatures?function=0x${sig}`);
		signatures.push(res);
	});
	return signatures;
};
