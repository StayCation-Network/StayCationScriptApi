import { HttpClient, HttpRequest, HttpRequestMethod, HttpHeader, HttpResponse, http } from "@minecraft/server-net";

/**
 * @typedef {Object} McFetchOptions
 * @property {'GET'|'POST'|'PUT'|'DELETE'|'HEAD'} [method]
 * @property {Object.<string, string>} [headers]
 * @property {any} [body] -
 */
/**
 *
 * @param {string} url
 * @param {McFetchOptions} [options={}]
 * @return {Promise<HttpResponse>}
 */
export async function mc_fetch(url, options = {}) {

    const req = new HttpRequest(url);
    const method = options.method ? options.method.charAt(0).toUpperCase() + options.method.slice(1).toLowerCase() : HttpRequestMethod.Get

    req.method = method;

    if (options.headers) {
        req.headers = Object.entries(options.headers).map(
            ([key, value]) => new HttpHeader(key, value)
        );
    }

    if (options.body) {
        req.body = JSON.stringify(options.body);
    }

    try {
        const response = await http.request(req);
        return response;
    } catch (error) {
        throw error;
    }
}
