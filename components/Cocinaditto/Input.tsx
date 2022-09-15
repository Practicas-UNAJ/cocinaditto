import { FunctionComponent, HTMLInputTypeAttribute } from "react"

interface IInputData {
    label?: string
    type: HTMLInputTypeAttribute
}

export const CocinadittoInput: FunctionComponent<IInputData> = ({
    label,
    type
}) => {
    return (
        <label className="flex flex-col items-center text-white">
            {label}
            <input type={type} className="text-black rounded-full p-1 shadow-[inset_0px_4px_4px_rgba(0,0,0,0.25)]" />
        </label>
    )
}