export const formatDate = (input: string): string => {
    const [year, month, day] = input.split('-');
    return `${day}/${month}/${year}`;
}
