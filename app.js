const API_URL = 'http://105.231.98.118:5000';

document.getElementById('startBot').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_URL}/start`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        updateStatus(data.message);
    } catch (error) {
        updateStatus('Error starting bot: ' + error.message);
    }
});

document.getElementById('stopBot').addEventListener('click', async () => {
    try {
        const response = await fetch(`${API_URL}/stop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        updateStatus(data.message);
    } catch (error) {
        updateStatus('Error stopping bot: ' + error.message);
    }
});

function updateStatus(message) {
    document.getElementById('status').textContent = message;
}

// Poll for bot status
setInterval(async () => {
    try {
        const response = await fetch(`${API_URL}/status`);
        const data = await response.json();
        updateStatus(`Bot is currently ${data.status}`);
    } catch (error) {
        console.error('Error fetching status:', error);
    }
}, 5000);
