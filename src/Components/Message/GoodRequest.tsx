import React from 'react'
import Alert from 'react-bootstrap/Alert'

import style from "./RequstStyle.module.sass"

interface GoodRequestProps{
    show: boolean;
    text: string;
}

function GoodRequest(props: GoodRequestProps) {
    return (
        <Alert show={props.show} variant="success" className={style.alert_style}>
            <Alert.Heading className="text-center">
                {props.text} 
            </Alert.Heading>
        </Alert >
    )
}

export default GoodRequest
