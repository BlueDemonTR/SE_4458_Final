import { isBefore, isSunday, startOfWeek, subHours } from "date-fns"
import { Medicine } from "../models"

async function hasWeeklySchedulePassed() {
	// NON OLD MEDICINE WILL ALWAYS HAVE THE LATEST PULL DATE
	const lastMed = await Medicine.findOne({ old: false })

	// IF DATABASE EMPTY, ALWAYS YES
	if(!lastMed) return true

	let date
	const now = new Date()

	if(isSunday(now)) date = endOfDay(now)
	else date = startOfWeek(now)

	date = subHours(date, 2)

	return isBefore(lastMed.createdAt, date)
}

export default hasWeeklySchedulePassed