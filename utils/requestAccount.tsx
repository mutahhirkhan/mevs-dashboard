// Requests access to the user's META MASK WALLET
// https://metamask.io
export async function requestAccount(): Promise<string>{

	// ❌ Check if Meta Mask Extension exists
	if (window.ethereum) {
        //detected
		try {
            //requesting address
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			return accounts[0];
		} catch (error) {
            // alert("Error connecting...");
            return "0x0"
		}
	} else {
        alert("download metamask");
        return "0x0";
	}
}
