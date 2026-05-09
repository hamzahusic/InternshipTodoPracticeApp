export const parseDate = (date: string): string => {
    return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
}