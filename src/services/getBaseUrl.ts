const getBaseUrl = (url: string) => {
	if (!url) return '';

	return `(${url.replace(/(http(s)?:\/\/)|(\/.*)/g, '')})`;
};

export default getBaseUrl;
