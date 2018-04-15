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
        b-tab(title="Profit Curve")
            <canvas ref="graphRef" height="300" width="400"></canvas>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import FinancialStatement from './components/FinancialStatement.vue'
import Chart from 'chart.js'




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
    },
    profitGraph () {
        var g = this.$refs.graphRef;
        
        let profitGraph = new Chart(g, {
            type: 'line',
            data: {
                labels: [1,1465],
                datasets: [
                {
                    label: "Fixed Costs",
                    fill: false,
                    lineTension: 0.1, 
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,0.4)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [68500,68500],
                    spanGaps: false
                },
				{
                    label: "Variable Costs",
                    fill: false,
                    lineTension: 0.1, 
                    backgroundColor: 'rgb(238, 244, 66)',
                    borderColor: 'rgb(238, 244, 66)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgb(238, 244, 66)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgb(238, 244, 66)',
                    pointHoverBorderColor: 'rgb(238, 244, 66)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [0,720780],
                    spanGaps: false
                },
				{
                    label: "Total Costs",
                    fill: false,
                    lineTension: 0.1, 
                    backgroundColor: 'rgb(211, 0, 0)',
                    borderColor: 'rgb(211, 0, 0)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgb(211, 0, 0)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgb(211, 0, 0)',
                    pointHoverBorderColor: 'rgb(211, 0, 0)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [68500,789280],
                    spanGaps: false
                },
				{
                    label: "Revenue",
                    fill: false,
                    lineTension: 0.1, 
                    backgroundColor: 'rgb(76, 244, 65)',
                    borderColor: 'rgb(76, 244, 65)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgb(76, 244, 65)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgb(76, 244, 65)',
                    pointHoverBorderColor: 'rgb(76, 244, 65)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [0,1465000],
                    spanGaps: false
                }
                ]  
            },
			options:{
				title:{
					display:true,
					fontSize: 45,
					text: 'Revenue and Costs for the period'
				},
				scales: {
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'AMOUNT ($)',
							fontSize: 20
						}
					}],
					xAxes:[{
						ticks: {
							beginAtZero:true,
							steps:10,
							stepValue:100
							
						},
						scaleLabel: {
							display: true,
							labelString: 'QUANTITY OF UNITS TRADED (HUNDREDS)',
							fontSize: 20
						}
					}]
				}
			}
        })
        return
    }
    
  },
  mounted: function(){
	this.profitGraph();
	}
}
</script>

<style lang="css">
</style>
