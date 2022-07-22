const getHoursDifference = (createdAt: string) => {
	const hoursDifference = Math.floor(
		Math.abs(new Date().getTime() - new Date(createdAt).getTime()) / 36e5
	);

	if (hoursDifference < 1) {
		const diff =
			(new Date().getTime() - new Date(createdAt).getTime()) / 1000 / 60;
		const minutesAgo = Math.abs(Math.round(diff));
		return `${minutesAgo} ${minutesAgo > 1 ? 'minutes' : 'minute'} ago`;
	}

	if (hoursDifference >= 24) {
		const daysAgo = Math.floor(hoursDifference / 24);
		return `${daysAgo} ${daysAgo > 1 ? 'days' : 'day'} ago`;
	}

	return `${hoursDifference} ${hoursDifference > 1 ? 'hours' : 'hour'} ago`;
};

export default getHoursDifference;
