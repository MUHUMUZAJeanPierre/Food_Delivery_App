import { useState } from 'react';
import './Add.css';
import { assets } from "../../assets/assets";
import axios from 'axios'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Add = ({url}) => {
  
  const [image, setImage] = useState(null);
  const navigate = useNavigate() 
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad"
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        setTimeout(()=>{

          setData({
            name: "",
            description: "",
            price: "",
            category: "Salad"
          });
          setImage(false);
          toast.success(response.data.message);
          navigate('/list');
        }, 3000)
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("There was an error adding the food item!", error);
    }
  }

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor='image'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="upload" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input value={data.name} onChange={onChangeHandler} type="text" name="name" placeholder="Type here" required />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea value={data.description} onChange={onChangeHandler} name="description" rows="6" placeholder="Write content here" required />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select value={data.category} onChange={onChangeHandler} name="category" required>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pur Veg">Pur Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input value={data.price} onChange={onChangeHandler} type="number" name="price" placeholder="$20" required />
          </div>
        </div>
        <button type="submit" className="add-btn">ADD</button>
      </form>
    </div>
  )
}

export default Add;
