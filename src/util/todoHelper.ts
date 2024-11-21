export const checkValidation = (title: string, content: string) => {
    return (!title.trim() || !content.trim());
};