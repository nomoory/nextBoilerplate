// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)

module.exports = {
  webpack: (config, { dev }) => {
    // Perform customizations to config
    console.log('this', __dirname + '/src/redux/actions');
    // if (dev) {
    //     return config
    // }

    config.resolve.alias = {
        // ssr에서도 적용되기 위해 server.js 수정 필요,
        // 하기의 경로는 bundling 될 때 참조하며,
        // server.js에서는 이미 transpile된 파일을 참조하도록 한다
        // (서버에서 렌더링할 때 transpile 과정은 진행되지 않음)
        components: __dirname + '/src/components/',
        constants: __dirname + './src/constants/',
        entities: __dirname + './src/entities/',
        actions: __dirname + '/src/redux/actions',
        services: __dirname + './src/services/',
        utils: __dirname + './src/util/',
    }

    // Important: return the modified config
    return config
    }
}
