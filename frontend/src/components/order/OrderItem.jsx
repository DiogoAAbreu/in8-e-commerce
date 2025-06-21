import formatCurrency from "../../utils/formatCurrency";

const OrderItem = ({ item }) => {
    const { name, quantity, imageUrl, price } = item;

    const formatedPrice = formatCurrency(price)
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <img src={imageUrl} alt="Produto" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-sm text-gray-500">Quantidade: {quantity}</p>
                </div>
            </div>
            <span className="font-semibold">R$ {formatedPrice}</span>
        </div>
    )
}

export default OrderItem;