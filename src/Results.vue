<template lang="pug">
  div
    h1 {{name}} Results
      small.text-muted  {{roundName}}
    b-card(no-body)
      b-tabs(card)
        b-tab(title="Balance Sheet")
          balance-sheet
        b-tab(title="Income Statment")
        b-tab(title="Cash Flow Statement")
</template>

<script>
import { mapState } from 'vuex'
import BalanceSheet from './components/BalanceSheet.vue'

function sum(acc, v) {
  return acc + v
}

export default {
  name: 'Results',
  props: {
    round: {
      type: Number,
      required: true,
      validator:  v => v > 1
    }
  },
  data () {
    return {
      financial: [
        {
          balances: {
            assets: {
              cash: 284794,
              accounts_receivable: 8700,
              inventory: 154000
            },
            liabilites: {
              accounts_payable: 135000,
              wages: 25000,
            },
            equity: {
              share_capital: 300000,
              retained_profits: 27494
            }
          },
          income: {
            sales: 1465000,
            discounts: 29300,
            cost_of_goods: 574280,
            expenses: {
              wages: 146500,
              lease: 50000,
              advertising: 5000,
              insurance: 2000,
              utilities: 6500
            },
            tax: 193926
          },
          cashflow: {}
        }
      ]
    }
  },
  computed: {
    roundName () {
      let start_year = this.$store.state.business.start_year
      let round = this.$store.state.simulator.round
      let year = start_year + (round / 2)
      let period = (round % 2) + 1;
      return `${year} Q${period}`
    },
    ...mapState({
      name: state => state.business.name
    })
  },
  methods: {
    incomeTotals (period) {
      let data = this.financial[period].income
      let net_sales = data.sales - data.discounts
      let gross_profit = net_sales - data.cost_of_goods
      let total_expenses = data.expenses.values().reduce(sum)
      let net_income_before_tax = gross_profit - total_expenses
      let net_income_after_tax = net_income_before_tax - data.tax
      return { net_sales, gross_profit, total_expenses, net_income_before_tax, net_income_after_tax }
    },
    balanceTotals (period) {
      let data = this.financial[period].balances
      let total_current_assets = data.assets.values().reduce(sum)
      let total_liabilities = data.liabilities.values().reduce(sum)
      let total_owners_equity = data.equity.values().reduce(sum)
      return { total_current_assets, total_liabilities, total_owners_equity }
    },
    cashFlow (period) {
      if (period == 0) {
        return {}
      } else {
        let incomeTotalsThisPeriod = this.incomeTotals(period)
        let dataThisPeriod = this.financial[period]
        let dataLastPeriod = this.financial[period - 1]

        let collection_from_customers = (incomeTotalsThisPeriod.net_sales +
          dataThisPeriod.balances.assets.accounts_receivable -
          dataLastPeriod.balances.assets.accounts_receivable)
        let payments_to_supplies = (dataThisPeriod.income.cost_of_goods -
          dataLastPeriod.balances.assets.inventory +
          dataThisPeriod.balances.assets.inventory +
          dataLastPeriod.balances.liabilities.accounts_payable -
          dataThisPeriod.balances.liabilities.accounts_payable)
        let payments_to_employees = (dataThisPeriod.income.expenses.wages +
          dataLastPeriod.balances.liabilites.wages -
          dataThisPeriod.balances.liabilites.wages)
        return {collection_from_customers, payments_to_supplies, payments_to_employees}
      }
    }
  }
}
</script>

<style lang="css">
</style>
