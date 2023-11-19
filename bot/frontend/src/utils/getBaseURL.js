function getBaseURL() {
    return `${import.meta.env.PROD ? '' : 'http://localhost:8080'}/api`;
}

export default getBaseURL;