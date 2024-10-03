document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrency = document.getElementById('fromCurrency');
    const toCurrency = document.getElementById('toCurrency');
    const convertButton = document.getElementById('convert');
    const resultDiv = document.getElementById('result');
    
    const apiKey = '19f48c54807b627b81d6beb0';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            currencies.forEach(currency => {
                const optionFrom = document.createElement('option');
                const optionTo = document.createElement('option');
                optionFrom.value = optionTo.value = currency;
                optionFrom.text = optionTo.text = currency;
                fromCurrency.add(optionFrom);
                toCurrency.add(optionTo);
            });
        });

    convertButton.addEventListener('click', () => {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount)) {
            resultDiv.textContent = 'Coloque um valor válido';
            return;
        }

        const convertUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`;
        
        fetch(convertUrl)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rate;
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
            });
    });
});