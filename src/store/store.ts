import {effect, signal} from "@preact/signals-react";

import { ProductModel } from "../model/product.model.ts";


export class Store {
    products = signal<ProductModel[]>(this.loadState());
    sequence: number = 0;

    // Chargement de l'état à partir du localStorage
    loadState(): ProductModel[] {
        const data = localStorage.getItem("my-store");
        if (data === null) {
            const prods = [
                { id: 1, name: "Computer", price: 4500, selected: false },
                { id: 2, name: "Printer", price: 2300, selected: true },
                { id: 3, name: "Smart phone", price: 1200, selected: true },
            ];
            this.sequence = this.getMaxId(prods);
            return prods;
        } else {
            const prods: ProductModel[] = JSON.parse(data);
            this.sequence = this.getMaxId(prods);
            return prods;
        }
    }

    constructor() {
        effect(() => {
            localStorage.setItem("my-store", JSON.stringify(this.products.value));
        });
    }

    // Obtenir l'ID maximum parmi les produits chargés
    getMaxId(products: ProductModel[]): number {
        return products.length > 0 ? Math.max(...products.map(p => p.id)) : 0;
    }

    // Inverser l'état sélectionné d'un produit
    select(product: ProductModel) {
        const prods = this.products.value.map(p =>
            p.id === product.id
                ? { ...p, selected: !p.selected }
                : p
        );
        this.products.value = [...prods];
    }

    // Supprimer un produit
    delete(product: ProductModel) {
        const prods = this.products.value.filter(p => p.id !== product.id);
        this.products.value = [...prods];
    }

    // Ajouter un produit avec un nouvel ID
    saveProduct(product: ProductModel) {
        const prod = { ...product, id: ++this.sequence };
        this.products.value = [...this.products.value, prod];
    }
}

export const store = new Store();
