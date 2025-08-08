import { BadRequestException, Injectable } from '@nestjs/common';
import * as soap from 'soap';
@Injectable()
export class PaymentService {
    private readonly terminalId = 1077374;
    private readonly webServiceUrl = "https://bpm.shaparak.ir/pgwchannel/services/pgw?wsdl";
    constructor() { }

    async paymentRequest(amount: number, registrationId: number) {
        const client = await soap.createClientAsync(this.webServiceUrl);
        const callbackUrl = `http://localhost:3000/payment/callback?id=${registrationId}`;

        const args = {
            terminalId: this.terminalId,
            amount,
            orderId: registrationId,
            callBackUrl: callbackUrl
        };

        const result = await client.RequestPaymentAsync(args);

        if (result && result.Return.Status === '0') {
            const paymentUrl = `https://bpm.shaparak.ir/payment/${result.Return.Token}`;
            console.log('Payment Gateway URL:', paymentUrl);
        } else {
            throw new BadRequestException('خطا در درخواست پرداخت از درگاه.');
        }
    }

    async verifyPayment(token: string) {
        const client = await soap.createClientAsync(this.webServiceUrl);

        const args = {
            terminalId: this.terminalId,
            token,
        };

        const result = await client.VerifyPaymentAsync(args);

        if (result && result.Return.Status === '0') {
            return true;
        } else {
            return false;
        }
    }
}
