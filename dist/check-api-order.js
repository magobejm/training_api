"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
async function checkOrder() {
    try {
        const loginRes = await axios_1.default.post('http://localhost:3001/auth/login', {
            email: 'trainer@example.com',
            password: 'trainer123'
        });
        const token = loginRes.data.accessToken;
        const clientsRes = await axios_1.default.get('http://localhost:3001/clients', {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Order from API:');
        clientsRes.data.forEach((c, i) => {
            console.log(`${i + 1}. ${c.name} (${c.email})`);
        });
    }
    catch (e) {
        console.error('Error:', e.response?.data || e.message);
    }
}
checkOrder();
//# sourceMappingURL=check-api-order.js.map