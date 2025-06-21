const formatCurrency = (price, discount) => {
    if (discount) {
        return String(((price - discount) / 100).toFixed(2)).replace('.', ',');
    }

    return String((price / 100).toFixed(2)).replace('.', ',');
}

export default formatCurrency;