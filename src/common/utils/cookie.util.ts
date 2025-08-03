export function CookiesOptionsToken() {
    return {
        httpOnly: true,
        secure: true,
        samesite: 'None',
        expires: new Date(Date.now() + (1000 * 60 * 2))
    }
}