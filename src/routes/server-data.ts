import { z } from 'zod'

// For now, let's create a simple server function simulation
// In a full TanStack Start setup, this would use createServerFn
const getServerDataSchema = z.object({
  count: z.number().optional(),
})

export const getServerData = async (input: z.infer<typeof getServerDataSchema>) => {
  // Validate input
  const data = getServerDataSchema.parse(input)

  // This simulates server-side data processing
  const count = data.count || 1
  const items = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Server Item ${i + 1}`,
    timestamp: new Date().toISOString(),
  }))

  return {
    items,
    serverTime: new Date().toISOString(),
    total: items.length,
  }
}