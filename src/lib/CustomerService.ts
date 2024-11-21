import { createClient } from './CreateClient';

export const getCustomer = async (customerId: string) => {
	const apiRoot = createClient();

	const result = await apiRoot.customers().withId({ ID: customerId }).get().execute();

	return result.body;
};
