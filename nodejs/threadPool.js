/*
    Thread pool is pool of background threads that libuv uses to handle heavy/blocking Node.js tasks like external file operations, cryptography, compression, dns lookup

    By default we get 4 threads in the thread pool, but this limit can be modified using UV_THREADPOOL_SIZE
*/

import { pbkdf2 } from "crypto";

process.env.UV_THREADPOOL_SIZE = 5;

pbkdf2("bhemu is back", "kauaa", 5000000, 50, "sha512", (err, data) => {
    console.log("1. pbkdf2")
});

pbkdf2("bhemu is back", "kauaa", 5000000, 50, "sha512", (err, data) => {
    console.log("2. pbkdf2")
});

pbkdf2("bhemu is back", "kauaa", 5000000, 50, "sha512", (err, data) => {
    console.log("3. pbkdf2")
});

pbkdf2("bhemu is back", "kauaa", 5000000, 50, "sha512", (err, data) => {
    console.log("4. pbkdf2")
});

pbkdf2("bhemu is back", "kauaa", 5000000, 50, "sha512", (err, data) => {
    console.log("5. pbkdf2")
});

pbkdf2("bhemu is back", "kauaa", 5000000, 50, "sha512", (err, data) => {
    console.log("6. pbkdf2")
});