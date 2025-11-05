"use client"

import { useEffect, useRef } from "react"

interface PayUPaymentFormProps {
  paymentData: {
    txnid: string
    amount: number
    productinfo: string
    firstname: string
    email: string
    phone: string
    hash: string
    key: string
    surl: string
    furl: string
    service_provider: string
    address1?: string
    city?: string
    state?: string
    zipcode?: string
    country?: string
  }
  payuUrl: string
}

export function PayUPaymentForm({ paymentData, payuUrl }: PayUPaymentFormProps) {
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    // Auto-submit the form when component mounts
    if (formRef.current) {
      console.log('💳 [PayU Form] Auto-submitting payment form')
      formRef.current.submit()
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Redirecting to Payment Gateway
          </h2>
          <p className="text-gray-600 text-sm">
            Please wait while we redirect you to secure payment page...
          </p>
          <p className="text-gray-500 text-xs mt-4">
            Do not close this window or press back button
          </p>
        </div>

        {/* Hidden PayU Form */}
        <form ref={formRef} action={payuUrl} method="post" style={{ display: 'none' }}>
          <input type="hidden" name="key" value={paymentData.key} />
          <input type="hidden" name="txnid" value={paymentData.txnid} />
          <input type="hidden" name="amount" value={paymentData.amount} />
          <input type="hidden" name="productinfo" value={paymentData.productinfo} />
          <input type="hidden" name="firstname" value={paymentData.firstname} />
          <input type="hidden" name="email" value={paymentData.email} />
          <input type="hidden" name="phone" value={paymentData.phone} />
          <input type="hidden" name="surl" value={paymentData.surl} />
          <input type="hidden" name="furl" value={paymentData.furl} />
          <input type="hidden" name="hash" value={paymentData.hash} />
          <input type="hidden" name="service_provider" value={paymentData.service_provider} />
          {paymentData.address1 && <input type="hidden" name="address1" value={paymentData.address1} />}
          {paymentData.city && <input type="hidden" name="city" value={paymentData.city} />}
          {paymentData.state && <input type="hidden" name="state" value={paymentData.state} />}
          {paymentData.zipcode && <input type="hidden" name="zipcode" value={paymentData.zipcode} />}
          {paymentData.country && <input type="hidden" name="country" value={paymentData.country} />}
        </form>
      </div>
    </div>
  )
}
