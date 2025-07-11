interface FormDataDeposit {
    paymentType: string;
    depositAmount: string;
    accountNumber: FormDataAccountOptions | null;
}

interface FormDataWithdraw {
  paymentType: string;
  withdrawAmount: string;
  accountNumber: FormDataAccountOptions | null;
}

interface FormDataAccountOptions {
  id?: number;
  name?: string;
}