export interface TagImageArgs {
    tag: string;
    filename: string;
    action?: 'tag' | 'untag';
}

export type ImageStatus = 'idle' | 'loading' | 'saving' | 'deleting';
