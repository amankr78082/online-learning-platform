document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const progressStatus = document.getElementById('progress-status');

    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const answer = document.getElementById('answer').value.trim();

        if (answer.toLowerCase() === 'hypertext markup language') {
            progressStatus.textContent = 'Quiz completed successfully!';
            saveProgress('completed');
        } else {
            progressStatus.textContent = 'Incorrect answer. Try again.';
        }
    });

    fetch('/progress')
        .then(response => response.json())
        .then(data => {
            if (data.status === 'completed') {
                progressStatus.textContent = 'Quiz completed successfully!';
            }
        });
});

function saveProgress(status) {
    fetch('/progress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: status })
    });
}
