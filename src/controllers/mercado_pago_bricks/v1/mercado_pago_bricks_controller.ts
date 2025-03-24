/* eslint-disable no-magic-numbers */
import axios from 'axios'
import { Body, Get, Post, Route, Tags } from 'tsoa'
import { injectable } from 'tsyringe'
import { v4 as uuidv4 } from 'uuid'

import { Controller } from '@/controllers/base'

type PixPaymentRequest = {
  transaction_amount: number
  description: string
  payment_method_id: 'pix'
  payer: {
    first_name: string
    last_name: string
    email: string
    identification: {
      type: string
      number: string
    }
  }
  notification_url?: string
  external_reference?: string
}

@injectable()
@Route('/v1/payment')
@Tags('Mercado Pago Payment')
export class MercadoPagoPaymentController extends Controller {
  private readonly baseUrl = 'https://api.mercadopago.com'
  private readonly accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN || ''

  @Post('/pix')
  async createPixPayment(@Body() body: PixPaymentRequest): Promise<any> {
    try {
      // Generate a unique idempotency key using UUID
      const idempotencyKey = uuidv4()

      // Ensure payment method is PIX
      const paymentData = {
        ...body,
        payment_method_id: 'pix',
        date_of_expiration: this.getExpirationDate(24) // PIX expires in 24 hours
      }

      const response = await axios.post(
        `${this.baseUrl}/v1/payments`,
        paymentData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.accessToken}`,
            'X-Idempotency-Key': idempotencyKey
          },
          timeout: 10000
        }
      )

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Error creating PIX payment - ${JSON.stringify(error.response?.data || error.message)}`
        )
      }
      throw new Error(`Error creating PIX payment - ${JSON.stringify(error)}`)
    }
  }

  @Get('/:id')
  async getPaymentStatus(id: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/v1/payments/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.accessToken}`
        },
        timeout: 10000
      })

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Error getting payment status - ${JSON.stringify(error.response?.data || error.message)}`
        )
      }
      throw new Error(`Error getting payment status - ${JSON.stringify(error)}`)
    }
  }

  @Post('/webhook')
  handleWebhook(@Body() body: any): any {
    try {
      // Log the webhook payload for debugging
      console.log('Received webhook:', JSON.stringify(body))

      // Validate that the request is from Mercado Pago
      // You should implement proper validation here

      // Fetch the payment details to confirm the status
      // Here you can implement your business logic based on the payment status
      // For example, update your database, send emails, etc.

      // Return 200 to acknowledge receipt
      return {
        status: 'success',
        message: 'Webhook received and processed'
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Error processing webhook - ${JSON.stringify(error.response?.data || error.message)}`
        )
      }
      throw new Error(`Error processing webhook - ${JSON.stringify(error)}`)
    }
  }

  private getExpirationDate(hoursToAdd: number): string {
    const date = new Date()
    date.setHours(date.getHours() + hoursToAdd)
    return date.toISOString()
  }
}
