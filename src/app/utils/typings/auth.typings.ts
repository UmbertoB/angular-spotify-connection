export interface TokenObject {
    access_token: string
    token_type:   string
    expires_in:   string
}

export interface AuthParams {
    client_id:     string
    response_type: string
    redirect_uri:  string
}