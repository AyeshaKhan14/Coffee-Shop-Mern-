import { Nav2 } from "../Components/Nav2"
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from "axios";
import { useToast } from '@chakra-ui/react';
import "../Style/AdminAbout.css"
import "../Style/Admin.css"


export const AdminAbout = () => {
  const [data, setData] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedAbout, setSelectedAbout] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    review: '',
  });
  const [product,setProduct] = useState({
    "name":"",
    "image":"",
    "review":""

})
  const toast = useToast();

  const getData = () => {
    axios.get("https://coffee-shops.onrender.com/about")
      .then((res) => {
        setData(res.data);
      }).catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);
    
  const handleChange=(e)=>{
    const {name,value}=e.target
    setProduct({...product,[name]:value})
  }
     
    const handleSubmit=(e)=>{
      e.preventDefault()
      axios.post(`https://coffee-shops.onrender.com/about/create`,product)
      .then((res)=>{
          console.log(res)
        if(res.data.mssg==="Product Added Successful")
        {
            toast({
                title: 'Product Added Successful',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position:"top"
              })
              setProduct({
                "name":"",
                "image":"",
                "review":"",
              })
              getData()
        }
        else{
            toast({
                title: 'Something gone wrong.',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position:"top"
              })
             
        }
      }).catch((err)=>{
        console.log(err)
      })
    }
  const handleDelete = (id) => {
    axios.delete(`https://coffee-shops.onrender.com/about/delete/${id}`)
      .then((res) => {
        if (res.data.message === "About entry deleted successfully") {
          toast({
            title: 'About entry deleted successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
          });
        } else {
          toast({
            title: 'About entry Not Found.',
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

  const handleEdit = (about) => {
    setSelectedAbout(about);
    setEditModalShow(true);
    setFormData({
      name: about.name,
      image: about.image,
      review: about.review,
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
    axios.put(`https://coffee-shops.onrender.com/about/update/${id}`, formData)
      .then((res) => {
        if (res.data.message === "About entry updated successfully") {
          toast({
            title: 'About entry updated successfully.',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top'
          });
          getData();
          handleClose();
        } else {
          toast({
            title: 'About entry Not Found.',
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
    setSelectedAbout(null);
  };

  return (
    <div>
        <Nav2/>
        <div className='post-data'>
            <h1>Post About Data</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input placeholder='Title' type="text" name="name" value={product.name} onChange={handleChange}  />
                </div>
                <div>
                    <input placeholder='image' type="text" name="image" value={product.image} onChange={handleChange} />
                </div>
                <div>
                    <input placeholder='description' type="text" name="review" value={product.review} onChange={handleChange} />
                </div>

                <button type="submit" className="newbutton">Submit</button>
            </form>
        </div>
        <div>
      <div className="table-div1">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Review</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => (
              <tr key={el._id}>
                <td>{el.name}</td>
                <td><img width="100px" height="40px" src={el.image}  /></td>
                <td>{el.review}</td>
                <td>
                  <button onClick={() => handleEdit(el)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(el._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit About Modal */}
      {selectedAbout && (
        <Modal show={editModalShow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit About Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={() => handleEditSubmit(selectedAbout._id)}>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
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
                <label>Review</label>
                <input
                  type="text"
                  name="review"
                  value={formData.review}
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
    </div>
  )
}
