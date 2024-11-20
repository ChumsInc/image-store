import {EditableImage} from "../../types";
import {SortProps} from "chums-components";

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
}

export interface TagImageArgs {
    tag: string;
    filename: string;
    action?: 'tag' | 'untag';
}
