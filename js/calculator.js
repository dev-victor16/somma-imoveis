/**
 * Módulo da Calculadora de Financiamento Imobiliário - Somma Imóveis 2026
 * Suporta Sistema SAC (parcelas decrescentes) e Tabela Price (parcelas fixas)
 * Gera cronograma, composição de entrada, parcelas e CTA para pré-aprovação no WhatsApp.
 */

class SommaFinancingCalculator {
  constructor() {
    this.system = 'sac'; // 'sac' | 'price'
    this.propertyValue = 350000;
    this.downPaymentPercent = 20; // 20%
    this.downPaymentValue = 70000;
    this.termYears = 30; // 360 meses
    this.annualInterestRate = 9.99; // 9.99% a.a.
  }

  calculate({ propertyValue, downPayment, termYears, annualRate, system = 'sac' }) {
    const loanAmount = Math.max(0, propertyValue - downPayment);
    const months = termYears * 12;
    const monthlyRate = Math.pow(1 + (annualRate / 100), 1 / 12) - 1;

    if (loanAmount <= 0 || months <= 0) {
      return {
        loanAmount: 0,
        firstInstallment: 0,
        lastInstallment: 0,
        totalPaid: downPayment,
        totalInterest: 0,
        system,
        schedulePreview: []
      };
    }

    if (system === 'sac') {
      // SAC: Amortização constante
      const amortization = loanAmount / months;
      let remainingBalance = loanAmount;
      let totalInterest = 0;
      let firstInstallment = 0;
      let lastInstallment = 0;
      const schedule = [];

      for (let m = 1; m <= months; m++) {
        const interest = remainingBalance * monthlyRate;
        const installment = amortization + interest;
        totalInterest += interest;
        remainingBalance -= amortization;

        if (m === 1) firstInstallment = installment;
        if (m === months) lastInstallment = installment;

        if (m === 1 || m === 12 || m === 60 || m === 120 || m === 240 || m === months) {
          schedule.push({
            month: m,
            year: Math.ceil(m / 12),
            installment,
            amortization,
            interest,
            balance: Math.max(0, remainingBalance)
          });
        }
      }

      return {
        loanAmount,
        months,
        firstInstallment,
        lastInstallment,
        averageInstallment: (firstInstallment + lastInstallment) / 2,
        totalInterest,
        totalPaid: loanAmount + totalInterest,
        downPayment,
        system: 'SAC (Parcelas Decrescentes)',
        schedulePreview: schedule
      };
    } else {
      // PRICE: Parcelas Fixas
      const installment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      const totalPaid = installment * months;
      const totalInterest = totalPaid - loanAmount;
      let remainingBalance = loanAmount;
      const schedule = [];

      for (let m = 1; m <= months; m++) {
        const interest = remainingBalance * monthlyRate;
        const amortization = installment - interest;
        remainingBalance -= amortization;

        if (m === 1 || m === 12 || m === 60 || m === 120 || m === 240 || m === months) {
          schedule.push({
            month: m,
            year: Math.ceil(m / 12),
            installment,
            amortization,
            interest,
            balance: Math.max(0, remainingBalance)
          });
        }
      }

      return {
        loanAmount,
        months,
        firstInstallment: installment,
        lastInstallment: installment,
        averageInstallment: installment,
        totalInterest,
        totalPaid,
        downPayment,
        system: 'Tabela Price (Parcelas Fixas)',
        schedulePreview: schedule
      };
    }
  }

  generateWhatsAppMessage({ propertyTitle, propertyCode, propertyValue, downPayment, result, leadName, leadPhone }) {
    const text = `Olá, Somma Imóveis! Gostaria de consultar a aprovação de crédito para financiamento.

📌 *DADOS DA SIMULAÇÃO:*
• Imóvel: ${propertyTitle || 'Imóvel em Ibirité/Região'} ${propertyCode ? `(#${propertyCode})` : ''}
• Valor do Imóvel: ${formatCurrency(propertyValue)}
• Entrada Prevista: ${formatCurrency(downPayment)}
• Valor Financiado: ${formatCurrency(result.loanAmount)}
• Prazo: ${result.months / 12} anos (${result.months} meses)
• Sistema: ${result.system}
• 1ª Parcela Estimada: ${formatCurrency(result.firstInstallment)}

👤 *MEUS DADOS:*
• Nome: ${leadName || 'Não informado'}
• Telefone: ${leadPhone || 'Não informado'}

Gostaria de saber quais bancos aprovam meu perfil e os documentos necessários!`;

    return encodeURIComponent(text);
  }
}

window.SommaFinancingCalculator = SommaFinancingCalculator;
