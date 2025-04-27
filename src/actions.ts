/**
 * 
 * @param balance 
 * @param annualInterest 
 * @param totalTime 
 * @returns Interest
 */
export function fixedMonthlyInterest(
    balance: number,
    annualInterest: number,
    totalTime: number
): number {
    return ((balance * annualInterest) / totalTime) / 100;
}

/**
 * 
 * @param loan 
 * @param totalTime 
 * @returns Capital Payment Fixed
 */
export function fixedCapitalPayment(loan: number, totalTime: number): number {
    return loan / totalTime;
}

/**
 * 
 * @param interest 
 * @param payment 
 * @returns Monthly Fee
 */
export function monthlyFee(
    interest: number,
    payment: number,
): number {
    return (interest + payment);
}

/**
 * 
 * @param balance 
 * @param payment 
 * @returns Remaining Balance
 */
export function remainingBalance(
    balance: number,
    payment: number
): number {
    return balance - payment;
}