import { ChangeEvent, InputHTMLAttributes, memo } from 'react'
import { classNames } from '../../lib'
import cls from './InputText.module.scss'

export interface IInputTextProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    className?: string
    onChange: (value: string) => void
}

export const InputText = memo((props: IInputTextProps) => {
    const {
        className = '',
        onChange,
        value,
        ...otherProps
    } = props

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    }

    return (
        <input
            {...otherProps}
            value={value}
            onChange={onChangeHandler}
            className={classNames(cls.InputText, {}, [className])}
        />
    )
})
