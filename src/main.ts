import { fixedCapitalPayment, fixedMonthlyInterest, monthlyFee, remainingBalance } from "./actions"
import { DataItem } from "./Model"
import { buildForm, buildTable, buildTableRow } from "./template"

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
  

  data.length = 0
  data.push(
    new DataItem(
      0, null, null, null, loan
    )
  )

  let index = 0;
  for (let i = 0; i < loanTime; ++i) {
    const interest = fixedMonthlyInterest(data[i].getBalance(), annualInterest, loanTime)
    const capitalPayment = fixedCapitalPayment(loan, loanTime)
    const monthlyInstallment = monthlyFee(interest, capitalPayment)
    const remainingBalanceR = remainingBalance(data[i].getBalance(), capitalPayment)

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
  buildTableRow(data)

}

const form = document.querySelector<HTMLFormElement>('#form')
if (form) {
  form.addEventListener('submit', postData)
}

const savePdfButton = document.querySelector<HTMLButtonElement>('#savePdf')
if (savePdfButton) {
  savePdfButton.addEventListener('click', () => {
    console.log('savePdfButton clicked');
  })
}