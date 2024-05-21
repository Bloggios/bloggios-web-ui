module.exports = {
    apps: [
        {
            name: "bloggios-web-ui-devsandbox",
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
