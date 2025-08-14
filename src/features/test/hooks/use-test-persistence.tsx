import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TestData } from "../types/test";

const saveTestData = async (data: TestData): Promise<TestData> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const saved = JSON.stringify(data);
  sessionStorage.setItem("testData", saved);
  return data;
};

const loadTestData = async (): Promise<TestData | null> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  const saved = sessionStorage.getItem("testData");
  return saved ? JSON.parse(saved) : null;
};

const clearTestData = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  sessionStorage.removeItem("testData");
};

export const useTestPersistence = () => {
  const queryClient = useQueryClient();

  const {
    data: savedTestData,
    isLoading: isLoadingData,
    error: loadError,
  } = useQuery({
    queryKey: ["testData"],
    queryFn: loadTestData,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 1,
  });

  const saveMutation = useMutation({
    mutationFn: saveTestData,
    onSuccess: (data) => {
      queryClient.setQueryData(["testData"], data);
    },
    onError: (error) => {
      console.error("Failed to save test data:", error);
    },
  });

  const clearMutation = useMutation({
    mutationFn: clearTestData,
    onSuccess: () => {
      queryClient.setQueryData(["testData"], null);
    },
    onError: (error) => {
      console.error("Failed to clear test data:", error);
    },
  });

  const refetchTestData = () => {
    return queryClient.invalidateQueries({ queryKey: ["testData"] });
  };

  return {
    savedTestData,

    isLoading: saveMutation.isPending || isLoadingData,
    isSaving: saveMutation.isPending,
    isClearing: clearMutation.isPending,

    saveError: saveMutation.error,
    loadError,
    clearError: clearMutation.error,

    saveTestData: saveMutation.mutate,
    clearTestData: clearMutation.mutate,
    refetchTestData,

    isSaveSuccess: saveMutation.isSuccess,
    isClearSuccess: clearMutation.isSuccess,
  };
};
