import * as C from './style'


type Props =  {
    label: string;
    icon?: any;
    onClick: React.MouseEventHandler<HTMLDivElement>
}

export function Button({label, icon , onClick}: Props)  {
    return (
        <C.Container onClick={onClick}>
            {icon && 
            <C.IconArea>
                <C.Icon src= {icon}/>

            </C.IconArea>
}
            <C.label>
                {label}
            </C.label>
       
        </C.Container>
    )
}