# CouchDB PouchDB Electric Vehicles App

Offline-first web application demonstrating three-way synchronisation between browser (PouchDB), local CouchDB server, and IBM Cloudant cloud database.

## About
This application was developed as part of the Advanced Databases module to demonstrate CouchDB's replication protocol, offline-first architecture, and DBaaS integration.

## Setup
1. Copy `js/config.example.js` to `js/config.js`
2. Add your CouchDB and Cloudant credentials
3. Open `index.html` in the browser

## Features
- CRUD operations (Create, Read, Update, Delete)
- Three-way sync: Browser ↔ Local CouchDB ↔ Cloudant
- Offline capability with automatic sync when reconnected

## Architecture
- **Browser (PouchDB)**: Local IndexedDB storage
- **Desktop (CouchDB)**: Local development server
- **Cloud (Cloudant)**: IBM managed CouchDB service

© 2025 [Kytice](https://github.com/kytice)
