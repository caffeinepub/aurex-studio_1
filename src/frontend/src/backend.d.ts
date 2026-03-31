import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface QuoteRequest {
    status: string;
    videoLength: string;
    name: string;
    description: string;
    created_at: Time;
    email: string;
}
export type Time = bigint;
export interface backendInterface {
    checkAdminCredentials(username: string, password: string): Promise<boolean>;
    deleteQuote(quoteId: Time): Promise<void>;
    getAllQuotes(): Promise<Array<QuoteRequest>>;
    submitQuote(name: string, email: string, videoLength: string, description: string): Promise<void>;
    updateQuoteStatus(quoteId: Time, newStatus: string): Promise<void>;
    incrementVisitor(): Promise<bigint>;
    getVisitorCount(): Promise<bigint>;
}
