/* eslint-disable max-lines-per-function */
/* eslint-disable indent */

// #1
// First disadvantage:
  // Every object created with a factory function has a full copy of all the methods.
  // That is redundant, and can place a heavy load on the system memory.

// Second disadvantage:
  // There is no way to inspect an object and determine whether it was created with a factory function.
  // That effectively makes it impossible to determine the specific "type" of the object; at best, you can only
  // determine that the object has some specific characteristics.

// #2
function makeObj() {

  return {
    propA: 10,
    propB: 20,
  };

}

// #3
function invoiceTotal(invoices) {
  let total = 0;

  for (let index = 0; index < invoices.length; index += 1) {
    total += invoices[index].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({ internet: 6500 }));
invoices.push(createInvoice({ phone: 2000 }));
invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices)); // 31000

// #4
function createPayment(services = {}) {
  return {
    phone: !services.phone ? 0 : services.phone,
    internet: !services.internet ? 0 : services.internet,
    amount: !services.amount ? 0 : services.amount,

    total() {
      return this.phone + this.internet + this.amount;
    },
  };
}

function paymentTotal(payments) {
  return payments.reduce((sum, payment)  => sum + payment.total(), 0);
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));

// #5
function createInvoice(services = {}) {
  return {
    phone: !services.phone ? 3000 : services.phone,
    internet: !services.internet ? 5500 : services.internet,
    paymentsMade: 0,

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.paymentsMade += paymentTotal([payment]);
    },

    addPayments(payment) {
      this.paymentsMade += paymentTotal(payment);
    },

    amountDue() {
      return this.total() - this.paymentsMade;
    },
  };
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });

let payment2 = createPayment({
  phone: 1000,
  internet: 1200
});

let payment3 = createPayment({ phone: 1000 });


invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());