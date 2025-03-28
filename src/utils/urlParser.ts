export function parseUrl(url: string) {
  const urlPattern = /^(https?:\/\/)([^\/]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?$/;
  const match = url.match(urlPattern);

  if (!match) {
    throw new Error(
      "Invalid URL format. Please provide a valid http or https URL."
    );
  }

  const [, protocol, host, path = "", params = "", fragment = ""] = match;

  const domain = host.split(".").slice(-2).join("."); // Extract domain from host

  // Parse query parameters into a key-value object
  const parameters: Record<string, string> = {};
  if (params.startsWith("?")) {
    const queryString = params.slice(1); // Remove the "?" at the start
    queryString.split("&").forEach((param) => {
      const [key, value] = param.split("=");
      parameters[key] = value || ""; // Handle cases where a parameter has no value
    });
  }

  return {
    protocol,
    hostname: host,
    domain,
    path,
    parameters,
    fragment: fragment.startsWith("#") ? fragment.slice(1) : "", // Remove the "#" at the start
  };
}
