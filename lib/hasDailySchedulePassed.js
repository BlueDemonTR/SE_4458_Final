import { getHours, isBefore, isSunday, startOfWeek, subHours } from "date-fns"
import { Medicine } from "../models"

async function hasDailySchedulePassed() {
	

	return getHours(new Date()) === 1
}

export default hasDailySchedulePassed