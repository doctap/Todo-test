import { FormEvent, useCallback, useState } from 'react'
import { classNames, useAppDispatch } from '../../../../shared'
import cls from './EditForm.module.scss'
import { Button } from '../../../../shared/ui'
import { updatingTodo } from '../../../../app/store/todoSlice/services/updateTodo'
import { useSelector } from 'react-redux'
import { getCurrentUsebleTodo } from '../../../../app/store/tableSlice/selectors/getCurrentUsebleTodo'
import { InputText } from '../../../../shared/ui/InputText/InputText'

export interface IEditFormProps {
    className?: string
    onClose: () => void
}

export const EditForm = (props: IEditFormProps) => {
    const {
        className = '',
        onClose,
    } = props

    const [title, setDescription] = useState('');
    const editableTodo = useSelector(getCurrentUsebleTodo);
    const dispatch = useAppDispatch();

    const onSubmitHandler = useCallback(
        (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (editableTodo) {
                dispatch(updatingTodo({ ...editableTodo, title }))
                    .then(() => { onClose(); })
            }
        },
        [title],
    );

    const onChangeHandler = useCallback(
        (value: string) => setDescription(value),
        [],
    );

    return (
        <form
            onSubmit={onSubmitHandler}
            className={classNames(cls.EditForm, {}, [className])}
        >
            <label
                className={cls.label}
                htmlFor="input-text-edit-task">
                Заголовок:
                <InputText
                    id='input-text-edit-task'
                    required
                    value={title}
                    type="text"
                    onChange={onChangeHandler}
                />
            </label>
            <div className={cls.buttonBlock}>
                <Button id='submit-button' type="submit">Сохранить</Button>
                <Button id='button' type="button" onClick={onClose}>Отменить</Button>
            </div>
        </form>
    )
}
