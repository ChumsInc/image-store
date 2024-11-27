export const now = () => new Date().valueOf();
export const noop = () => {
};

export const imagePath = ({path, filename}:{
    path: string;
    filename: string;
}) => `https://intranet.chums.com/images/products/${path}/${filename}`;
