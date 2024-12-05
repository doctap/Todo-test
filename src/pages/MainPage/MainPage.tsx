import { classNames } from '../../shared'
import cls from './MainPage.module.scss'
import { normalazeSearchParamsObj, useAppDispatch } from '../../shared/lib';
import { useSelector } from 'react-redux'
import { NavigateOptions, useLocation, useNavigate, useSearchParams } from 'react-router'
import { getTodos } from '../../app/store/tableSlice/selectors/getTodos';
import { filterByCompleteStep, Table } from '../../components/Table';
import { tableAction } from '../../app/store/tableSlice/slice/tableSlice';
import { useCallback } from 'react';

export interface IMainPageProps {
	className?: string
}

export const MainPage = (props: IMainPageProps) => {
	const {
		className = '',
	} = props

	const navigate = useNavigate();
	const todos = useSelector(getTodos);
	const dispatch = useAppDispatch();

	const [searchParams, setSearchParamsQQ] = useSearchParams();
	const location = useLocation();

	const onFilterHandler = (step: number) => {
		let params = { completed: filterByCompleteStep[step]};
		let paramsForSearchString = {};

		if (step < 2) {
			paramsForSearchString = { completed: filterByCompleteStep[step].toString() };
			setSearchParamsQQ({ ...Object.fromEntries(searchParams.entries()), ...paramsForSearchString });
		} else {
			navigate(location.pathname, { replace: true })
		}

		dispatch(tableAction.filterBy(normalazeSearchParamsObj(params)));
	};

	const onNavigateHandler = useCallback(
		(path: string, options?: NavigateOptions) => {
			navigate(path, options);
		},
		[]
	);

	return (
		<div className={classNames(cls.MainPage, {}, [className])}>
			<h1>Список заметок</h1>

			<Table
				onNavigate={onNavigateHandler}
				onFilter={onFilterHandler}
				items={todos}
			/>
		</div>
	)
}
