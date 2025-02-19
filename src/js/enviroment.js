const basePath = window.location.origin.includes("file")
  ? ""
  : "https://example.com/";

document.write(`<base href="${basePath}">`);
