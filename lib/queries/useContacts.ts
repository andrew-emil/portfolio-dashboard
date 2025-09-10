import { ContactDto } from "@/types/dtos/contact.dto";
import axiosClient from "../axiosClient";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { queryKeys } from "../queryClient";

export interface UseContactReturn {
    data: ContactDto[] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    refetch: () => void;
    isRefetching: boolean;
}

const transformContactsResponse = async (): Promise<ContactDto[]> => {
    const response = await axiosClient.get<ContactDto[]>("/contacts");

    if (response && typeof response === 'object' && 'error' in response) {
        throw new Error("Failed to load contacts data");
    }

    return response as unknown as ContactDto[];
}

export const useContacts = (): UseContactReturn => {
    const queryResult: UseQueryResult<ContactDto[], Error> = useQuery({
        queryKey: queryKeys.projects,
        queryFn: transformContactsResponse,
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