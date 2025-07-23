import {type ChangeEvent, useId} from 'react';
import {useSelector} from "react-redux";
import FormCheck from 'react-bootstrap/FormCheck'
import {useAppDispatch} from "@/app/hooks";
import {selectShowOnlyUnassigned, toggleShowOnlyUnassigned} from "@/ducks/filters/filtersSlice";

const UnassignedImageFilter = () => {
    const dispatch = useAppDispatch();
    const showUnassigned = useSelector(selectShowOnlyUnassigned);
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleShowOnlyUnassigned(ev.target.checked))
    }

    return (
        <FormCheck type={"checkbox"} label={"Only Unassigned Images"} id={id}
                   checked={showUnassigned} onChange={changeHandler}/>
    )
}

export default UnassignedImageFilter;
