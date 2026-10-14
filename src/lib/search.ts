export const searchScript = `
(async function () {
if (typeof (globalThis.pagefind) === 'undefined') {
  globalThis.pagefind = await import('/pagefind/pagefind.js');
}
})();
`;
