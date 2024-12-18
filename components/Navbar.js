// components/Navbar.js
import Link from 'next/link';

const Navbar = ({ onAddShoeClick }) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.navLeft}>
        <h2 style={styles.logo}>Navbar</h2>
      </div>
      <div style={styles.navRight}>
        <button style={styles.addButton} onClick={onAddShoeClick}>
          Add Products
        </button>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    

    padding: '10px 20px',
    backgroundColor: '#333',
    color: 'white',
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '5px',
  },
};

export default Navbar;
