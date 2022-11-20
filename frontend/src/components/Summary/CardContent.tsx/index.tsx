interface propsCardContent{
    status: string;
    icon: any;
    summaryInfo: number | string;
}

export function CardContentSummary(props: propsCardContent) {
    return(
        <>
            <header>
                <span> {props.status} </span>
                <i> {props.icon} </i>
            </header>
            <strong> {props.summaryInfo} </strong>
        </>
    )
}