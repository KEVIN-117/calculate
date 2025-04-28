import { DataItem } from "./Model";


export class FrenchSystem {
    /**
     * Calcula el interés mensual basado en el saldo pendiente
     * @param remainingBalance - Saldo pendiente actual
     * @param annualInterest - Tasa de interés anual (en porcentaje)
     * @returns - Interés mensual
     */
    calculateMonthlyInterest(
        remainingBalance: number,
        annualInterest: number
    ): number {
        return remainingBalance * (annualInterest / 12 / 100);
    }

    /**
     * Calcula la cuota fija mensual para el sistema francés
     * @param loan - Monto inicial del préstamo
     * @param annualInterest - Tasa de interés anual (en porcentaje)
     * @param totalMonths - Plazo total en meses
     * @returns - Cuota mensual fija
     */
    calculateFixedMonthlyFee(
        loan: number,
        annualInterest: number,
        totalMonths: number
    ): number {
        const monthlyRate = annualInterest / 12 / 100;
        return loan * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    /**
     * Calcula el pago de capital para un período específico
     * @param monthlyFee - Cuota mensual fija
     * @param interest - Interés del período
     * @returns - Pago de capital para el período
     */
    calculateCapitalPayment(
        monthlyFee: number,
        interest: number
    ): number {
        return monthlyFee - interest;
    }

    /**
     * Calcula el saldo restante después de un pago
     * @param currentBalance - Saldo actual antes del pago
     * @param capitalPayment - Pago de capital realizado
     * @returns - Nuevo saldo pendiente
     */
    calculateRemainingBalance(
        currentBalance: number,
        capitalPayment: number
    ): number {
        return currentBalance - capitalPayment;
    }
}

export class GermanSystem {
    /**
     * Calcula el interés mensual basado en el saldo pendiente
     * @param balance - Saldo pendiente actual
     * @param annualInterest - Tasa de interés anual (en porcentaje)
     * @returns - Interés mensual
     */
    calculateMonthlyInterest(
        balance: number,
        annualInterest: number
    ): number {
        return (balance * annualInterest / 12) / 100;
    }

    /**
     * Calcula el pago de capital fijo mensual
     * @param loan - Monto inicial del préstamo
     * @param totalTime - Plazo total en meses
     * @returns - Pago mensual de capital (constante)
     */
    calculateFixedCapitalPayment(loan: number, totalTime: number): number {
        return loan / totalTime;
    }

    /**
     * Calcula la cuota mensual total (interés + capital)
     * @param interest - Interés del período
     * @param capitalPayment - Pago de capital del período
     * @returns - Cuota mensual total
     */
    calculateMonthlyFee(
        interest: number,
        capitalPayment: number,
    ): number {
        return interest + capitalPayment;
    }

    /**
     * Calcula el saldo restante después de un pago
     * @param currentBalance - Saldo actual antes del pago
     * @param capitalPayment - Pago de capital realizado
     * @returns - Nuevo saldo pendiente
     */
    calculateRemainingBalance(
        currentBalance: number,
        capitalPayment: number
    ): number {
        return currentBalance - capitalPayment;
    }
}

/**
 * Calcula la ganancia total del banco sumando todos los intereses pagados
 * @param amortizationTable - Tabla de amortización completa
 * @returns - Ganancia total (suma de intereses)
 */
export function calculateBankProfit(data: DataItem[]): number {
    // Sumamos todos los intereses
    return data.reduce((total, row) => total + row.getInterest(), 0);
}