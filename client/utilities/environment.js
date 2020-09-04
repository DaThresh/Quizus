function isLive(){
    return Boolean(window.location.host === 'quizus.io' && ENVIRONMENT === 'production');
}

export {
    isLive,
}