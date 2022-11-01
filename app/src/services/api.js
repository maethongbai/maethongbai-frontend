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
      return response.data.data
    }
    return []
  }
}

export const goldAPI = {
  async getAll () {
    const response = await axiosInstance.get('/golds')
    if (response.status == 200) {
      return response.data.data
    }
    return []
  },
  async saveNew (gold) {
    console.log(gold)
    const response = await axiosInstance.post('/golds', gold)
    if (response.status == 201) {
      return response.data
      // return response.data.data
    }
    return {
      success: false
    }
  },
  async getID (id) {
    const response = await axiosInstance.get(`/golds/${id}`)
    if (response.status == 200) {
      // console.log(response.data);
      return response.data.data
    }
    return []
  },
  async saveEdit (id, obj) {
    const response = await axiosInstance.put(`/golds/${id}`, obj)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },

}

export const redemptionAPI = {
  async getAll () {
    const response = await axiosInstance.get('/redemptions')
    if (response.status == 200) {
      return response.data.data
    }
    return []
  },
  async saveNew (redemption) {
    // console.log(redemption)
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

export const goldTypeAPI = {
  async getAll () {
    const response = await axiosInstance.get('/gold_types')
    if (response.status == 200) {
      return response.data
    }
    return []
  },
  async saveNew (gold_type) {
    const response = await axiosInstance.post('/gold_types', gold_type)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async saveEdit (id, obj) {
    const response = await axiosInstance.put(`/gold_types/${id}`, obj)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async getID (id) {
    const response = await axiosInstance.get(`/gold_types/${id}`)
    if (response.status == 200) {
      return response.data.data
    }
    return []
  }

}

export const goldPatternAPI = {
  async getAll () {
    const response = await axiosInstance.get('/gold_patterns')
    if (response.status == 200) {
      return response.data
    }
    return []
  },
  async saveNew (gold_pattern) {
    const response = await axiosInstance.post('/gold_patterns', gold_pattern)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async saveEdit (id, obj) {
    const response = await axiosInstance.put(`/gold_patterns/${id}`, obj)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async getID (id) {
    const response = await axiosInstance.get(`/gold_patterns/${id}`)
    if (response.status == 200) {
      return response.data.data
    }
    return []
  }
}

export const goldPriceAPI = {
  async getAll () {
    const response = await axiosInstance.get('/gold_prices')
    if (response.status == 200) {
      return response.data
    }
    return []
  },
  async getLast () {
    const response = await axiosInstance.get('/gold_prices')
    if (response.status == 200) {
      var array = response.data
      var sliced = array.slice(-1)[0] 
      return sliced
    }
    return []
  }
}

export const userAPI = {
  async getAll () {
    const response = await axiosInstance.get('/users')
    if (response.status == 200) {
      return response.data.data
    }
    return []
  },
  async saveNew (user) {
    const response = await axiosInstance.post('/users', user)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async saveEdit (id, obj) {
    const response = await axiosInstance.put(`/users/${id}`, obj)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
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
      return response.data
    }
    return {
      success: false
    }
  },
  async getID (id) {
    const response = await axiosInstance.get(`/onsite_sales/${id}`)
    if (response.status == 200) {
      // console.log(response.data);
      return response.data.data
    }
    return []
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
  async saveNew (online_sale) {
    const response = await axiosInstance.post('/online_sales', online_sale)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async getID (id) {
    const response = await axiosInstance.get(`/online_sales/${id}`)
    if (response.status == 200) {
      // console.log(response.data);
      return response.data.data
    }
    return []
  }
}

export const customOrderAPI = {
  async getAll () {
    const response = await axiosInstance.get('/custom_orders')
    if (response.status == 200) {
      return response.data.data
    }
    return []
  },
  async saveNew (custom_order) {
    const response = await axiosInstance.post('/custom_orders', custom_order)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async getID (id) {
    const response = await axiosInstance.get(`/custom_orders/${id}`)
    if (response.status == 200) {
      return response.data.data
    }
    return []
  },
  async saveEdit (id, obj) {
    const response = await axiosInstance.put(`/custom_orders/${id}`, obj)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
}

export const customOrderWorkerAPI = {
  async getAll () {
    const response = await axiosInstance.get('/custom_order_workers')
    if (response.status == 200) {
      return response.data
    }
    return []
  },
  async saveNew (custom_order_worker) {
    const response = await axiosInstance.post('/custom_order_workers', custom_order_worker)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async saveEdit (id, obj) {
    const response = await axiosInstance.put(`/custom_order_workers/${id}`, obj)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async getID (id) {
    const response = await axiosInstance.get(`/custom_order_workers/${id}`)
    if (response.status == 200) {
      return response.data.data
    }
    return []
  }
}

export const wholesaleAPI = {
  async getAll () {
    const response = await axiosInstance.get('/wholesales')
    if (response.status == 200) {
      return response.data
    }
    return []
  },
  async saveNew (wholesale) {
    const response = await axiosInstance.post('/wholesales', wholesale)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  },
  async getID (id) {
    const response = await axiosInstance.get(`/wholesales/${id}`)
    if (response.status == 200) {
      return response.data.data
    }
    return []
  },
  async saveEdit (id, obj) {
    const response = await axiosInstance.put(`/wholesales/${id}`, obj)
    if (response.status == 201) {
      return response.data
    }
    return {
      success: false
    }
  }
}