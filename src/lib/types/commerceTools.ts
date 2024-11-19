export interface LineItem {
	id: string;
	productId: string;
	productKey: string;
	quantity: number;
}

export interface Cart {
	id: string;
	version: number;
	lineItems: LineItem[];
}

export interface CheckoutSession {
	id: string;
	state: string;
}
