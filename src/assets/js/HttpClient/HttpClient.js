export class HttpClient {
    baseUrl;

    constructor(url) {
        this.baseUrl = url
    }

    async get(url) {
        return fetch(`${this.baseUrl}/${url}`).then(response => response.json())
    }

    async post({ url, body, headers = {}}) {
        return fetch(
            `${this.baseUrl}/${url}`,
            {
                method:"POST",
                body: JSON.stringify(body),
                headers
            })
        .then(response => JSON.parse(response.body))
    }

    async put({ url, body, headers = {}}) {
        return fetch(
            `${this.baseUrl}/${url}`,
            {
                method:"PUT",
                body: JSON.stringify(body),
                headers
            })
        .then(response => JSON.parse(response.body))
    }
}