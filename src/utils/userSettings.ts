
export const validateGenderId = (genderId: number) => {
    const genderIds: number[] = [1, 2, 3];
    return genderIds.includes(genderId);
}