
export const selectCanDelete = (state) => state.user.canDelete || false;
export const selectCanEdit = (state) => state.user.canEdit || false;
export const selectIsUser = (state) => state.user.profile?.user?.id > 0;
export const selectFilterSearch = (state) => state.settings.filter;
export const selectFilterProductLine = (state) => state.settings.productLine;
export const selectFilterItemCategory = (state) => state.settings.itemCategory;
export const selectFilterBaseSKU = (state) => state.settings.itemBaseSKU;
