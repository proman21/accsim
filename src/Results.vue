<template lang="pug">
  div
    h1 {{ name }} Results
      small.text-muted  {{ roundName() }}
    b-card(no-body)
      b-tabs(card)
        b-tab(title="Balance Sheet")
          table.table.table-hover
            thead
              tr
                th
                th Year 1
            tbody
              tr
                th(colspan="2") Current Assets
              tr
                td Cash
                td 284794
              tr
                td Accounts Receivable
                td 8700
              tr
                td Inventory
                td 154000
              tr
                th Total Current Assets
                th 447494
              tr
                th(colspan="2") Non-Current Assets
              tr
                td Retail Fittings and equipment
                td 50000
              tr
                td Accumulated Depreciation - Retail fittings and equipment
                td (10000)
              tr
                th Total Non-Current Assets
                th 40000
              tr
                th Total Assets
                th 487494
            tbody
              tr
                th(colspan="2") Current Liabilities
              tr
                td Accounts Payable
                td 135000
              tr
                td Wages Payable
                td 25000
              tr
                th Total Current Liabilities
                th 160000
              tr
                th Total Liabilities
                th 160000
            tbody
              tr
                th(colspan="2") Shareholder's Equity
              tr
                td Share Capital
                td 300000
              tr
                td Retained Profits
                td 27494
              tr
                th Total Owners Equity
                th 327494
              tr
                th Total Liabilities and Shareholder's Equity
                th 487494
        b-tab(title="Income Statment")
        b-tab(title="Cash Flow Statement")
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FinancialStatement from './components/FinancialStatement.vue'

function sum(acc, v) {
  return acc + v
}

export default {
  name: 'Results',
  components: {
    FinancialStatement
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapState({
      name: state => state.business.name
    })
  },
  methods: {
    ...mapGetters([
      "roundName"
    ]),
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
