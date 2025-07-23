import {type ChangeEvent, useEffect, useId} from 'react';
import {useSelector} from "react-redux";
import FormCheck from 'react-bootstrap/FormCheck'
import {useSearchParams} from "react-router";
import {useAppDispatch} from "@/app/hooks";
import {selectFilterPreferredImages, togglePreferredImages} from "@/ducks/filters/filtersSlice";

const PreferredImageFilter = () => {
    const dispatch = useAppDispatch()
    const [_, setSearchParams] = useSearchParams();
    const checked = useSelector(selectFilterPreferredImages);
    const id = useId();

    useEffect(() => {
        setSearchParams((prev) => {
            if (checked) {
                prev.set('preferredImage', '1');
            } else {
                prev.delete('preferredImage');
            }
            return prev;
        })
    }, [checked]);

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(togglePreferredImages(ev.target.checked))
    }

    return (
        <FormCheck type={"checkbox"} label={"Only Preferred Images"} id={id}
                   checked={checked} onChange={changeHandler}/>
    )
}

export default PreferredImageFilter;
