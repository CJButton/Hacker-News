const getHoursDifference = (createdAt: string) => {
	const hoursDifference = Math.floor(
		Math.abs(new Date().getTime() - new Date(createdAt).getTime()) / 36e5
	);

	if (hoursDifference >= 24) {
		const daysAgo = Math.floor(hoursDifference / 24);
		return `${daysAgo} ${daysAgo > 1 ? 'days' : 'day'} ago`;
	}

	return `${hoursDifference} ${hoursDifference > 1 ? 'hours' : 'hour'} ago`;
};

export default getHoursDifference;
