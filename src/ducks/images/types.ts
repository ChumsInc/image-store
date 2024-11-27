import {EditableImage} from "../../types";
import {SortProps} from "chums-components";
import {ImageListFilter} from "./index";

export interface ImagesState {
    list: EditableImage[],
    loading: boolean;
    loaded: boolean;
    current: EditableImage | null;
    sort: SortProps<EditableImage>;
    selected: {
        list: EditableImage[];
        saving: boolean;
    };
    filter: ImageListFilter;
}

export interface TagImageArgs {
    tag: string;
    filename: string;
    action?: 'tag' | 'untag';
}
