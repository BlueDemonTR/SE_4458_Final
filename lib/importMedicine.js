import axios from "axios"
import { read } from "xlsx"
import { Medicine, Prescription } from "../models"

async function markMedicineAsOld() {
	const prescriptions = await Prescription.find()

	const set = new Set()

	prescriptions.forEach(prescription => {
		prescription.content.forEach(item => {
			set.add(item.medicine)
		})
	})

	await Promise.all(
		Array.from(set).map(async (medicine) => {
			await Medicine.findByIdAndUpdate(medicine, { old: true })
		})
	)
}

async function deleteAllNonOld() {
	await Medicine.deleteMany({ old: false })
}

async function addMedicines(names) {
	await Promise.all(
		names.map(async medicine => {
			await Medicine.create({
				name: medicine,
				price: Math.floor(Math.random() * 200)
			})
		})
	)
}

async function importMedicineList() {
	const res = await axios.get('https://www.titck.gov.tr/dinamikmodul/43')
	const page = String(res.data)
	const tableStart = page.indexOf('id="myTable"')
	const badgeStart = page.indexOf('class="badge"', tableStart)
	const hrefStart = page.indexOf('href="', badgeStart) + 'href="'.length 
	const hrefEnd = page.indexOf('"', hrefStart)
	const link = page.slice(hrefStart, hrefEnd)
  
	const xml = await axios.get(link, { responseType: 'arraybuffer' })
  
	const parsed = read(xml.data, { type: 'buffer' })
  
	const aktifUrunler = parsed.Sheets[parsed.SheetNames[0]]
  
	const urunListesi = []
  
	Object.keys(aktifUrunler).forEach(key => {
	  if(!key.startsWith('A')) return
  
	  urunListesi.push(aktifUrunler[key].v)
	})


  
	return urunListesi
}

async function importMedicine(req, res, id) {
	console.log('PULLING MEDICINE');
	

	await markMedicineAsOld()
	await deleteAllNonOld()
	await addMedicines(
		await importMedicineList()
	)
}

export default importMedicine