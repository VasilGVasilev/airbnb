/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "avatars.githubusercontent.com", // otherwise error
            "lh3.googleusercontent.com", // otherwise error
        ]
    }
}

module.exports = nextConfig
