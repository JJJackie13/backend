export default function statFilterUniqueObjectsByKey(
  array: any[],
  key: string,
) {
  const groupedById = array.reduce((acc, current) => {
    const keyValue = current[key].toString()
    if (!acc[keyValue] || acc[keyValue].statId.length < current.statId.length) {
      acc[keyValue] = current
    }
    return acc
  }, {})

  // Convert the object back to an array
  const filteredArray = Object.values(groupedById)

  return filteredArray || null
}

export function weeklyDataFilterUniqueObjectsByKey(array: any[], key: string) {
  const groupedById = array.reduce((acc, current) => {
    const keyValue = current[key].toString()
    if (
      !acc[keyValue] ||
      acc[keyValue].weeklyActivityId.length < current.weeklyActivityId.length
    ) {
      acc[keyValue] = current
    }
    return acc
  }, {})

  // Convert the object back to an array
  const filteredArray = Object.values(groupedById)

  return filteredArray || null
}
