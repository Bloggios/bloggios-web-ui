module.exports = {
    apps: [
        {
            name: "bloggios-web-ui",
            script: "npm",
            interpreter: "none",
            args: "start",
            env: {
                PORT: 2000,
                NODE_ENV: "production"
            }
        }
    ]
};
