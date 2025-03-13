import React, {useEffect, useRef, useState} from 'react';
import classNames from "classnames";
import {Badge} from "react-bootstrap";
import styled from "@emotion/styled";


const ImageFilenameTarget = styled.div`
    word-break: break-all;
    cursor: pointer;
`
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
            <ImageFilenameTarget onClick={copyOnClick} title="Copy filename">Filename: <strong>{filename}</strong></ImageFilenameTarget>
            <Badge bg="success" className={classNames('fade', {show})} >copied</Badge>
        </div>
    )
}

export default ImageFilename;
