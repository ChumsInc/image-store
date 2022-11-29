import React, {useEffect, useState} from 'react';
import classNames from "classnames";

export interface Props {
    filename: string;
}

const ImageFilename = ({filename}:Props) => {
    const [show, setShow] = useState(false);
    const [timer, setTimer] = useState(0);
    useEffect(() => {
        return () => {
            window.clearTimeout(timer);
        }
    }, []);

    const copyOnClick = () => {
        window.clearTimeout(timer);
        navigator.clipboard.writeText(filename).catch(err => console.log(err, err.message));
        setShow(true);
        setTimer(window.setTimeout(() => {
            setShow(false);
        }, 750));
    }

    return (
        <div className="d-flex justify-content-between">
            <div onClick={copyOnClick} className="click-copy">Filename: <strong>{filename}</strong></div>
            <div className={classNames('badge bg-success fade', {show})}>copied</div>
        </div>
    )
}

export default ImageFilename;
