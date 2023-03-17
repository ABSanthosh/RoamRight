export default async function Fetcher(url, options) {
  return await fetch(url, {
    method: options?.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options?.body),
  }).then((res) => res.json());
}
