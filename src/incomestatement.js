//Student decision items
var sales;
var cogs;
var adsEx;

var discounts;
var netSales;
var grossProfit;

var wagesEx;
var leaseEx;
var depnEx;
var insurEx;
var utilEx;
var interestEx;
var totalOpEx;

var netIncomeBeforeTax;
var incomeTaxEx;
var netIncomeAfterTax;

function generateIncomeStatement(){
	getValues();
	updateItems();
	document.getElementById("Sales").innerHTML = sales;
	document.getElementById("Discounts").innerHTML = discounts;
	document.getElementById("NetSales").innerHTML = netSales;
	document.getElementById("COGS").innerHTML = cogs;
	document.getElementById("GrossProfit").innerHTML = grossProfit;
	document.getElementById("WagesEx").innerHTML = wagesEx;
	document.getElementById("LeaseEx").innerHTML = leaseEx;
	document.getElementById("Advertising").innerHTML = adsEx;
	document.getElementById("DepnEx").innerHTML = depnEx;
	document.getElementById("InsuranceEx").innerHTML = insurEx;
	document.getElementById("UtilEx").innerHTML = utilEx;
	document.getElementById("InterestEx").innerHTML = interestEx;
	document.getElementById("TotalOpEx").innerHTML = totalOpEx;
	document.getElementById("NetIncomeBTax").innerHTML = netIncomeBeforeTax;
	document.getElementById("IncomeTaxEx").innerHTML = incomeTaxEx;
	document.getElementById("NetIncomeATax").innerHTML = netIncomeAfterTax;
}

function getValues(){
	sales = document.getElementById('sampleSales').value;
	cogs = document.getElementById('sampleCOGS').value;
	adsEx = document.getElementById('sampleAdsEx').value;
}

function updateItems(){
	//Gross Profit
	discounts=sales*0.02;
	netSales=sales-discounts;
	grossProfit=netSales-cogs;
	
	//Operating Expenses
	wagesEx = 0.1*sales;
	leaseEx = 50000;
	//adsEx = 5000;
	depnEx = 5000;
	insurEx = 2000;
	utilEx = 6500;
	interestEx = 0;
	totalOpEx = parseInt(wagesEx) + parseInt(leaseEx) + parseInt(adsEx) + parseInt(depnEx) + parseInt(insurEx) + parseInt(utilEx) + parseInt(interestEx);
	
	//Net Income
	netIncomeBeforeTax = grossProfit - totalOpEx;
	incomeTaxEx = 0.3*netIncomeBeforeTax;
	netIncomeAfterTax = netIncomeBeforeTax - incomeTaxEx;
}