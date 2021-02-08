import AbstractPaymentProvider from "./AbstractPaymentProvider";

const PAYMENT_METHOD = "https://play.google.com/billing";

const paymentDetails: PaymentDetails = {
    total: {
        label: `Total`,
        amount: { currency: `USD`, value: `1` }
    }
}

const paymentMethods: PaymentMethod[] = [{
    supportedMethods: "https://play.google.com/billing",
    data: {
        sku: 'premium_1'
    }
}];


export default class GooglePlayProvider extends AbstractPaymentProvider {

    private digitalGoodsService: any;

    constructor() {
        super();
        this.checkIfPaymentIsPossible().then(possible => possible ?? this.setDigitalGoodsService())
    }

    public async getProducts(): Promise<Product[]> {
        if (this.digitalGoodsService) {
            let result = await this.digitalGoodsService.getDetails(['premium_30', 'premium_1']);
            return result;
        }
        return [];
    }

    public async pay(product: Product): Promise<boolean> {
        const request = new PaymentRequest(paymentMethods, paymentDetails);
        const paymentResponse = await request.show();
        const { token } = paymentResponse.details;
        if (this.validatePaymentToken(token)) {
            await this.digitalGoodsService.acknowledge(token, 'onetime');
            await paymentResponse.complete('success');
            return true;
        } else {
            await paymentResponse.complete('fail');
            return false;
        }
    }

    public async checkIfPaymentIsPossible(): Promise<boolean> {
        if (!window.PaymentRequest) {
            return false;
        }
        if (!('getDigitalGoodsService' in window)) {
            return false;
        }
        return true;
    }

    private async validatePaymentToken(token: string): Promise<boolean> {
        //TODO implement
        return true;
    }

    private setDigitalGoodsService() {
        if (!('getDigitalGoodsService' in window)) {
            throw 'getDigitalGoodsService not found';
        }
        this.digitalGoodsService = (window as any).getDigitalGoodsService(PAYMENT_METHOD);
    }
}