const form = document.getElementById('queryForm');
const queryInput = document.getElementById('query');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = queryInput.value;

    try {
        // Send query to server (if using a server)
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        const data = await response.json();

        if (data.success) {
            alert('Query submitted successfully!');
            queryInput.value = ''; // Clear input field
        } else {
            alert('Error submitting query.');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});