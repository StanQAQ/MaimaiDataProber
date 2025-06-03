@echo off

:: 启动 Node.js 服务器
start cmd /k "node proxy_server.js"

:: 等待 0.5 秒钟，确保服务器启动
timeout /t 1

:: 启动 http 服务器
start cmd /k "python -m http.server 8000"

:: 等待 0.5 秒钟，确保服务器启动
timeout /t 1

:: 打开浏览器并加载 api_fetch_test.html 页面
start "" "http://localhost:8000/html/MaimaiDataProber.html"
