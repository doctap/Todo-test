import { FormEvent, memo, useCallback, useState } from 'react'
import cls from './CreateForm.module.scss'
import { classNames, useAppDispatch } from '../../shared'
import { Button, Checkbox } from '../../shared/ui'
import { createTodo } from '../../app/store/todoSlice/services/createTodo'
import { InputText } from '../../shared/ui/InputText/InputText'

export interface ICreateFormProps {
    className?: string
    onFinish: () => void
}

export const CreateForm = memo((props: ICreateFormProps) => {
    const {
        className = '',
        onFinish,
    } = props

    const [title, setDescription] = useState('');
    const [isCompeted, setIsCompleted] = useState(false);
    const dispatch = useAppDispatch();

    const onSubmitHandler = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            dispatch(createTodo({ completed: isCompeted, title, userId: 1 }))
                .then(() => {
                    onFinish();
                })
        },
        [title, isCompeted],
    );

    const onChangeHandler = useCallback(
        (value: string) => setDescription(value),
        [],
    );

    const onCheckHandler = useCallback(
        (value: boolean) => setIsCompleted(value),
        [],
    );

    return (
        <form
            onSubmit={onSubmitHandler}
            className={classNames(cls.CreateForm, {}, [className])}
        >
            <label
                className={cls.label}
                htmlFor="input-text-task-create"
            >
                Заголовок:
                <InputText
                    id='input-text-task-create'
                    minLength={3}
                    maxLength={50}
                    required
                    value={title}
                    type="text"
                    onChange={onChangeHandler}
                />
            </label>
            <label
                className={cls.label}
                htmlFor="checkbox-task-create"
            >
                Статус:
                <Checkbox
                    id='checkbox-task-create'
                    checked={isCompeted}
                    onChange={onCheckHandler}
                />
            </label>
            <div className={cls.buttonBlock}>
                <Button type="submit">Create</Button>
            </div>
        </form>
    )
})
