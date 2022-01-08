export default function GooglePlayProvider(): AbstractPaymentProvider {

    const name = 'google_play';

    let getProducts = (): Promise<Product[]> => {
        throw new Error("google play products are not supported anymore");
    }

    let pay = (product: Product): Promise<Product> => {
        throw new Error("google play payments are not supported anymore");
    }

    let checkIfPaymentIsPossible = (): boolean => {

        if (typeof window === 'undefined') {
            return false;
        }

        if (!window.PaymentRequest) {
            return false;
        }
        if (!('getDigitalGoodsService' in window)) {
            return false;
        }
        return true;
    }

    return {
        name,
        getProducts,
        pay,
        checkIfPaymentIsPossible
    }
}
