import axios from 'axios'

const BASEURL = "http://localhost:8081"
const Axios = axios.create({
  baseURL: BASEURL,
  timeout: 3000,
  headers: {'X-Custom-Header': 'foobar'}
});

const getNavData = async () => {
  const config = {
    method: 'GET',
    url:'/nav'
  }
  try {
    const req = await Axios(config)    
    return req.data
  } catch (error) {
    return error
  }
}
const trackEvent = async ({id, from, to}) => {
  const config = {
    method: 'POST',
    url: '/track',
    data: {id, from, to}

  }
  try {
    const req = await Axios(config)    
    return req.data
  } catch (error) {
    return error
  }
}
const editNav = async (updatedNav) => {
  const config = {
    method:'POST',
    url:'nav',
    data: updatedNav
  }
  try {
    const req = await Axios(config)    
    return req.data
  } catch (error) {
    return error
  }
}

export {getNavData, trackEvent, editNav}