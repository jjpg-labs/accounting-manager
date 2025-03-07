'use client'

import { BarChart } from "@mui/x-charts"

export default function Dashboard() {
	const data = [
		{
			income: 1000,
			outcome: 300,
			balance: 700,
			date: '18/10/2024'
		},
		{
			income: 1000,
			outcome: 1500,
			balance: -500,
			date: '19/10/2024'
		},
		{
			income: 2500,
			outcome: 800,
			balance: 1700,
			date: '20/10/2024'
		}
	]
	return <main className="flex flex-col sm:flex-row flex-wrap pt-10">
		<section className="w-full sm:w-1/2 pb-10">
			<BarChart
				dataset={data}
				xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
				series={[
					{ dataKey: 'income', label: 'Income' },
					{ dataKey: 'outcome', label: 'Outcome' },
					{ dataKey: 'balance', label: 'Balance' }
				]}
				width={500}
				height={500}
			/>
		</section>
		<section className="w-full sm:w-1/2 pb-10">
			Daily balance form
		</section>
	</main>
}