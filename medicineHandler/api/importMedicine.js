import axios from "axios"
import { read } from "xlsx"
import { Medicine } from "../models"
import { createClient } from 'redis'

async function deleteAllNonOld() {
	await Medicine.deleteMany({ })
}

async function addMedicines(names) {
	await Promise.all(
		names.map(async medicineName => {
			const medicine = await Medicine.create({
				name: medicineName,
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
	  if(['A1', 'A2', 'A3'].includes(key)) return
  
	  urunListesi.push(aktifUrunler[key].v)
	})

	return urunListesi
}

async function importMedicine(req, res, id) {
	console.log('PULLING MEDICINE');

	await deleteAllNonOld()
	console.log('MEDICINES DELETED')

	await addMedicines(
		await importMedicineList()
	)

	console.log('MEDICINE ADDED');
}

export default importMedicine