package main

import (
    "fmt"
    "net/http"
    "net/http/httputil"
    "net/url"
    "strings"
    "os"
    "path/filepath"
)

func main() {
    apiBackend, _ := url.Parse("http://localhost:8888")
    defaultFrontend, _ := url.Parse("http://localhost:3333")

    apiProxy := httputil.NewSingleHostReverseProxy(apiBackend)
    defaultProxy := httputil.NewSingleHostReverseProxy(defaultFrontend)

    // Получаем абсолютный путь к папке uploads
    cwd, err := os.Getwd() // Текущая рабочая директория
    if err != nil {
        fmt.Printf("Failed to get working directory: %v\n", err)
        return
    }
    uploadsDir := filepath.Join(cwd, "../../uploads") // Поднимаемся на 2 уровня вверх
    uploadsDir, err = filepath.Abs(uploadsDir)        // Преобразуем в абсолютный путь
    if err != nil {
        fmt.Printf("Failed to resolve uploads path: %v\n", err)
        return
    }
    fmt.Println("Uploads directory:", uploadsDir)

    handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        switch {
        case strings.HasPrefix(r.URL.Path, "/api"):
            fmt.Println("Proxying to :8888 (API)")
            apiProxy.ServeHTTP(w, r)
        case strings.HasPrefix(r.URL.Path, "/uploads"):
            filePath := filepath.Join(uploadsDir, strings.TrimPrefix(r.URL.Path, "/uploads"))
            if info, err := os.Stat(filePath); err == nil && !info.IsDir() {
                fmt.Println("Serving static file:", filePath)
                http.ServeFile(w, r, filePath)
            } else {
                fmt.Println("File not found:", filePath)
                http.NotFound(w, r)
            }
        default:
            fmt.Println("Proxying to :3333 (Default)")
            defaultProxy.ServeHTTP(w, r)
        }
    })

    fmt.Println("Load Balancer starting on :8080...")
    err = http.ListenAndServe(":8080", handler)
    if err != nil {
        fmt.Printf("Server failed: %v\n", err)
    }
}