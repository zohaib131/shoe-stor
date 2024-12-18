import { useState,useEffect } from 'react';
import { getShoes, addShoe } from '../data/shoes';
import Navbar from '../components/Navbar';

export default function Home() {
  const [shoesList, setShoesList] = useState(getShoes());
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedShoes = JSON.parse(localStorage.getItem('shoesList')) || [];
    setShoesList(savedShoes);
  }, []);

  // Save shoes list to localStorage whenever it changes
  useEffect(() => {
    if (shoesList.length > 0) {
      localStorage.setItem('shoesList', JSON.stringify(shoesList));
    }
  }, [shoesList]);



  // Handle adding a shoe
  const handleAddShoe = (e) => {
    e.preventDefault();
    if (title && price && image) {
      addShoe({ title, price, image });
      setShoesList(getShoes()); // Update the displayed list
      setTitle('');
      setPrice('');
      setImage(null);
      setIsFormVisible(false);
    } else {
      alert('Please fill in all fields!');
    }
  };
//delete product 
const handleDeleteShoe = (index) => {
  // Remove the product from the shoes list using filter
  const updatedShoesList = shoesList.filter((_, i) => i !== index)
  setShoesList(updatedShoesList);
  
  // Save the updated list to localStorage
  localStorage.setItem('shoesList', JSON.stringify(updatedShoesList));

}
const handleImageUpload = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      // Set the image as a base64 string
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  }
};

// Add product to cart
  const handleAddToCart = (shoe) => {
    setCart((prevCart) => [...prevCart, shoe]);
  };

  // Delete product from cart
  const handleDeleteFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  // Calculate total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
  };

  return (
    <div>
      <Navbar onAddShoeClick={() => setIsFormVisible(!isFormVisible)} />

      <div style={{ padding: '20px' }}>
        {/* Add Shoe Form */}
        {isFormVisible && (
          <form onSubmit={handleAddShoe}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Shoe Title"
              />
            </div>
            <div>
              <label>Price:</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
              />
            </div>
            <div>
              <label>Image:</label>
              <input
                type="file"
                onChange={handleImageUpload}
                />
            </div>
            <button type="submit">Create Add</button>
          </form>
        )}
     <div style={{}}>
        {/* Display Shoes */}
        <h2>Available Products</h2>
        {shoesList.length === 0 ? (
          <p>No Products available</p>
        ) : (
          <ul>
            {shoesList.map((shoe, index) => (
              <li key={index} style={{width:'300px', padding: '30px', margin: '10px 0', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '5px' ,paddingInline:'block'}}>
                <h2>{shoe.title}</h2>
                <p>Price: ${shoe.price}</p>
                {shoe.image && <img src={shoe.image} alt={shoe.title} />}
                <button
                  onClick={() => handleAddToCart(shoe)}>
                Add to Cart
                </button>
              <button 
              onClick={()=> handleDeleteShoe(index)}
              style={{
                backgroundColor:'red',
                padding: '5px 10px',
                  
               color: 'white',
               border: 'none',
                cursor: 'pointer',
           fontSize: '12px',
           borderRadius: '5px',
           marginLeft: '10px',
                
              }}
              > Remove card</button>
              </li>
            ))}
          </ul>
        )}
      </div>
        {/* Cart Section */}
        <div style={{ marginTop: '40px' }}>
          <h2>Your product</h2>
          {cart.length === 0 ? (
            <p >Your product is empty.</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index} style={{ padding: '10px', margin: '10px 0', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '5px' }}>
                  <span>{item.title} - ${item.price}</span>
                  <button className='delete'
                    onClick={() => handleDeleteFromCart(index)}
                    style={{
                      marginLeft: '10px',
                      padding: '5px 10px',
                      backgroundColor: '#ff3b3b',
                      color: 'white',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      borderRadius: '5px',
                    }}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
          {/* Display Total Price */}
          {cart.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Total: ${calculateTotal()}</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
