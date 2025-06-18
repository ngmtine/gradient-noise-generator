/**
 * 文字列のパーサー
 */
export const parseValue = (value: string): string | number | boolean => {
    // "true"又は"false"の場合はbooleanを返す
    if (value === "true") {
        return true;
    }
    if (value === "false") {
        return false;
    }

    // stringまたはnumberを返す
    const num = Number(value);
    return Number.isNaN(num) ? value : num;
};
