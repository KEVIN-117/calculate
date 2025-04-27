import { DataItem, tableSummary } from "./Model"

export function buildForm() {
    return `
      <div class="glass rounded-xl p-6 modal-animation">
              <div class="flex justify-center items-center mb-6">
                  <h1 class="text-4xl md:text-5xl font-bold mb-2 futuristic-font neon-glow animate__animated animate__fadeIn">
                    NEXUS <span class="text-[var(--accent)]"> CALCULADORA </span> DE <span class="text-[var(--accent)]"> PRESTAMO</span>
                  </h1>
              </div>
  
              <form id="form" class="space-y-4">
                  <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                    <div>
                        <label for="loan" class="block text-sm font-medium mb-1">Prestamo</label>
                        <input id="loan" name="loan" type="text" class="w-full cyber-input rounded-lg" required>
                    </div>
  
                    <div>
                        <label for="annualInterest" class="block text-sm font-medium mb-1">Interes Anual</label>
                        <input id="annualInterest" name="annualInterest" type="text" class="w-full cyber-input rounded-lg" required>
                    </div>
  
                    <div>
                        <label for="loanTime" class="block text-sm font-medium mb-1">Tiempo de Prestamo</label>
                        <input id="loanTime" name="loanTime" type="text" class="w-full cyber-input rounded-lg"  required>
                    </div>
                  </div>
  
                  <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
                    <div>
                      <select id="typeFee" name="type" class="w-full cyber-input rounded-lg">
                        <option value="IV">Interes Variable</option>
                        <option value="IF">Interes Fija</option>
                      </select>
                    </div>
                      <button type="submit" class="cyber-button w-full">
                          Calcular
                      </button>
                      </div>
                      <button id="savePdf" class="cyber-button w-full">
                          save to pdf
                      </button>
              </form>
          </div>
    `
}

export function buildTable() {
    return `
      <div class="glass rounded-xl p-6 mt-6 w-full">
          <div class="overflow-x-auto">
              <table class="w-full" id="table">
                <caption id="tableCaption" class="text-4xl md:text-5xl font-bold mb-2 futuristic-font neon-glow animate__animated animate__fadeIn text-center">
                </caption>
                  <thead class="text-xs uppercase glass text-center">
                      <tr>
                          <th scope="col" class="px-6 py-3">Mes</th>
                          <th scope="col" class="px-6 py-3">Interés</th>
                          <th scope="col" class="px-6 py-3">Pago Capital</th>
                          <th scope="col" class="px-6 py-3">Cuota Mes</th>
                          <th scope="col" class="px-6 py-3">Saldo</th>
                      </tr>
                  </thead>
                  <tbody id="taskTableBody">
                    <td colspan="5" class="text-4xl md:text-5xl font-bold mb-2futuristic-font neon-glow animate__animated animate__fadeIn text-center">
                        No hay datos disponibles</td>
                        </tr>
                  </tbody>
              </table>
          </div>
      </div>
    `
}

export function buildTableRow(data: DataItem[]) {
    const tableBody = document.querySelector<HTMLTableSectionElement>('#taskTableBody')

    if (tableBody) {
        tableBody.innerHTML = ''
        data.forEach((item) => {
            return tableBody.innerHTML += item.getTableRow()
        })
    }
    const summary = tableSummary(data)
    console.log(summary);

    tableBody!.innerHTML += `
        <tr class="text-center hover:bg-gray-100 dark:hover:bg-gray-700">
            <td colspan="1">Total</td>
            <td>${summary.totalInterest.toFixed(2)}</td>
            <td>${summary.totalPrincipal.toFixed(2)}</td>
            <td>${summary.totalMonthlyInstallment.toFixed(2)}</td>
            <td>${0}</td>
        </tr>
    `

}