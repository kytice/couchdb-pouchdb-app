# CouchDB PouchDB Electric Vehicles App

## About
This application was developed as part of the Advanced Databases module to demonstrate CouchDB's replication protocol, offline-first architecture, and DBaaS integration.

## Prerequisites
- CouchDB installed locally (http://couchdb.apache.org/)
- Electric vehicles dataset (contact for dataset file)
- (Optional) IBM Cloudant account for cloud sync

## Database Setup
1. Start CouchDB: `couchdb` or via services
2. Access Fauxton: http://localhost:5984/_utils/
3. Create database: `ev_vehicles`
4. Import dataset via bulk_docs or Fauxton upload
5. (Optional) Setup Cloudant and replicate data

## Application Setup
1. Copy `js/config.example.js` to `js/config.js`
2. Update `COUCHDB_URL` with your local CouchDB credentials
3. (Optional) Add Cloudant URL and bearer token for cloud sync
4. Open `index.html` in browser

## Features
- CRUD operations (Create, Read, Update, Delete)
- Three-way sync: Browser ↔ Local CouchDB ↔ Cloudant
- Offline capability with automatic sync when reconnected

## Architecture
- **Browser (PouchDB)**: Local IndexedDB storage
- **Desktop (CouchDB)**: Local development server
- **Cloud (Cloudant)**: IBM managed CouchDB service

---

**Note:** This is a demonstration project. For production use, implement proper authentication, error handling, and security best practices.

© 2025 [Kytice](https://github.com/kytice)
