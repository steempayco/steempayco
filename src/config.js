import config from './config.json'
let stage = '';
if (process.env.NODE_ENV === 'development') {
    stage = 'dev';
} else {
    let head = window.location.hostname.split('.')[0]
    if (head === 'beta') {
        stage = 'beta'
    } else {
        stage = 'prod'
    }
}
const stagedConfig = {
    stage: stage,
    ...config.common,
    ...config[stage]
}

console.log("Welcome to SteemPayco " + stage)

export default stagedConfig;