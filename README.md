# 🧩 ChatGPT Chat → PDF Converter (Monolithic Version)

A simple Node.js + Express application that converts any ChatGPT shared chat link into a neatly formatted PDF file. This monolithic version serves as the baseline for later benchmarking against a distributed, microservice-based design.

## 🚀 Features

- Accepts a public ChatGPT share URL
- Fetches and parses the entire conversation (user + assistant messages)
- Generates a clean, readable PDF transcript
- Returns the PDF file as a download response
- Provides baseline metrics for performance testing

## 🛠️ Tech Stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Server         | Node.js + Express                 |
| HTTP Requests  | Axios                             |
| HTML Parsing   | Cheerio                           |
| PDF Generation | PDFKit                            |
| Testing        | cURL / Postman / Apache Benchmark |
