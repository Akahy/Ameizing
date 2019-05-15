export interface AuthentificationState {
    token: string | null;
    expireAt: number | null;
    issuedAt: number | null;
}
