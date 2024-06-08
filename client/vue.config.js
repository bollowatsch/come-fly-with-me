const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: 'Come fly with me!'
        },
        result: {
            entry: 'src/result.js',
            filename: 'result.html',
            title: 'Your trip!'
        }
    }
})
