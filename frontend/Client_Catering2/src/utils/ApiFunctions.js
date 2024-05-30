import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:8080"
})


const sendToMail = async (email, htmlContent) => {
  try {
    const response = await api.post('/pdf/generateAndSend', {
      email: email,
      htmlContent: htmlContent
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export { sendToMail };



//save customer data to database
export async function createCustomer(customerData){
    try {
        const response = await api.post('/customer/saveCustomer', customerData);
        return response.data;
        
    } catch (error) {
        throw error;
    }
}


  
//   // Add item to cart
// export async function addToCart(itemId) {
//     try {
//       const response = await api.post(`/breakfast/${itemId}/add-to-cart`);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
export const fetchItemById = async (itemId) => {
  try {
    const response = await axios.get(`/items/getById/${id}`); // Replace with your endpoint URL
    return response.data; // Replace with the actual data property name in your API response
  } catch (error) {
    console.error('Error fetching item details:', error);
    // Handle errors gracefully (e.g., throw an error or return null)
    return null; // Or throw new Error('Error fetching item details');
  }
};


//get all breakfast data from database
export async function getAllItems(){
    try {
        const response = await api.get("/items/getAll")
        return response.data
        
    } catch (error) {
        throw new Error("Error fetching items")
    }
}

export async function createMenuItem(itemName, itemDescription, category) {
  try {
    const formData = new FormData();
    formData.append('itemName', itemName);
    formData.append('itemDescription', itemDescription);
    category.forEach(cat => {
      formData.append('category', cat);
    });

    const response = await api.post('/items/save', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}






// Delete item function
export async function deleteItem(itemId) {
  try {
      const response = await api.delete(`/items/delete/${itemId}`);
      return response.data;
  } catch (error) {
      throw error;
  }
}


export async function createAdmin(email, password) {
  try {
    const response = await axios.post('admin', {
      admin_name: email,
      email: email,
      password: password
    });
    return response.data; // Return created admin data
  } catch (error) {
    throw error; // Throw error for handling in the component
  }
};

// export async function  getEmployeeById(itemId){
//   return axios.get(`/items/getById/${id}` + itemId);
// }

// export async function updateItem (id, itemDetails) {
//   return axios.put(`/items/update/${id}`, itemDetails);
// };

export async function getItemByIds(id){
  try {
    const response = await api.get(`/items/getById/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export async function updateItem(id, updatedItem) {
  try {
    console.log(updatedItem)
    let url = '/items/update/' + id;
    console.log(url)
    const response = await api.put(url, updatedItem);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllCartItems(){
  try {
    const response = await api.get(`/cart/items`);
    return response.data; // Assuming response.data is an array of cart items
  } catch (error) {
    throw new Error('Error fetching cart items');
  }
};




export async function getItemsByCategory(categoryId) {
  try {
    const url = `/categories/${categoryId}`; 
    console.log(url); 

    const response = await api.get(url); 
    console.log(`/categories/${categoryId}`); 
    return response.data;
  } catch (error) {
    throw error; 
  }
}


export async function createVenues(customerId, venues) {
  try {
    const response = await api.post(`/venue/save`, { customerId, venues });
    return response.data;
  } catch (error) {
    throw error;
  }
};
