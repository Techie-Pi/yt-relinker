console.log("YouTube ReLinker: Enabled")

let observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeName === "A" && node.href.startsWith("https://www.youtube.com/redirect")) {
                if (node.textContent.endsWith("...")) {
                    let params = new URLSearchParams(node.href)
                    node.href = decodeURIComponent(params.get("q")) || node.href
                } else {
                    node.href = node.textContent
                }
            }
        })
    })
})

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
})
