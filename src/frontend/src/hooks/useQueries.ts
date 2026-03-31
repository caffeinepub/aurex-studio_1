import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { QuoteRequest } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllQuotes() {
  const { actor, isFetching } = useActor();
  return useQuery<QuoteRequest[]>({
    queryKey: ["quotes"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllQuotes();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitQuote() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: ({
      name,
      email,
      videoLength,
      description,
    }: {
      name: string;
      email: string;
      videoLength: string;
      description: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.submitQuote(name, email, videoLength, description);
    },
  });
}

export function useUpdateQuoteStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      timestamp,
      status,
    }: { timestamp: bigint; status: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateQuoteStatus(timestamp, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quotes"] });
    },
  });
}

export function useCheckAdminCredentials() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: { username: string; password: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.checkAdminCredentials(username, password);
    },
  });
}
