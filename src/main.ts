import { FrenchSystem, GermanSystem, calculateBankProfit } from "./actions"
import { DataItem } from "./Model"
import { buildForm, buildTable, buildTableRow } from "./template"
import { exportDetailedReportToPDF } from "./utils"

const data: DataItem[] = [
]

function buildApp() {
  return `
  <div class="container mx-auto flex flex-col items-center justify-center">
    <div class="grid-lines"></div>
    <div class="hexagon-bg"></div>
    ${buildForm()}
    ${buildTable()}
  </div>
  `
}

function showMessage() {
  const messageDiv = document.querySelector<HTMLDivElement>('#message')
  if (messageDiv) {
    messageDiv.classList.toggle('hidden')
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector<HTMLButtonElement>('#messageButton')
  if (button) {
    button.addEventListener('click', showMessage)
  }
})

document.querySelector<HTMLDivElement>('#app')!.innerHTML = buildApp()

function postData(event: Event) {
  event.preventDefault()
  const form = event.target as HTMLFormElement

  const loan = form.loan.value as number
  const annualInterest = form.annualInterest.value as number
  const loanTime = form.loanTime.value as number
  const typeFee = form.typeFee.value as string
  console.log(`Loan: ${loan}, Annual Interest: ${annualInterest}, Loan Time: ${loanTime}, Type Fee: ${typeFee}`);
  if (typeFee === 'VARIABLE_RATE') {
    const germanSystem = new GermanSystem()
    data.length = 0
    data.push(
      new DataItem(
        0, null, null, null, loan
      )
    )

    let index = 0;
    for (let i = 0; i < loanTime; ++i) {
      const interest = germanSystem.calculateMonthlyInterest(data[i].getBalance(), annualInterest)
      const capitalPayment = germanSystem.calculateFixedCapitalPayment(loan, loanTime)
      const monthlyInstallment = germanSystem.calculateMonthlyFee(interest, capitalPayment)
      const remainingBalanceR = germanSystem.calculateRemainingBalance(data[i].getBalance(), capitalPayment)

      data.push(
        new DataItem(
          i + 1,
          parseFloat(interest.toFixed(2)),
          parseFloat(capitalPayment.toFixed(2)),
          parseFloat(monthlyInstallment.toFixed(2)),
          Math.max(0, parseFloat(remainingBalanceR.toFixed(2)))
        )
      )

      index++;
    }

  } else if (typeFee === 'FIXED_FEE') {
    const frenchSystem = new FrenchSystem()
    data.length = 0
    data.push(
      new DataItem(
        0, null, null, null, loan
      )
    )

    for (let i = 1; i <= loanTime; ++i) {
      const interest = frenchSystem.calculateMonthlyInterest(data[i - 1].getBalance(), annualInterest)
      const capitalPayment = frenchSystem.calculateCapitalPayment(loan, loanTime)
      const monthlyInstallment = frenchSystem.calculateFixedMonthlyFee(loan, interest, capitalPayment)
      const remainingBalanceR = frenchSystem.calculateRemainingBalance(data[i - 1].getBalance(), capitalPayment)
      data.push(
        new DataItem(
          i,
          parseFloat(interest.toFixed(2)),
          parseFloat(capitalPayment.toFixed(2)),
          parseFloat(monthlyInstallment.toFixed(2)),
          Math.max(0, parseFloat(remainingBalanceR.toFixed(2)))
        )
      )
    }
  }

  buildTableRow(data)

}

const form = document.querySelector<HTMLFormElement>('#form')
if (form) {
  form.addEventListener('submit', postData)
}

const savePdfButton = document.querySelector<HTMLButtonElement>('#savePdf')
if (savePdfButton) {
  const banckProfit = calculateBankProfit(data)
  savePdfButton.addEventListener('click', () => {
    exportDetailedReportToPDF(
      'table',
      'LoanReport',
      'Informe de préstamos',
      {
        loan: data[0].getBalance(),
        interest: parseFloat(document.querySelector<HTMLInputElement>('#annualInterest')?.value || '0'),
        term: data.length - 1,
        system: 'French System',
        date: new Date().toLocaleDateString(),
        bankProfit: banckProfit,
      }
    )
    console.log('PDF saved');
  })
}