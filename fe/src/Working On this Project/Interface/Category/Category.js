import React, {  useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'
import './Category.css'
// import { Card } from 'antd'
import { Link } from 'react-router-dom';
import Mobile from '../../image/Category_img/mobiles.svg'
import Bags from '../../image/Category_img/bags.svg'
import Laptop from '../../image/Category_img/laptops.svg'
import Car from '../../image/Category_img/cars.svg'
import Document from '../../image/Category_img/document.svg'
import jewellry from '../../image/Category_img/ewellry.svg'
import Key from '../../image/Category_img/keys.svg'
import Watch from '../../image/Category_img/watch.svg'
import Other from '../../image/Category_img/other.svg'
import Person from '../../image/Category_img/persons.svg'

function Category() {
  const items = [
    { path: '/Phone', img: Mobile, label: 'Mobile' },
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

  useEffect(() => {
    AOS.init({ duration: 8000, once: true });
    AOS.refresh()
  }, []);
  return (
    <div data-aos="fade-up" data-aos-duration="2000">
      <h1 className='category_head'>Category</h1>
      <div className="category-container" >
        <ul className="category-grid">
          {items.map((item) => (
            <li className="category-item">
              <Link to={item.path} >
                <img src={item.img} alt={item.label} className="category-img"  data-aos="flip-left" data-aos-duration="2000"/>
                <span className="category-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>


    </div>

  )
}

export default Category