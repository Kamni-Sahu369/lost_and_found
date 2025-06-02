import React from 'react'
import './Category.css'
import { Link } from 'react-router-dom';
import Mobile from '../Category/mobiles.svg'
import Bags from '../Category/bags.svg'
import Laptop from '../Category/laptops.svg'
import Car from '../Category/cars.svg'
import Document from '../Category/document.svg'
import jewellry from '../Category/ewellry.svg'
import Key from '../Category/keys.svg'
import Watch from '../Category/watch.svg'
import Other from '../Category/other.svg'
import Person from '../Category/persons.svg'
function Category() {
  const items = [
    { path: '/Mobile', img: Mobile, label: 'Mobile' },
    { path: '/Bags', img: Bags, label: 'Bag' },
    { path: '/Key', img: Key, label: 'Key' },
    { path: '/Laptop', img: Laptop, label: 'Laptop' },
    { path: '/Watch', img: Watch, label: 'Watch' },
    { path: '/gewellry', img: jewellry, label: 'jewellry' },
    { path: '/Document', img: Document, label: 'Document' },
    { path: '/Car', img: Car, label: 'Car' },
     { path: '/Person', img: Person, label: 'Person' },
    { path: '/Other', img: Other, label: 'Other' },
  ];

  return (

    <div className="category-container">
      <ul className="category-grid">
        {items.map((item) => (
          <li className="category-item">
            <Link to={item.path} >
              <img src={item.img} alt={item.label} className="category-img" />
              <span className="category-label">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>

  )
}

export default Category