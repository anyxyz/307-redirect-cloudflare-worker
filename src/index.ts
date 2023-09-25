export interface Env {}

export default {
	async fetch(request: Request): Promise<Response> {
		const redirectCode = 307;

		const hostnameRedirectMap: Map<string, string> = new Map();
		hostnameRedirectMap.set('offline.expert', 'ox.fm');

		const requestURL = new URL(request.url);

		const location = hostnameRedirectMap.get(requestURL.hostname);

		if (location) {
			return Response.redirect(`https://${location}`, redirectCode);
		}

		const html = `<!DOCTYPE html>
<body>
<pre><b>${requestURL.hostname}</b> is connected succesfully to CloudFlare.</pre>
</body>`;

		return new Response(html, {
			headers: {
				'content-type': 'text/html;charset=UTF-8',
			},
		});
	},
};
