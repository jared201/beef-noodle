/**
 * Module for generating API Keys using SHA-256 algorithm
 */
exports.generateKey = function() {
    const crypto = require('crypto');
    const hash = crypto.createHash('sha256');
    const key = hash.update(Math.random().toString()).digest('hex');
    return key;
}