function storeDetails() {
    const name = document.getElementById('nameInput').value.trim();
    const age = document.getElementById('ageInput').value.trim();

    if (name === '' || age === '') {
        alert('Please enter both your name and age.');
    } else {
        localStorage.setItem('userName', name);
        localStorage.setItem('userAge', age);
        window.location.href = 'greeting.html';
    }
}
