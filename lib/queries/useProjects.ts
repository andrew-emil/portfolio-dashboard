import { getProjects } from '@/lib/api-calls';
import { queryKeys } from '@/lib/queryClient';
import { ProjectDto } from '@/types/dtos/project.dto';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

// Return type interface for the useProjects hook
export interface UseProjectsReturn {
    data: ProjectDto[] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    refetch: () => void;
    isRefetching: boolean;
}

// Transform API response to handle error cases
const transformProjectsResponse = async (): Promise<ProjectDto[]> => {
    const response = await getProjects();

    // Handle error response from API
    if (response && typeof response === 'object' && 'error' in response) {
        throw new Error(response.error);
    }

    // Return the projects array
    return response as ProjectDto[];
};


export const useProjects = (): UseProjectsReturn => {
    const queryResult: UseQueryResult<ProjectDto[], Error> = useQuery({
        queryKey: queryKeys.projects,
        queryFn: transformProjectsResponse,
    });

    return {
        data: queryResult.data,
        isLoading: queryResult.isLoading,
        isError: queryResult.isError,
        error: queryResult.error,
        refetch: queryResult.refetch,
        isRefetching: queryResult.isRefetching,
    };
};
