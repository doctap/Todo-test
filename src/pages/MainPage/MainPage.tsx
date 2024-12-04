import { classNames } from '../../shared'
import cls from './MainPage.module.scss'
import { setSearchParams, useAppDispatch } from '../../shared/lib';
import { useSelector } from 'react-redux'
import { NavigateOptions, useNavigate } from 'react-router'
import { getTodos } from '../../app/store/tableSlice/selectors/getTodos';
import { Table } from '../../components/Table';
import { tableAction } from '../../app/store/tableSlice/slice/tableSlice';
import { useCallback } from 'react';

export interface IMainPageProps {
	className?: string
}

export const completingFilterStep = [false, true] as const;

export const MainPage = (props: IMainPageProps) => {
	const {
		className = '',
	} = props

	const navigate = useNavigate();
	const todos = useSelector(getTodos);
	const dispatch = useAppDispatch();

	const onFilterHandler = (step: number) => {
		const params = { completed: completingFilterStep[step] };
		navigate(window.location.pathname, { replace: true })

		if (step !== 2) {
			history.pushState({}, '', `${window.location.origin + setSearchParams(params)}`);
		}

		dispatch(tableAction.filterBy(params));
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
