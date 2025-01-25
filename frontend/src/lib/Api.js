import axios from 'axios'

const url_header = 'http://localhost:8080/api' //process.env.REACT_APP_API_URL

const Api = {
    get: async (url) => {
        try {
            const connectionString = url_header + url,
                config = { headers: {} }

            if(global.token) {
                config.headers.Authorization = `Bearer ${global.token}`
            }

            const res = await axios.get(
                connectionString,
                config
            )

            if(res?.data?.err) {
                window.alert(res.data.err)
                return null
            }

            return res.data   
        } catch (error) {
            console.log(error)
        }
    },
	delete: async (url) => {
        try {
            const connectionString = url_header + url,
                config = { headers: {} }
            
            if(global.token) {
                config.headers.Authorization = `Bearer ${global.token}`
            }

            const res = await axios.delete(
                connectionString,
                config
            )

            if(res?.data?.err) {
                window.alert(res.data.err)
                return null
            }

            return res.data   
        } catch (error) {
            console.log(error)
        }
    },
    post: async (url, data) => {
        try {
            const connectionString = url_header + url,
                config = { headers: {} }

            if(global.token) {
                config.headers.Authorization = `Bearer ${global.token}`
            }
            
            const res = await axios.post(
                connectionString, 
                data,
                config
            )

            if(res?.data?.err) {
                window.alert(res.data.err)
                return null
            }

            return res.data
        } catch (error) {
            console.log(error)
        }
    }
}

export default Api