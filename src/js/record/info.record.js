export default class InfoRecordCurrency {
  constructor(record) {
    this.inputAmount = record?.inputAmount;
    this.fromCurrency = record?.fromCurrency;
    this.outputAmount = record?.outputAmount;
    this.toCurrency = record?.toCurrency;
  }
}
