import { useQuery } from "@tanstack/react-query"

export const useDataQuery = (key, service, id) => useQuery({
    queryKey: [key, id],
    queryFn: async () => (await service(id)).data,
    retry: 2,
    retryDelay: 1000,
})