export const requestIncludeResponseHeaders = async <T>(
    method: () => Promise<T>
  ): Promise<{
    body: T;
    headers: Headers;
  }> => {
    let headers = new Headers();
    const tmpFetch = globalThis.fetch;
    globalThis.fetch = (async (url, options) => {
      const requestPromise = tmpFetch(url, options);
      globalThis.fetch = tmpFetch;
      const response = await requestPromise;
      headers = response.headers;
      return response;
    }) as typeof globalThis.fetch;

    const apiResponse = await method();

    return {
      body: apiResponse,
      headers
    };
  };