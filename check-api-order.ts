
import axios from 'axios';

async function checkOrder() {
    try {
        // We need a token. We'll assume trainer@example.com / trainer123
        const loginRes = await axios.post('http://localhost:3001/auth/login', {
            email: 'trainer@example.com',
            password: 'trainer123'
        });
        const token = loginRes.data.accessToken;

        const clientsRes = await axios.get('http://localhost:3001/clients', {
            headers: { Authorization: `Bearer ${token}` }
        });

        console.log('Order from API:');
        clientsRes.data.forEach((c: any, i: number) => {
            console.log(`${i + 1}. ${c.name} (${c.email})`);
        });
    } catch (e: any) {
        console.error('Error:', e.response?.data || e.message);
    }
}

checkOrder();
