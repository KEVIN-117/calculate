/**
 * Model.ts
 * This file contains the DataItem class, which represents a single data item in the amortization schedule.
 */
export class DataItem {
    private month: number | null
    private interest: number | null
    private principalPayment: number | null
    private monthlyInstallment: number | null
    private balance: number | null
    constructor(
        month: number | null,
        interest: number | null,
        principalPayment: number | null,
        monthlyInstallment: number | null,
        balance: number | null
    ) {
        this.month = month
        this.interest = interest
        this.principalPayment = principalPayment
        this.monthlyInstallment = monthlyInstallment
        this.balance = balance
    }

    getMonth() {
        return this.month ? this.month : 0
    }
    getInterest() {
        return this.interest ? this.interest : 0
    }
    getPrincipalPayment() {
        return this.principalPayment ? this.principalPayment : 0
    }
    getMonthlyInstallment() {
        return this.monthlyInstallment ? this.monthlyInstallment : 0
    }
    getBalance() {
        return this.balance ? this.balance : 0
    }
    getData() {
        return {
            month: this.month,
            interest: this.interest,
            principalPayment: this.principalPayment,
            monthlyInstallment: this.monthlyInstallment,
            balance: this.balance,
        }
    }
    getLoanDetails() {
        return {
            loan: this.principalPayment,
            interestRate: this.interest,
            totalPayment: (this.monthlyInstallment ?? 0) * (this.month ?? 0),
        }
    }

    getTableRow() {
        return `
            <tr class="text-center hover:bg-gray-100 dark:hover:bg-gray-700">
                <td id="month">${this.getMonth()}</td>
                <td id="interest">${this.getInterest()}</td>
                <td id="principal">${this.getPrincipalPayment()}</td>
                <td id="monthlyInstallment">${this.getMonthlyInstallment()}</td>
                <td id="balance">${this.getBalance()}</td>
            </tr>
        `
    }

}

export const tableSummary = (data: DataItem[]) => {
    const totalInterest = data.reduce((acc, item) => acc + item.getInterest(), 0)
    const totalPrincipal = data.reduce((acc, item) => acc + item.getPrincipalPayment(), 0)
    const totalMonthlyInstallment = data.reduce((acc, item) => acc + item.getMonthlyInstallment(), 0)

    
    return {
        totalInterest,
        totalPrincipal,
        totalMonthlyInstallment,
    }
}