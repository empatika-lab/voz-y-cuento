export function getImageUrl(imagePath: string) {
	if (!imagePath) {
		return '';
	}

	const url = `${process.env.STRAPI_API_URL}${imagePath}`;

	return url;
}
