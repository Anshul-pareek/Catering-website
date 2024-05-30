import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllItems, deleteItem } from '../utils/ApiFunctions';
import Header from './Header';
import Footer from './Footer';
import '../css/menuStyle.css';

function Menu() {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsData = await getAllItems();
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems(prevItems => prevItems.filter((item) => item.items_id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = items.filter((item) => {
    if (searchTerm && !item.itemName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6"></div>
        <div className="search-container-adminPanel">
          <input
            type="text"
            className="search-input-adminPanel"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
  
        <div className="flex justify-between items-center mt-4">
          <h1 className="menu-title-adminPanel">Menu</h1>
          <Link to="/menuForm">
            <button className="add-menu-btn-adminPanel">Add Menu</button>
          </Link>
        </div>
  
        <div className="container-adminPanel mx-auto mt-4">
          <table className="table-auto-adminPanel w-full">
            <thead>
              <tr>
                <th className="table-header-adminPanel">Item ID</th>
                <th className="table-header-adminPanel">Item Name</th>
                <th className="table-header-adminPanel">Description</th>
                <th className="table-header-adminPanel">Category</th>
                <th className="table-header-adminPanel">Edit</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => ( 
                <tr key={item.items_id}>
                  <td className="table-data-adminPanel">{item.items_id}</td>
                  <td className="table-data-adminPanel">{item.itemName}</td>
                  <td className="table-data-adminPanel">{item.itemDescription}</td>
                  <td className="table-data-adminPanel">
                    <ul>
                      {item.categories && Array.isArray(item.categories) && item.categories.map((cat) => (
                        <li key={cat.category_id}>{cat.categoryName}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="table-data-adminPanel flex items-center">
                    <Link
                      to={`/UpdateMenuForm/${item.items_id}`}
                      state={{ itemData: item }}
                    >
                      <button className="update-btn-adminPanel">Update</button>
                    </Link>
                    <button
                      className="delete-btn-adminPanel"
                      onClick={() => handleDelete(item.items_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="pagination-container-adminPanel mt-4">
            {filteredItems.length > itemsPerPage && (
              <ul className="pagination-adminPanel">
                {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map(
                  (_, index) => (
                    <li key={index} className="page-item-adminPanel">
                      <button
                        className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => paginate(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Menu;
