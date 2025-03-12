package main

import (
    "fmt"
    "net/http"
    "net/http/httputil"
    "net/url"
    "strings"
)

func main() {
    apiBackend, _ := url.Parse("http://localhost:8888")    
    defaultFrontend, _ := url.Parse("http://localhost:3333")

    apiProxy := httputil.NewSingleHostReverseProxy(apiBackend)
    defaultProxy := httputil.NewSingleHostReverseProxy(defaultFrontend)

    handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        if strings.HasPrefix(r.URL.Path, "/api") {
            fmt.Println("Proxying to :8888 (API)")
            apiProxy.ServeHTTP(w, r)
        } else {
            fmt.Println("Proxying to :3333 (Default)")
            defaultProxy.ServeHTTP(w, r)
        }
    })
    fmt.Println("Load Balancer starting on :8080...")
    err := http.ListenAndServe(":8080", handler)
    if err != nil {
        fmt.Printf("Server failed: %v\n", err)
    }
}