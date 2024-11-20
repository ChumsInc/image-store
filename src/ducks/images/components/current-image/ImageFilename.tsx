import React, {useEffect, useRef, useState} from 'react';
import classNames from "classnames";
import {Badge} from "react-bootstrap";

export interface Props {
    filename: string;
}

const ImageFilename = ({filename}:Props) => {
    const [show, setShow] = useState(false);
    const timer = useRef<number>(0)
    useEffect(() => {
        return () => {
            window.clearTimeout(timer.current);
        }
    }, []);

    const copyOnClick = () => {
        window.clearTimeout(timer.current);
        navigator.clipboard.writeText(filename).catch(err => console.log(err, err.message));
        setShow(true);
        timer.current = window.setTimeout(() => {
            setShow(false);
        }, 750);
    }

    return (
        <div className="d-flex justify-content-between">
            <div onClick={copyOnClick} className="click-copy image-filename" title="Copy filename">Filename: <strong>{filename}</strong></div>
            <Badge bg="success" className={classNames('fade', {show})} >copied</Badge>
        </div>
    )
}

export default ImageFilename;
