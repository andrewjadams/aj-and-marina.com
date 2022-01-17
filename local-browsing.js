
const PROJECT_DIR_NAME = "aj-and-marina"
const BASE_PATH_REGEX = new RegExp(`^(.+\/${PROJECT_DIR_NAME}\/).*`)

document.addEventListener("DOMContentLoaded", () => {
  if (!window.location.href.startsWith("file://")) {
    return
  }
  const { href } = window.location
  const BASE_PATH = href.match(BASE_PATH_REGEX)[1]
  const CURRENT_PATH = href.slice(0, href.lastIndexOf("/") + 1)
  document.querySelectorAll("a").forEach(el => {
    // Do not process external links or links that already start with the
    // current file path (which include hashes).
    if (!el.href.startsWith("file://") || el.href.startsWith(CURRENT_PATH)) {
      return
    }
    let { pathname } = new URL(el)
    if (pathname === "/") {
      // If path is root, set it to index.html.
      pathname = "/index.html"
    }
    else if (!pathname.includes(".")) {
      // If path doesn't specify an extension, add ".html".
      pathname += ".html"
    }
    if (!pathname.startsWith("/")) {
      // Handle relative path.
      el.href = `${CURRENT_PATH}${pathname}`
    } else {
      // Handle absolute path.
      el.href = `${BASE_PATH}${pathname.slice(1)}`
    }
  })
})
