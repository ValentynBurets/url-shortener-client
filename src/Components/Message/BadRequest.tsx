import React from 'react'
import Alert from 'react-bootstrap/Alert'

import style from "./RequstStyle.module.sass"

interface BadRequestProps{
    show: boolean;
    text: string;
}

function BadRequest(props: BadRequestProps) {
    return (
        <Alert show={props.show} variant="danger" className={style.alert_style}>
            <Alert.Heading className="text-center">
                {props.text} 
            </Alert.Heading>
        </Alert >
    )
}

export default BadRequest
