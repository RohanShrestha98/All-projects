export const convertToOptions = lists => {
    const options: { value: string; label: string }[] = lists?.map(item => {
        return { value: item?.id, label: item?.name ? item?.name : item?.title, hasLevel: item?.hasLevel };
    });
    return options;
};