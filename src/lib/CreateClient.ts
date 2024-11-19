import { env } from '$env/dynamic/private';
import { ctpClient } from '$lib/BuildClient';
import {
	ByProjectKeyRequestBuilder,
	createApiBuilderFromCtpClient
} from '@commercetools/platform-sdk';

let root: ByProjectKeyRequestBuilder | undefined;

export const createClient = () => {
	if (!root) {
		root = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
			projectKey: env.CTP_PROJECT_KEY!
		});
	}

	return root;
};
