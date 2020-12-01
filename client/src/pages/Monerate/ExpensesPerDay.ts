import ExpenseGetDto from '../../dtos/monerate/ExpenseGetDto';
import { DateTime } from "luxon";


export interface ExpensesPerDay {
    dayString: string, // 'Today', 'Yesterday', 'Aug 10'
    totalValue: number,
    avgRating: number,

    expenses: ExpenseGetDto[]
}


// This will be a mess lol
export const getExpensesPerDay = (expenses: ExpenseGetDto[]): ExpensesPerDay[] => {
    const expensesPerDay: ExpensesPerDay[] = []

    // '2020-11-09'
    const todayISO = DateTime.fromJSDate(new Date()).toISODate()

    // '2020-11-08'
    const yesterdayISO = DateTime.fromJSDate(new Date()).minus({days: 1}).toISODate()
    // const yesterdayISO = DateTime.fromJSDate(new Date()).minus({days: 1}).toISODate()



    for (const expense of expenses) {
        const expenseDateJSONStr = DateTime.fromISO(expense.createdAt).toISODate()

        let dayStr = ''
        switch (expenseDateJSONStr) {
            case todayISO:
                dayStr = 'Today'
                break;
            case yesterdayISO:
                dayStr = 'Yesterday'
                break;
            default:
                dayStr = DateTime.fromISO(expenseDateJSONStr).toFormat('LLL dd, yyyy')
        }

        let dayIndex = expensesPerDay.findIndex(e => e.dayString === dayStr)
        if (dayIndex === -1) {
            expensesPerDay.push({
                dayString: dayStr,
                totalValue: 0,
                avgRating: 0,
                expenses: []
            })

            dayIndex = expensesPerDay.length - 1
        }
        expensesPerDay[dayIndex].expenses.push(expense)
        expensesPerDay[dayIndex].totalValue += expense.value
        expensesPerDay[dayIndex].avgRating += expense.rating
    }

    // tirando a média 
    expensesPerDay.forEach((day, i) => {
        const ratingCount = day.expenses.filter(e => e.rating > 0).length
        expensesPerDay[i].avgRating = day.avgRating / ratingCount
    })
    
  
    return expensesPerDay
}