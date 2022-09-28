import { FunctionComponent } from "react";

interface ITitleProps {
    text: string
}

export const CocinadittoTitle: FunctionComponent<ITitleProps> = ({text}) => {
    return (
        <h2 className="text-xl text-card-900 text-center font-semibold drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">{text}</h2>
    )
}