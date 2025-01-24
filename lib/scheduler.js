import { differenceInMilliseconds, endOfHour, milliseconds } from "date-fns";
import importMedicine from "./importMedicine";
import notifyPharmacies from "./notifyPharmacies";

async function hourlyScheduler() {
	if(await hasWeeklySchedulePassed()) {
		importMedicine()
	}

	if(await hasDailySchedulePassed()) {
		notifyPharmacies()
	}
	

	const now = new Date(),
		endHour = endOfHour(now)
		
		
	setTimeout(
		hourlyScheduler,
		Math.abs(differenceInMilliseconds(now, endHour))
	)
}