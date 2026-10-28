#!/usr/bin/env python3
# serves the site at http://127.0.0.1:8000 (or the port given as the first argument) for testing locally,
# and opens it in the browser once the server is up.
# links leave out ".html" like on GitHub Pages, so a path that doesn't exist falls back to the same path + ".html"
import http.server, os, sys, webbrowser

class Handler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path) and os.path.exists(path + ".html"):
            self.path = self.path.split("?")[0].split("#")[0] + ".html"
        return super().send_head()

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
os.chdir(os.path.dirname(os.path.realpath(__file__)))
server = http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler)
url = f"http://127.0.0.1:{port}"
print(f"serving on {url}")
webbrowser.open(url)
server.serve_forever()
