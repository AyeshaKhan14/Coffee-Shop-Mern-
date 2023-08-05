import  { useEffect, useState } from 'react';
import { Nav2 } from "../Components/Nav2";
import "../Style/DashBoard.css";
import axios from "axios";
import { Button, Modal } from 'react-bootstrap';
import { useToast } from '@chakra-ui/react'


export const DashBoard = () => {
  const [data, setData] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    desc: '',
    price: '',
  });

  const toast = useToast();

  const getData = () => {
    axios.get("https://coffee-shops.onrender.com")
      .then((res) => {
        setData(res.data.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://coffee-shops.onrender.com/delete/${id}`)
      .then((res) => {
        if (res.data.message === "Product deleted successfully") {
          toast({
            title: 'Product deleted successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
          });
        } else {
          toast({
            title: 'Product Not Found.',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top'
          });
        }
        getData();
      }).catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditModalShow(true);
    setFormData({
      title: product.title,
      image: product.image,
      desc: product.desc,
      price: product.price,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditSubmit = (id) => {
    axios.put(`https://coffee-shops.onrender.com/update/${id}`, formData)
      .then((res) => {
        // console.log(res.data)
        if (res.data.message === "Product updated successfully") {
          toast({
            title: 'Product updated successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
          });
          getData();
          handleClose();
        } else {
          toast({
            title: 'Product Not Found.',
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top'
          });
        }
      }).catch((err) => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setEditModalShow(false);
    setSelectedProduct(null);
  };

  return (
    <div>
      <Nav2 />
      <div className="dash">
        <h1>DashBoard</h1>
        <div className="table-div">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((el) => (
                <tr key={el.id}>
                  <td>{el.title}</td>
                  <td><img width="100px" height="40px" src={el.image} alt={el.title} /></td>
                  <td>{el.desc}</td>
                  <td>{el.price}</td>
                  <td>
                    <button onClick={() => handleEdit(el)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(el.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Product Modal */}
      {selectedProduct && (
        <Modal show={editModalShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={() => handleEditSubmit(selectedProduct.id)}>
              <div>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Image</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  type="text"
                  name="desc"
                  value={formData.desc}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                />
              </div>
              <div style={{display:"flex",gap:"40px",justifyContent:"center"}}>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button type="submit" variant="primary">
                  Save 
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
};

