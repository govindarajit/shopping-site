import { Injectable } from '@angular/core';
import { CartItem } from './cartItem';
import { environment as env } from '../../../environments/environment';
import { User } from '../../models/user';

declare const $: any;
declare const CryptoJS: any;
declare const localStorage: any;

@Injectable()
export class Cart {
    id;
    items;
    total = 0;
    totalItems;
    userId;
    createdDate;
    cartName;
    constructor() {
        this.cartName = env.cartName;
        this.items = [];
        this.loadCart();
    }

    loadCart() {
        console.log(localStorage);
        if (localStorage != null && JSON != null && localStorage[this.cartName] !== undefined && localStorage[this.cartName] !== '') {
            this.items = JSON.parse(localStorage[this.cartName]);
            this.calculateCart();
        }
    }
    clearCart() {
        this.items = [];
        this.total = 0;
        if (localStorage != null && JSON != null) {
            localStorage[this.cartName] = '';
        }
        this.totalItems = 0;
        this.total = 0;
    }

    saveCart() {
        if (localStorage != null && JSON != null) {
            localStorage[this.cartName] = JSON.stringify(this.items);
        }
    }

    calculateCart() {
        let count = 0;
        let price = 0;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            count += item.quantity;
            price += this.items[i].total = item.quantity * item.unitPrice;
        }
        this.totalItems = count;
        this.total = price;
    }

    addToCart(productId, name, unitPrice, quantity) {

        if (quantity !== undefined) {
            // update Quantity for existing item
            let found = false;
            for (let i = 0; i < this.items.length && !found; i++) {
                const item: CartItem = this.items[i];
                if (item.productId === productId) {
                    found = true;
                    item.quantity = item.quantity + quantity;
                }
            }
            // new item, add now
            if (!found) {
                const item = new CartItem(productId, name, unitPrice, quantity);
                this.items.push(item);
            }
            this.calculateCart();
            // save changes
            this.saveCart();
        }
    }

    deleteFromCart(productId) {
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (item.productId === productId) {
                this.items.splice(i, 1);
            }
        }
        this.calculateCart();
        // save changes
        this.saveCart();
    }

    checkoutPayUmoney(cartId, user: User) {
        /*
           Test Card Name: any name
           Test Card Number: 5123456789012346
           Test CVV: 123
           Test Expiry: May 2018
         */

        const params = {
            url: env.paymentGatewayUrl,
            options: {
                key: env.key,
                salt: env.salt,
                txnid: (Math.random() * 10000000000).toFixed(0), // with 10 numbers
                amount: this.total,
                productinfo: this.cartName + '_' + this.total,
                firstname: user.name,
                email: user.email,
                phone: user.contact,
                surl: env.successUrl,
                furl: env.failedUrl,
                service_provider: '',
                hash: '',
                udf1: cartId,
                udf2: user.userId
            }
        };

        const str = params.options.key + '|' + params.options.txnid + '|' +
            params.options.amount + '|' + params.options.productinfo + '|' +
            params.options.firstname + '|' + params.options.email + '|' +
            params.options.udf1 + '|' + params.options.udf2 + '|||||||||' +
            params.options.salt;

        // console.log(str);
        params.options.hash = CryptoJS.SHA512(str).toString();

        // console.log(params.options.hash);
        // build form
        const form = $('<form/></form>');
        form.attr('action', params.url);
        form.attr('method', 'POST');
        form.attr('style', 'display:none;');
        this.addFormFields(form, params.options);
        $('body').append(form);

        // submit form
        this.clearCart();

        form.submit();
        form.remove();
    }

    // adding hidden fields to form
    addFormFields(form, data) {
        if (data != null) {
            $.each(data,  (Name, value) => {
                if (value != null) {
                    const input = $('<input></input>').attr('type', 'hidden').attr('Name', Name).val(value);
                    form.append(input);
                }
            });
        }
    }
}
