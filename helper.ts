export const TruncateAddress = (address: string) => {
    if (address) {
        if (address.length > 5) {
            return `${address.substring(0, 5)}...${address[address.length - 3]}${address[address.length - 2]}${address[address.length - 1]}
                `
        }
        else return address
    }
    return ""
}
//https://sig.eth.samczsun.com/api/v1/signatures\?function\=0x827481ea