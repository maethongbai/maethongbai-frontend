import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost/api'
})

const JWT_TOKEN_LOCALSTORAGE_KEY = 'jwt_token'
const token = localStorage.getItem(JWT_TOKEN_LOCALSTORAGE_KEY);

axiosInstance.defaults.headers.common['Accept'] = 'application/json;charset=UTF-8';
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
if (token) {
  axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
}

export const authAPI = {
  async login (phone, password) {
    const response = await axiosInstance.post('/auth/login', {
      phone,
      password
    })
    if (response.status == 200) {
      localStorage.setItem(JWT_TOKEN_LOCALSTORAGE_KEY, response.data.access_token)
      return true
    }
    return false
  },
  async me () {
    const _token = localStorage.getItem(JWT_TOKEN_LOCALSTORAGE_KEY)
    if (_token) {
      axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + token
    }
    const response = await axiosInstance.post('/auth/me')
    if (response.status == 200) {
      return response.data.data
    } 
    return {}
  },
  logout () {
    localStorage.removeItem(JWT_TOKEN_LOCALSTORAGE_KEY)
  },
  async getUser (id) {
    const response = await axiosInstance.get(`/users/${id}`)
    if (response.status == 200) {
      // console.log(response.data);
      return response.data
    }
    return []
  }
}

export const goldAPI = {
  async getAll () {
    const response = await axiosInstance.get('/golds')
    if (response.status == 200) {
      return response.data
    }
    return []
  },
  async saveNew (gold) {
    const response = await axiosInstance.post('/golds', gold)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  }
}

export const redemptionAPI = {
  async getAll () {
    const response = await axiosInstance.get('/redemptions')
    if (response.status == 200) {
      return response.data
    }
    return []
  },
  async saveNew (redemption) {
    const response = await axiosInstance.post('/redemptions', redemption)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async saveEdit (id, obj) {
    const response = await axiosInstance.put(`/redemptions/${id}`, obj)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async getID (id) {
    const response = await axiosInstance.get(`/redemptions/${id}`)
    if (response.status == 200) {
      // console.log(response.data);
      return response.data.data
    }
    return []
  }
}

export const onsiteSaleAPI = {
  async getAll () {
    const response = await axiosInstance.get('/onsite_sales')
    if (response.status == 200) {
      return response.data.data
    }
    return []
  },
  async saveNew (onsite_sale) {
    const response = await axiosInstance.post('/onsite_sales', onsite_sale)
    if (response.status == 201) {
      return response.data.data
    }
    return {
      success: false
    }
  }

}

export const onlineSaleAPI = {
  async getAll () {
    const response = await axiosInstance.get('/online_sales')
    if (response.status == 200) {
      return response.data.data
    }
    return []
  },
  async saveNew (onsite_sale) {
    const response = await axiosInstance.post('/online_sales', online_sale)
    if (response.status == 201) {
      return response.data.data
    }
    return {
      success: false
    }
  }

}