# ACCSIM

> A business simulator for teaching student accounting.

## Background

ACCSIM is a project that I worked on during my university course as part of developing software for a real client.

The project was to develop an educational platform to simulate a business as a tool to faciliate learning for ACCT1001, a course taught by the UQ School of Business. The course taught students the fundamentals of accounting such as creating a business plan, selling a business to investors, and interpreting and generating balance sheets and profit-loss statements. 

ACCSIM's goal was to provide a virtual commerce business that students could run as a team, setting the prices and allocation of products in their inventory. The tool would then simulate a set period of trading, in which a "public" would purchase goods from their business. The students would then receive a balance sheet and profit-loss statement that showed how their business performed during that period. After a number of trading periods, their business would close. Students would then use the financial artifacts from the trading periods to develop a report in which they would be asking for investment capital to expand their business.

## Prior Art

A previous iteration of ACCSIM, developed by a different team, had involved students operating a store in a virtual 3D world, where they would not only set prices and iventory numbers for their own business, but also have to buy from other stores run by other students. This version of ACCSIM was difficult to setup, requiring all students to login at the same time in order for trading to occur. It also failed to meet the learning goals set by the course coordinator, as it unintentionally made the simulation an exercise in bartering and bargaining with other students, rather than students understanding the role of balance sheets and profit-loss statements in determining the success of their business.

## Our Solution

My team and I's solution was a Single Page Application that would allow students to operate a business against a simulated consumer base, rather than their peers. Students would be allocated a business with a general category of items and a set amount of starting capital. They would then set the price of each item, and how many to stock in the store. They could then activate a round of simulated trading, after which they would be able to view the balance sheet and profit-loss statement from that trading period. This sequence wouls then be repeated a set number of times, with students adjusting prices and stock amounts before each trading period.

Our solution reduced the setup and operation cost of the tool, and provided a learning experience that better matched the learning outcomes of the course.

The code in this repository only contains a digital prototype of the tool in question, as that was the scope of our brief. The prototype is built using Vue.js

## License

The code contained in this repository is licensed under the GNU AGPLv3. THe text of the license can be found in the `LICENSE` file.
