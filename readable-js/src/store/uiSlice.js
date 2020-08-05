import { createSlice } from '@reduxjs/toolkit';
export var PostOrder;
(function (PostOrder) {
    PostOrder["SCORE"] = "score";
    PostOrder["DATE"] = "date";
    PostOrder["COMMENT_COUNT"] = "commentCount";
})(PostOrder || (PostOrder = {}));
const initialState = {
    isMobileMenuOpen: false,
    isPostsShownAsCards: true,
    isLoading: true,
    postOrder: PostOrder.SCORE,
};
export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setIsMobileMenuOpen: (state, action) => {
            state.isMobileMenuOpen = action.payload;
        },
        toggleIsMobileMenuOpen: (state) => {
            state.isMobileMenuOpen = !state.isMobileMenuOpen;
        },
        setIsPostsShownAsCards: (state, action) => {
            state.isPostsShownAsCards = action.payload;
        },
        toggleIsPostsShownAsCards: (state) => {
            state.isPostsShownAsCards = !state.isPostsShownAsCards;
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setPostOrder: (state, action) => {
            state.postOrder = action.payload;
        },
    },
});
export const { setIsMobileMenuOpen, toggleIsMobileMenuOpen, setIsPostsShownAsCards, toggleIsPostsShownAsCards, setIsLoading, setPostOrder, } = uiSlice.actions;
export const selectIsMobileMenuOpen = (state) => state.ui.isMobileMenuOpen;
export const selectIsPostsShownAsCards = (state) => state.ui.isPostsShownAsCards;
export const selectIsLoading = (state) => state.ui.isLoading;
export const selectPostOrder = (state) => state.ui.postOrder;
export default uiSlice.reducer;
