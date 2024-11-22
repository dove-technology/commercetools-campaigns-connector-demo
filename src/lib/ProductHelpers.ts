import type { Image } from '@commercetools/platform-sdk';

export const getImageUrl = (images: Image[] | undefined) => {
	if (images && images.length > 0) {
		return images[0].url;
	}

	return '';
};
