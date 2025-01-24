import axios from "axios"
import { read } from "xlsx"

async function importMedicine() {
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

export default importMedicine