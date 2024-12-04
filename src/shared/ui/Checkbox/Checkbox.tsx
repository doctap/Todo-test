import { ChangeEvent, InputHTMLAttributes, memo } from 'react'
import { classNames } from '../../lib'
import cls from './Checkbox.module.scss'

export interface ICheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    className?: string
    onChange: (checked: boolean) => void
}

export const Checkbox = memo((props: ICheckboxProps) => {
    const {
        className = '',
        checked,
        onChange,
        ...otherProps
    } = props

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    }

    return (
        <input
            {...otherProps}
            type="checkbox"
            checked={checked}
            onChange={onChangeHandler}
            className={classNames(cls.Checkbox, {}, [className])}
        />
    )
})
