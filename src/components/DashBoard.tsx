import {computed} from "@preact/signals-react";
import { useStore } from "../store/useStore";


export default function DashBoard() {
    const { store } = useStore();

    // Calcul des produits sélectionnés et du prix total
    const selectedProductsCount = store.products.value.filter(p => p.selected).length;
    const totalPriceSelectedProducts = store.products.value
        .filter(p => p.selected)
        .reduce((sum, product) => sum + product.price, 0);

    return (
        <div className="p-3">
            <ul className="nav nav-pills">
                <li className="btn btn-outline-info p-3 m-1">
                    Selected Count: {selectedProductsCount}
                </li>
                <li className="btn btn-outline-info p-3 m-1">
                    Total Price: {totalPriceSelectedProducts}
                </li>
            </ul>
        </div>
    );
}
