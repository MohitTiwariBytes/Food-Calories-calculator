document.getElementById('calorie-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const foodItem = document.getElementById('food').value;
    const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(foodItem)}&app_id=2ccbac6b&app_key=ec55a3e4e7853f42bb947d613d03a677`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`http error the status is: ${response.status}`);
        }

        const data = await response.json();

        if (data.hints && data.hints.length > 0) {
            const food = data.hints[0].food;
            const calories = food.nutrients.ENERC_KCAL;
            document.getElementById('calorie-info').textContent = `Calorie per 100g: ${calories}`;
        } else {
            document.getElementById('calorie-info').textContent = 'no calorie found.';
        }
    } catch (error) {
        document.getElementById('calorie-info').textContent = 'error';
        console.error('error:', error);
    }
});
