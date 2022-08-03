import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Dropdown, { DropdownProp } from '../../Dropdown';
import {
	ROUTE_BASE_STORIES_LATEST,
	ROUTE_BASE_STORIES_ONE_DAY_AGO,
	ROUTE_BASE_STORIES,
} from '../../App';

export const DropdownWrapper = () => {
	const navigate = useNavigate();
	const { pathname } = useLocation();

	const values: DropdownProp<string>[] = useMemo(
		() => [
			{ value: ROUTE_BASE_STORIES_LATEST, label: 'Latest' },
			{ value: ROUTE_BASE_STORIES_ONE_DAY_AGO, label: '24 Hours Ago' },
		],
		[]
	);

	const handleChange = (props: DropdownProp<string>) => {
		const { value } = props;

		navigate(value);
	};

	const defaultValue = useMemo(
		() =>
			values.find((dropdown) => {
				return `/${ROUTE_BASE_STORIES}/${dropdown.value}` === pathname;
			}),
		[pathname, values]
	) as DropdownProp<string>;

	return (
		<Dropdown
			values={values}
			handleChange={handleChange}
			defaultValue={defaultValue}
		/>
	);
};
