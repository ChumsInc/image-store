import {type ChangeEvent, useEffect, useId} from 'react';
import {useSelector} from "react-redux";
import FormCheck from 'react-bootstrap/FormCheck'
import {useSearchParams} from "react-router";
import {useAppDispatch} from "@/app/hooks";
import {selectShowInactiveImages, toggleInactiveImages} from "@/ducks/filters/filtersSlice";

const InactiveProductFilter = () => {
    const dispatch = useAppDispatch();
    const [, setSearchParams] = useSearchParams();
    const showInactive = useSelector(selectShowInactiveImages);
    const id = useId();

    useEffect(() => {
        setSearchParams(prev => {
            if (showInactive) {
                prev.set('inactiveImages', '1');
            } else {
                prev.delete('inactiveImages');
            }
            return prev;
        })
    }, [showInactive]);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleInactiveImages(ev.target.checked));
    }

    return (
        <FormCheck type={"checkbox"} label={"Show Inactive Images"} id={id}
                   checked={showInactive} onChange={changeHandler}/>
    )
}

export default InactiveProductFilter;
