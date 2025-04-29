// Define the types
interface Role {
  id: number
  name: string
}

interface Creator {
  id: number
  creator: string
  role: Role[]
}

interface SimplifiedCreator {
  name: string
  role: string
}

/**
 * Sorts creators by their primary role ID (ascending) and returns simplified data
 * @param creators The array of creator objects to sort
 * @returns Array of simplified creator objects with just name and role
 */
function sortCreatorsByRoleId(creators: Creator[]): SimplifiedCreator[] {
  // First, sort the creators by their primary role's ID (ascending)
  const sorted = [...creators].sort((a, b) => {
    const roleIdA = a.role[0]?.id || Number.POSITIVE_INFINITY
    const roleIdB = b.role[0]?.id || Number.POSITIVE_INFINITY
    return roleIdA - roleIdB
  })

  // Then map to the simplified format
  return sorted.map((creator) => ({
    name: creator.creator,
    role: creator.role[0]?.name || 'Unknown',
  }))
}

export function sortCreators(creatorData: Creator[]): SimplifiedCreator[] {
  return sortCreatorsByRoleId(creatorData)
}
